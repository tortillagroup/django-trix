/*
Trix 1.2.1
Copyright © 2019 Basecamp, LLC
http://trix-editor.org/
 */
(function() {}.call(this),
  function() {
    var t = this;
    (function() {
      (function() {
        this.Trix = {
          VERSION: "1.2.1",
          ZERO_WIDTH_SPACE: "\ufeff",
          NON_BREAKING_SPACE: "\xa0",
          OBJECT_REPLACEMENT_CHARACTER: "\ufffc",
          browser: {
            composesExistingText: /Android.*Chrome/.test(navigator.userAgent),
            forcesObjectResizing: /Trident.*rv:11/.test(navigator.userAgent),
            supportsInputEvents: (function() {
              var t, e, n, i;
              if ("undefined" == typeof InputEvent) return !1;
              for (
                i = ["data", "getTargetRanges", "inputType"],
                  t = 0,
                  e = i.length;
                e > t;
                t++
              )
                if (((n = i[t]), !(n in InputEvent.prototype))) return !1;
              return !0;
            })()
          },
          config: {}
        };
      }.call(this));
    }.call(t));
    var e = t.Trix;
    (function() {
      (function() {
        e.BasicObject = (function() {
          function t() {}
          var e, n, i;
          return (
            (t.proxyMethod = function(t) {
              var i, r, o, s, a;
              return (
                (o = n(t)),
                (i = o.name),
                (s = o.toMethod),
                (a = o.toProperty),
                (r = o.optional),
                (this.prototype[i] = function() {
                  var t, n;
                  return (
                    (t =
                      null != s
                        ? r
                          ? "function" == typeof this[s]
                            ? this[s]()
                            : void 0
                          : this[s]()
                        : null != a
                        ? this[a]
                        : void 0),
                    r
                      ? ((n = null != t ? t[i] : void 0),
                        null != n ? e.call(n, t, arguments) : void 0)
                      : ((n = t[i]), e.call(n, t, arguments))
                  );
                })
              );
            }),
            (n = function(t) {
              var e, n;
              if (!(n = t.match(i)))
                throw new Error("can't parse @proxyMethod expression: " + t);
              return (
                (e = { name: n[4] }),
                null != n[2] ? (e.toMethod = n[1]) : (e.toProperty = n[1]),
                null != n[3] && (e.optional = !0),
                e
              );
            }),
            (e = Function.prototype.apply),
            (i = /^(.+?)(\(\))?(\?)?\.(.+?)$/),
            t
          );
        })();
      }.call(this),
        function() {
          var t = function(t, e) {
              function i() {
                this.constructor = t;
              }
              for (var r in e) n.call(e, r) && (t[r] = e[r]);
              return (
                (i.prototype = e.prototype),
                (t.prototype = new i()),
                (t.__super__ = e.prototype),
                t
              );
            },
            n = {}.hasOwnProperty;
          e.Object = (function(n) {
            function i() {
              this.id = ++r;
            }
            var r;
            return (
              t(i, n),
              (r = 0),
              (i.fromJSONString = function(t) {
                return this.fromJSON(JSON.parse(t));
              }),
              (i.prototype.hasSameConstructorAs = function(t) {
                return (
                  this.constructor === (null != t ? t.constructor : void 0)
                );
              }),
              (i.prototype.isEqualTo = function(t) {
                return this === t;
              }),
              (i.prototype.inspect = function() {
                var t, e, n;
                return (
                  (t = function() {
                    var t, i, r;
                    (i = null != (t = this.contentsForInspection()) ? t : {}),
                      (r = []);
                    for (e in i) (n = i[e]), r.push(e + "=" + n);
                    return r;
                  }.call(this)),
                  "#<" +
                    this.constructor.name +
                    ":" +
                    this.id +
                    (t.length ? " " + t.join(", ") : "") +
                    ">"
                );
              }),
              (i.prototype.contentsForInspection = function() {}),
              (i.prototype.toJSONString = function() {
                return JSON.stringify(this);
              }),
              (i.prototype.toUTF16String = function() {
                return e.UTF16String.box(this);
              }),
              (i.prototype.getCacheKey = function() {
                return this.id.toString();
              }),
              i
            );
          })(e.BasicObject);
        }.call(this),
        function() {
          e.extend = function(t) {
            var e, n;
            for (e in t) (n = t[e]), (this[e] = n);
            return this;
          };
        }.call(this),
        function() {
          e.extend({
            defer: function(t) {
              return setTimeout(t, 1);
            }
          });
        }.call(this),
        function() {
          var t, n;
          e.extend({
            normalizeSpaces: function(t) {
              return t
                .replace(RegExp("" + e.ZERO_WIDTH_SPACE, "g"), "")
                .replace(RegExp("" + e.NON_BREAKING_SPACE, "g"), " ");
            },
            normalizeNewlines: function(t) {
              return t.replace(/\r\n/g, "\n");
            },
            breakableWhitespacePattern: RegExp(
              "[^\\S" + e.NON_BREAKING_SPACE + "]"
            ),
            squishBreakableWhitespace: function(t) {
              return t
                .replace(
                  RegExp("" + e.breakableWhitespacePattern.source, "g"),
                  " "
                )
                .replace(/\ {2,}/g, " ");
            },
            escapeHTML: function(t) {
              var e;
              return (
                (e = document.createElement("div")),
                (e.textContent = t),
                e.innerHTML
              );
            },
            summarizeStringChange: function(t, i) {
              var r, o, s, a;
              return (
                (t = e.UTF16String.box(t)),
                (i = e.UTF16String.box(i)),
                i.length < t.length
                  ? ((o = n(t, i)), (a = o[0]), (r = o[1]))
                  : ((s = n(i, t)), (r = s[0]), (a = s[1])),
                { added: r, removed: a }
              );
            }
          }),
            (n = function(n, i) {
              var r, o, s, a, u;
              return n.isEqualTo(i)
                ? ["", ""]
                : ((o = t(n, i)),
                  (a = o.utf16String.length),
                  (s = a
                    ? ((u = o.offset),
                      o,
                      (r = n.codepoints
                        .slice(0, u)
                        .concat(n.codepoints.slice(u + a))),
                      t(i, e.UTF16String.fromCodepoints(r)))
                    : t(i, n)),
                  [o.utf16String.toString(), s.utf16String.toString()]);
            }),
            (t = function(t, e) {
              var n, i, r;
              for (
                n = 0, i = t.length, r = e.length;
                i > n && t.charAt(n).isEqualTo(e.charAt(n));

              )
                n++;
              for (; i > n + 1 && t.charAt(i - 1).isEqualTo(e.charAt(r - 1)); )
                i--, r--;
              return { utf16String: t.slice(n, i), offset: n };
            });
        }.call(this),
        function() {
          e.extend({
            copyObject: function(t) {
              var e, n, i;
              null == t && (t = {}), (n = {});
              for (e in t) (i = t[e]), (n[e] = i);
              return n;
            },
            objectsAreEqual: function(t, e) {
              var n, i;
              if (
                (null == t && (t = {}),
                null == e && (e = {}),
                Object.keys(t).length !== Object.keys(e).length)
              )
                return !1;
              for (n in t) if (((i = t[n]), i !== e[n])) return !1;
              return !0;
            }
          });
        }.call(this),
        function() {
          var t = [].slice;
          e.extend({
            arraysAreEqual: function(t, e) {
              var n, i, r, o;
              if (
                (null == t && (t = []),
                null == e && (e = []),
                t.length !== e.length)
              )
                return !1;
              for (i = n = 0, r = t.length; r > n; i = ++n)
                if (((o = t[i]), o !== e[i])) return !1;
              return !0;
            },
            arrayStartsWith: function(t, n) {
              return (
                null == t && (t = []),
                null == n && (n = []),
                e.arraysAreEqual(t.slice(0, n.length), n)
              );
            },
            spliceArray: function() {
              var e, n, i;
              return (
                (n = arguments[0]),
                (e = 2 <= arguments.length ? t.call(arguments, 1) : []),
                (i = n.slice(0)),
                i.splice.apply(i, e),
                i
              );
            },
            summarizeArrayChange: function(t, e) {
              var n, i, r, o, s, a, u, c, l, h, p;
              for (
                null == t && (t = []),
                  null == e && (e = []),
                  n = [],
                  h = [],
                  r = new Set(),
                  o = 0,
                  u = t.length;
                u > o;
                o++
              )
                (p = t[o]), r.add(p);
              for (i = new Set(), s = 0, c = e.length; c > s; s++)
                (p = e[s]), i.add(p), r.has(p) || n.push(p);
              for (a = 0, l = t.length; l > a; a++)
                (p = t[a]), i.has(p) || h.push(p);
              return { added: n, removed: h };
            }
          });
        }.call(this),
        function() {
          var t, n, i, r;
          (t = null),
            (n = null),
            (r = null),
            (i = null),
            e.extend({
              getAllAttributeNames: function() {
                return null != t
                  ? t
                  : (t = e
                      .getTextAttributeNames()
                      .concat(e.getBlockAttributeNames()));
              },
              getBlockConfig: function(t) {
                return e.config.blockAttributes[t];
              },
              getBlockAttributeNames: function() {
                return null != n
                  ? n
                  : (n = Object.keys(e.config.blockAttributes));
              },
              getTextConfig: function(t) {
                return e.config.textAttributes[t];
              },
              getTextAttributeNames: function() {
                return null != r
                  ? r
                  : (r = Object.keys(e.config.textAttributes));
              },
              getListAttributeNames: function() {
                var t, n;
                return null != i
                  ? i
                  : (i = (function() {
                      var i, r;
                      (i = e.config.blockAttributes), (r = []);
                      for (t in i)
                        (n = i[t].listAttribute), null != n && r.push(n);
                      return r;
                    })());
              }
            });
        }.call(this),
        function() {
          var t,
            n,
            i,
            r,
            o,
            s =
              [].indexOf ||
              function(t) {
                for (var e = 0, n = this.length; n > e; e++)
                  if (e in this && this[e] === t) return e;
                return -1;
              };
          (t = document.documentElement),
            (n =
              null !=
              (i =
                null !=
                (r =
                  null != (o = t.matchesSelector) ? o : t.webkitMatchesSelector)
                  ? r
                  : t.msMatchesSelector)
                ? i
                : t.mozMatchesSelector),
            e.extend({
              handleEvent: function(n, i) {
                var r, o, s, a, u, c, l, h, p, d, f, g;
                return (
                  (h = null != i ? i : {}),
                  (c = h.onElement),
                  (u = h.matchingSelector),
                  (g = h.withCallback),
                  (a = h.inPhase),
                  (l = h.preventDefault),
                  (d = h.times),
                  (o = null != c ? c : t),
                  (p = u),
                  (r = g),
                  (f = "capturing" === a),
                  (s = function(t) {
                    var n;
                    return (
                      null != d && 0 === --d && s.destroy(),
                      (n = e.findClosestElementFromNode(t.target, {
                        matchingSelector: p
                      })),
                      null != n && (null != g && g.call(n, t, n), l)
                        ? t.preventDefault()
                        : void 0
                    );
                  }),
                  (s.destroy = function() {
                    return o.removeEventListener(n, s, f);
                  }),
                  o.addEventListener(n, s, f),
                  s
                );
              },
              handleEventOnce: function(t, n) {
                return (
                  null == n && (n = {}), (n.times = 1), e.handleEvent(t, n)
                );
              },
              triggerEvent: function(n, i) {
                var r, o, s, a, u, c, l;
                return (
                  (l = null != i ? i : {}),
                  (c = l.onElement),
                  (o = l.bubbles),
                  (s = l.cancelable),
                  (r = l.attributes),
                  (a = null != c ? c : t),
                  (o = o !== !1),
                  (s = s !== !1),
                  (u = document.createEvent("Events")),
                  u.initEvent(n, o, s),
                  null != r && e.extend.call(u, r),
                  a.dispatchEvent(u)
                );
              },
              elementMatchesSelector: function(t, e) {
                return 1 === (null != t ? t.nodeType : void 0)
                  ? n.call(t, e)
                  : void 0;
              },
              findClosestElementFromNode: function(t, n) {
                var i, r, o;
                for (
                  r = null != n ? n : {},
                    i = r.matchingSelector,
                    o = r.untilNode;
                  null != t && t.nodeType !== Node.ELEMENT_NODE;

                )
                  t = t.parentNode;
                if (null != t) {
                  if (null == i) return t;
                  if (t.closest && null == o) return t.closest(i);
                  for (; t && t !== o; ) {
                    if (e.elementMatchesSelector(t, i)) return t;
                    t = t.parentNode;
                  }
                }
              },
              findInnerElement: function(t) {
                for (; null != t ? t.firstElementChild : void 0; )
                  t = t.firstElementChild;
                return t;
              },
              innerElementIsActive: function(t) {
                return (
                  document.activeElement !== t &&
                  e.elementContainsNode(t, document.activeElement)
                );
              },
              elementContainsNode: function(t, e) {
                if (t && e)
                  for (; e; ) {
                    if (e === t) return !0;
                    e = e.parentNode;
                  }
              },
              findNodeFromContainerAndOffset: function(t, e) {
                var n;
                if (t)
                  return t.nodeType === Node.TEXT_NODE
                    ? t
                    : 0 === e
                    ? null != (n = t.firstChild)
                      ? n
                      : t
                    : t.childNodes.item(e - 1);
              },
              findElementFromContainerAndOffset: function(t, n) {
                var i;
                return (
                  (i = e.findNodeFromContainerAndOffset(t, n)),
                  e.findClosestElementFromNode(i)
                );
              },
              findChildIndexOfNode: function(t) {
                var e;
                if (null != t ? t.parentNode : void 0) {
                  for (e = 0; (t = t.previousSibling); ) e++;
                  return e;
                }
              },
              removeNode: function(t) {
                var e;
                return null != t && null != (e = t.parentNode)
                  ? e.removeChild(t)
                  : void 0;
              },
              walkTree: function(t, e) {
                var n, i, r, o, s;
                return (
                  (r = null != e ? e : {}),
                  (i = r.onlyNodesOfType),
                  (o = r.usingFilter),
                  (n = r.expandEntityReferences),
                  (s = (function() {
                    switch (i) {
                      case "element":
                        return NodeFilter.SHOW_ELEMENT;
                      case "text":
                        return NodeFilter.SHOW_TEXT;
                      case "comment":
                        return NodeFilter.SHOW_COMMENT;
                      default:
                        return NodeFilter.SHOW_ALL;
                    }
                  })()),
                  document.createTreeWalker(
                    t,
                    s,
                    null != o ? o : null,
                    n === !0
                  )
                );
              },
              tagName: function(t) {
                var e;
                return null != t && null != (e = t.tagName)
                  ? e.toLowerCase()
                  : void 0;
              },
              makeElement: function(t, e) {
                var n, i, r, o, s, a, u, c, l, h;
                if (
                  (null == e && (e = {}),
                  "object" == typeof t
                    ? ((e = t), (t = e.tagName))
                    : (e = { attributes: e }),
                  (i = document.createElement(t)),
                  null != e.editable &&
                    (null == e.attributes && (e.attributes = {}),
                    (e.attributes.contenteditable = e.editable)),
                  e.attributes)
                ) {
                  a = e.attributes;
                  for (o in a) (h = a[o]), i.setAttribute(o, h);
                }
                if (e.style) {
                  u = e.style;
                  for (o in u) (h = u[o]), (i.style[o] = h);
                }
                if (e.data) {
                  c = e.data;
                  for (o in c) (h = c[o]), (i.dataset[o] = h);
                }
                if (e.className)
                  for (
                    l = e.className.split(" "), r = 0, s = l.length;
                    s > r;
                    r++
                  )
                    (n = l[r]), i.classList.add(n);
                return e.textContent && (i.textContent = e.textContent), i;
              },
              getBlockTagNames: function() {
                var t, n;
                return null != e.blockTagNames
                  ? e.blockTagNames
                  : (e.blockTagNames = (function() {
                      var i, r;
                      (i = e.config.blockAttributes), (r = []);
                      for (t in i) (n = i[t].tagName), n && r.push(n);
                      return r;
                    })());
              },
              nodeIsBlockContainer: function(t) {
                return e.nodeIsBlockStartComment(
                  null != t ? t.firstChild : void 0
                );
              },
              nodeProbablyIsBlockContainer: function(t) {
                var n, i;
                return (
                  (n = e.tagName(t)),
                  s.call(e.getBlockTagNames(), n) >= 0 &&
                    ((i = e.tagName(t.firstChild)),
                    s.call(e.getBlockTagNames(), i) < 0)
                );
              },
              nodeIsBlockStart: function(t, n) {
                var i;
                return (
                  (i = (null != n ? n : { strict: !0 }).strict),
                  i
                    ? e.nodeIsBlockStartComment(t)
                    : e.nodeIsBlockStartComment(t) ||
                      (!e.nodeIsBlockStartComment(t.firstChild) &&
                        e.nodeProbablyIsBlockContainer(t))
                );
              },
              nodeIsBlockStartComment: function(t) {
                return (
                  e.nodeIsCommentNode(t) &&
                  "block" === (null != t ? t.data : void 0)
                );
              },
              nodeIsCommentNode: function(t) {
                return (null != t ? t.nodeType : void 0) === Node.COMMENT_NODE;
              },
              nodeIsCursorTarget: function(t, n) {
                var i;
                return (
                  (i = (null != n ? n : {}).name),
                  t
                    ? e.nodeIsTextNode(t)
                      ? t.data === e.ZERO_WIDTH_SPACE
                        ? i
                          ? t.parentNode.dataset.trixCursorTarget === i
                          : !0
                        : void 0
                      : e.nodeIsCursorTarget(t.firstChild)
                    : void 0
                );
              },
              nodeIsAttachmentElement: function(t) {
                return e.elementMatchesSelector(
                  t,
                  e.AttachmentView.attachmentSelector
                );
              },
              nodeIsEmptyTextNode: function(t) {
                return (
                  e.nodeIsTextNode(t) && "" === (null != t ? t.data : void 0)
                );
              },
              nodeIsTextNode: function(t) {
                return (null != t ? t.nodeType : void 0) === Node.TEXT_NODE;
              }
            });
        }.call(this),
        function() {
          var t, n, i, r, o;
          (t = e.copyObject),
            (r = e.objectsAreEqual),
            e.extend({
              normalizeRange: (i = function(t) {
                var e;
                if (null != t)
                  return (
                    Array.isArray(t) || (t = [t, t]),
                    [n(t[0]), n(null != (e = t[1]) ? e : t[0])]
                  );
              }),
              rangeIsCollapsed: function(t) {
                var e, n, r;
                if (null != t)
                  return (n = i(t)), (r = n[0]), (e = n[1]), o(r, e);
              },
              rangesAreEqual: function(t, e) {
                var n, r, s, a, u, c;
                if (null != t && null != e)
                  return (
                    (s = i(t)),
                    (r = s[0]),
                    (n = s[1]),
                    (a = i(e)),
                    (c = a[0]),
                    (u = a[1]),
                    o(r, c) && o(n, u)
                  );
              }
            }),
            (n = function(e) {
              return "number" == typeof e ? e : t(e);
            }),
            (o = function(t, e) {
              return "number" == typeof t ? t === e : r(t, e);
            });
        }.call(this),
        function() {
          var t, n, i, r, o;
          (e.registerElement = function(t, e) {
            var s, a;
            return (
              null == e && (e = {}),
              (t = t.toLowerCase()),
              (e = o(e)),
              (a = r(e)),
              (s = a.defaultCSS) && (delete a.defaultCSS, n(s, t)),
              i(t, a)
            );
          }),
            (n = function(e, n) {
              var i;
              return (i = t(n)), (i.textContent = e.replace(/%t/g, n));
            }),
            (t = function(t) {
              var e;
              return (
                (e = document.createElement("style")),
                e.setAttribute("type", "text/css"),
                e.setAttribute("data-tag-name", t.toLowerCase()),
                document.head.insertBefore(e, document.head.firstChild),
                e
              );
            }),
            (r = function(t) {
              var e, n, i;
              n = {};
              for (e in t)
                (i = t[e]), (n[e] = "function" == typeof i ? { value: i } : i);
              return n;
            }),
            (o = (function() {
              var t;
              return (
                (t = function(t) {
                  var e, n, i, r, o;
                  for (
                    e = {},
                      o = ["initialize", "connect", "disconnect"],
                      n = 0,
                      r = o.length;
                    r > n;
                    n++
                  )
                    (i = o[n]), (e[i] = t[i]), delete t[i];
                  return e;
                }),
                window.customElements
                  ? function(e) {
                      var n, i, r, o, s;
                      return (
                        (s = t(e)),
                        (r = s.initialize),
                        (n = s.connect),
                        (i = s.disconnect),
                        r &&
                          ((o = n),
                          (n = function() {
                            return (
                              this.initialized ||
                                ((this.initialized = !0), r.call(this)),
                              null != o ? o.call(this) : void 0
                            );
                          })),
                        n && (e.connectedCallback = n),
                        i && (e.disconnectedCallback = i),
                        e
                      );
                    }
                  : function(e) {
                      var n, i, r, o;
                      return (
                        (o = t(e)),
                        (r = o.initialize),
                        (n = o.connect),
                        (i = o.disconnect),
                        r && (e.createdCallback = r),
                        n && (e.attachedCallback = n),
                        i && (e.detachedCallback = i),
                        e
                      );
                    }
              );
            })()),
            (i = (function() {
              return window.customElements
                ? function(t, e) {
                    var n;
                    return (
                      (n = function() {
                        return "object" == typeof Reflect
                          ? Reflect.construct(HTMLElement, [], n)
                          : HTMLElement.apply(this);
                      }),
                      Object.setPrototypeOf(n.prototype, HTMLElement.prototype),
                      Object.setPrototypeOf(n, HTMLElement),
                      Object.defineProperties(n.prototype, e),
                      window.customElements.define(t, n),
                      n
                    );
                  }
                : function(t, e) {
                    var n, i;
                    return (
                      (i = Object.create(HTMLElement.prototype, e)),
                      (n = document.registerElement(t, { prototype: i })),
                      Object.defineProperty(i, "constructor", { value: n }),
                      n
                    );
                  };
            })());
        }.call(this),
        function() {
          var t, n;
          e.extend({
            getDOMSelection: function() {
              var t;
              return (t = window.getSelection()), t.rangeCount > 0 ? t : void 0;
            },
            getDOMRange: function() {
              var n, i;
              return (n =
                null != (i = e.getDOMSelection()) ? i.getRangeAt(0) : void 0) &&
                !t(n)
                ? n
                : void 0;
            },
            setDOMRange: function(t) {
              var n;
              return (
                (n = window.getSelection()),
                n.removeAllRanges(),
                n.addRange(t),
                e.selectionChangeObserver.update()
              );
            }
          }),
            (t = function(t) {
              return n(t.startContainer) || n(t.endContainer);
            }),
            (n = function(t) {
              return !Object.getPrototypeOf(t);
            });
        }.call(this),
        function() {
          var t;
          (t = { "application/x-trix-feature-detection": "test" }),
            e.extend({
              dataTransferIsPlainText: function(t) {
                var e, n, i;
                return (
                  (i = t.getData("text/plain")),
                  (n = t.getData("text/html")),
                  i && n
                    ? ((e = document.createElement("div")),
                      (e.innerHTML = n),
                      e.textContent === i
                        ? !e.querySelector(":not(meta)")
                        : void 0)
                    : null != i
                    ? i.length
                    : void 0
                );
              },
              dataTransferIsWritable: function(e) {
                var n, i;
                if (null != (null != e ? e.setData : void 0)) {
                  for (n in t)
                    if (
                      ((i = t[n]),
                      !(function() {
                        try {
                          return e.setData(n, i), e.getData(n) === i;
                        } catch (t) {}
                      })())
                    )
                      return;
                  return !0;
                }
              },
              keyEventIsKeyboardCommand: (function() {
                return /Mac|^iP/.test(navigator.platform)
                  ? function(t) {
                      return t.metaKey;
                    }
                  : function(t) {
                      return t.ctrlKey;
                    };
              })()
            });
        }.call(this),
        function() {}.call(this),
        function() {
          var t,
            n = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var r in e) i.call(e, r) && (t[r] = e[r]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            i = {}.hasOwnProperty;
          (t = e.arraysAreEqual),
            (e.Hash = (function(i) {
              function r(t) {
                null == t && (t = {}),
                  (this.values = s(t)),
                  r.__super__.constructor.apply(this, arguments);
              }
              var o, s, a, u, c;
              return (
                n(r, i),
                (r.fromCommonAttributesOfObjects = function(t) {
                  var e, n, i, r, s, a;
                  if ((null == t && (t = []), !t.length)) return new this();
                  for (
                    e = o(t[0]),
                      i = e.getKeys(),
                      a = t.slice(1),
                      n = 0,
                      r = a.length;
                    r > n;
                    n++
                  )
                    (s = a[n]),
                      (i = e.getKeysCommonToHash(o(s))),
                      (e = e.slice(i));
                  return e;
                }),
                (r.box = function(t) {
                  return o(t);
                }),
                (r.prototype.add = function(t, e) {
                  return this.merge(u(t, e));
                }),
                (r.prototype.remove = function(t) {
                  return new e.Hash(s(this.values, t));
                }),
                (r.prototype.get = function(t) {
                  return this.values[t];
                }),
                (r.prototype.has = function(t) {
                  return t in this.values;
                }),
                (r.prototype.merge = function(t) {
                  return new e.Hash(a(this.values, c(t)));
                }),
                (r.prototype.slice = function(t) {
                  var n, i, r, o;
                  for (o = {}, n = 0, r = t.length; r > n; n++)
                    (i = t[n]), this.has(i) && (o[i] = this.values[i]);
                  return new e.Hash(o);
                }),
                (r.prototype.getKeys = function() {
                  return Object.keys(this.values);
                }),
                (r.prototype.getKeysCommonToHash = function(t) {
                  var e, n, i, r, s;
                  for (
                    t = o(t), r = this.getKeys(), s = [], e = 0, i = r.length;
                    i > e;
                    e++
                  )
                    (n = r[e]), this.values[n] === t.values[n] && s.push(n);
                  return s;
                }),
                (r.prototype.isEqualTo = function(e) {
                  return t(this.toArray(), o(e).toArray());
                }),
                (r.prototype.isEmpty = function() {
                  return 0 === this.getKeys().length;
                }),
                (r.prototype.toArray = function() {
                  var t, e, n;
                  return (null != this.array
                    ? this.array
                    : (this.array = function() {
                        var i;
                        (e = []), (i = this.values);
                        for (t in i) (n = i[t]), e.push(t, n);
                        return e;
                      }.call(this))
                  ).slice(0);
                }),
                (r.prototype.toObject = function() {
                  return s(this.values);
                }),
                (r.prototype.toJSON = function() {
                  return this.toObject();
                }),
                (r.prototype.contentsForInspection = function() {
                  return { values: JSON.stringify(this.values) };
                }),
                (u = function(t, e) {
                  var n;
                  return (n = {}), (n[t] = e), n;
                }),
                (a = function(t, e) {
                  var n, i, r;
                  i = s(t);
                  for (n in e) (r = e[n]), (i[n] = r);
                  return i;
                }),
                (s = function(t, e) {
                  var n, i, r, o, s;
                  for (
                    o = {}, s = Object.keys(t).sort(), n = 0, r = s.length;
                    r > n;
                    n++
                  )
                    (i = s[n]), i !== e && (o[i] = t[i]);
                  return o;
                }),
                (o = function(t) {
                  return t instanceof e.Hash ? t : new e.Hash(t);
                }),
                (c = function(t) {
                  return t instanceof e.Hash ? t.values : t;
                }),
                r
              );
            })(e.Object));
        }.call(this),
        function() {
          e.ObjectGroup = (function() {
            function t(t, e) {
              var n, i;
              (this.objects = null != t ? t : []),
                (i = e.depth),
                (n = e.asTree),
                n &&
                  ((this.depth = i),
                  (this.objects = this.constructor.groupObjects(this.objects, {
                    asTree: n,
                    depth: this.depth + 1
                  })));
            }
            return (
              (t.groupObjects = function(t, e) {
                var n, i, r, o, s, a, u, c, l;
                for (
                  null == t && (t = []),
                    l = null != e ? e : {},
                    r = l.depth,
                    n = l.asTree,
                    n && null == r && (r = 0),
                    c = [],
                    s = 0,
                    a = t.length;
                  a > s;
                  s++
                ) {
                  if (((u = t[s]), o)) {
                    if (
                      ("function" == typeof u.canBeGrouped
                        ? u.canBeGrouped(r)
                        : void 0) &&
                      ("function" ==
                      typeof (i = o[o.length - 1]).canBeGroupedWith
                        ? i.canBeGroupedWith(u, r)
                        : void 0)
                    ) {
                      o.push(u);
                      continue;
                    }
                    c.push(new this(o, { depth: r, asTree: n })), (o = null);
                  }
                  ("function" == typeof u.canBeGrouped
                  ? u.canBeGrouped(r)
                  : void 0)
                    ? (o = [u])
                    : c.push(u);
                }
                return o && c.push(new this(o, { depth: r, asTree: n })), c;
              }),
              (t.prototype.getObjects = function() {
                return this.objects;
              }),
              (t.prototype.getDepth = function() {
                return this.depth;
              }),
              (t.prototype.getCacheKey = function() {
                var t, e, n, i, r;
                for (
                  e = ["objectGroup"],
                    r = this.getObjects(),
                    t = 0,
                    n = r.length;
                  n > t;
                  t++
                )
                  (i = r[t]), e.push(i.getCacheKey());
                return e.join("/");
              }),
              t
            );
          })();
        }.call(this),
        function() {
          var t = function(t, e) {
              function i() {
                this.constructor = t;
              }
              for (var r in e) n.call(e, r) && (t[r] = e[r]);
              return (
                (i.prototype = e.prototype),
                (t.prototype = new i()),
                (t.__super__ = e.prototype),
                t
              );
            },
            n = {}.hasOwnProperty;
          e.ObjectMap = (function(e) {
            function n(t) {
              var e, n, i, r, o;
              for (
                null == t && (t = []), this.objects = {}, i = 0, r = t.length;
                r > i;
                i++
              )
                (o = t[i]),
                  (n = JSON.stringify(o)),
                  null == (e = this.objects)[n] && (e[n] = o);
            }
            return (
              t(n, e),
              (n.prototype.find = function(t) {
                var e;
                return (e = JSON.stringify(t)), this.objects[e];
              }),
              n
            );
          })(e.BasicObject);
        }.call(this),
        function() {
          e.ElementStore = (function() {
            function t(t) {
              this.reset(t);
            }
            var e;
            return (
              (t.prototype.add = function(t) {
                var n;
                return (n = e(t)), (this.elements[n] = t);
              }),
              (t.prototype.remove = function(t) {
                var n, i;
                return (
                  (n = e(t)),
                  (i = this.elements[n]) ? (delete this.elements[n], i) : void 0
                );
              }),
              (t.prototype.reset = function(t) {
                var e, n, i;
                for (
                  null == t && (t = []),
                    this.elements = {},
                    n = 0,
                    i = t.length;
                  i > n;
                  n++
                )
                  (e = t[n]), this.add(e);
                return t;
              }),
              (e = function(t) {
                return t.dataset.trixStoreKey;
              }),
              t
            );
          })();
        }.call(this),
        function() {}.call(this),
        function() {
          var t = function(t, e) {
              function i() {
                this.constructor = t;
              }
              for (var r in e) n.call(e, r) && (t[r] = e[r]);
              return (
                (i.prototype = e.prototype),
                (t.prototype = new i()),
                (t.__super__ = e.prototype),
                t
              );
            },
            n = {}.hasOwnProperty;
          e.Operation = (function(e) {
            function n() {
              return n.__super__.constructor.apply(this, arguments);
            }
            return (
              t(n, e),
              (n.prototype.isPerforming = function() {
                return this.performing === !0;
              }),
              (n.prototype.hasPerformed = function() {
                return this.performed === !0;
              }),
              (n.prototype.hasSucceeded = function() {
                return this.performed && this.succeeded;
              }),
              (n.prototype.hasFailed = function() {
                return this.performed && !this.succeeded;
              }),
              (n.prototype.getPromise = function() {
                return null != this.promise
                  ? this.promise
                  : (this.promise = new Promise(
                      (function(t) {
                        return function(e, n) {
                          return (
                            (t.performing = !0),
                            t.perform(function(i, r) {
                              return (
                                (t.succeeded = i),
                                (t.performing = !1),
                                (t.performed = !0),
                                t.succeeded ? e(r) : n(r)
                              );
                            })
                          );
                        };
                      })(this)
                    ));
              }),
              (n.prototype.perform = function(t) {
                return t(!1);
              }),
              (n.prototype.release = function() {
                var t;
                return (
                  null != (t = this.promise) &&
                    "function" == typeof t.cancel &&
                    t.cancel(),
                  (this.promise = null),
                  (this.performing = null),
                  (this.performed = null),
                  (this.succeeded = null)
                );
              }),
              n.proxyMethod("getPromise().then"),
              n.proxyMethod("getPromise().catch"),
              n
            );
          })(e.BasicObject);
        }.call(this),
        function() {
          var t,
            n,
            i,
            r,
            o,
            s = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) a.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            a = {}.hasOwnProperty;
          (e.UTF16String = (function(t) {
            function e(t, e) {
              (this.ucs2String = t),
                (this.codepoints = e),
                (this.length = this.codepoints.length),
                (this.ucs2Length = this.ucs2String.length);
            }
            return (
              s(e, t),
              (e.box = function(t) {
                return (
                  null == t && (t = ""),
                  t instanceof this
                    ? t
                    : this.fromUCS2String(null != t ? t.toString() : void 0)
                );
              }),
              (e.fromUCS2String = function(t) {
                return new this(t, r(t));
              }),
              (e.fromCodepoints = function(t) {
                return new this(o(t), t);
              }),
              (e.prototype.offsetToUCS2Offset = function(t) {
                return o(this.codepoints.slice(0, Math.max(0, t))).length;
              }),
              (e.prototype.offsetFromUCS2Offset = function(t) {
                return r(this.ucs2String.slice(0, Math.max(0, t))).length;
              }),
              (e.prototype.slice = function() {
                var t;
                return this.constructor.fromCodepoints(
                  (t = this.codepoints).slice.apply(t, arguments)
                );
              }),
              (e.prototype.charAt = function(t) {
                return this.slice(t, t + 1);
              }),
              (e.prototype.isEqualTo = function(t) {
                return this.constructor.box(t).ucs2String === this.ucs2String;
              }),
              (e.prototype.toJSON = function() {
                return this.ucs2String;
              }),
              (e.prototype.getCacheKey = function() {
                return this.ucs2String;
              }),
              (e.prototype.toString = function() {
                return this.ucs2String;
              }),
              e
            );
          })(e.BasicObject)),
            (t =
              1 ===
              ("function" == typeof Array.from
                ? Array.from("\ud83d\udc7c").length
                : void 0)),
            (n =
              null !=
              ("function" == typeof " ".codePointAt
                ? " ".codePointAt(0)
                : void 0)),
            (i =
              " \ud83d\udc7c" ===
              ("function" == typeof String.fromCodePoint
                ? String.fromCodePoint(32, 128124)
                : void 0)),
            (r =
              t && n
                ? function(t) {
                    return Array.from(t).map(function(t) {
                      return t.codePointAt(0);
                    });
                  }
                : function(t) {
                    var e, n, i, r, o;
                    for (r = [], e = 0, i = t.length; i > e; )
                      (o = t.charCodeAt(e++)),
                        o >= 55296 &&
                          56319 >= o &&
                          i > e &&
                          ((n = t.charCodeAt(e++)),
                          56320 === (64512 & n)
                            ? (o = ((1023 & o) << 10) + (1023 & n) + 65536)
                            : e--),
                        r.push(o);
                    return r;
                  }),
            (o = i
              ? function(t) {
                  return String.fromCodePoint.apply(String, t);
                }
              : function(t) {
                  var e, n, i;
                  return (
                    (e = (function() {
                      var e, r, o;
                      for (o = [], e = 0, r = t.length; r > e; e++)
                        (i = t[e]),
                          (n = ""),
                          i > 65535 &&
                            ((i -= 65536),
                            (n += String.fromCharCode(
                              ((i >>> 10) & 1023) | 55296
                            )),
                            (i = 56320 | (1023 & i))),
                          o.push(n + String.fromCharCode(i));
                      return o;
                    })()),
                    e.join("")
                  );
                });
        }.call(this),
        function() {}.call(this),
        function() {}.call(this),
        function() {
          e.config.lang = {
            attachFiles: "Attach Files",
            bold: "Bold",
            bullets: "Bullets",
            byte: "Byte",
            bytes: "Bytes",
            captionPlaceholder: "Add a caption\u2026",
            code: "Code",
            heading1: "Heading",
            indent: "Increase Level",
            italic: "Italic",
            link: "Link",
            numbers: "Numbers",
            outdent: "Decrease Level",
            quote: "Quote",
            redo: "Redo",
            remove: "Remove",
            strike: "Strikethrough",
            undo: "Undo",
            unlink: "Unlink",
            url: "URL",
            urlPlaceholder: "Enter a URL\u2026",
            GB: "GB",
            KB: "KB",
            MB: "MB",
            PB: "PB",
            TB: "TB"
          };
        }.call(this),
        function() {
          e.config.css = {
            attachment: "attachment",
            attachmentCaption: "attachment__caption",
            attachmentCaptionEditor: "attachment__caption-editor",
            attachmentMetadata: "attachment__metadata",
            attachmentMetadataContainer: "attachment__metadata-container",
            attachmentName: "attachment__name",
            attachmentProgress: "attachment__progress",
            attachmentSize: "attachment__size",
            attachmentToolbar: "attachment__toolbar",
            attachmentGallery: "attachment-gallery"
          };
        }.call(this),
        function() {
          var t;
          e.config.blockAttributes = t = {
            default: { tagName: "div", parse: !1 },
            quote: { tagName: "blockquote", nestable: !0 },
            heading1: {
              tagName: "h1",
              terminal: !0,
              breakOnReturn: !0,
              group: !1
            },
            code: { tagName: "pre", terminal: !0, text: { plaintext: !0 } },
            bulletList: { tagName: "ul", parse: !1 },
            bullet: {
              tagName: "li",
              listAttribute: "bulletList",
              group: !1,
              nestable: !0,
              test: function(n) {
                return (
                  e.tagName(n.parentNode) === t[this.listAttribute].tagName
                );
              }
            },
            numberList: { tagName: "ol", parse: !1 },
            number: {
              tagName: "li",
              listAttribute: "numberList",
              group: !1,
              nestable: !0,
              test: function(n) {
                return (
                  e.tagName(n.parentNode) === t[this.listAttribute].tagName
                );
              }
            },
            attachmentGallery: {
              tagName: "div",
              exclusive: !0,
              terminal: !0,
              parse: !1,
              group: !1
            }
          };
        }.call(this),
        function() {
          var t, n;
          (t = e.config.lang),
            (n = [t.bytes, t.KB, t.MB, t.GB, t.TB, t.PB]),
            (e.config.fileSize = {
              prefix: "IEC",
              precision: 2,
              formatter: function(e) {
                var i, r, o, s, a;
                switch (e) {
                  case 0:
                    return "0 " + t.bytes;
                  case 1:
                    return "1 " + t.byte;
                  default:
                    return (
                      (i = function() {
                        switch (this.prefix) {
                          case "SI":
                            return 1e3;
                          case "IEC":
                            return 1024;
                        }
                      }.call(this)),
                      (r = Math.floor(Math.log(e) / Math.log(i))),
                      (o = e / Math.pow(i, r)),
                      (s = o.toFixed(this.precision)),
                      (a = s.replace(/0*$/, "").replace(/\.$/, "")),
                      a + " " + n[r]
                    );
                }
              }
            });
        }.call(this),
        function() {
          e.config.textAttributes = {
            bold: {
              tagName: "strong",
              inheritable: !0,
              parser: function(t) {
                var e;
                return (
                  (e = window.getComputedStyle(t)),
                  "bold" === e.fontWeight || e.fontWeight >= 600
                );
              }
            },
            italic: {
              tagName: "em",
              inheritable: !0,
              parser: function(t) {
                var e;
                return (
                  (e = window.getComputedStyle(t)), "italic" === e.fontStyle
                );
              }
            },
            href: {
              groupTagName: "a",
              parser: function(t) {
                var n, i, r;
                return (
                  (n = e.AttachmentView.attachmentSelector),
                  (r = "a:not(" + n + ")"),
                  (i = e.findClosestElementFromNode(t, { matchingSelector: r }))
                    ? i.getAttribute("href")
                    : void 0
                );
              }
            },
            strike: { tagName: "del", inheritable: !0 },
            frozen: { style: { backgroundColor: "highlight" } }
          };
        }.call(this),
        function() {
          var t, n, i, r, o;
          (o = "[data-trix-serialize=false]"),
            (r = [
              "contenteditable",
              "data-trix-id",
              "data-trix-store-key",
              "data-trix-mutable",
              "data-trix-placeholder",
              "tabindex"
            ]),
            (n = "data-trix-serialized-attributes"),
            (i = "[" + n + "]"),
            (t = new RegExp("<!--block-->", "g")),
            e.extend({
              serializers: {
                "application/json": function(t) {
                  var n;
                  if (t instanceof e.Document) n = t;
                  else {
                    if (!(t instanceof HTMLElement))
                      throw new Error("unserializable object");
                    n = e.Document.fromHTML(t.innerHTML);
                  }
                  return n.toSerializableDocument().toJSONString();
                },
                "text/html": function(s) {
                  var a, u, c, l, h, p, d, f, g, m, y, v, b, A, x, C, S;
                  if (s instanceof e.Document) l = e.DocumentView.render(s);
                  else {
                    if (!(s instanceof HTMLElement))
                      throw new Error("unserializable object");
                    l = s.cloneNode(!0);
                  }
                  for (
                    A = l.querySelectorAll(o), h = 0, g = A.length;
                    g > h;
                    h++
                  )
                    (c = A[h]), e.removeNode(c);
                  for (p = 0, m = r.length; m > p; p++)
                    for (
                      a = r[p],
                        x = l.querySelectorAll("[" + a + "]"),
                        d = 0,
                        y = x.length;
                      y > d;
                      d++
                    )
                      (c = x[d]), c.removeAttribute(a);
                  for (
                    C = l.querySelectorAll(i), f = 0, v = C.length;
                    v > f;
                    f++
                  ) {
                    c = C[f];
                    try {
                      (u = JSON.parse(c.getAttribute(n))), c.removeAttribute(n);
                      for (b in u) (S = u[b]), c.setAttribute(b, S);
                    } catch (R) {}
                  }
                  return l.innerHTML.replace(t, "");
                }
              },
              deserializers: {
                "application/json": function(t) {
                  return e.Document.fromJSONString(t);
                },
                "text/html": function(t) {
                  return e.Document.fromHTML(t);
                }
              },
              serializeToContentType: function(t, n) {
                var i;
                if ((i = e.serializers[n])) return i(t);
                throw new Error("unknown content type: " + n);
              },
              deserializeFromContentType: function(t, n) {
                var i;
                if ((i = e.deserializers[n])) return i(t);
                throw new Error("unknown content type: " + n);
              }
            });
        }.call(this),
        function() {
          var t;
          (t = e.config.lang),
            (e.config.toolbar = {
              getDefaultHTML: function() {
                return (
                  '<div class="trix-button-row">\n  <span class="trix-button-group trix-button-group--text-tools" data-trix-button-group="text-tools">\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-bold" data-trix-attribute="bold" data-trix-key="b" title="' +
                  t.bold +
                  '" tabindex="-1">' +
                  t.bold +
                  '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-italic" data-trix-attribute="italic" data-trix-key="i" title="' +
                  t.italic +
                  '" tabindex="-1">' +
                  t.italic +
                  '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-strike" data-trix-attribute="strike" title="' +
                  t.strike +
                  '" tabindex="-1">' +
                  t.strike +
                  '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-link" data-trix-attribute="href" data-trix-action="link" data-trix-key="k" title="' +
                  t.link +
                  '" tabindex="-1">' +
                  t.link +
                  '</button>\n  </span>\n\n  <span class="trix-button-group trix-button-group--block-tools" data-trix-button-group="block-tools">\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-heading-1" data-trix-attribute="heading1" title="' +
                  t.heading1 +
                  '" tabindex="-1">' +
                  t.heading1 +
                  '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-quote" data-trix-attribute="quote" title="' +
                  t.quote +
                  '" tabindex="-1">' +
                  t.quote +
                  '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-code" data-trix-attribute="code" title="' +
                  t.code +
                  '" tabindex="-1">' +
                  t.code +
                  '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-bullet-list" data-trix-attribute="bullet" title="' +
                  t.bullets +
                  '" tabindex="-1">' +
                  t.bullets +
                  '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-number-list" data-trix-attribute="number" title="' +
                  t.numbers +
                  '" tabindex="-1">' +
                  t.numbers +
                  '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-decrease-nesting-level" data-trix-action="decreaseNestingLevel" title="' +
                  t.outdent +
                  '" tabindex="-1">' +
                  t.outdent +
                  '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-increase-nesting-level" data-trix-action="increaseNestingLevel" title="' +
                  t.indent +
                  '" tabindex="-1">' +
                  t.indent +
                  '</button>\n  </span>\n\n  <span class="trix-button-group trix-button-group--file-tools" data-trix-button-group="file-tools">\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-attach" data-trix-action="attachFiles" title="' +
                  t.attachFiles +
                  '" tabindex="-1">' +
                  t.attachFiles +
                  '</button>\n  </span>\n\n  <span class="trix-button-group-spacer"></span>\n\n  <span class="trix-button-group trix-button-group--history-tools" data-trix-button-group="history-tools">\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-undo" data-trix-action="undo" data-trix-key="z" title="' +
                  t.undo +
                  '" tabindex="-1">' +
                  t.undo +
                  '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-redo" data-trix-action="redo" data-trix-key="shift+z" title="' +
                  t.redo +
                  '" tabindex="-1">' +
                  t.redo +
                  '</button>\n  </span>\n</div>\n\n<div class="trix-dialogs" data-trix-dialogs>\n  <div class="trix-dialog trix-dialog--link" data-trix-dialog="href" data-trix-dialog-attribute="href">\n    <div class="trix-dialog__link-fields">\n      <input type="url" name="href" class="trix-input trix-input--dialog" placeholder="' +
                  t.urlPlaceholder +
                  '" aria-label="' +
                  t.url +
                  '" required data-trix-input>\n      <div class="trix-button-group">\n        <input type="button" class="trix-button trix-button--dialog" value="' +
                  t.link +
                  '" data-trix-method="setAttribute">\n        <input type="button" class="trix-button trix-button--dialog" value="' +
                  t.unlink +
                  '" data-trix-method="removeAttribute">\n      </div>\n    </div>\n  </div>\n</div>'
                );
              }
            });
        }.call(this),
        function() {
          e.config.undoInterval = 5e3;
        }.call(this),
        function() {
          e.config.attachments = {
            preview: {
              presentation: "gallery",
              caption: { name: !0, size: !0 }
            },
            file: { caption: { size: !0 } }
          };
        }.call(this),
        function() {
          e.config.keyNames = {
            8: "backspace",
            9: "tab",
            13: "return",
            27: "escape",
            37: "left",
            39: "right",
            46: "delete",
            68: "d",
            72: "h",
            79: "o"
          };
        }.call(this),
        function() {
          e.config.input = {
            level2Enabled: !0,
            getLevel: function() {
              return this.level2Enabled && e.browser.supportsInputEvents
                ? 2
                : 0;
            },
            pickFiles: function(t) {
              var n;
              return (
                (n = e.makeElement("input", {
                  type: "file",
                  multiple: !0,
                  hidden: !0,
                  id: this.fileInputId
                })),
                n.addEventListener("change", function() {
                  return t(n.files), e.removeNode(n);
                }),
                e.removeNode(document.getElementById(this.fileInputId)),
                document.body.appendChild(n),
                n.click()
              );
            },
            fileInputId: "trix-file-input-" + Date.now().toString(16)
          };
        }.call(this),
        function() {}.call(this),
        function() {
          e.registerElement("trix-toolbar", {
            defaultCSS:
              "%t {\n  display: block;\n}\n\n%t {\n  white-space: nowrap;\n}\n\n%t [data-trix-dialog] {\n  display: none;\n}\n\n%t [data-trix-dialog][data-trix-active] {\n  display: block;\n}\n\n%t [data-trix-dialog] [data-trix-validate]:invalid {\n  background-color: #ffdddd;\n}",
            initialize: function() {
              return "" === this.innerHTML
                ? (this.innerHTML = e.config.toolbar.getDefaultHTML())
                : void 0;
            }
          });
        }.call(this),
        function() {
          var t = function(t, e) {
              function i() {
                this.constructor = t;
              }
              for (var r in e) n.call(e, r) && (t[r] = e[r]);
              return (
                (i.prototype = e.prototype),
                (t.prototype = new i()),
                (t.__super__ = e.prototype),
                t
              );
            },
            n = {}.hasOwnProperty,
            i =
              [].indexOf ||
              function(t) {
                for (var e = 0, n = this.length; n > e; e++)
                  if (e in this && this[e] === t) return e;
                return -1;
              };
          e.ObjectView = (function(n) {
            function r(t, e) {
              (this.object = t),
                (this.options = null != e ? e : {}),
                (this.childViews = []),
                (this.rootView = this);
            }
            return (
              t(r, n),
              (r.prototype.getNodes = function() {
                var t, e, n, i, r;
                for (
                  null == this.nodes && (this.nodes = this.createNodes()),
                    i = this.nodes,
                    r = [],
                    t = 0,
                    e = i.length;
                  e > t;
                  t++
                )
                  (n = i[t]), r.push(n.cloneNode(!0));
                return r;
              }),
              (r.prototype.invalidate = function() {
                var t;
                return (
                  (this.nodes = null),
                  (this.childViews = []),
                  null != (t = this.parentView) ? t.invalidate() : void 0
                );
              }),
              (r.prototype.invalidateViewForObject = function(t) {
                var e;
                return null != (e = this.findViewForObject(t))
                  ? e.invalidate()
                  : void 0;
              }),
              (r.prototype.findOrCreateCachedChildView = function(t, e) {
                var n;
                return (
                  (n = this.getCachedViewForObject(e))
                    ? this.recordChildView(n)
                    : ((n = this.createChildView.apply(this, arguments)),
                      this.cacheViewForObject(n, e)),
                  n
                );
              }),
              (r.prototype.createChildView = function(t, n, i) {
                var r;
                return (
                  null == i && (i = {}),
                  n instanceof e.ObjectGroup &&
                    ((i.viewClass = t), (t = e.ObjectGroupView)),
                  (r = new t(n, i)),
                  this.recordChildView(r)
                );
              }),
              (r.prototype.recordChildView = function(t) {
                return (
                  (t.parentView = this),
                  (t.rootView = this.rootView),
                  this.childViews.push(t),
                  t
                );
              }),
              (r.prototype.getAllChildViews = function() {
                var t, e, n, i, r;
                for (
                  r = [], i = this.childViews, e = 0, n = i.length;
                  n > e;
                  e++
                )
                  (t = i[e]), r.push(t), (r = r.concat(t.getAllChildViews()));
                return r;
              }),
              (r.prototype.findElement = function() {
                return this.findElementForObject(this.object);
              }),
              (r.prototype.findElementForObject = function(t) {
                var e;
                return (e = null != t ? t.id : void 0)
                  ? this.rootView.element.querySelector(
                      "[data-trix-id='" + e + "']"
                    )
                  : void 0;
              }),
              (r.prototype.findViewForObject = function(t) {
                var e, n, i, r;
                for (
                  i = this.getAllChildViews(), e = 0, n = i.length;
                  n > e;
                  e++
                )
                  if (((r = i[e]), r.object === t)) return r;
              }),
              (r.prototype.getViewCache = function() {
                return this.rootView !== this
                  ? this.rootView.getViewCache()
                  : this.isViewCachingEnabled()
                  ? null != this.viewCache
                    ? this.viewCache
                    : (this.viewCache = {})
                  : void 0;
              }),
              (r.prototype.isViewCachingEnabled = function() {
                return this.shouldCacheViews !== !1;
              }),
              (r.prototype.enableViewCaching = function() {
                return (this.shouldCacheViews = !0);
              }),
              (r.prototype.disableViewCaching = function() {
                return (this.shouldCacheViews = !1);
              }),
              (r.prototype.getCachedViewForObject = function(t) {
                var e;
                return null != (e = this.getViewCache())
                  ? e[t.getCacheKey()]
                  : void 0;
              }),
              (r.prototype.cacheViewForObject = function(t, e) {
                var n;
                return null != (n = this.getViewCache())
                  ? (n[e.getCacheKey()] = t)
                  : void 0;
              }),
              (r.prototype.garbageCollectCachedViews = function() {
                var t, e, n, r, o, s;
                if ((t = this.getViewCache())) {
                  (s = this.getAllChildViews().concat(this)),
                    (n = (function() {
                      var t, e, n;
                      for (n = [], t = 0, e = s.length; e > t; t++)
                        (o = s[t]), n.push(o.object.getCacheKey());
                      return n;
                    })()),
                    (r = []);
                  for (e in t) i.call(n, e) < 0 && r.push(delete t[e]);
                  return r;
                }
              }),
              r
            );
          })(e.BasicObject);
        }.call(this),
        function() {
          var t = function(t, e) {
              function i() {
                this.constructor = t;
              }
              for (var r in e) n.call(e, r) && (t[r] = e[r]);
              return (
                (i.prototype = e.prototype),
                (t.prototype = new i()),
                (t.__super__ = e.prototype),
                t
              );
            },
            n = {}.hasOwnProperty;
          e.ObjectGroupView = (function(e) {
            function n() {
              n.__super__.constructor.apply(this, arguments),
                (this.objectGroup = this.object),
                (this.viewClass = this.options.viewClass),
                delete this.options.viewClass;
            }
            return (
              t(n, e),
              (n.prototype.getChildViews = function() {
                var t, e, n, i;
                if (!this.childViews.length)
                  for (
                    i = this.objectGroup.getObjects(), t = 0, e = i.length;
                    e > t;
                    t++
                  )
                    (n = i[t]),
                      this.findOrCreateCachedChildView(
                        this.viewClass,
                        n,
                        this.options
                      );
                return this.childViews;
              }),
              (n.prototype.createNodes = function() {
                var t, e, n, i, r, o, s, a, u;
                for (
                  t = this.createContainerElement(),
                    s = this.getChildViews(),
                    e = 0,
                    i = s.length;
                  i > e;
                  e++
                )
                  for (
                    u = s[e], a = u.getNodes(), n = 0, r = a.length;
                    r > n;
                    n++
                  )
                    (o = a[n]), t.appendChild(o);
                return [t];
              }),
              (n.prototype.createContainerElement = function(t) {
                return (
                  null == t && (t = this.objectGroup.getDepth()),
                  this.getChildViews()[0].createContainerElement(t)
                );
              }),
              n
            );
          })(e.ObjectView);
        }.call(this),
        function() {
          var t = function(t, e) {
              function i() {
                this.constructor = t;
              }
              for (var r in e) n.call(e, r) && (t[r] = e[r]);
              return (
                (i.prototype = e.prototype),
                (t.prototype = new i()),
                (t.__super__ = e.prototype),
                t
              );
            },
            n = {}.hasOwnProperty;
          e.Controller = (function(e) {
            function n() {
              return n.__super__.constructor.apply(this, arguments);
            }
            return t(n, e), n;
          })(e.BasicObject);
        }.call(this),
        function() {
          var t,
            n,
            i,
            r,
            o,
            s,
            a = function(t, e) {
              return function() {
                return t.apply(e, arguments);
              };
            },
            u = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) c.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            c = {}.hasOwnProperty,
            l =
              [].indexOf ||
              function(t) {
                for (var e = 0, n = this.length; n > e; e++)
                  if (e in this && this[e] === t) return e;
                return -1;
              };
          (t = e.findClosestElementFromNode),
            (i = e.nodeIsEmptyTextNode),
            (n = e.nodeIsBlockStartComment),
            (r = e.normalizeSpaces),
            (o = e.summarizeStringChange),
            (s = e.tagName),
            (e.MutationObserver = (function(e) {
              function c(t) {
                (this.element = t),
                  (this.didMutate = a(this.didMutate, this)),
                  (this.observer = new window.MutationObserver(this.didMutate)),
                  this.start();
              }
              var h, p, d, f;
              return (
                u(c, e),
                (p = "data-trix-mutable"),
                (d = "[" + p + "]"),
                (f = {
                  attributes: !0,
                  childList: !0,
                  characterData: !0,
                  characterDataOldValue: !0,
                  subtree: !0
                }),
                (c.prototype.start = function() {
                  return this.reset(), this.observer.observe(this.element, f);
                }),
                (c.prototype.stop = function() {
                  return this.observer.disconnect();
                }),
                (c.prototype.didMutate = function(t) {
                  var e, n;
                  return (
                    (e = this.mutations).push.apply(
                      e,
                      this.findSignificantMutations(t)
                    ),
                    this.mutations.length
                      ? (null != (n = this.delegate) &&
                          "function" == typeof n.elementDidMutate &&
                          n.elementDidMutate(this.getMutationSummary()),
                        this.reset())
                      : void 0
                  );
                }),
                (c.prototype.reset = function() {
                  return (this.mutations = []);
                }),
                (c.prototype.findSignificantMutations = function(t) {
                  var e, n, i, r;
                  for (r = [], e = 0, n = t.length; n > e; e++)
                    (i = t[e]), this.mutationIsSignificant(i) && r.push(i);
                  return r;
                }),
                (c.prototype.mutationIsSignificant = function(t) {
                  var e, n, i, r;
                  if (this.nodeIsMutable(t.target)) return !1;
                  for (
                    r = this.nodesModifiedByMutation(t), e = 0, n = r.length;
                    n > e;
                    e++
                  )
                    if (((i = r[e]), this.nodeIsSignificant(i))) return !0;
                  return !1;
                }),
                (c.prototype.nodeIsSignificant = function(t) {
                  return t !== this.element && !this.nodeIsMutable(t) && !i(t);
                }),
                (c.prototype.nodeIsMutable = function(e) {
                  return t(e, { matchingSelector: d });
                }),
                (c.prototype.nodesModifiedByMutation = function(t) {
                  var e;
                  switch (((e = []), t.type)) {
                    case "attributes":
                      t.attributeName !== p && e.push(t.target);
                      break;
                    case "characterData":
                      e.push(t.target.parentNode), e.push(t.target);
                      break;
                    case "childList":
                      e.push.apply(e, t.addedNodes),
                        e.push.apply(e, t.removedNodes);
                  }
                  return e;
                }),
                (c.prototype.getMutationSummary = function() {
                  return this.getTextMutationSummary();
                }),
                (c.prototype.getTextMutationSummary = function() {
                  var t, e, n, i, r, o, s, a, u, c, h;
                  for (
                    a = this.getTextChangesFromCharacterData(),
                      n = a.additions,
                      r = a.deletions,
                      h = this.getTextChangesFromChildList(),
                      u = h.additions,
                      o = 0,
                      s = u.length;
                    s > o;
                    o++
                  )
                    (e = u[o]), l.call(n, e) < 0 && n.push(e);
                  return (
                    r.push.apply(r, h.deletions),
                    (c = {}),
                    (t = n.join("")) && (c.textAdded = t),
                    (i = r.join("")) && (c.textDeleted = i),
                    c
                  );
                }),
                (c.prototype.getMutationsByType = function(t) {
                  var e, n, i, r, o;
                  for (
                    r = this.mutations, o = [], e = 0, n = r.length;
                    n > e;
                    e++
                  )
                    (i = r[e]), i.type === t && o.push(i);
                  return o;
                }),
                (c.prototype.getTextChangesFromChildList = function() {
                  var t, e, i, o, s, a, u, c, l, p, d;
                  for (
                    t = [],
                      u = [],
                      a = this.getMutationsByType("childList"),
                      e = 0,
                      o = a.length;
                    o > e;
                    e++
                  )
                    (s = a[e]),
                      t.push.apply(t, s.addedNodes),
                      u.push.apply(u, s.removedNodes);
                  return (
                    (c = 0 === t.length && 1 === u.length && n(u[0])),
                    c ? ((p = []), (d = ["\n"])) : ((p = h(t)), (d = h(u))),
                    {
                      additions: (function() {
                        var t, e, n;
                        for (n = [], i = t = 0, e = p.length; e > t; i = ++t)
                          (l = p[i]), l !== d[i] && n.push(r(l));
                        return n;
                      })(),
                      deletions: (function() {
                        var t, e, n;
                        for (n = [], i = t = 0, e = d.length; e > t; i = ++t)
                          (l = d[i]), l !== p[i] && n.push(r(l));
                        return n;
                      })()
                    }
                  );
                }),
                (c.prototype.getTextChangesFromCharacterData = function() {
                  var t, e, n, i, s, a, u, c;
                  return (
                    (e = this.getMutationsByType("characterData")),
                    e.length &&
                      ((c = e[0]),
                      (n = e[e.length - 1]),
                      (s = r(c.oldValue)),
                      (i = r(n.target.data)),
                      (a = o(s, i)),
                      (t = a.added),
                      (u = a.removed)),
                    { additions: t ? [t] : [], deletions: u ? [u] : [] }
                  );
                }),
                (h = function(t) {
                  var e, n, i, r;
                  for (
                    null == t && (t = []), r = [], e = 0, n = t.length;
                    n > e;
                    e++
                  )
                    switch (((i = t[e]), i.nodeType)) {
                      case Node.TEXT_NODE:
                        r.push(i.data);
                        break;
                      case Node.ELEMENT_NODE:
                        "br" === s(i)
                          ? r.push("\n")
                          : r.push.apply(r, h(i.childNodes));
                    }
                  return r;
                }),
                c
              );
            })(e.BasicObject));
        }.call(this),
        function() {
          var t = function(t, e) {
              function i() {
                this.constructor = t;
              }
              for (var r in e) n.call(e, r) && (t[r] = e[r]);
              return (
                (i.prototype = e.prototype),
                (t.prototype = new i()),
                (t.__super__ = e.prototype),
                t
              );
            },
            n = {}.hasOwnProperty;
          e.FileVerificationOperation = (function(e) {
            function n(t) {
              this.file = t;
            }
            return (
              t(n, e),
              (n.prototype.perform = function(t) {
                var e;
                return (
                  (e = new FileReader()),
                  (e.onerror = function() {
                    return t(!1);
                  }),
                  (e.onload = (function(n) {
                    return function() {
                      e.onerror = null;
                      try {
                        e.abort();
                      } catch (i) {}
                      return t(!0, n.file);
                    };
                  })(this)),
                  e.readAsArrayBuffer(this.file)
                );
              }),
              n
            );
          })(e.Operation);
        }.call(this),
        function() {
          var t,
            n,
            i = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) r.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            r = {}.hasOwnProperty;
          (t = e.handleEvent),
            (n = e.innerElementIsActive),
            (e.InputController = (function(r) {
              function o(n) {
                var i;
                (this.element = n),
                  (this.mutationObserver = new e.MutationObserver(
                    this.element
                  )),
                  (this.mutationObserver.delegate = this);
                for (i in this.events)
                  t(i, {
                    onElement: this.element,
                    withCallback: this.handlerFor(i)
                  });
              }
              return (
                i(o, r),
                (o.prototype.events = {}),
                (o.prototype.elementDidMutate = function() {}),
                (o.prototype.editorWillSyncDocumentView = function() {
                  return this.mutationObserver.stop();
                }),
                (o.prototype.editorDidSyncDocumentView = function() {
                  return this.mutationObserver.start();
                }),
                (o.prototype.requestRender = function() {
                  var t;
                  return null != (t = this.delegate) &&
                    "function" == typeof t.inputControllerDidRequestRender
                    ? t.inputControllerDidRequestRender()
                    : void 0;
                }),
                (o.prototype.requestReparse = function() {
                  var t;
                  return (
                    null != (t = this.delegate) &&
                      "function" == typeof t.inputControllerDidRequestReparse &&
                      t.inputControllerDidRequestReparse(),
                    this.requestRender()
                  );
                }),
                (o.prototype.attachFiles = function(t) {
                  var n, i;
                  return (
                    (i = (function() {
                      var i, r, o;
                      for (o = [], i = 0, r = t.length; r > i; i++)
                        (n = t[i]), o.push(new e.FileVerificationOperation(n));
                      return o;
                    })()),
                    Promise.all(i).then(
                      (function(t) {
                        return function(e) {
                          return t.handleInput(function() {
                            var t, n;
                            return (
                              null != (t = this.delegate) &&
                                t.inputControllerWillAttachFiles(),
                              null != (n = this.responder) && n.insertFiles(e),
                              this.requestRender()
                            );
                          });
                        };
                      })(this)
                    )
                  );
                }),
                (o.prototype.handlerFor = function(t) {
                  return (function(e) {
                    return function(i) {
                      return i.defaultPrevented
                        ? void 0
                        : e.handleInput(function() {
                            return n(this.element)
                              ? void 0
                              : ((this.eventName = t),
                                this.events[t].call(this, i));
                          });
                    };
                  })(this);
                }),
                (o.prototype.handleInput = function(t) {
                  var e, n;
                  try {
                    return (
                      null != (e = this.delegate) &&
                        e.inputControllerWillHandleInput(),
                      t.call(this)
                    );
                  } finally {
                    null != (n = this.delegate) &&
                      n.inputControllerDidHandleInput();
                  }
                }),
                o
              );
            })(e.BasicObject));
        }.call(this),
        function() {
          var t,
            n,
            i,
            r,
            o,
            s,
            a,
            u,
            c,
            l,
            h,
            p,
            d,
            f = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) g.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            g = {}.hasOwnProperty,
            m =
              [].indexOf ||
              function(t) {
                for (var e = 0, n = this.length; n > e; e++)
                  if (e in this && this[e] === t) return e;
                return -1;
              };
          (c = e.makeElement),
            (l = e.objectsAreEqual),
            (d = e.tagName),
            (n = e.browser),
            (a = e.keyEventIsKeyboardCommand),
            (r = e.dataTransferIsWritable),
            (i = e.dataTransferIsPlainText),
            (u = e.config.keyNames),
            (e.Level0InputController = (function(n) {
              function s() {
                s.__super__.constructor.apply(this, arguments),
                  this.resetInputSummary();
              }
              var d;
              return (
                f(s, n),
                (d = 0),
                (s.prototype.setInputSummary = function(t) {
                  var e, n;
                  null == t && (t = {}),
                    (this.inputSummary.eventName = this.eventName);
                  for (e in t) (n = t[e]), (this.inputSummary[e] = n);
                  return this.inputSummary;
                }),
                (s.prototype.resetInputSummary = function() {
                  return (this.inputSummary = {});
                }),
                (s.prototype.reset = function() {
                  return (
                    this.resetInputSummary(), e.selectionChangeObserver.reset()
                  );
                }),
                (s.prototype.elementDidMutate = function(t) {
                  var e;
                  return this.isComposing()
                    ? null != (e = this.delegate) &&
                      "function" ==
                        typeof e.inputControllerDidAllowUnhandledInput
                      ? e.inputControllerDidAllowUnhandledInput()
                      : void 0
                    : this.handleInput(function() {
                        return (
                          this.mutationIsSignificant(t) &&
                            (this.mutationIsExpected(t)
                              ? this.requestRender()
                              : this.requestReparse()),
                          this.reset()
                        );
                      });
                }),
                (s.prototype.mutationIsExpected = function(t) {
                  var e, n, i, r, o, s, a, u, c, l;
                  return (
                    (a = t.textAdded),
                    (u = t.textDeleted),
                    this.inputSummary.preferDocument
                      ? !0
                      : ((e =
                          null != a
                            ? a === this.inputSummary.textAdded
                            : !this.inputSummary.textAdded),
                        (n =
                          null != u
                            ? this.inputSummary.didDelete
                            : !this.inputSummary.didDelete),
                        (c = ("\n" === a || " \n" === a) && !e),
                        (l = "\n" === u && !n),
                        (s = (c && !l) || (l && !c)),
                        s &&
                        (r = this.getSelectedRange()) &&
                        ((i = c
                          ? a.replace(/\n$/, "").length || -1
                          : (null != a ? a.length : void 0) || 1),
                        null != (o = this.responder)
                          ? o.positionIsBlockBreak(r[1] + i)
                          : void 0)
                          ? !0
                          : e && n)
                  );
                }),
                (s.prototype.mutationIsSignificant = function(t) {
                  var e, n, i;
                  return (
                    (i = Object.keys(t).length > 0),
                    (e =
                      "" ===
                      (null != (n = this.compositionInput)
                        ? n.getEndData()
                        : void 0)),
                    i || !e
                  );
                }),
                (s.prototype.events = {
                  keydown: function(t) {
                    var n, i, r, o, s, c, l, h, p;
                    if (
                      (this.isComposing() || this.resetInputSummary(),
                      (this.inputSummary.didInput = !0),
                      (o = u[t.keyCode]))
                    ) {
                      for (
                        i = this.keys,
                          h = ["ctrl", "alt", "shift", "meta"],
                          r = 0,
                          c = h.length;
                        c > r;
                        r++
                      )
                        (l = h[r]),
                          t[l + "Key"] &&
                            ("ctrl" === l && (l = "control"),
                            (i = null != i ? i[l] : void 0));
                      null != (null != i ? i[o] : void 0) &&
                        (this.setInputSummary({ keyName: o }),
                        e.selectionChangeObserver.reset(),
                        i[o].call(this, t));
                    }
                    return a(t) &&
                      (n = String.fromCharCode(t.keyCode).toLowerCase()) &&
                      ((s = (function() {
                        var e, n, i, r;
                        for (
                          i = ["alt", "shift"], r = [], e = 0, n = i.length;
                          n > e;
                          e++
                        )
                          (l = i[e]), t[l + "Key"] && r.push(l);
                        return r;
                      })()),
                      s.push(n),
                      null != (p = this.delegate)
                        ? p.inputControllerDidReceiveKeyboardCommand(s)
                        : void 0)
                      ? t.preventDefault()
                      : void 0;
                  },
                  keypress: function(t) {
                    var e, n, i;
                    if (
                      null == this.inputSummary.eventName &&
                      !t.metaKey &&
                      (!t.ctrlKey || t.altKey)
                    )
                      return (i = p(t))
                        ? (null != (e = this.delegate) &&
                            e.inputControllerWillPerformTyping(),
                          null != (n = this.responder) && n.insertString(i),
                          this.setInputSummary({
                            textAdded: i,
                            didDelete: this.selectionIsExpanded()
                          }))
                        : void 0;
                  },
                  textInput: function(t) {
                    var e, n, i, r;
                    return (
                      (e = t.data),
                      (r = this.inputSummary.textAdded),
                      r && r !== e && r.toUpperCase() === e
                        ? ((n = this.getSelectedRange()),
                          this.setSelectedRange([n[0], n[1] + r.length]),
                          null != (i = this.responder) && i.insertString(e),
                          this.setInputSummary({ textAdded: e }),
                          this.setSelectedRange(n))
                        : void 0
                    );
                  },
                  dragenter: function(t) {
                    return t.preventDefault();
                  },
                  dragstart: function(t) {
                    var e, n;
                    return (
                      (n = t.target),
                      this.serializeSelectionToDataTransfer(t.dataTransfer),
                      (this.draggedRange = this.getSelectedRange()),
                      null != (e = this.delegate) &&
                      "function" == typeof e.inputControllerDidStartDrag
                        ? e.inputControllerDidStartDrag()
                        : void 0
                    );
                  },
                  dragover: function(t) {
                    var e, n;
                    return (!this.draggedRange &&
                      !this.canAcceptDataTransfer(t.dataTransfer)) ||
                      (t.preventDefault(),
                      (e = { x: t.clientX, y: t.clientY }),
                      l(e, this.draggingPoint))
                      ? void 0
                      : ((this.draggingPoint = e),
                        null != (n = this.delegate) &&
                        "function" ==
                          typeof n.inputControllerDidReceiveDragOverPoint
                          ? n.inputControllerDidReceiveDragOverPoint(
                              this.draggingPoint
                            )
                          : void 0);
                  },
                  dragend: function() {
                    var t;
                    return (
                      null != (t = this.delegate) &&
                        "function" == typeof t.inputControllerDidCancelDrag &&
                        t.inputControllerDidCancelDrag(),
                      (this.draggedRange = null),
                      (this.draggingPoint = null)
                    );
                  },
                  drop: function(t) {
                    var n, i, r, o, s, a, u, c, l;
                    return (
                      t.preventDefault(),
                      (r = null != (s = t.dataTransfer) ? s.files : void 0),
                      (o = { x: t.clientX, y: t.clientY }),
                      null != (a = this.responder) &&
                        a.setLocationRangeFromPointRange(o),
                      (null != r
                      ? r.length
                      : void 0)
                        ? this.attachFiles(r)
                        : this.draggedRange
                        ? (null != (u = this.delegate) &&
                            u.inputControllerWillMoveText(),
                          null != (c = this.responder) &&
                            c.moveTextFromRange(this.draggedRange),
                          (this.draggedRange = null),
                          this.requestRender())
                        : (i = t.dataTransfer.getData(
                            "application/x-trix-document"
                          )) &&
                          ((n = e.Document.fromJSONString(i)),
                          null != (l = this.responder) && l.insertDocument(n),
                          this.requestRender()),
                      (this.draggedRange = null),
                      (this.draggingPoint = null)
                    );
                  },
                  cut: function(t) {
                    var e, n;
                    return (null != (e = this.responder)
                      ? e.selectionIsExpanded()
                      : void 0) &&
                      (this.serializeSelectionToDataTransfer(t.clipboardData) &&
                        t.preventDefault(),
                      null != (n = this.delegate) &&
                        n.inputControllerWillCutText(),
                      this.deleteInDirection("backward"),
                      t.defaultPrevented)
                      ? this.requestRender()
                      : void 0;
                  },
                  copy: function(t) {
                    var e;
                    return (null != (e = this.responder)
                      ? e.selectionIsExpanded()
                      : void 0) &&
                      this.serializeSelectionToDataTransfer(t.clipboardData)
                      ? t.preventDefault()
                      : void 0;
                  },
                  paste: function(t) {
                    var n,
                      r,
                      s,
                      a,
                      u,
                      c,
                      l,
                      p,
                      f,
                      g,
                      y,
                      v,
                      b,
                      A,
                      x,
                      C,
                      S,
                      R,
                      k,
                      E,
                      w,
                      D;
                    return (
                      (n =
                        null != (p = t.clipboardData)
                          ? p
                          : t.testClipboardData),
                      (l = { clipboard: n }),
                      null == n || h(t)
                        ? void this.getPastedHTMLUsingHiddenElement(
                            (function(t) {
                              return function(e) {
                                var n, i, r;
                                return (
                                  (l.type = "text/html"),
                                  (l.html = e),
                                  null != (n = t.delegate) &&
                                    n.inputControllerWillPaste(l),
                                  null != (i = t.responder) &&
                                    i.insertHTML(l.html),
                                  t.requestRender(),
                                  null != (r = t.delegate)
                                    ? r.inputControllerDidPaste(l)
                                    : void 0
                                );
                              };
                            })(this)
                          )
                        : ((a = n.getData("URL"))
                            ? ((l.type = "URL"),
                              (l.href = a),
                              (l.string = (c = n.getData("public.url-name"))
                                ? e.squishBreakableWhitespace(c).trim()
                                : a),
                              null != (f = this.delegate) &&
                                f.inputControllerWillPaste(l),
                              this.setInputSummary({
                                textAdded: l.string,
                                didDelete: this.selectionIsExpanded()
                              }),
                              null != (x = this.responder) &&
                                x.insertText(
                                  e.Text.textForStringWithAttributes(l.string, {
                                    href: l.href
                                  })
                                ),
                              this.requestRender(),
                              null != (C = this.delegate) &&
                                C.inputControllerDidPaste(l))
                            : i(n)
                            ? ((l.type = "text/plain"),
                              (l.string = n.getData("text/plain")),
                              null != (S = this.delegate) &&
                                S.inputControllerWillPaste(l),
                              this.setInputSummary({
                                textAdded: l.string,
                                didDelete: this.selectionIsExpanded()
                              }),
                              null != (R = this.responder) &&
                                R.insertString(l.string),
                              this.requestRender(),
                              null != (k = this.delegate) &&
                                k.inputControllerDidPaste(l))
                            : (u = n.getData("text/html"))
                            ? ((l.type = "text/html"),
                              (l.html = u),
                              null != (E = this.delegate) &&
                                E.inputControllerWillPaste(l),
                              null != (w = this.responder) &&
                                w.insertHTML(l.html),
                              this.requestRender(),
                              null != (D = this.delegate) &&
                                D.inputControllerDidPaste(l))
                            : m.call(n.types, "Files") >= 0 &&
                              (s =
                                null != (g = n.items) &&
                                null != (y = g[0]) &&
                                "function" == typeof y.getAsFile
                                  ? y.getAsFile()
                                  : void 0) &&
                              (!s.name &&
                                (r = o(s)) &&
                                (s.name = "pasted-file-" + ++d + "." + r),
                              (l.type = "File"),
                              (l.file = s),
                              null != (v = this.delegate) &&
                                v.inputControllerWillAttachFiles(),
                              null != (b = this.responder) &&
                                b.insertFile(l.file),
                              this.requestRender(),
                              null != (A = this.delegate) &&
                                A.inputControllerDidPaste(l)),
                          t.preventDefault())
                    );
                  },
                  compositionstart: function(t) {
                    return this.getCompositionInput().start(t.data);
                  },
                  compositionupdate: function(t) {
                    return this.getCompositionInput().update(t.data);
                  },
                  compositionend: function(t) {
                    return this.getCompositionInput().end(t.data);
                  },
                  beforeinput: function() {
                    return (this.inputSummary.didInput = !0);
                  },
                  input: function(t) {
                    return (
                      (this.inputSummary.didInput = !0), t.stopPropagation()
                    );
                  }
                }),
                (s.prototype.keys = {
                  backspace: function(t) {
                    var e;
                    return (
                      null != (e = this.delegate) &&
                        e.inputControllerWillPerformTyping(),
                      this.deleteInDirection("backward", t)
                    );
                  },
                  delete: function(t) {
                    var e;
                    return (
                      null != (e = this.delegate) &&
                        e.inputControllerWillPerformTyping(),
                      this.deleteInDirection("forward", t)
                    );
                  },
                  return: function() {
                    var t, e;
                    return (
                      this.setInputSummary({ preferDocument: !0 }),
                      null != (t = this.delegate) &&
                        t.inputControllerWillPerformTyping(),
                      null != (e = this.responder)
                        ? e.insertLineBreak()
                        : void 0
                    );
                  },
                  tab: function(t) {
                    var e, n;
                    return (null != (e = this.responder)
                    ? e.canIncreaseNestingLevel()
                    : void 0)
                      ? (null != (n = this.responder) &&
                          n.increaseNestingLevel(),
                        this.requestRender(),
                        t.preventDefault())
                      : void 0;
                  },
                  left: function(t) {
                    var e;
                    return this.selectionIsInCursorTarget()
                      ? (t.preventDefault(),
                        null != (e = this.responder)
                          ? e.moveCursorInDirection("backward")
                          : void 0)
                      : void 0;
                  },
                  right: function(t) {
                    var e;
                    return this.selectionIsInCursorTarget()
                      ? (t.preventDefault(),
                        null != (e = this.responder)
                          ? e.moveCursorInDirection("forward")
                          : void 0)
                      : void 0;
                  },
                  control: {
                    d: function(t) {
                      var e;
                      return (
                        null != (e = this.delegate) &&
                          e.inputControllerWillPerformTyping(),
                        this.deleteInDirection("forward", t)
                      );
                    },
                    h: function(t) {
                      var e;
                      return (
                        null != (e = this.delegate) &&
                          e.inputControllerWillPerformTyping(),
                        this.deleteInDirection("backward", t)
                      );
                    },
                    o: function(t) {
                      var e, n;
                      return (
                        t.preventDefault(),
                        null != (e = this.delegate) &&
                          e.inputControllerWillPerformTyping(),
                        null != (n = this.responder) &&
                          n.insertString("\n", { updatePosition: !1 }),
                        this.requestRender()
                      );
                    }
                  },
                  shift: {
                    return: function(t) {
                      var e, n;
                      return (
                        null != (e = this.delegate) &&
                          e.inputControllerWillPerformTyping(),
                        null != (n = this.responder) && n.insertString("\n"),
                        this.requestRender(),
                        t.preventDefault()
                      );
                    },
                    tab: function(t) {
                      var e, n;
                      return (null != (e = this.responder)
                      ? e.canDecreaseNestingLevel()
                      : void 0)
                        ? (null != (n = this.responder) &&
                            n.decreaseNestingLevel(),
                          this.requestRender(),
                          t.preventDefault())
                        : void 0;
                    },
                    left: function(t) {
                      return this.selectionIsInCursorTarget()
                        ? (t.preventDefault(),
                          this.expandSelectionInDirection("backward"))
                        : void 0;
                    },
                    right: function(t) {
                      return this.selectionIsInCursorTarget()
                        ? (t.preventDefault(),
                          this.expandSelectionInDirection("forward"))
                        : void 0;
                    }
                  },
                  alt: {
                    backspace: function() {
                      var t;
                      return (
                        this.setInputSummary({ preferDocument: !1 }),
                        null != (t = this.delegate)
                          ? t.inputControllerWillPerformTyping()
                          : void 0
                      );
                    }
                  },
                  meta: {
                    backspace: function() {
                      var t;
                      return (
                        this.setInputSummary({ preferDocument: !1 }),
                        null != (t = this.delegate)
                          ? t.inputControllerWillPerformTyping()
                          : void 0
                      );
                    }
                  }
                }),
                (s.prototype.getCompositionInput = function() {
                  return this.isComposing()
                    ? this.compositionInput
                    : (this.compositionInput = new t(this));
                }),
                (s.prototype.isComposing = function() {
                  return (
                    null != this.compositionInput &&
                    !this.compositionInput.isEnded()
                  );
                }),
                (s.prototype.deleteInDirection = function(t, e) {
                  var n;
                  return (null != (n = this.responder)
                    ? n.deleteInDirection(t)
                    : void 0) !== !1
                    ? this.setInputSummary({ didDelete: !0 })
                    : e
                    ? (e.preventDefault(), this.requestRender())
                    : void 0;
                }),
                (s.prototype.serializeSelectionToDataTransfer = function(t) {
                  var n, i;
                  if (r(t))
                    return (
                      (n =
                        null != (i = this.responder)
                          ? i.getSelectedDocument().toSerializableDocument()
                          : void 0),
                      t.setData(
                        "application/x-trix-document",
                        JSON.stringify(n)
                      ),
                      t.setData(
                        "text/html",
                        e.DocumentView.render(n).innerHTML
                      ),
                      t.setData("text/plain", n.toString().replace(/\n$/, "")),
                      !0
                    );
                }),
                (s.prototype.canAcceptDataTransfer = function(t) {
                  var e, n, i, r, o, s;
                  for (
                    s = {},
                      r = null != (i = null != t ? t.types : void 0) ? i : [],
                      e = 0,
                      n = r.length;
                    n > e;
                    e++
                  )
                    (o = r[e]), (s[o] = !0);
                  return (
                    s.Files ||
                    s["application/x-trix-document"] ||
                    s["text/html"] ||
                    s["text/plain"]
                  );
                }),
                (s.prototype.getPastedHTMLUsingHiddenElement = function(t) {
                  var n, i, r;
                  return (
                    (i = this.getSelectedRange()),
                    (r = {
                      position: "absolute",
                      left: window.pageXOffset + "px",
                      top: window.pageYOffset + "px",
                      opacity: 0
                    }),
                    (n = c({ style: r, tagName: "div", editable: !0 })),
                    document.body.appendChild(n),
                    n.focus(),
                    requestAnimationFrame(
                      (function(r) {
                        return function() {
                          var o;
                          return (
                            (o = n.innerHTML),
                            e.removeNode(n),
                            r.setSelectedRange(i),
                            t(o)
                          );
                        };
                      })(this)
                    )
                  );
                }),
                s.proxyMethod("responder?.getSelectedRange"),
                s.proxyMethod("responder?.setSelectedRange"),
                s.proxyMethod("responder?.expandSelectionInDirection"),
                s.proxyMethod("responder?.selectionIsInCursorTarget"),
                s.proxyMethod("responder?.selectionIsExpanded"),
                s
              );
            })(e.InputController)),
            (o = function(t) {
              var e, n;
              return null != (e = t.type) && null != (n = e.match(/\/(\w+)$/))
                ? n[1]
                : void 0;
            }),
            (s =
              null !=
              ("function" == typeof " ".codePointAt
                ? " ".codePointAt(0)
                : void 0)),
            (p = function(t) {
              var n;
              return t.key && s && t.key.codePointAt(0) === t.keyCode
                ? t.key
                : (null === t.which
                    ? (n = t.keyCode)
                    : 0 !== t.which && 0 !== t.charCode && (n = t.charCode),
                  null != n && "escape" !== u[n]
                    ? e.UTF16String.fromCodepoints([n]).toString()
                    : void 0);
            }),
            (h = function(t) {
              var e, n, i, r, o, s, a, u, c, l;
              if ((u = t.clipboardData)) {
                if (m.call(u.types, "text/html") >= 0) {
                  for (c = u.types, i = 0, s = c.length; s > i; i++)
                    if (
                      ((l = c[i]),
                      (e = /^CorePasteboardFlavorType/.test(l)),
                      (n = /^dyn\./.test(l) && u.getData(l)),
                      (a = e || n))
                    )
                      return !0;
                  return !1;
                }
                return (
                  (r = m.call(u.types, "com.apple.webarchive") >= 0),
                  (o = m.call(u.types, "com.apple.flat-rtfd") >= 0),
                  r || o
                );
              }
            }),
            (t = (function(t) {
              function e(t) {
                var e;
                (this.inputController = t),
                  (e = this.inputController),
                  (this.responder = e.responder),
                  (this.delegate = e.delegate),
                  (this.inputSummary = e.inputSummary),
                  (this.data = {});
              }
              return (
                f(e, t),
                (e.prototype.start = function(t) {
                  var e, n;
                  return (
                    (this.data.start = t),
                    this.isSignificant()
                      ? ("keypress" === this.inputSummary.eventName &&
                          this.inputSummary.textAdded &&
                          null != (e = this.responder) &&
                          e.deleteInDirection("left"),
                        this.selectionIsExpanded() ||
                          (this.insertPlaceholder(), this.requestRender()),
                        (this.range =
                          null != (n = this.responder)
                            ? n.getSelectedRange()
                            : void 0))
                      : void 0
                  );
                }),
                (e.prototype.update = function(t) {
                  var e;
                  return (
                    (this.data.update = t),
                    this.isSignificant() && (e = this.selectPlaceholder())
                      ? (this.forgetPlaceholder(), (this.range = e))
                      : void 0
                  );
                }),
                (e.prototype.end = function(t) {
                  var e, n, i, r;
                  return (
                    (this.data.end = t),
                    this.isSignificant()
                      ? (this.forgetPlaceholder(),
                        this.canApplyToDocument()
                          ? (this.setInputSummary({
                              preferDocument: !0,
                              didInput: !1
                            }),
                            null != (e = this.delegate) &&
                              e.inputControllerWillPerformTyping(),
                            null != (n = this.responder) &&
                              n.setSelectedRange(this.range),
                            null != (i = this.responder) &&
                              i.insertString(this.data.end),
                            null != (r = this.responder)
                              ? r.setSelectedRange(
                                  this.range[0] + this.data.end.length
                                )
                              : void 0)
                          : null != this.data.start || null != this.data.update
                          ? (this.requestReparse(),
                            this.inputController.reset())
                          : void 0)
                      : this.inputController.reset()
                  );
                }),
                (e.prototype.getEndData = function() {
                  return this.data.end;
                }),
                (e.prototype.isEnded = function() {
                  return null != this.getEndData();
                }),
                (e.prototype.isSignificant = function() {
                  return n.composesExistingText
                    ? this.inputSummary.didInput
                    : !0;
                }),
                (e.prototype.canApplyToDocument = function() {
                  var t, e;
                  return (
                    0 === (null != (t = this.data.start) ? t.length : void 0) &&
                    (null != (e = this.data.end) ? e.length : void 0) > 0 &&
                    null != this.range
                  );
                }),
                e.proxyMethod("inputController.setInputSummary"),
                e.proxyMethod("inputController.requestRender"),
                e.proxyMethod("inputController.requestReparse"),
                e.proxyMethod("responder?.selectionIsExpanded"),
                e.proxyMethod("responder?.insertPlaceholder"),
                e.proxyMethod("responder?.selectPlaceholder"),
                e.proxyMethod("responder?.forgetPlaceholder"),
                e
              );
            })(e.BasicObject));
        }.call(this),
        function() {
          var t,
            n,
            i,
            r = function(t, e) {
              return function() {
                return t.apply(e, arguments);
              };
            },
            o = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) s.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            s = {}.hasOwnProperty,
            a =
              [].indexOf ||
              function(t) {
                for (var e = 0, n = this.length; n > e; e++)
                  if (e in this && this[e] === t) return e;
                return -1;
              };
          (t = e.dataTransferIsPlainText),
            (n = e.keyEventIsKeyboardCommand),
            (i = e.objectsAreEqual),
            (e.Level2InputController = (function(s) {
              function u() {
                return (
                  (this.render = r(this.render, this)),
                  u.__super__.constructor.apply(this, arguments)
                );
              }
              var c, l, h, p, d, f;
              return (
                o(u, s),
                (u.prototype.elementDidMutate = function() {
                  var t;
                  return this.scheduledRender
                    ? this.composing &&
                      null != (t = this.delegate) &&
                      "function" ==
                        typeof t.inputControllerDidAllowUnhandledInput
                      ? t.inputControllerDidAllowUnhandledInput()
                      : void 0
                    : this.reparse();
                }),
                (u.prototype.scheduleRender = function() {
                  return null != this.scheduledRender
                    ? this.scheduledRender
                    : (this.scheduledRender = requestAnimationFrame(
                        this.render
                      ));
                }),
                (u.prototype.render = function() {
                  var t;
                  return (
                    cancelAnimationFrame(this.scheduledRender),
                    (this.scheduledRender = null),
                    this.composing ||
                      (null != (t = this.delegate) && t.render()),
                    "function" == typeof this.afterRender && this.afterRender(),
                    (this.afterRender = null)
                  );
                }),
                (u.prototype.reparse = function() {
                  var t;
                  return null != (t = this.delegate) ? t.reparse() : void 0;
                }),
                (u.prototype.events = {
                  keydown: function(t) {
                    var e, i, r, o;
                    if (n(t)) {
                      if (
                        ((e = l(t)),
                        null != (o = this.delegate)
                          ? o.inputControllerDidReceiveKeyboardCommand(e)
                          : void 0)
                      )
                        return t.preventDefault();
                    } else if (
                      ((r = t.key),
                      t.altKey && (r += "+Alt"),
                      t.shiftKey && (r += "+Shift"),
                      (i = this.keys[r]))
                    )
                      return this.withEvent(t, i);
                  },
                  paste: function(t) {
                    var n, i, r, o, s, a, u, c, l;
                    return h(t)
                      ? (t.preventDefault(),
                        this.attachFiles(t.clipboardData.files))
                      : p(t)
                      ? (t.preventDefault(),
                        (i = {
                          type: "text/plain",
                          string: t.clipboardData.getData("text/plain")
                        }),
                        null != (r = this.delegate) &&
                          r.inputControllerWillPaste(i),
                        null != (o = this.responder) &&
                          o.insertString(i.string),
                        this.render(),
                        null != (s = this.delegate)
                          ? s.inputControllerDidPaste(i)
                          : void 0)
                      : (n =
                          null != (a = t.clipboardData)
                            ? a.getData("URL")
                            : void 0)
                      ? (t.preventDefault(),
                        (i = { type: "URL", href: n, string: n }),
                        null != (u = this.delegate) &&
                          u.inputControllerWillPaste(i),
                        null != (c = this.responder) &&
                          c.insertText(
                            e.Text.textForStringWithAttributes(i.string, {
                              href: i.href
                            })
                          ),
                        this.render(),
                        null != (l = this.delegate)
                          ? l.inputControllerDidPaste(i)
                          : void 0)
                      : void 0;
                  },
                  beforeinput: function(t) {
                    var e;
                    return (e = this.inputTypes[t.inputType])
                      ? (this.withEvent(t, e), this.scheduleRender())
                      : void 0;
                  },
                  input: function() {
                    return e.selectionChangeObserver.reset();
                  },
                  dragstart: function(t) {
                    var e, n;
                    return (null != (e = this.responder)
                    ? e.selectionContainsAttachments()
                    : void 0)
                      ? (t.dataTransfer.setData(
                          "application/x-trix-dragging",
                          !0
                        ),
                        (this.dragging = {
                          range:
                            null != (n = this.responder)
                              ? n.getSelectedRange()
                              : void 0,
                          point: d(t)
                        }))
                      : void 0;
                  },
                  dragenter: function(t) {
                    return c(t) ? t.preventDefault() : void 0;
                  },
                  dragover: function(t) {
                    var e, n;
                    return this.dragging &&
                      (t.preventDefault(),
                      (e = d(t)),
                      !i(e, this.dragging.point))
                      ? ((this.dragging.point = e),
                        null != (n = this.responder)
                          ? n.setLocationRangeFromPointRange(e)
                          : void 0)
                      : void 0;
                  },
                  drop: function(t) {
                    var e, n, i, r;
                    return this.dragging
                      ? (t.preventDefault(),
                        null != (n = this.delegate) &&
                          n.inputControllerWillMoveText(),
                        null != (i = this.responder) &&
                          i.moveTextFromRange(this.dragging.range),
                        (this.dragging = null),
                        this.scheduleRender())
                      : c(t)
                      ? (t.preventDefault(),
                        (e = d(t)),
                        null != (r = this.responder) &&
                          r.setLocationRangeFromPointRange(e),
                        this.attachFiles(t.dataTransfer.files))
                      : void 0;
                  },
                  dragend: function() {
                    var t;
                    return this.dragging
                      ? (null != (t = this.responder) &&
                          t.setSelectedRange(this.dragging.range),
                        (this.dragging = null))
                      : void 0;
                  },
                  compositionend: function() {
                    return this.composing
                      ? ((this.composing = !1), this.scheduleRender())
                      : void 0;
                  }
                }),
                (u.prototype.keys = {
                  ArrowLeft: function() {
                    var t, e;
                    return (null != (t = this.responder)
                    ? t.shouldManageMovingCursorInDirection("backward")
                    : void 0)
                      ? (this.event.preventDefault(),
                        null != (e = this.responder)
                          ? e.moveCursorInDirection("backward")
                          : void 0)
                      : void 0;
                  },
                  ArrowRight: function() {
                    var t, e;
                    return (null != (t = this.responder)
                    ? t.shouldManageMovingCursorInDirection("forward")
                    : void 0)
                      ? (this.event.preventDefault(),
                        null != (e = this.responder)
                          ? e.moveCursorInDirection("forward")
                          : void 0)
                      : void 0;
                  },
                  Backspace: function() {
                    var t, e, n;
                    return (null != (t = this.responder)
                    ? t.shouldManageDeletingInDirection("backward")
                    : void 0)
                      ? (this.event.preventDefault(),
                        null != (e = this.delegate) &&
                          e.inputControllerWillPerformTyping(),
                        null != (n = this.responder) &&
                          n.deleteInDirection("backward"),
                        this.render())
                      : void 0;
                  },
                  Tab: function() {
                    var t, e;
                    return (null != (t = this.responder)
                    ? t.canIncreaseNestingLevel()
                    : void 0)
                      ? (this.event.preventDefault(),
                        null != (e = this.responder) &&
                          e.increaseNestingLevel(),
                        this.render())
                      : void 0;
                  },
                  "Tab+Shift": function() {
                    var t, e;
                    return (null != (t = this.responder)
                    ? t.canDecreaseNestingLevel()
                    : void 0)
                      ? (this.event.preventDefault(),
                        null != (e = this.responder) &&
                          e.decreaseNestingLevel(),
                        this.render())
                      : void 0;
                  }
                }),
                (u.prototype.inputTypes = {
                  deleteByComposition: function() {
                    return this.deleteInDirection("backward", {
                      recordUndoEntry: !1
                    });
                  },
                  deleteByCut: function() {
                    return this.deleteInDirection("backward");
                  },
                  deleteByDrag: function() {
                    return (
                      this.event.preventDefault(),
                      this.withTargetDOMRange(function() {
                        var t;
                        return (this.deleteByDragRange =
                          null != (t = this.responder)
                            ? t.getSelectedRange()
                            : void 0);
                      })
                    );
                  },
                  deleteCompositionText: function() {
                    return this.deleteInDirection("backward", {
                      recordUndoEntry: !1
                    });
                  },
                  deleteContent: function() {
                    return this.deleteInDirection("backward");
                  },
                  deleteContentBackward: function() {
                    return this.deleteInDirection("backward");
                  },
                  deleteContentForward: function() {
                    return this.deleteInDirection("forward");
                  },
                  deleteEntireSoftLine: function() {
                    return this.deleteInDirection("forward");
                  },
                  deleteHardLineBackward: function() {
                    return this.deleteInDirection("backward");
                  },
                  deleteHardLineForward: function() {
                    return this.deleteInDirection("forward");
                  },
                  deleteSoftLineBackward: function() {
                    return this.deleteInDirection("backward");
                  },
                  deleteSoftLineForward: function() {
                    return this.deleteInDirection("forward");
                  },
                  deleteWordBackward: function() {
                    return this.deleteInDirection("backward");
                  },
                  deleteWordForward: function() {
                    return this.deleteInDirection("forward");
                  },
                  formatBackColor: function() {
                    return this.activateAttributeIfSupported(
                      "backgroundColor",
                      this.event.data
                    );
                  },
                  formatBold: function() {
                    return this.toggleAttributeIfSupported("bold");
                  },
                  formatFontColor: function() {
                    return this.activateAttributeIfSupported(
                      "color",
                      this.event.data
                    );
                  },
                  formatFontName: function() {
                    return this.activateAttributeIfSupported(
                      "font",
                      this.event.data
                    );
                  },
                  formatIndent: function() {
                    var t;
                    return (null != (t = this.responder)
                    ? t.canIncreaseNestingLevel()
                    : void 0)
                      ? this.withTargetDOMRange(function() {
                          var t;
                          return null != (t = this.responder)
                            ? t.increaseNestingLevel()
                            : void 0;
                        })
                      : void 0;
                  },
                  formatItalic: function() {
                    return this.toggleAttributeIfSupported("italic");
                  },
                  formatJustifyCenter: function() {
                    return this.toggleAttributeIfSupported("justifyCenter");
                  },
                  formatJustifyFull: function() {
                    return this.toggleAttributeIfSupported("justifyFull");
                  },
                  formatJustifyLeft: function() {
                    return this.toggleAttributeIfSupported("justifyLeft");
                  },
                  formatJustifyRight: function() {
                    return this.toggleAttributeIfSupported("justifyRight");
                  },
                  formatOutdent: function() {
                    var t;
                    return (null != (t = this.responder)
                    ? t.canDecreaseNestingLevel()
                    : void 0)
                      ? this.withTargetDOMRange(function() {
                          var t;
                          return null != (t = this.responder)
                            ? t.decreaseNestingLevel()
                            : void 0;
                        })
                      : void 0;
                  },
                  formatRemove: function() {
                    return this.withTargetDOMRange(function() {
                      var t, e, n, i;
                      i = [];
                      for (t in null != (e = this.responder)
                        ? e.getCurrentAttributes()
                        : void 0)
                        i.push(
                          null != (n = this.responder)
                            ? n.removeCurrentAttribute(t)
                            : void 0
                        );
                      return i;
                    });
                  },
                  formatSetBlockTextDirection: function() {
                    return this.activateAttributeIfSupported(
                      "blockDir",
                      this.event.data
                    );
                  },
                  formatSetInlineTextDirection: function() {
                    return this.activateAttributeIfSupported(
                      "textDir",
                      this.event.data
                    );
                  },
                  formatStrikeThrough: function() {
                    return this.toggleAttributeIfSupported("strike");
                  },
                  formatSubscript: function() {
                    return this.toggleAttributeIfSupported("sub");
                  },
                  formatSuperscript: function() {
                    return this.toggleAttributeIfSupported("sup");
                  },
                  formatUnderline: function() {
                    return this.toggleAttributeIfSupported("underline");
                  },
                  historyRedo: function() {
                    var t;
                    return null != (t = this.delegate)
                      ? t.inputControllerWillPerformRedo()
                      : void 0;
                  },
                  historyUndo: function() {
                    var t;
                    return null != (t = this.delegate)
                      ? t.inputControllerWillPerformUndo()
                      : void 0;
                  },
                  insertCompositionText: function() {
                    return (
                      (this.composing = !0), this.insertString(this.event.data)
                    );
                  },
                  insertFromComposition: function() {
                    return (
                      (this.composing = !1), this.insertString(this.event.data)
                    );
                  },
                  insertFromDrop: function() {
                    var t, e;
                    return (t = this.deleteByDragRange)
                      ? ((this.deleteByDragRange = null),
                        null != (e = this.delegate) &&
                          e.inputControllerWillMoveText(),
                        this.withTargetDOMRange(function() {
                          var e;
                          return null != (e = this.responder)
                            ? e.moveTextFromRange(t)
                            : void 0;
                        }))
                      : void 0;
                  },
                  insertFromPaste: function() {
                    var n, i, r, o, s, a, u, c, l, h;
                    return (
                      (n = this.event.dataTransfer),
                      (s = { dataTransfer: n }),
                      (i = n.getData("URL"))
                        ? ((s.type = "URL"),
                          (s.href = i),
                          (s.string = (o = n.getData("public.url-name"))
                            ? e.squishBreakableWhitespace(o).trim()
                            : i),
                          null != (a = this.delegate) &&
                            a.inputControllerWillPaste(s),
                          this.withTargetDOMRange(function() {
                            var t;
                            return null != (t = this.responder)
                              ? t.insertText(
                                  e.Text.textForStringWithAttributes(s.string, {
                                    href: s.href
                                  })
                                )
                              : void 0;
                          }),
                          (this.afterRender = (function(t) {
                            return function() {
                              var e;
                              return null != (e = t.delegate)
                                ? e.inputControllerDidPaste(s)
                                : void 0;
                            };
                          })(this)))
                        : t(n)
                        ? ((s.type = "text/plain"),
                          (s.string = n.getData("text/plain")),
                          null != (u = this.delegate) &&
                            u.inputControllerWillPaste(s),
                          this.withTargetDOMRange(function() {
                            var t;
                            return null != (t = this.responder)
                              ? t.insertString(s.string)
                              : void 0;
                          }),
                          (this.afterRender = (function(t) {
                            return function() {
                              var e;
                              return null != (e = t.delegate)
                                ? e.inputControllerDidPaste(s)
                                : void 0;
                            };
                          })(this)))
                        : (r = n.getData("text/html"))
                        ? ((s.type = "text/html"),
                          (s.html = r),
                          null != (c = this.delegate) &&
                            c.inputControllerWillPaste(s),
                          this.withTargetDOMRange(function() {
                            var t;
                            return null != (t = this.responder)
                              ? t.insertHTML(s.html)
                              : void 0;
                          }),
                          (this.afterRender = (function(t) {
                            return function() {
                              var e;
                              return null != (e = t.delegate)
                                ? e.inputControllerDidPaste(s)
                                : void 0;
                            };
                          })(this)))
                        : (null != (l = n.files)
                          ? l.length
                          : void 0)
                        ? ((s.type = "File"),
                          (s.file = n.files[0]),
                          null != (h = this.delegate) &&
                            h.inputControllerWillPaste(s),
                          this.withTargetDOMRange(function() {
                            var t;
                            return null != (t = this.responder)
                              ? t.insertFile(s.file)
                              : void 0;
                          }),
                          (this.afterRender = (function(t) {
                            return function() {
                              var e;
                              return null != (e = t.delegate)
                                ? e.inputControllerDidPaste(s)
                                : void 0;
                            };
                          })(this)))
                        : void 0
                    );
                  },
                  insertFromYank: function() {
                    return this.insertString(this.event.data);
                  },
                  insertLineBreak: function() {
                    return this.insertString("\n");
                  },
                  insertLink: function() {
                    return this.activateAttributeIfSupported(
                      "href",
                      this.event.data
                    );
                  },
                  insertOrderedList: function() {
                    return this.toggleAttributeIfSupported("number");
                  },
                  insertParagraph: function() {
                    var t;
                    return (
                      null != (t = this.delegate) &&
                        t.inputControllerWillPerformTyping(),
                      this.withTargetDOMRange(function() {
                        var t;
                        return null != (t = this.responder)
                          ? t.insertLineBreak()
                          : void 0;
                      })
                    );
                  },
                  insertReplacementText: function() {
                    return this.insertString(
                      this.event.dataTransfer.getData("text/plain"),
                      { updatePosition: !1 }
                    );
                  },
                  insertText: function() {
                    var t, e;
                    return this.insertString(
                      null != (t = this.event.data)
                        ? t
                        : null != (e = this.event.dataTransfer)
                        ? e.getData("text/plain")
                        : void 0
                    );
                  },
                  insertTranspose: function() {
                    return this.insertString(this.event.data);
                  },
                  insertUnorderedList: function() {
                    return this.toggleAttributeIfSupported("bullet");
                  }
                }),
                (u.prototype.insertString = function(t, e) {
                  var n;
                  return (
                    null == t && (t = ""),
                    null != (n = this.delegate) &&
                      n.inputControllerWillPerformTyping(),
                    this.withTargetDOMRange(function() {
                      var n;
                      return null != (n = this.responder)
                        ? n.insertString(t, e)
                        : void 0;
                    })
                  );
                }),
                (u.prototype.toggleAttributeIfSupported = function(t) {
                  var n;
                  return a.call(e.getAllAttributeNames(), t) >= 0
                    ? (null != (n = this.delegate) &&
                        n.inputControllerWillPerformFormatting(t),
                      this.withTargetDOMRange(function() {
                        var e;
                        return null != (e = this.responder)
                          ? e.toggleCurrentAttribute(t)
                          : void 0;
                      }))
                    : void 0;
                }),
                (u.prototype.activateAttributeIfSupported = function(t, n) {
                  var i;
                  return a.call(e.getAllAttributeNames(), t) >= 0
                    ? (null != (i = this.delegate) &&
                        i.inputControllerWillPerformFormatting(t),
                      this.withTargetDOMRange(function() {
                        var e;
                        return null != (e = this.responder)
                          ? e.setCurrentAttribute(t, n)
                          : void 0;
                      }))
                    : void 0;
                }),
                (u.prototype.deleteInDirection = function(t, e) {
                  var n, i, r, o;
                  return (
                    (r = (null != e ? e : { recordUndoEntry: !0 })
                      .recordUndoEntry),
                    r &&
                      null != (o = this.delegate) &&
                      o.inputControllerWillPerformTyping(),
                    (i = (function(e) {
                      return function() {
                        var n;
                        return null != (n = e.responder)
                          ? n.deleteInDirection(t)
                          : void 0;
                      };
                    })(this)),
                    (n = this.getTargetDOMRange({ minLength: 2 }))
                      ? this.withTargetDOMRange(n, i)
                      : i()
                  );
                }),
                (u.prototype.withTargetDOMRange = function(t, n) {
                  var i;
                  return (
                    "function" == typeof t &&
                      ((n = t), (t = this.getTargetDOMRange())),
                    t
                      ? null != (i = this.responder)
                        ? i.withTargetDOMRange(t, n.bind(this))
                        : void 0
                      : (e.selectionChangeObserver.reset(), n.call(this))
                  );
                }),
                (u.prototype.getTargetDOMRange = function(t) {
                  var e, n, i, r;
                  return (
                    (i = (null != t ? t : { minLength: 0 }).minLength),
                    (r =
                      "function" == typeof (e = this.event).getTargetRanges
                        ? e.getTargetRanges()
                        : void 0) &&
                    r.length &&
                    ((n = f(r[0])), 0 === i || n.toString().length >= i)
                      ? n
                      : void 0
                  );
                }),
                (f = function(t) {
                  var e;
                  return (
                    (e = document.createRange()),
                    e.setStart(t.startContainer, t.startOffset),
                    e.setEnd(t.endContainer, t.endOffset),
                    e
                  );
                }),
                (u.prototype.withEvent = function(t, e) {
                  var n;
                  this.event = t;
                  try {
                    n = e.call(this);
                  } finally {
                    this.event = null;
                  }
                  return n;
                }),
                (c = function(t) {
                  var e, n;
                  return (
                    a.call(
                      null !=
                        (e = null != (n = t.dataTransfer) ? n.types : void 0)
                        ? e
                        : [],
                      "Files"
                    ) >= 0
                  );
                }),
                (h = function(t) {
                  var e;
                  return (e = t.clipboardData)
                    ? a.call(e.types, "Files") >= 0 &&
                        1 === e.types.length &&
                        e.files.length >= 1
                    : void 0;
                }),
                (p = function(t) {
                  var e;
                  return (e = t.clipboardData)
                    ? a.call(e.types, "text/plain") >= 0 && 1 === e.types.length
                    : void 0;
                }),
                (l = function(t) {
                  var e;
                  return (
                    (e = []),
                    t.altKey && e.push("alt"),
                    t.shiftKey && e.push("shift"),
                    e.push(t.key),
                    e
                  );
                }),
                (d = function(t) {
                  return { x: t.clientX, y: t.clientY };
                }),
                u
              );
            })(e.InputController));
        }.call(this),
        function() {
          var t,
            n,
            i,
            r,
            o,
            s,
            a,
            u,
            c,
            l = function(t, e) {
              return function() {
                return t.apply(e, arguments);
              };
            },
            h = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) p.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            p = {}.hasOwnProperty;
          (n = e.defer),
            (i = e.escapeHTML),
            (r = e.handleEvent),
            (a = e.makeElement),
            (c = e.tagName),
            (u = e.config),
            (s = u.lang),
            (t = u.css),
            (o = u.keyNames),
            (e.AttachmentEditorController = (function(u) {
              function p(t, e, n, i) {
                (this.attachmentPiece = t),
                  (this.element = e),
                  (this.container = n),
                  (this.options = null != i ? i : {}),
                  (this.didBlurCaption = l(this.didBlurCaption, this)),
                  (this.didChangeCaption = l(this.didChangeCaption, this)),
                  (this.didInputCaption = l(this.didInputCaption, this)),
                  (this.didKeyDownCaption = l(this.didKeyDownCaption, this)),
                  (this.didClickActionButton = l(
                    this.didClickActionButton,
                    this
                  )),
                  (this.didClickToolbar = l(this.didClickToolbar, this)),
                  (this.attachment = this.attachmentPiece.attachment),
                  "a" === c(this.element) &&
                    (this.element = this.element.firstChild),
                  this.install();
              }
              var d;
              return (
                h(p, u),
                (d = function(t) {
                  return function() {
                    var e;
                    return (
                      (e = t.apply(this, arguments)),
                      e["do"](),
                      null == this.undos && (this.undos = []),
                      this.undos.push(e.undo)
                    );
                  };
                }),
                (p.prototype.install = function() {
                  return (
                    this.makeElementMutable(),
                    this.addToolbar(),
                    this.attachment.isPreviewable()
                      ? this.installCaptionEditor()
                      : void 0
                  );
                }),
                (p.prototype.uninstall = function() {
                  var t, e;
                  for (this.savePendingCaption(); (e = this.undos.pop()); ) e();
                  return null != (t = this.delegate)
                    ? t.didUninstallAttachmentEditor(this)
                    : void 0;
                }),
                (p.prototype.savePendingCaption = function() {
                  var t, e, n;
                  return null != this.pendingCaption
                    ? ((t = this.pendingCaption),
                      (this.pendingCaption = null),
                      t
                        ? null != (e = this.delegate) &&
                          "function" ==
                            typeof e.attachmentEditorDidRequestUpdatingAttributesForAttachment
                          ? e.attachmentEditorDidRequestUpdatingAttributesForAttachment(
                              { caption: t },
                              this.attachment
                            )
                          : void 0
                        : null != (n = this.delegate) &&
                          "function" ==
                            typeof n.attachmentEditorDidRequestRemovingAttributeForAttachment
                        ? n.attachmentEditorDidRequestRemovingAttributeForAttachment(
                            "caption",
                            this.attachment
                          )
                        : void 0)
                    : void 0;
                }),
                (p.prototype.makeElementMutable = d(function() {
                  return {
                    do: (function(t) {
                      return function() {
                        return (t.element.dataset.trixMutable = !0);
                      };
                    })(this),
                    undo: (function(t) {
                      return function() {
                        return delete t.element.dataset.trixMutable;
                      };
                    })(this)
                  };
                })),
                (p.prototype.addToolbar = d(function() {
                  var n, o, u;
                  return (
                    (n = a({
                      tagName: "div",
                      className: t.attachmentToolbar,
                      data: { trixMutable: !0 }
                    })),
                    (n.innerHTML =
                      '<div class="trix-button-row">\n  <span class="trix-button-group trix-button-group--actions">\n    <button type="button" data-trix-action="remove" class="trix-button trix-button--remove" title="' +
                      s.remove +
                      '">' +
                      s.remove +
                      "</button>\n  </span>\n</div>"),
                    this.attachment.isPreviewable() &&
                      ((o = i(this.attachment.getFilename())),
                      (u = i(this.attachment.getFormattedFilesize())),
                      (n.innerHTML +=
                        '<div class="' +
                        t.attachmentMetadataContainer +
                        '">\n  <span class="' +
                        t.attachmentMetadata +
                        '">\n    <span class="' +
                        t.attachmentName +
                        '" title="' +
                        o +
                        '">' +
                        o +
                        '</span>\n    <span class="' +
                        t.attachmentSize +
                        '">' +
                        u +
                        "</span>\n  </span>\n</div>")),
                    r("click", {
                      onElement: n,
                      withCallback: this.didClickToolbar
                    }),
                    r("click", {
                      onElement: n,
                      matchingSelector: "[data-trix-action]",
                      withCallback: this.didClickActionButton
                    }),
                    {
                      do: (function(t) {
                        return function() {
                          return t.element.appendChild(n);
                        };
                      })(this),
                      undo: (function() {
                        return function() {
                          return e.removeNode(n);
                        };
                      })(this)
                    }
                  );
                })),
                (p.prototype.installCaptionEditor = d(function() {
                  var i, o, u, c, l;
                  return (
                    (c = a({
                      tagName: "textarea",
                      className: t.attachmentCaptionEditor,
                      attributes: { placeholder: s.captionPlaceholder },
                      data: { trixMutable: !0 }
                    })),
                    (c.value = this.attachmentPiece.getCaption()),
                    (l = c.cloneNode()),
                    l.classList.add("trix-autoresize-clone"),
                    (l.tabIndex = -1),
                    (i = function() {
                      return (
                        (l.value = c.value),
                        (c.style.height = l.scrollHeight + "px")
                      );
                    }),
                    r("input", { onElement: c, withCallback: i }),
                    r("input", {
                      onElement: c,
                      withCallback: this.didInputCaption
                    }),
                    r("keydown", {
                      onElement: c,
                      withCallback: this.didKeyDownCaption
                    }),
                    r("change", {
                      onElement: c,
                      withCallback: this.didChangeCaption
                    }),
                    r("blur", {
                      onElement: c,
                      withCallback: this.didBlurCaption
                    }),
                    (u = this.element.querySelector("figcaption")),
                    (o = u.cloneNode()),
                    {
                      do: (function(e) {
                        return function() {
                          return (
                            (u.style.display = "none"),
                            o.appendChild(c),
                            o.appendChild(l),
                            o.classList.add(t.attachmentCaption + "--editing"),
                            u.parentElement.insertBefore(o, u),
                            i(),
                            e.options.editCaption
                              ? n(function() {
                                  return c.focus();
                                })
                              : void 0
                          );
                        };
                      })(this),
                      undo: function() {
                        return e.removeNode(o), (u.style.display = null);
                      }
                    }
                  );
                })),
                (p.prototype.didClickToolbar = function(t) {
                  return t.preventDefault(), t.stopPropagation();
                }),
                (p.prototype.didClickActionButton = function(t) {
                  var e, n;
                  switch ((e = t.target.getAttribute("data-trix-action"))) {
                    case "remove":
                      return null != (n = this.delegate)
                        ? n.attachmentEditorDidRequestRemovalOfAttachment(
                            this.attachment
                          )
                        : void 0;
                  }
                }),
                (p.prototype.didKeyDownCaption = function(t) {
                  var e;
                  return "return" === o[t.keyCode]
                    ? (t.preventDefault(),
                      this.savePendingCaption(),
                      null != (e = this.delegate) &&
                      "function" ==
                        typeof e.attachmentEditorDidRequestDeselectingAttachment
                        ? e.attachmentEditorDidRequestDeselectingAttachment(
                            this.attachment
                          )
                        : void 0)
                    : void 0;
                }),
                (p.prototype.didInputCaption = function(t) {
                  return (this.pendingCaption = t.target.value
                    .replace(/\s/g, " ")
                    .trim());
                }),
                (p.prototype.didChangeCaption = function() {
                  return this.savePendingCaption();
                }),
                (p.prototype.didBlurCaption = function() {
                  return this.savePendingCaption();
                }),
                p
              );
            })(e.BasicObject));
        }.call(this),
        function() {
          var t,
            n,
            i,
            r = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) o.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            o = {}.hasOwnProperty;
          (i = e.makeElement),
            (t = e.config.css),
            (e.AttachmentView = (function(o) {
              function s() {
                s.__super__.constructor.apply(this, arguments),
                  (this.attachment = this.object),
                  (this.attachment.uploadProgressDelegate = this),
                  (this.attachmentPiece = this.options.piece);
              }
              var a;
              return (
                r(s, o),
                (s.attachmentSelector = "[data-trix-attachment]"),
                (s.prototype.createContentNodes = function() {
                  return [];
                }),
                (s.prototype.createNodes = function() {
                  var e, n, r, o, s, u, c;
                  if (
                    ((e = o = i({
                      tagName: "figure",
                      className: this.getClassName(),
                      data: this.getData(),
                      editable: !1
                    })),
                    (n = this.getHref()) &&
                      ((o = i({
                        tagName: "a",
                        editable: !1,
                        attributes: { href: n, tabindex: -1 }
                      })),
                      e.appendChild(o)),
                    this.attachment.hasContent())
                  )
                    o.innerHTML = this.attachment.getContent();
                  else
                    for (
                      c = this.createContentNodes(), r = 0, s = c.length;
                      s > r;
                      r++
                    )
                      (u = c[r]), o.appendChild(u);
                  return (
                    o.appendChild(this.createCaptionElement()),
                    this.attachment.isPending() &&
                      ((this.progressElement = i({
                        tagName: "progress",
                        attributes: {
                          class: t.attachmentProgress,
                          value: this.attachment.getUploadProgress(),
                          max: 100
                        },
                        data: {
                          trixMutable: !0,
                          trixStoreKey: [
                            "progressElement",
                            this.attachment.id
                          ].join("/")
                        }
                      })),
                      e.appendChild(this.progressElement)),
                    [a("left"), e, a("right")]
                  );
                }),
                (s.prototype.createCaptionElement = function() {
                  var e, n, r, o, s, a, u;
                  return (
                    (r = i({
                      tagName: "figcaption",
                      className: t.attachmentCaption
                    })),
                    (e = this.attachmentPiece.getCaption())
                      ? (r.classList.add(t.attachmentCaption + "--edited"),
                        (r.textContent = e))
                      : ((n = this.getCaptionConfig()),
                        n.name && (o = this.attachment.getFilename()),
                        n.size && (a = this.attachment.getFormattedFilesize()),
                        o &&
                          ((s = i({
                            tagName: "span",
                            className: t.attachmentName,
                            textContent: o
                          })),
                          r.appendChild(s)),
                        a &&
                          (o && r.appendChild(document.createTextNode(" ")),
                          (u = i({
                            tagName: "span",
                            className: t.attachmentSize,
                            textContent: a
                          })),
                          r.appendChild(u))),
                    r
                  );
                }),
                (s.prototype.getClassName = function() {
                  var e, n;
                  return (
                    (n = [
                      t.attachment,
                      t.attachment + "--" + this.attachment.getType()
                    ]),
                    (e = this.attachment.getExtension()) &&
                      n.push(t.attachment + "--" + e),
                    n.join(" ")
                  );
                }),
                (s.prototype.getData = function() {
                  var t, e;
                  return (
                    (e = {
                      trixAttachment: JSON.stringify(this.attachment),
                      trixContentType: this.attachment.getContentType(),
                      trixId: this.attachment.id
                    }),
                    (t = this.attachmentPiece.attributes),
                    t.isEmpty() || (e.trixAttributes = JSON.stringify(t)),
                    this.attachment.isPending() && (e.trixSerialize = !1),
                    e
                  );
                }),
                (s.prototype.getHref = function() {
                  return n(this.attachment.getContent(), "a")
                    ? void 0
                    : this.attachment.getHref();
                }),
                (s.prototype.getCaptionConfig = function() {
                  var t, n, i;
                  return (
                    (i = this.attachment.getType()),
                    (t = e.copyObject(
                      null != (n = e.config.attachments[i]) ? n.caption : void 0
                    )),
                    "file" === i && (t.name = !0),
                    t
                  );
                }),
                (s.prototype.findProgressElement = function() {
                  var t;
                  return null != (t = this.findElement())
                    ? t.querySelector("progress")
                    : void 0;
                }),
                (a = function(t) {
                  return i({
                    tagName: "span",
                    textContent: e.ZERO_WIDTH_SPACE,
                    data: { trixCursorTarget: t, trixSerialize: !1 }
                  });
                }),
                (s.prototype.attachmentDidChangeUploadProgress = function() {
                  var t, e;
                  return (
                    (e = this.attachment.getUploadProgress()),
                    null != (t = this.findProgressElement())
                      ? (t.value = e)
                      : void 0
                  );
                }),
                s
              );
            })(e.ObjectView)),
            (n = function(t, e) {
              var n;
              return (
                (n = i("div")),
                (n.innerHTML = null != t ? t : ""),
                n.querySelector(e)
              );
            });
        }.call(this),
        function() {
          var t,
            n = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var r in e) i.call(e, r) && (t[r] = e[r]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            i = {}.hasOwnProperty;
          (t = e.makeElement),
            (e.PreviewableAttachmentView = (function(i) {
              function r() {
                r.__super__.constructor.apply(this, arguments),
                  (this.attachment.previewDelegate = this);
              }
              return (
                n(r, i),
                (r.prototype.createContentNodes = function() {
                  return (
                    (this.image = t({
                      tagName: "img",
                      attributes: { src: "" },
                      data: { trixMutable: !0 }
                    })),
                    this.refresh(this.image),
                    [this.image]
                  );
                }),
                (r.prototype.createCaptionElement = function() {
                  var t;
                  return (
                    (t = r.__super__.createCaptionElement.apply(
                      this,
                      arguments
                    )),
                    t.textContent ||
                      t.setAttribute(
                        "data-trix-placeholder",
                        e.config.lang.captionPlaceholder
                      ),
                    t
                  );
                }),
                (r.prototype.refresh = function(t) {
                  var e;
                  return (
                    null == t &&
                      (t =
                        null != (e = this.findElement())
                          ? e.querySelector("img")
                          : void 0),
                    t ? this.updateAttributesForImage(t) : void 0
                  );
                }),
                (r.prototype.updateAttributesForImage = function(t) {
                  var e, n, i, r, o, s;
                  return (
                    (o = this.attachment.getURL()),
                    (n = this.attachment.getPreviewURL()),
                    (t.src = n || o),
                    n === o
                      ? t.removeAttribute("data-trix-serialized-attributes")
                      : ((i = JSON.stringify({ src: o })),
                        t.setAttribute("data-trix-serialized-attributes", i)),
                    (s = this.attachment.getWidth()),
                    (e = this.attachment.getHeight()),
                    null != s && (t.width = s),
                    null != e && (t.height = e),
                    (r = [
                      "imageElement",
                      this.attachment.id,
                      t.src,
                      t.width,
                      t.height
                    ].join("/")),
                    (t.dataset.trixStoreKey = r)
                  );
                }),
                (r.prototype.attachmentDidChangeAttributes = function() {
                  return this.refresh(this.image), this.refresh();
                }),
                r
              );
            })(e.AttachmentView));
        }.call(this),
        function() {
          var t,
            n,
            i,
            r = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) o.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            o = {}.hasOwnProperty;
          (i = e.makeElement),
            (t = e.findInnerElement),
            (n = e.getTextConfig),
            (e.PieceView = (function(o) {
              function s() {
                var t;
                s.__super__.constructor.apply(this, arguments),
                  (this.piece = this.object),
                  (this.attributes = this.piece.getAttributes()),
                  (t = this.options),
                  (this.textConfig = t.textConfig),
                  (this.context = t.context),
                  this.piece.attachment
                    ? (this.attachment = this.piece.attachment)
                    : (this.string = this.piece.toString());
              }
              var a;
              return (
                r(s, o),
                (s.prototype.createNodes = function() {
                  var e, n, i, r, o, s;
                  if (
                    ((s = this.attachment
                      ? this.createAttachmentNodes()
                      : this.createStringNodes()),
                    (e = this.createElement()))
                  ) {
                    for (i = t(e), n = 0, r = s.length; r > n; n++)
                      (o = s[n]), i.appendChild(o);
                    s = [e];
                  }
                  return s;
                }),
                (s.prototype.createAttachmentNodes = function() {
                  var t, n;
                  return (
                    (t = this.attachment.isPreviewable()
                      ? e.PreviewableAttachmentView
                      : e.AttachmentView),
                    (n = this.createChildView(t, this.piece.attachment, {
                      piece: this.piece
                    })),
                    n.getNodes()
                  );
                }),
                (s.prototype.createStringNodes = function() {
                  var t, e, n, r, o, s, a, u, c, l;
                  if (null != (u = this.textConfig) ? u.plaintext : void 0)
                    return [document.createTextNode(this.string)];
                  for (
                    a = [],
                      c = this.string.split("\n"),
                      n = e = 0,
                      r = c.length;
                    r > e;
                    n = ++e
                  )
                    (l = c[n]),
                      n > 0 && ((t = i("br")), a.push(t)),
                      (o = l.length) &&
                        ((s = document.createTextNode(this.preserveSpaces(l))),
                        a.push(s));
                  return a;
                }),
                (s.prototype.createElement = function() {
                  var t, e, r, o, s, a, u, c, l;
                  (c = {}), (a = this.attributes);
                  for (o in a)
                    if (
                      ((l = a[o]),
                      (t = n(o)) &&
                        (t.tagName &&
                          ((s = i(t.tagName)),
                          r ? (r.appendChild(s), (r = s)) : (e = r = s)),
                        t.styleProperty && (c[t.styleProperty] = l),
                        t.style))
                    ) {
                      u = t.style;
                      for (o in u) (l = u[o]), (c[o] = l);
                    }
                  if (Object.keys(c).length) {
                    null == e && (e = i("span"));
                    for (o in c) (l = c[o]), (e.style[o] = l);
                  }
                  return e;
                }),
                (s.prototype.createContainerElement = function() {
                  var t, e, r, o, s;
                  o = this.attributes;
                  for (r in o)
                    if (((s = o[r]), (e = n(r)) && e.groupTagName))
                      return (t = {}), (t[r] = s), i(e.groupTagName, t);
                }),
                (a = e.NON_BREAKING_SPACE),
                (s.prototype.preserveSpaces = function(t) {
                  return (
                    this.context.isLast && (t = t.replace(/\ $/, a)),
                    (t = t
                      .replace(/(\S)\ {3}(\S)/g, "$1 " + a + " $2")
                      .replace(/\ {2}/g, a + " ")
                      .replace(/\ {2}/g, " " + a)),
                    (this.context.isFirst || this.context.followsWhitespace) &&
                      (t = t.replace(/^\ /, a)),
                    t
                  );
                }),
                s
              );
            })(e.ObjectView));
        }.call(this),
        function() {
          var t = function(t, e) {
              function i() {
                this.constructor = t;
              }
              for (var r in e) n.call(e, r) && (t[r] = e[r]);
              return (
                (i.prototype = e.prototype),
                (t.prototype = new i()),
                (t.__super__ = e.prototype),
                t
              );
            },
            n = {}.hasOwnProperty;
          e.TextView = (function(n) {
            function i() {
              i.__super__.constructor.apply(this, arguments),
                (this.text = this.object),
                (this.textConfig = this.options.textConfig);
            }
            var r;
            return (
              t(i, n),
              (i.prototype.createNodes = function() {
                var t, n, i, o, s, a, u, c, l, h;
                for (
                  a = [],
                    c = e.ObjectGroup.groupObjects(this.getPieces()),
                    o = c.length - 1,
                    i = n = 0,
                    s = c.length;
                  s > n;
                  i = ++n
                )
                  (u = c[i]),
                    (t = {}),
                    0 === i && (t.isFirst = !0),
                    i === o && (t.isLast = !0),
                    r(l) && (t.followsWhitespace = !0),
                    (h = this.findOrCreateCachedChildView(e.PieceView, u, {
                      textConfig: this.textConfig,
                      context: t
                    })),
                    a.push.apply(a, h.getNodes()),
                    (l = u);
                return a;
              }),
              (i.prototype.getPieces = function() {
                var t, e, n, i, r;
                for (
                  i = this.text.getPieces(), r = [], t = 0, e = i.length;
                  e > t;
                  t++
                )
                  (n = i[t]), n.hasAttribute("blockBreak") || r.push(n);
                return r;
              }),
              (r = function(t) {
                return /\s$/.test(null != t ? t.toString() : void 0);
              }),
              i
            );
          })(e.ObjectView);
        }.call(this),
        function() {
          var t,
            n,
            i,
            r = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) o.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            o = {}.hasOwnProperty;
          (i = e.makeElement),
            (n = e.getBlockConfig),
            (t = e.config.css),
            (e.BlockView = (function(o) {
              function s() {
                s.__super__.constructor.apply(this, arguments),
                  (this.block = this.object),
                  (this.attributes = this.block.getAttributes());
              }
              return (
                r(s, o),
                (s.prototype.createNodes = function() {
                  var t, r, o, s, a, u, c, l, h;
                  if (
                    ((t = document.createComment("block")),
                    (u = [t]),
                    this.block.isEmpty()
                      ? u.push(i("br"))
                      : ((l =
                          null != (c = n(this.block.getLastAttribute()))
                            ? c.text
                            : void 0),
                        (h = this.findOrCreateCachedChildView(
                          e.TextView,
                          this.block.text,
                          { textConfig: l }
                        )),
                        u.push.apply(u, h.getNodes()),
                        this.shouldAddExtraNewlineElement() && u.push(i("br"))),
                    this.attributes.length)
                  )
                    return u;
                  for (
                    r = i(e.config.blockAttributes["default"].tagName),
                      o = 0,
                      s = u.length;
                    s > o;
                    o++
                  )
                    (a = u[o]), r.appendChild(a);
                  return [r];
                }),
                (s.prototype.createContainerElement = function(e) {
                  var r, o, s, a;
                  return (
                    (r = this.attributes[e]),
                    (a = n(r).tagName),
                    (o = { tagName: a }),
                    "attachmentGallery" === r &&
                      ((s = this.block.getBlockBreakPosition()),
                      (o.className =
                        t.attachmentGallery +
                        " " +
                        t.attachmentGallery +
                        "--" +
                        s)),
                    i(o)
                  );
                }),
                (s.prototype.shouldAddExtraNewlineElement = function() {
                  return /\n\n$/.test(this.block.toString());
                }),
                s
              );
            })(e.ObjectView));
        }.call(this),
        function() {
          var t,
            n,
            i = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) r.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            r = {}.hasOwnProperty;
          (t = e.defer),
            (n = e.makeElement),
            (e.DocumentView = (function(r) {
              function o() {
                o.__super__.constructor.apply(this, arguments),
                  (this.element = this.options.element),
                  (this.elementStore = new e.ElementStore()),
                  this.setDocument(this.object);
              }
              var s, a, u;
              return (
                i(o, r),
                (o.render = function(t) {
                  var e, i;
                  return (
                    (e = n("div")),
                    (i = new this(t, { element: e })),
                    i.render(),
                    i.sync(),
                    e
                  );
                }),
                (o.prototype.setDocument = function(t) {
                  return t.isEqualTo(this.document)
                    ? void 0
                    : (this.document = this.object = t);
                }),
                (o.prototype.render = function() {
                  var t, i, r, o, s, a, u;
                  if (
                    ((this.childViews = []),
                    (this.shadowElement = n("div")),
                    !this.document.isEmpty())
                  ) {
                    for (
                      s = e.ObjectGroup.groupObjects(
                        this.document.getBlocks(),
                        { asTree: !0 }
                      ),
                        a = [],
                        t = 0,
                        i = s.length;
                      i > t;
                      t++
                    )
                      (o = s[t]),
                        (u = this.findOrCreateCachedChildView(e.BlockView, o)),
                        a.push(
                          function() {
                            var t, e, n, i;
                            for (
                              n = u.getNodes(), i = [], t = 0, e = n.length;
                              e > t;
                              t++
                            )
                              (r = n[t]),
                                i.push(this.shadowElement.appendChild(r));
                            return i;
                          }.call(this)
                        );
                    return a;
                  }
                }),
                (o.prototype.isSynced = function() {
                  return s(this.shadowElement, this.element);
                }),
                (o.prototype.sync = function() {
                  var t;
                  for (
                    t = this.createDocumentFragmentForSync();
                    this.element.lastChild;

                  )
                    this.element.removeChild(this.element.lastChild);
                  return this.element.appendChild(t), this.didSync();
                }),
                (o.prototype.didSync = function() {
                  return (
                    this.elementStore.reset(a(this.element)),
                    t(
                      (function(t) {
                        return function() {
                          return t.garbageCollectCachedViews();
                        };
                      })(this)
                    )
                  );
                }),
                (o.prototype.createDocumentFragmentForSync = function() {
                  var t, e, n, i, r, o, s, u, c, l;
                  for (
                    e = document.createDocumentFragment(),
                      u = this.shadowElement.childNodes,
                      n = 0,
                      r = u.length;
                    r > n;
                    n++
                  )
                    (s = u[n]), e.appendChild(s.cloneNode(!0));
                  for (c = a(e), i = 0, o = c.length; o > i; i++)
                    (t = c[i]),
                      (l = this.elementStore.remove(t)) &&
                        t.parentNode.replaceChild(l, t);
                  return e;
                }),
                (a = function(t) {
                  return t.querySelectorAll("[data-trix-store-key]");
                }),
                (s = function(t, e) {
                  return u(t.innerHTML) === u(e.innerHTML);
                }),
                (u = function(t) {
                  return t.replace(/&nbsp;/g, " ");
                }),
                o
              );
            })(e.ObjectView));
        }.call(this),
        function() {
          var t,
            n,
            i,
            r,
            o,
            s = function(t, e) {
              return function() {
                return t.apply(e, arguments);
              };
            },
            a = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) u.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            u = {}.hasOwnProperty;
          (i = e.findClosestElementFromNode),
            (r = e.handleEvent),
            (o = e.innerElementIsActive),
            (n = e.defer),
            (t = e.AttachmentView.attachmentSelector),
            (e.CompositionController = (function(u) {
              function c(n, i) {
                (this.element = n),
                  (this.composition = i),
                  (this.didClickAttachment = s(this.didClickAttachment, this)),
                  (this.didBlur = s(this.didBlur, this)),
                  (this.didFocus = s(this.didFocus, this)),
                  (this.documentView = new e.DocumentView(
                    this.composition.document,
                    { element: this.element }
                  )),
                  r("focus", {
                    onElement: this.element,
                    withCallback: this.didFocus
                  }),
                  r("blur", {
                    onElement: this.element,
                    withCallback: this.didBlur
                  }),
                  r("click", {
                    onElement: this.element,
                    matchingSelector: "a[contenteditable=false]",
                    preventDefault: !0
                  }),
                  r("mousedown", {
                    onElement: this.element,
                    matchingSelector: t,
                    withCallback: this.didClickAttachment
                  }),
                  r("click", {
                    onElement: this.element,
                    matchingSelector: "a" + t,
                    preventDefault: !0
                  });
              }
              return (
                a(c, u),
                (c.prototype.didFocus = function() {
                  var t, e, n;
                  return (
                    (t = (function(t) {
                      return function() {
                        var e;
                        return t.focused
                          ? void 0
                          : ((t.focused = !0),
                            null != (e = t.delegate) &&
                            "function" == typeof e.compositionControllerDidFocus
                              ? e.compositionControllerDidFocus()
                              : void 0);
                      };
                    })(this)),
                    null !=
                    (e = null != (n = this.blurPromise) ? n.then(t) : void 0)
                      ? e
                      : t()
                  );
                }),
                (c.prototype.didBlur = function() {
                  return (this.blurPromise = new Promise(
                    (function(t) {
                      return function(e) {
                        return n(function() {
                          var n;
                          return (
                            o(t.element) ||
                              ((t.focused = null),
                              null != (n = t.delegate) &&
                                "function" ==
                                  typeof n.compositionControllerDidBlur &&
                                n.compositionControllerDidBlur()),
                            (t.blurPromise = null),
                            e()
                          );
                        });
                      };
                    })(this)
                  ));
                }),
                (c.prototype.didClickAttachment = function(t, e) {
                  var n, r, o;
                  return (
                    (n = this.findAttachmentForElement(e)),
                    (r =
                      null != i(t.target, { matchingSelector: "figcaption" })),
                    null != (o = this.delegate) &&
                    "function" ==
                      typeof o.compositionControllerDidSelectAttachment
                      ? o.compositionControllerDidSelectAttachment(n, {
                          editCaption: r
                        })
                      : void 0
                  );
                }),
                (c.prototype.getSerializableElement = function() {
                  return this.isEditingAttachment()
                    ? this.documentView.shadowElement
                    : this.element;
                }),
                (c.prototype.render = function() {
                  var t, e, n;
                  return (
                    this.revision !== this.composition.revision &&
                      (this.documentView.setDocument(this.composition.document),
                      this.documentView.render(),
                      (this.revision = this.composition.revision)),
                    this.canSyncDocumentView() &&
                      !this.documentView.isSynced() &&
                      (null != (t = this.delegate) &&
                        "function" ==
                          typeof t.compositionControllerWillSyncDocumentView &&
                        t.compositionControllerWillSyncDocumentView(),
                      this.documentView.sync(),
                      null != (e = this.delegate) &&
                        "function" ==
                          typeof e.compositionControllerDidSyncDocumentView &&
                        e.compositionControllerDidSyncDocumentView()),
                    null != (n = this.delegate) &&
                    "function" == typeof n.compositionControllerDidRender
                      ? n.compositionControllerDidRender()
                      : void 0
                  );
                }),
                (c.prototype.rerenderViewForObject = function(t) {
                  return this.invalidateViewForObject(t), this.render();
                }),
                (c.prototype.invalidateViewForObject = function(t) {
                  return this.documentView.invalidateViewForObject(t);
                }),
                (c.prototype.isViewCachingEnabled = function() {
                  return this.documentView.isViewCachingEnabled();
                }),
                (c.prototype.enableViewCaching = function() {
                  return this.documentView.enableViewCaching();
                }),
                (c.prototype.disableViewCaching = function() {
                  return this.documentView.disableViewCaching();
                }),
                (c.prototype.refreshViewCache = function() {
                  return this.documentView.garbageCollectCachedViews();
                }),
                (c.prototype.isEditingAttachment = function() {
                  return null != this.attachmentEditor;
                }),
                (c.prototype.installAttachmentEditorForAttachment = function(
                  t,
                  n
                ) {
                  var i, r, o;
                  if (
                    (null != (o = this.attachmentEditor)
                      ? o.attachment
                      : void 0) !== t &&
                    (r = this.documentView.findElementForObject(t))
                  )
                    return (
                      this.uninstallAttachmentEditor(),
                      (i = this.composition.document.getAttachmentPieceForAttachment(
                        t
                      )),
                      (this.attachmentEditor = new e.AttachmentEditorController(
                        i,
                        r,
                        this.element,
                        n
                      )),
                      (this.attachmentEditor.delegate = this)
                    );
                }),
                (c.prototype.uninstallAttachmentEditor = function() {
                  var t;
                  return null != (t = this.attachmentEditor)
                    ? t.uninstall()
                    : void 0;
                }),
                (c.prototype.didUninstallAttachmentEditor = function() {
                  return (this.attachmentEditor = null), this.render();
                }),
                (c.prototype.attachmentEditorDidRequestUpdatingAttributesForAttachment = function(
                  t,
                  e
                ) {
                  var n;
                  return (
                    null != (n = this.delegate) &&
                      "function" ==
                        typeof n.compositionControllerWillUpdateAttachment &&
                      n.compositionControllerWillUpdateAttachment(e),
                    this.composition.updateAttributesForAttachment(t, e)
                  );
                }),
                (c.prototype.attachmentEditorDidRequestRemovingAttributeForAttachment = function(
                  t,
                  e
                ) {
                  var n;
                  return (
                    null != (n = this.delegate) &&
                      "function" ==
                        typeof n.compositionControllerWillUpdateAttachment &&
                      n.compositionControllerWillUpdateAttachment(e),
                    this.composition.removeAttributeForAttachment(t, e)
                  );
                }),
                (c.prototype.attachmentEditorDidRequestRemovalOfAttachment = function(
                  t
                ) {
                  var e;
                  return null != (e = this.delegate) &&
                    "function" ==
                      typeof e.compositionControllerDidRequestRemovalOfAttachment
                    ? e.compositionControllerDidRequestRemovalOfAttachment(t)
                    : void 0;
                }),
                (c.prototype.attachmentEditorDidRequestDeselectingAttachment = function(
                  t
                ) {
                  var e;
                  return null != (e = this.delegate) &&
                    "function" ==
                      typeof e.compositionControllerDidRequestDeselectingAttachment
                    ? e.compositionControllerDidRequestDeselectingAttachment(t)
                    : void 0;
                }),
                (c.prototype.canSyncDocumentView = function() {
                  return !this.isEditingAttachment();
                }),
                (c.prototype.findAttachmentForElement = function(t) {
                  return this.composition.document.getAttachmentById(
                    parseInt(t.dataset.trixId, 10)
                  );
                }),
                c
              );
            })(e.BasicObject));
        }.call(this),
        function() {
          var t,
            n,
            i,
            r = function(t, e) {
              return function() {
                return t.apply(e, arguments);
              };
            },
            o = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) s.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            s = {}.hasOwnProperty;
          (n = e.handleEvent),
            (i = e.triggerEvent),
            (t = e.findClosestElementFromNode),
            (e.ToolbarController = (function(e) {
              function s(t) {
                (this.element = t),
                  (this.didKeyDownDialogInput = r(
                    this.didKeyDownDialogInput,
                    this
                  )),
                  (this.didClickDialogButton = r(
                    this.didClickDialogButton,
                    this
                  )),
                  (this.didClickAttributeButton = r(
                    this.didClickAttributeButton,
                    this
                  )),
                  (this.didClickActionButton = r(
                    this.didClickActionButton,
                    this
                  )),
                  (this.attributes = {}),
                  (this.actions = {}),
                  this.resetDialogInputs(),
                  n("mousedown", {
                    onElement: this.element,
                    matchingSelector: a,
                    withCallback: this.didClickActionButton
                  }),
                  n("mousedown", {
                    onElement: this.element,
                    matchingSelector: c,
                    withCallback: this.didClickAttributeButton
                  }),
                  n("click", {
                    onElement: this.element,
                    matchingSelector: y,
                    preventDefault: !0
                  }),
                  n("click", {
                    onElement: this.element,
                    matchingSelector: l,
                    withCallback: this.didClickDialogButton
                  }),
                  n("keydown", {
                    onElement: this.element,
                    matchingSelector: h,
                    withCallback: this.didKeyDownDialogInput
                  });
              }
              var a, u, c, l, h, p, d, f, g, m, y;
              return (
                o(s, e),
                (c = "[data-trix-attribute]"),
                (a = "[data-trix-action]"),
                (y = c + ", " + a),
                (p = "[data-trix-dialog]"),
                (u = p + "[data-trix-active]"),
                (l = p + " [data-trix-method]"),
                (h = p + " [data-trix-input]"),
                (s.prototype.didClickActionButton = function(t, e) {
                  var n, i, r;
                  return (
                    null != (i = this.delegate) && i.toolbarDidClickButton(),
                    t.preventDefault(),
                    (n = d(e)),
                    this.getDialog(n)
                      ? this.toggleDialog(n)
                      : null != (r = this.delegate)
                      ? r.toolbarDidInvokeAction(n)
                      : void 0
                  );
                }),
                (s.prototype.didClickAttributeButton = function(t, e) {
                  var n, i, r;
                  return (
                    null != (i = this.delegate) && i.toolbarDidClickButton(),
                    t.preventDefault(),
                    (n = f(e)),
                    this.getDialog(n)
                      ? this.toggleDialog(n)
                      : null != (r = this.delegate) &&
                        r.toolbarDidToggleAttribute(n),
                    this.refreshAttributeButtons()
                  );
                }),
                (s.prototype.didClickDialogButton = function(e, n) {
                  var i, r;
                  return (
                    (i = t(n, { matchingSelector: p })),
                    (r = n.getAttribute("data-trix-method")),
                    this[r].call(this, i)
                  );
                }),
                (s.prototype.didKeyDownDialogInput = function(t, e) {
                  var n, i;
                  return (
                    13 === t.keyCode &&
                      (t.preventDefault(),
                      (n = e.getAttribute("name")),
                      (i = this.getDialog(n)),
                      this.setAttribute(i)),
                    27 === t.keyCode
                      ? (t.preventDefault(), this.hideDialog())
                      : void 0
                  );
                }),
                (s.prototype.updateActions = function(t) {
                  return (this.actions = t), this.refreshActionButtons();
                }),
                (s.prototype.refreshActionButtons = function() {
                  return this.eachActionButton(
                    (function(t) {
                      return function(e, n) {
                        return (e.disabled = t.actions[n] === !1);
                      };
                    })(this)
                  );
                }),
                (s.prototype.eachActionButton = function(t) {
                  var e, n, i, r, o;
                  for (
                    r = this.element.querySelectorAll(a),
                      o = [],
                      n = 0,
                      i = r.length;
                    i > n;
                    n++
                  )
                    (e = r[n]), o.push(t(e, d(e)));
                  return o;
                }),
                (s.prototype.updateAttributes = function(t) {
                  return (this.attributes = t), this.refreshAttributeButtons();
                }),
                (s.prototype.refreshAttributeButtons = function() {
                  return this.eachAttributeButton(
                    (function(t) {
                      return function(e, n) {
                        return (
                          (e.disabled = t.attributes[n] === !1),
                          t.attributes[n] || t.dialogIsVisible(n)
                            ? (e.setAttribute("data-trix-active", ""),
                              e.classList.add("trix-active"))
                            : (e.removeAttribute("data-trix-active"),
                              e.classList.remove("trix-active"))
                        );
                      };
                    })(this)
                  );
                }),
                (s.prototype.eachAttributeButton = function(t) {
                  var e, n, i, r, o;
                  for (
                    r = this.element.querySelectorAll(c),
                      o = [],
                      n = 0,
                      i = r.length;
                    i > n;
                    n++
                  )
                    (e = r[n]), o.push(t(e, f(e)));
                  return o;
                }),
                (s.prototype.applyKeyboardCommand = function(t) {
                  var e, n, r, o, s, a, u;
                  for (
                    s = JSON.stringify(t.sort()),
                      u = this.element.querySelectorAll("[data-trix-key]"),
                      o = 0,
                      a = u.length;
                    a > o;
                    o++
                  )
                    if (
                      ((e = u[o]),
                      (r = e.getAttribute("data-trix-key").split("+")),
                      (n = JSON.stringify(r.sort())),
                      n === s)
                    )
                      return i("mousedown", { onElement: e }), !0;
                  return !1;
                }),
                (s.prototype.dialogIsVisible = function(t) {
                  var e;
                  return (e = this.getDialog(t))
                    ? e.hasAttribute("data-trix-active")
                    : void 0;
                }),
                (s.prototype.toggleDialog = function(t) {
                  return this.dialogIsVisible(t)
                    ? this.hideDialog()
                    : this.showDialog(t);
                }),
                (s.prototype.showDialog = function(t) {
                  var e, n, i, r, o, s, a, u, c, l;
                  for (
                    this.hideDialog(),
                      null != (a = this.delegate) && a.toolbarWillShowDialog(),
                      i = this.getDialog(t),
                      i.setAttribute("data-trix-active", ""),
                      i.classList.add("trix-active"),
                      u = i.querySelectorAll("input[disabled]"),
                      r = 0,
                      s = u.length;
                    s > r;
                    r++
                  )
                    (n = u[r]), n.removeAttribute("disabled");
                  return (
                    (e = f(i)) &&
                      (o = m(i, t)) &&
                      ((o.value = null != (c = this.attributes[e]) ? c : ""),
                      o.select()),
                    null != (l = this.delegate)
                      ? l.toolbarDidShowDialog(t)
                      : void 0
                  );
                }),
                (s.prototype.setAttribute = function(t) {
                  var e, n, i;
                  return (
                    (e = f(t)),
                    (n = m(t, e)),
                    n.willValidate && !n.checkValidity()
                      ? (n.setAttribute("data-trix-validate", ""),
                        n.classList.add("trix-validate"),
                        n.focus())
                      : (null != (i = this.delegate) &&
                          i.toolbarDidUpdateAttribute(e, n.value),
                        this.hideDialog())
                  );
                }),
                (s.prototype.removeAttribute = function(t) {
                  var e, n;
                  return (
                    (e = f(t)),
                    null != (n = this.delegate) &&
                      n.toolbarDidRemoveAttribute(e),
                    this.hideDialog()
                  );
                }),
                (s.prototype.hideDialog = function() {
                  var t, e;
                  return (t = this.element.querySelector(u))
                    ? (t.removeAttribute("data-trix-active"),
                      t.classList.remove("trix-active"),
                      this.resetDialogInputs(),
                      null != (e = this.delegate)
                        ? e.toolbarDidHideDialog(g(t))
                        : void 0)
                    : void 0;
                }),
                (s.prototype.resetDialogInputs = function() {
                  var t, e, n, i, r;
                  for (
                    i = this.element.querySelectorAll(h),
                      r = [],
                      t = 0,
                      n = i.length;
                    n > t;
                    t++
                  )
                    (e = i[t]),
                      e.setAttribute("disabled", "disabled"),
                      e.removeAttribute("data-trix-validate"),
                      r.push(e.classList.remove("trix-validate"));
                  return r;
                }),
                (s.prototype.getDialog = function(t) {
                  return this.element.querySelector(
                    "[data-trix-dialog=" + t + "]"
                  );
                }),
                (m = function(t, e) {
                  return (
                    null == e && (e = f(t)),
                    t.querySelector("[data-trix-input][name='" + e + "']")
                  );
                }),
                (d = function(t) {
                  return t.getAttribute("data-trix-action");
                }),
                (f = function(t) {
                  var e;
                  return null != (e = t.getAttribute("data-trix-attribute"))
                    ? e
                    : t.getAttribute("data-trix-dialog-attribute");
                }),
                (g = function(t) {
                  return t.getAttribute("data-trix-dialog");
                }),
                s
              );
            })(e.BasicObject));
        }.call(this),
        function() {
          var t = function(t, e) {
              function i() {
                this.constructor = t;
              }
              for (var r in e) n.call(e, r) && (t[r] = e[r]);
              return (
                (i.prototype = e.prototype),
                (t.prototype = new i()),
                (t.__super__ = e.prototype),
                t
              );
            },
            n = {}.hasOwnProperty;
          e.ImagePreloadOperation = (function(e) {
            function n(t) {
              this.url = t;
            }
            return (
              t(n, e),
              (n.prototype.perform = function(t) {
                var e;
                return (
                  (e = new Image()),
                  (e.onload = (function(n) {
                    return function() {
                      return (
                        (e.width = n.width = e.naturalWidth),
                        (e.height = n.height = e.naturalHeight),
                        t(!0, e)
                      );
                    };
                  })(this)),
                  (e.onerror = function() {
                    return t(!1);
                  }),
                  (e.src = this.url)
                );
              }),
              n
            );
          })(e.Operation);
        }.call(this),
        function() {
          var t = function(t, e) {
              return function() {
                return t.apply(e, arguments);
              };
            },
            n = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var r in e) i.call(e, r) && (t[r] = e[r]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            i = {}.hasOwnProperty;
          e.Attachment = (function(i) {
            function r(n) {
              null == n && (n = {}),
                (this.releaseFile = t(this.releaseFile, this)),
                r.__super__.constructor.apply(this, arguments),
                (this.attributes = e.Hash.box(n)),
                this.didChangeAttributes();
            }
            return (
              n(r, i),
              (r.previewablePattern = /^image(\/(gif|png|jpe?g)|$)/),
              (r.attachmentForFile = function(t) {
                var e, n;
                return (
                  (n = this.attributesForFile(t)),
                  (e = new this(n)),
                  e.setFile(t),
                  e
                );
              }),
              (r.attributesForFile = function(t) {
                return new e.Hash({
                  filename: t.name,
                  filesize: t.size,
                  contentType: t.type
                });
              }),
              (r.fromJSON = function(t) {
                return new this(t);
              }),
              (r.prototype.getAttribute = function(t) {
                return this.attributes.get(t);
              }),
              (r.prototype.hasAttribute = function(t) {
                return this.attributes.has(t);
              }),
              (r.prototype.getAttributes = function() {
                return this.attributes.toObject();
              }),
              (r.prototype.setAttributes = function(t) {
                var e, n, i;
                return (
                  null == t && (t = {}),
                  (e = this.attributes.merge(t)),
                  this.attributes.isEqualTo(e)
                    ? void 0
                    : ((this.attributes = e),
                      this.didChangeAttributes(),
                      null != (n = this.previewDelegate) &&
                        "function" == typeof n.attachmentDidChangeAttributes &&
                        n.attachmentDidChangeAttributes(this),
                      null != (i = this.delegate) &&
                      "function" == typeof i.attachmentDidChangeAttributes
                        ? i.attachmentDidChangeAttributes(this)
                        : void 0)
                );
              }),
              (r.prototype.didChangeAttributes = function() {
                return this.isPreviewable() ? this.preloadURL() : void 0;
              }),
              (r.prototype.isPending = function() {
                return null != this.file && !(this.getURL() || this.getHref());
              }),
              (r.prototype.isPreviewable = function() {
                return this.attributes.has("previewable")
                  ? this.attributes.get("previewable")
                  : this.constructor.previewablePattern.test(
                      this.getContentType()
                    );
              }),
              (r.prototype.getType = function() {
                return this.hasContent()
                  ? "content"
                  : this.isPreviewable()
                  ? "preview"
                  : "file";
              }),
              (r.prototype.getURL = function() {
                return this.attributes.get("url");
              }),
              (r.prototype.getHref = function() {
                return this.attributes.get("href");
              }),
              (r.prototype.getFilename = function() {
                var t;
                return null != (t = this.attributes.get("filename")) ? t : "";
              }),
              (r.prototype.getFilesize = function() {
                return this.attributes.get("filesize");
              }),
              (r.prototype.getFormattedFilesize = function() {
                var t;
                return (
                  (t = this.attributes.get("filesize")),
                  "number" == typeof t ? e.config.fileSize.formatter(t) : ""
                );
              }),
              (r.prototype.getExtension = function() {
                var t;
                return null != (t = this.getFilename().match(/\.(\w+)$/))
                  ? t[1].toLowerCase()
                  : void 0;
              }),
              (r.prototype.getContentType = function() {
                return this.attributes.get("contentType");
              }),
              (r.prototype.hasContent = function() {
                return this.attributes.has("content");
              }),
              (r.prototype.getContent = function() {
                return this.attributes.get("content");
              }),
              (r.prototype.getWidth = function() {
                return this.attributes.get("width");
              }),
              (r.prototype.getHeight = function() {
                return this.attributes.get("height");
              }),
              (r.prototype.getFile = function() {
                return this.file;
              }),
              (r.prototype.setFile = function(t) {
                return (
                  (this.file = t),
                  this.isPreviewable() ? this.preloadFile() : void 0
                );
              }),
              (r.prototype.releaseFile = function() {
                return this.releasePreloadedFile(), (this.file = null);
              }),
              (r.prototype.getUploadProgress = function() {
                var t;
                return null != (t = this.uploadProgress) ? t : 0;
              }),
              (r.prototype.setUploadProgress = function(t) {
                var e;
                return this.uploadProgress !== t
                  ? ((this.uploadProgress = t),
                    null != (e = this.uploadProgressDelegate) &&
                    "function" == typeof e.attachmentDidChangeUploadProgress
                      ? e.attachmentDidChangeUploadProgress(this)
                      : void 0)
                  : void 0;
              }),
              (r.prototype.toJSON = function() {
                return this.getAttributes();
              }),
              (r.prototype.getCacheKey = function() {
                return [
                  r.__super__.getCacheKey.apply(this, arguments),
                  this.attributes.getCacheKey(),
                  this.getPreviewURL()
                ].join("/");
              }),
              (r.prototype.getPreviewURL = function() {
                return this.previewURL || this.preloadingURL;
              }),
              (r.prototype.setPreviewURL = function(t) {
                var e, n;
                return t !== this.getPreviewURL()
                  ? ((this.previewURL = t),
                    null != (e = this.previewDelegate) &&
                      "function" == typeof e.attachmentDidChangeAttributes &&
                      e.attachmentDidChangeAttributes(this),
                    null != (n = this.delegate) &&
                    "function" == typeof n.attachmentDidChangePreviewURL
                      ? n.attachmentDidChangePreviewURL(this)
                      : void 0)
                  : void 0;
              }),
              (r.prototype.preloadURL = function() {
                return this.preload(this.getURL(), this.releaseFile);
              }),
              (r.prototype.preloadFile = function() {
                return this.file
                  ? ((this.fileObjectURL = URL.createObjectURL(this.file)),
                    this.preload(this.fileObjectURL))
                  : void 0;
              }),
              (r.prototype.releasePreloadedFile = function() {
                return this.fileObjectURL
                  ? (URL.revokeObjectURL(this.fileObjectURL),
                    (this.fileObjectURL = null))
                  : void 0;
              }),
              (r.prototype.preload = function(t, n) {
                var i;
                return t && t !== this.getPreviewURL()
                  ? ((this.preloadingURL = t),
                    (i = new e.ImagePreloadOperation(t)),
                    i.then(
                      (function(e) {
                        return function(i) {
                          var r, o;
                          return (
                            (o = i.width),
                            (r = i.height),
                            (e.getWidth() && e.getHeight()) ||
                              e.setAttributes({ width: o, height: r }),
                            (e.preloadingURL = null),
                            e.setPreviewURL(t),
                            "function" == typeof n ? n() : void 0
                          );
                        };
                      })(this)
                    ))
                  : void 0;
              }),
              r
            );
          })(e.Object);
        }.call(this),
        function() {
          var t = function(t, e) {
              function i() {
                this.constructor = t;
              }
              for (var r in e) n.call(e, r) && (t[r] = e[r]);
              return (
                (i.prototype = e.prototype),
                (t.prototype = new i()),
                (t.__super__ = e.prototype),
                t
              );
            },
            n = {}.hasOwnProperty;
          e.Piece = (function(n) {
            function i(t, n) {
              null == n && (n = {}),
                i.__super__.constructor.apply(this, arguments),
                (this.attributes = e.Hash.box(n));
            }
            return (
              t(i, n),
              (i.types = {}),
              (i.registerType = function(t, e) {
                return (e.type = t), (this.types[t] = e);
              }),
              (i.fromJSON = function(t) {
                var e;
                return (e = this.types[t.type]) ? e.fromJSON(t) : void 0;
              }),
              (i.prototype.copyWithAttributes = function(t) {
                return new this.constructor(this.getValue(), t);
              }),
              (i.prototype.copyWithAdditionalAttributes = function(t) {
                return this.copyWithAttributes(this.attributes.merge(t));
              }),
              (i.prototype.copyWithoutAttribute = function(t) {
                return this.copyWithAttributes(this.attributes.remove(t));
              }),
              (i.prototype.copy = function() {
                return this.copyWithAttributes(this.attributes);
              }),
              (i.prototype.getAttribute = function(t) {
                return this.attributes.get(t);
              }),
              (i.prototype.getAttributesHash = function() {
                return this.attributes;
              }),
              (i.prototype.getAttributes = function() {
                return this.attributes.toObject();
              }),
              (i.prototype.getCommonAttributes = function() {
                var t, e, n;
                return (n = pieceList.getPieceAtIndex(0))
                  ? ((t = n.attributes),
                    (e = t.getKeys()),
                    pieceList.eachPiece(function(n) {
                      return (
                        (e = t.getKeysCommonToHash(n.attributes)),
                        (t = t.slice(e))
                      );
                    }),
                    t.toObject())
                  : {};
              }),
              (i.prototype.hasAttribute = function(t) {
                return this.attributes.has(t);
              }),
              (i.prototype.hasSameStringValueAsPiece = function(t) {
                return null != t && this.toString() === t.toString();
              }),
              (i.prototype.hasSameAttributesAsPiece = function(t) {
                return (
                  null != t &&
                  (this.attributes === t.attributes ||
                    this.attributes.isEqualTo(t.attributes))
                );
              }),
              (i.prototype.isBlockBreak = function() {
                return !1;
              }),
              (i.prototype.isEqualTo = function(t) {
                return (
                  i.__super__.isEqualTo.apply(this, arguments) ||
                  (this.hasSameConstructorAs(t) &&
                    this.hasSameStringValueAsPiece(t) &&
                    this.hasSameAttributesAsPiece(t))
                );
              }),
              (i.prototype.isEmpty = function() {
                return 0 === this.length;
              }),
              (i.prototype.isSerializable = function() {
                return !0;
              }),
              (i.prototype.toJSON = function() {
                return {
                  type: this.constructor.type,
                  attributes: this.getAttributes()
                };
              }),
              (i.prototype.contentsForInspection = function() {
                return {
                  type: this.constructor.type,
                  attributes: this.attributes.inspect()
                };
              }),
              (i.prototype.canBeGrouped = function() {
                return this.hasAttribute("href");
              }),
              (i.prototype.canBeGroupedWith = function(t) {
                return this.getAttribute("href") === t.getAttribute("href");
              }),
              (i.prototype.getLength = function() {
                return this.length;
              }),
              (i.prototype.canBeConsolidatedWith = function() {
                return !1;
              }),
              i
            );
          })(e.Object);
        }.call(this),
        function() {
          var t = function(t, e) {
              function i() {
                this.constructor = t;
              }
              for (var r in e) n.call(e, r) && (t[r] = e[r]);
              return (
                (i.prototype = e.prototype),
                (t.prototype = new i()),
                (t.__super__ = e.prototype),
                t
              );
            },
            n = {}.hasOwnProperty;
          e.Piece.registerType(
            "attachment",
            (e.AttachmentPiece = (function(n) {
              function i(t) {
                (this.attachment = t),
                  i.__super__.constructor.apply(this, arguments),
                  (this.length = 1),
                  this.ensureAttachmentExclusivelyHasAttribute("href"),
                  this.attachment.hasContent() ||
                    this.removeProhibitedAttributes();
              }
              return (
                t(i, n),
                (i.fromJSON = function(t) {
                  return new this(
                    e.Attachment.fromJSON(t.attachment),
                    t.attributes
                  );
                }),
                (i.permittedAttributes = ["caption", "presentation"]),
                (i.prototype.ensureAttachmentExclusivelyHasAttribute = function(
                  t
                ) {
                  return this.hasAttribute(t)
                    ? (this.attachment.hasAttribute(t) ||
                        this.attachment.setAttributes(this.attributes.slice(t)),
                      (this.attributes = this.attributes.remove(t)))
                    : void 0;
                }),
                (i.prototype.removeProhibitedAttributes = function() {
                  var t;
                  return (
                    (t = this.attributes.slice(
                      this.constructor.permittedAttributes
                    )),
                    t.isEqualTo(this.attributes)
                      ? void 0
                      : (this.attributes = t)
                  );
                }),
                (i.prototype.getValue = function() {
                  return this.attachment;
                }),
                (i.prototype.isSerializable = function() {
                  return !this.attachment.isPending();
                }),
                (i.prototype.getCaption = function() {
                  var t;
                  return null != (t = this.attributes.get("caption")) ? t : "";
                }),
                (i.prototype.isEqualTo = function(t) {
                  var e;
                  return (
                    i.__super__.isEqualTo.apply(this, arguments) &&
                    this.attachment.id ===
                      (null != t && null != (e = t.attachment) ? e.id : void 0)
                  );
                }),
                (i.prototype.toString = function() {
                  return e.OBJECT_REPLACEMENT_CHARACTER;
                }),
                (i.prototype.toJSON = function() {
                  var t;
                  return (
                    (t = i.__super__.toJSON.apply(this, arguments)),
                    (t.attachment = this.attachment),
                    t
                  );
                }),
                (i.prototype.getCacheKey = function() {
                  return [
                    i.__super__.getCacheKey.apply(this, arguments),
                    this.attachment.getCacheKey()
                  ].join("/");
                }),
                (i.prototype.toConsole = function() {
                  return JSON.stringify(this.toString());
                }),
                i
              );
            })(e.Piece))
          );
        }.call(this),
        function() {
          var t,
            n = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var r in e) i.call(e, r) && (t[r] = e[r]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            i = {}.hasOwnProperty;
          (t = e.normalizeNewlines),
            e.Piece.registerType(
              "string",
              (e.StringPiece = (function(e) {
                function i(e) {
                  i.__super__.constructor.apply(this, arguments),
                    (this.string = t(e)),
                    (this.length = this.string.length);
                }
                return (
                  n(i, e),
                  (i.fromJSON = function(t) {
                    return new this(t.string, t.attributes);
                  }),
                  (i.prototype.getValue = function() {
                    return this.string;
                  }),
                  (i.prototype.toString = function() {
                    return this.string.toString();
                  }),
                  (i.prototype.isBlockBreak = function() {
                    return (
                      "\n" === this.toString() &&
                      this.getAttribute("blockBreak") === !0
                    );
                  }),
                  (i.prototype.toJSON = function() {
                    var t;
                    return (
                      (t = i.__super__.toJSON.apply(this, arguments)),
                      (t.string = this.string),
                      t
                    );
                  }),
                  (i.prototype.canBeConsolidatedWith = function(t) {
                    return (
                      null != t &&
                      this.hasSameConstructorAs(t) &&
                      this.hasSameAttributesAsPiece(t)
                    );
                  }),
                  (i.prototype.consolidateWith = function(t) {
                    return new this.constructor(
                      this.toString() + t.toString(),
                      this.attributes
                    );
                  }),
                  (i.prototype.splitAtOffset = function(t) {
                    var e, n;
                    return (
                      0 === t
                        ? ((e = null), (n = this))
                        : t === this.length
                        ? ((e = this), (n = null))
                        : ((e = new this.constructor(
                            this.string.slice(0, t),
                            this.attributes
                          )),
                          (n = new this.constructor(
                            this.string.slice(t),
                            this.attributes
                          ))),
                      [e, n]
                    );
                  }),
                  (i.prototype.toConsole = function() {
                    var t;
                    return (
                      (t = this.string),
                      t.length > 15 && (t = t.slice(0, 14) + "\u2026"),
                      JSON.stringify(t.toString())
                    );
                  }),
                  i
                );
              })(e.Piece))
            );
        }.call(this),
        function() {
          var t,
            n = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var r in e) i.call(e, r) && (t[r] = e[r]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            i = {}.hasOwnProperty,
            r = [].slice;
          (t = e.spliceArray),
            (e.SplittableList = (function(e) {
              function i(t) {
                null == t && (t = []),
                  i.__super__.constructor.apply(this, arguments),
                  (this.objects = t.slice(0)),
                  (this.length = this.objects.length);
              }
              var o, s, a;
              return (
                n(i, e),
                (i.box = function(t) {
                  return t instanceof this ? t : new this(t);
                }),
                (i.prototype.indexOf = function(t) {
                  return this.objects.indexOf(t);
                }),
                (i.prototype.splice = function() {
                  var e;
                  return (
                    (e = 1 <= arguments.length ? r.call(arguments, 0) : []),
                    new this.constructor(
                      t.apply(null, [this.objects].concat(r.call(e)))
                    )
                  );
                }),
                (i.prototype.eachObject = function(t) {
                  var e, n, i, r, o, s;
                  for (
                    o = this.objects, s = [], n = e = 0, i = o.length;
                    i > e;
                    n = ++e
                  )
                    (r = o[n]), s.push(t(r, n));
                  return s;
                }),
                (i.prototype.insertObjectAtIndex = function(t, e) {
                  return this.splice(e, 0, t);
                }),
                (i.prototype.insertSplittableListAtIndex = function(t, e) {
                  return this.splice.apply(
                    this,
                    [e, 0].concat(r.call(t.objects))
                  );
                }),
                (i.prototype.insertSplittableListAtPosition = function(t, e) {
                  var n, i, r;
                  return (
                    (r = this.splitObjectAtPosition(e)),
                    (i = r[0]),
                    (n = r[1]),
                    new this.constructor(i).insertSplittableListAtIndex(t, n)
                  );
                }),
                (i.prototype.editObjectAtIndex = function(t, e) {
                  return this.replaceObjectAtIndex(e(this.objects[t]), t);
                }),
                (i.prototype.replaceObjectAtIndex = function(t, e) {
                  return this.splice(e, 1, t);
                }),
                (i.prototype.removeObjectAtIndex = function(t) {
                  return this.splice(t, 1);
                }),
                (i.prototype.getObjectAtIndex = function(t) {
                  return this.objects[t];
                }),
                (i.prototype.getSplittableListInRange = function(t) {
                  var e, n, i, r;
                  return (
                    (i = this.splitObjectsAtRange(t)),
                    (n = i[0]),
                    (e = i[1]),
                    (r = i[2]),
                    new this.constructor(n.slice(e, r + 1))
                  );
                }),
                (i.prototype.selectSplittableList = function(t) {
                  var e, n;
                  return (
                    (n = function() {
                      var n, i, r, o;
                      for (
                        r = this.objects, o = [], n = 0, i = r.length;
                        i > n;
                        n++
                      )
                        (e = r[n]), t(e) && o.push(e);
                      return o;
                    }.call(this)),
                    new this.constructor(n)
                  );
                }),
                (i.prototype.removeObjectsInRange = function(t) {
                  var e, n, i, r;
                  return (
                    (i = this.splitObjectsAtRange(t)),
                    (n = i[0]),
                    (e = i[1]),
                    (r = i[2]),
                    new this.constructor(n).splice(e, r - e + 1)
                  );
                }),
                (i.prototype.transformObjectsInRange = function(t, e) {
                  var n, i, r, o, s, a, u;
                  return (
                    (s = this.splitObjectsAtRange(t)),
                    (o = s[0]),
                    (i = s[1]),
                    (a = s[2]),
                    (u = (function() {
                      var t, s, u;
                      for (u = [], n = t = 0, s = o.length; s > t; n = ++t)
                        (r = o[n]), u.push(n >= i && a >= n ? e(r) : r);
                      return u;
                    })()),
                    new this.constructor(u)
                  );
                }),
                (i.prototype.splitObjectsAtRange = function(t) {
                  var e, n, i, r, s, u;
                  return (
                    (r = this.splitObjectAtPosition(a(t))),
                    (n = r[0]),
                    (e = r[1]),
                    (i = r[2]),
                    (s = new this.constructor(n).splitObjectAtPosition(
                      o(t) + i
                    )),
                    (n = s[0]),
                    (u = s[1]),
                    [n, e, u - 1]
                  );
                }),
                (i.prototype.getObjectAtPosition = function(t) {
                  var e, n, i;
                  return (
                    (i = this.findIndexAndOffsetAtPosition(t)),
                    (e = i.index),
                    (n = i.offset),
                    this.objects[e]
                  );
                }),
                (i.prototype.splitObjectAtPosition = function(t) {
                  var e, n, i, r, o, s, a, u, c, l;
                  return (
                    (s = this.findIndexAndOffsetAtPosition(t)),
                    (e = s.index),
                    (o = s.offset),
                    (r = this.objects.slice(0)),
                    null != e
                      ? 0 === o
                        ? ((c = e), (l = 0))
                        : ((i = this.getObjectAtIndex(e)),
                          (a = i.splitAtOffset(o)),
                          (n = a[0]),
                          (u = a[1]),
                          r.splice(e, 1, n, u),
                          (c = e + 1),
                          (l = n.getLength() - o))
                      : ((c = r.length), (l = 0)),
                    [r, c, l]
                  );
                }),
                (i.prototype.consolidate = function() {
                  var t, e, n, i, r, o;
                  for (
                    i = [],
                      r = this.objects[0],
                      o = this.objects.slice(1),
                      t = 0,
                      e = o.length;
                    e > t;
                    t++
                  )
                    (n = o[t]),
                      ("function" == typeof r.canBeConsolidatedWith
                      ? r.canBeConsolidatedWith(n)
                      : void 0)
                        ? (r = r.consolidateWith(n))
                        : (i.push(r), (r = n));
                  return null != r && i.push(r), new this.constructor(i);
                }),
                (i.prototype.consolidateFromIndexToIndex = function(t, e) {
                  var n, i, o;
                  return (
                    (i = this.objects.slice(0)),
                    (o = i.slice(t, e + 1)),
                    (n = new this.constructor(o).consolidate().toArray()),
                    this.splice.apply(this, [t, o.length].concat(r.call(n)))
                  );
                }),
                (i.prototype.findIndexAndOffsetAtPosition = function(t) {
                  var e, n, i, r, o, s, a;
                  for (
                    e = 0, a = this.objects, i = n = 0, r = a.length;
                    r > n;
                    i = ++n
                  ) {
                    if (((s = a[i]), (o = e + s.getLength()), t >= e && o > t))
                      return { index: i, offset: t - e };
                    e = o;
                  }
                  return { index: null, offset: null };
                }),
                (i.prototype.findPositionAtIndexAndOffset = function(t, e) {
                  var n, i, r, o, s, a;
                  for (
                    s = 0, a = this.objects, n = i = 0, r = a.length;
                    r > i;
                    n = ++i
                  )
                    if (((o = a[n]), t > n)) s += o.getLength();
                    else if (n === t) {
                      s += e;
                      break;
                    }
                  return s;
                }),
                (i.prototype.getEndPosition = function() {
                  var t, e;
                  return null != this.endPosition
                    ? this.endPosition
                    : (this.endPosition = function() {
                        var n, i, r;
                        for (
                          e = 0, r = this.objects, n = 0, i = r.length;
                          i > n;
                          n++
                        )
                          (t = r[n]), (e += t.getLength());
                        return e;
                      }.call(this));
                }),
                (i.prototype.toString = function() {
                  return this.objects.join("");
                }),
                (i.prototype.toArray = function() {
                  return this.objects.slice(0);
                }),
                (i.prototype.toJSON = function() {
                  return this.toArray();
                }),
                (i.prototype.isEqualTo = function(t) {
                  return (
                    i.__super__.isEqualTo.apply(this, arguments) ||
                    s(this.objects, null != t ? t.objects : void 0)
                  );
                }),
                (s = function(t, e) {
                  var n, i, r, o, s;
                  if ((null == e && (e = []), t.length !== e.length)) return !1;
                  for (s = !0, i = n = 0, r = t.length; r > n; i = ++n)
                    (o = t[i]), s && !o.isEqualTo(e[i]) && (s = !1);
                  return s;
                }),
                (i.prototype.contentsForInspection = function() {
                  var t;
                  return {
                    objects:
                      "[" +
                      function() {
                        var e, n, i, r;
                        for (
                          i = this.objects, r = [], e = 0, n = i.length;
                          n > e;
                          e++
                        )
                          (t = i[e]), r.push(t.inspect());
                        return r;
                      }
                        .call(this)
                        .join(", ") +
                      "]"
                  };
                }),
                (a = function(t) {
                  return t[0];
                }),
                (o = function(t) {
                  return t[1];
                }),
                i
              );
            })(e.Object));
        }.call(this),
        function() {
          var t = function(t, e) {
              function i() {
                this.constructor = t;
              }
              for (var r in e) n.call(e, r) && (t[r] = e[r]);
              return (
                (i.prototype = e.prototype),
                (t.prototype = new i()),
                (t.__super__ = e.prototype),
                t
              );
            },
            n = {}.hasOwnProperty;
          e.Text = (function(n) {
            function i(t) {
              var n;
              null == t && (t = []),
                i.__super__.constructor.apply(this, arguments),
                (this.pieceList = new e.SplittableList(
                  (function() {
                    var e, i, r;
                    for (r = [], e = 0, i = t.length; i > e; e++)
                      (n = t[e]), n.isEmpty() || r.push(n);
                    return r;
                  })()
                ));
            }
            return (
              t(i, n),
              (i.textForAttachmentWithAttributes = function(t, n) {
                var i;
                return (i = new e.AttachmentPiece(t, n)), new this([i]);
              }),
              (i.textForStringWithAttributes = function(t, n) {
                var i;
                return (i = new e.StringPiece(t, n)), new this([i]);
              }),
              (i.fromJSON = function(t) {
                var n, i;
                return (
                  (i = (function() {
                    var i, r, o;
                    for (o = [], i = 0, r = t.length; r > i; i++)
                      (n = t[i]), o.push(e.Piece.fromJSON(n));
                    return o;
                  })()),
                  new this(i)
                );
              }),
              (i.prototype.copy = function() {
                return this.copyWithPieceList(this.pieceList);
              }),
              (i.prototype.copyWithPieceList = function(t) {
                return new this.constructor(t.consolidate().toArray());
              }),
              (i.prototype.copyUsingObjectMap = function(t) {
                var e, n;
                return (
                  (n = function() {
                    var n, i, r, o, s;
                    for (
                      r = this.getPieces(), s = [], n = 0, i = r.length;
                      i > n;
                      n++
                    )
                      (e = r[n]), s.push(null != (o = t.find(e)) ? o : e);
                    return s;
                  }.call(this)),
                  new this.constructor(n)
                );
              }),
              (i.prototype.appendText = function(t) {
                return this.insertTextAtPosition(t, this.getLength());
              }),
              (i.prototype.insertTextAtPosition = function(t, e) {
                return this.copyWithPieceList(
                  this.pieceList.insertSplittableListAtPosition(t.pieceList, e)
                );
              }),
              (i.prototype.removeTextAtRange = function(t) {
                return this.copyWithPieceList(
                  this.pieceList.removeObjectsInRange(t)
                );
              }),
              (i.prototype.replaceTextAtRange = function(t, e) {
                return this.removeTextAtRange(e).insertTextAtPosition(t, e[0]);
              }),
              (i.prototype.moveTextFromRangeToPosition = function(t, e) {
                var n, i;
                if (!(t[0] <= e && e <= t[1]))
                  return (
                    (i = this.getTextAtRange(t)),
                    (n = i.getLength()),
                    t[0] < e && (e -= n),
                    this.removeTextAtRange(t).insertTextAtPosition(i, e)
                  );
              }),
              (i.prototype.addAttributeAtRange = function(t, e, n) {
                var i;
                return (i = {}), (i[t] = e), this.addAttributesAtRange(i, n);
              }),
              (i.prototype.addAttributesAtRange = function(t, e) {
                return this.copyWithPieceList(
                  this.pieceList.transformObjectsInRange(e, function(e) {
                    return e.copyWithAdditionalAttributes(t);
                  })
                );
              }),
              (i.prototype.removeAttributeAtRange = function(t, e) {
                return this.copyWithPieceList(
                  this.pieceList.transformObjectsInRange(e, function(e) {
                    return e.copyWithoutAttribute(t);
                  })
                );
              }),
              (i.prototype.setAttributesAtRange = function(t, e) {
                return this.copyWithPieceList(
                  this.pieceList.transformObjectsInRange(e, function(e) {
                    return e.copyWithAttributes(t);
                  })
                );
              }),
              (i.prototype.getAttributesAtPosition = function(t) {
                var e, n;
                return null !=
                  (e =
                    null != (n = this.pieceList.getObjectAtPosition(t))
                      ? n.getAttributes()
                      : void 0)
                  ? e
                  : {};
              }),
              (i.prototype.getCommonAttributes = function() {
                var t, n;
                return (
                  (t = function() {
                    var t, e, i, r;
                    for (
                      i = this.pieceList.toArray(), r = [], t = 0, e = i.length;
                      e > t;
                      t++
                    )
                      (n = i[t]), r.push(n.getAttributes());
                    return r;
                  }.call(this)),
                  e.Hash.fromCommonAttributesOfObjects(t).toObject()
                );
              }),
              (i.prototype.getCommonAttributesAtRange = function(t) {
                var e;
                return null !=
                  (e = this.getTextAtRange(t).getCommonAttributes())
                  ? e
                  : {};
              }),
              (i.prototype.getExpandedRangeForAttributeAtOffset = function(
                t,
                e
              ) {
                var n, i, r;
                for (
                  n = r = e, i = this.getLength();
                  n > 0 && this.getCommonAttributesAtRange([n - 1, r])[t];

                )
                  n--;
                for (
                  ;
                  i > r && this.getCommonAttributesAtRange([e, r + 1])[t];

                )
                  r++;
                return [n, r];
              }),
              (i.prototype.getTextAtRange = function(t) {
                return this.copyWithPieceList(
                  this.pieceList.getSplittableListInRange(t)
                );
              }),
              (i.prototype.getStringAtRange = function(t) {
                return this.pieceList.getSplittableListInRange(t).toString();
              }),
              (i.prototype.getStringAtPosition = function(t) {
                return this.getStringAtRange([t, t + 1]);
              }),
              (i.prototype.startsWithString = function(t) {
                return this.getStringAtRange([0, t.length]) === t;
              }),
              (i.prototype.endsWithString = function(t) {
                var e;
                return (
                  (e = this.getLength()),
                  this.getStringAtRange([e - t.length, e]) === t
                );
              }),
              (i.prototype.getAttachmentPieces = function() {
                var t, e, n, i, r;
                for (
                  i = this.pieceList.toArray(), r = [], t = 0, e = i.length;
                  e > t;
                  t++
                )
                  (n = i[t]), null != n.attachment && r.push(n);
                return r;
              }),
              (i.prototype.getAttachments = function() {
                var t, e, n, i, r;
                for (
                  i = this.getAttachmentPieces(), r = [], t = 0, e = i.length;
                  e > t;
                  t++
                )
                  (n = i[t]), r.push(n.attachment);
                return r;
              }),
              (i.prototype.getAttachmentAndPositionById = function(t) {
                var e, n, i, r, o, s;
                for (
                  r = 0, o = this.pieceList.toArray(), e = 0, n = o.length;
                  n > e;
                  e++
                ) {
                  if (
                    ((i = o[e]),
                    (null != (s = i.attachment) ? s.id : void 0) === t)
                  )
                    return { attachment: i.attachment, position: r };
                  r += i.length;
                }
                return { attachment: null, position: null };
              }),
              (i.prototype.getAttachmentById = function(t) {
                var e, n, i;
                return (
                  (i = this.getAttachmentAndPositionById(t)),
                  (e = i.attachment),
                  (n = i.position),
                  e
                );
              }),
              (i.prototype.getRangeOfAttachment = function(t) {
                var e, n;
                return (
                  (n = this.getAttachmentAndPositionById(t.id)),
                  (t = n.attachment),
                  (e = n.position),
                  null != t ? [e, e + 1] : void 0
                );
              }),
              (i.prototype.updateAttributesForAttachment = function(t, e) {
                var n;
                return (n = this.getRangeOfAttachment(e))
                  ? this.addAttributesAtRange(t, n)
                  : this;
              }),
              (i.prototype.getLength = function() {
                return this.pieceList.getEndPosition();
              }),
              (i.prototype.isEmpty = function() {
                return 0 === this.getLength();
              }),
              (i.prototype.isEqualTo = function(t) {
                var e;
                return (
                  i.__super__.isEqualTo.apply(this, arguments) ||
                  (null != t && null != (e = t.pieceList)
                    ? e.isEqualTo(this.pieceList)
                    : void 0)
                );
              }),
              (i.prototype.isBlockBreak = function() {
                return (
                  1 === this.getLength() &&
                  this.pieceList.getObjectAtIndex(0).isBlockBreak()
                );
              }),
              (i.prototype.eachPiece = function(t) {
                return this.pieceList.eachObject(t);
              }),
              (i.prototype.getPieces = function() {
                return this.pieceList.toArray();
              }),
              (i.prototype.getPieceAtPosition = function(t) {
                return this.pieceList.getObjectAtPosition(t);
              }),
              (i.prototype.contentsForInspection = function() {
                return { pieceList: this.pieceList.inspect() };
              }),
              (i.prototype.toSerializableText = function() {
                var t;
                return (
                  (t = this.pieceList.selectSplittableList(function(t) {
                    return t.isSerializable();
                  })),
                  this.copyWithPieceList(t)
                );
              }),
              (i.prototype.toString = function() {
                return this.pieceList.toString();
              }),
              (i.prototype.toJSON = function() {
                return this.pieceList.toJSON();
              }),
              (i.prototype.toConsole = function() {
                var t;
                return JSON.stringify(
                  function() {
                    var e, n, i, r;
                    for (
                      i = this.pieceList.toArray(), r = [], e = 0, n = i.length;
                      n > e;
                      e++
                    )
                      (t = i[e]), r.push(JSON.parse(t.toConsole()));
                    return r;
                  }.call(this)
                );
              }),
              i
            );
          })(e.Object);
        }.call(this),
        function() {
          var t,
            n,
            i,
            r,
            o,
            s = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) a.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            a = {}.hasOwnProperty,
            u =
              [].indexOf ||
              function(t) {
                for (var e = 0, n = this.length; n > e; e++)
                  if (e in this && this[e] === t) return e;
                return -1;
              },
            c = [].slice;
          (t = e.arraysAreEqual),
            (o = e.spliceArray),
            (i = e.getBlockConfig),
            (n = e.getBlockAttributeNames),
            (r = e.getListAttributeNames),
            (e.Block = (function(n) {
              function a(t, n) {
                null == t && (t = new e.Text()),
                  null == n && (n = []),
                  a.__super__.constructor.apply(this, arguments),
                  (this.text = h(t)),
                  (this.attributes = n);
              }
              var l, h, p, d, f, g, m, y, v;
              return (
                s(a, n),
                (a.fromJSON = function(t) {
                  var n;
                  return (
                    (n = e.Text.fromJSON(t.text)), new this(n, t.attributes)
                  );
                }),
                (a.prototype.isEmpty = function() {
                  return this.text.isBlockBreak();
                }),
                (a.prototype.isEqualTo = function(e) {
                  return (
                    a.__super__.isEqualTo.apply(this, arguments) ||
                    (this.text.isEqualTo(null != e ? e.text : void 0) &&
                      t(this.attributes, null != e ? e.attributes : void 0))
                  );
                }),
                (a.prototype.copyWithText = function(t) {
                  return new this.constructor(t, this.attributes);
                }),
                (a.prototype.copyWithoutText = function() {
                  return this.copyWithText(null);
                }),
                (a.prototype.copyWithAttributes = function(t) {
                  return new this.constructor(this.text, t);
                }),
                (a.prototype.copyWithoutAttributes = function() {
                  return this.copyWithAttributes(null);
                }),
                (a.prototype.copyUsingObjectMap = function(t) {
                  var e;
                  return this.copyWithText(
                    (e = t.find(this.text))
                      ? e
                      : this.text.copyUsingObjectMap(t)
                  );
                }),
                (a.prototype.addAttribute = function(t) {
                  var e;
                  return (
                    (e = this.attributes.concat(d(t))),
                    this.copyWithAttributes(e)
                  );
                }),
                (a.prototype.removeAttribute = function(t) {
                  var e, n;
                  return (
                    (n = i(t).listAttribute),
                    (e = g(g(this.attributes, t), n)),
                    this.copyWithAttributes(e)
                  );
                }),
                (a.prototype.removeLastAttribute = function() {
                  return this.removeAttribute(this.getLastAttribute());
                }),
                (a.prototype.getLastAttribute = function() {
                  return f(this.attributes);
                }),
                (a.prototype.getAttributes = function() {
                  return this.attributes.slice(0);
                }),
                (a.prototype.getAttributeLevel = function() {
                  return this.attributes.length;
                }),
                (a.prototype.getAttributeAtLevel = function(t) {
                  return this.attributes[t - 1];
                }),
                (a.prototype.hasAttribute = function(t) {
                  return u.call(this.attributes, t) >= 0;
                }),
                (a.prototype.hasAttributes = function() {
                  return this.getAttributeLevel() > 0;
                }),
                (a.prototype.getLastNestableAttribute = function() {
                  return f(this.getNestableAttributes());
                }),
                (a.prototype.getNestableAttributes = function() {
                  var t, e, n, r, o;
                  for (
                    r = this.attributes, o = [], e = 0, n = r.length;
                    n > e;
                    e++
                  )
                    (t = r[e]), i(t).nestable && o.push(t);
                  return o;
                }),
                (a.prototype.getNestingLevel = function() {
                  return this.getNestableAttributes().length;
                }),
                (a.prototype.decreaseNestingLevel = function() {
                  var t;
                  return (t = this.getLastNestableAttribute())
                    ? this.removeAttribute(t)
                    : this;
                }),
                (a.prototype.increaseNestingLevel = function() {
                  var t, e, n;
                  return (t = this.getLastNestableAttribute())
                    ? ((n = this.attributes.lastIndexOf(t)),
                      (e = o.apply(
                        null,
                        [this.attributes, n + 1, 0].concat(c.call(d(t)))
                      )),
                      this.copyWithAttributes(e))
                    : this;
                }),
                (a.prototype.getListItemAttributes = function() {
                  var t, e, n, r, o;
                  for (
                    r = this.attributes, o = [], e = 0, n = r.length;
                    n > e;
                    e++
                  )
                    (t = r[e]), i(t).listAttribute && o.push(t);
                  return o;
                }),
                (a.prototype.isListItem = function() {
                  var t;
                  return null != (t = i(this.getLastAttribute()))
                    ? t.listAttribute
                    : void 0;
                }),
                (a.prototype.isTerminalBlock = function() {
                  var t;
                  return null != (t = i(this.getLastAttribute()))
                    ? t.terminal
                    : void 0;
                }),
                (a.prototype.breaksOnReturn = function() {
                  var t;
                  return null != (t = i(this.getLastAttribute()))
                    ? t.breakOnReturn
                    : void 0;
                }),
                (a.prototype.findLineBreakInDirectionFromPosition = function(
                  t,
                  e
                ) {
                  var n, i;
                  return (
                    (i = this.toString()),
                    (n = (function() {
                      switch (t) {
                        case "forward":
                          return i.indexOf("\n", e);
                        case "backward":
                          return i.slice(0, e).lastIndexOf("\n");
                      }
                    })()),
                    -1 !== n ? n : void 0
                  );
                }),
                (a.prototype.contentsForInspection = function() {
                  return {
                    text: this.text.inspect(),
                    attributes: this.attributes
                  };
                }),
                (a.prototype.toString = function() {
                  return this.text.toString();
                }),
                (a.prototype.toJSON = function() {
                  return { text: this.text, attributes: this.attributes };
                }),
                (a.prototype.getLength = function() {
                  return this.text.getLength();
                }),
                (a.prototype.canBeConsolidatedWith = function(t) {
                  return !this.hasAttributes() && !t.hasAttributes();
                }),
                (a.prototype.consolidateWith = function(t) {
                  var n, i;
                  return (
                    (n = e.Text.textForStringWithAttributes("\n")),
                    (i = this.getTextWithoutBlockBreak().appendText(n)),
                    this.copyWithText(i.appendText(t.text))
                  );
                }),
                (a.prototype.splitAtOffset = function(t) {
                  var e, n;
                  return (
                    0 === t
                      ? ((e = null), (n = this))
                      : t === this.getLength()
                      ? ((e = this), (n = null))
                      : ((e = this.copyWithText(
                          this.text.getTextAtRange([0, t])
                        )),
                        (n = this.copyWithText(
                          this.text.getTextAtRange([t, this.getLength()])
                        ))),
                    [e, n]
                  );
                }),
                (a.prototype.getBlockBreakPosition = function() {
                  return this.text.getLength() - 1;
                }),
                (a.prototype.getTextWithoutBlockBreak = function() {
                  return m(this.text)
                    ? this.text.getTextAtRange([
                        0,
                        this.getBlockBreakPosition()
                      ])
                    : this.text.copy();
                }),
                (a.prototype.canBeGrouped = function(t) {
                  return this.attributes[t];
                }),
                (a.prototype.canBeGroupedWith = function(t, e) {
                  var n, o, s, a;
                  return (
                    (s = t.getAttributes()),
                    (o = s[e]),
                    (n = this.attributes[e]),
                    n === o &&
                      !(
                        i(n).group === !1 &&
                        ((a = s[e + 1]), u.call(r(), a) < 0)
                      )
                  );
                }),
                (h = function(t) {
                  return (t = v(t)), (t = l(t));
                }),
                (v = function(t) {
                  var n, i, r, o, s, a;
                  return (
                    (o = !1),
                    (a = t.getPieces()),
                    (i =
                      2 <= a.length
                        ? c.call(a, 0, (n = a.length - 1))
                        : ((n = 0), [])),
                    (r = a[n++]),
                    null == r
                      ? t
                      : ((i = (function() {
                          var t, e, n;
                          for (n = [], t = 0, e = i.length; e > t; t++)
                            (s = i[t]),
                              s.isBlockBreak()
                                ? ((o = !0), n.push(y(s)))
                                : n.push(s);
                          return n;
                        })()),
                        o ? new e.Text(c.call(i).concat([r])) : t)
                  );
                }),
                (p = e.Text.textForStringWithAttributes("\n", {
                  blockBreak: !0
                })),
                (l = function(t) {
                  return m(t) ? t : t.appendText(p);
                }),
                (m = function(t) {
                  var e, n;
                  return (
                    (n = t.getLength()),
                    0 === n
                      ? !1
                      : ((e = t.getTextAtRange([n - 1, n])), e.isBlockBreak())
                  );
                }),
                (y = function(t) {
                  return t.copyWithoutAttribute("blockBreak");
                }),
                (d = function(t) {
                  var e;
                  return (e = i(t).listAttribute), null != e ? [e, t] : [t];
                }),
                (f = function(t) {
                  return t.slice(-1)[0];
                }),
                (g = function(t, e) {
                  var n;
                  return (n = t.lastIndexOf(e)), -1 === n ? t : o(t, n, 1);
                }),
                a
              );
            })(e.Object));
        }.call(this),
        function() {
          var t,
            n,
            i,
            r = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) o.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            o = {}.hasOwnProperty,
            s = [].slice,
            a =
              [].indexOf ||
              function(t) {
                for (var e = 0, n = this.length; n > e; e++)
                  if (e in this && this[e] === t) return e;
                return -1;
              };
          (n = e.tagName),
            (i = e.walkTree),
            (t = e.nodeIsAttachmentElement),
            (e.HTMLSanitizer = (function(o) {
              function u(t, e) {
                (this.allowedAttributes = (null != e
                  ? e
                  : {}
                ).allowedAttributes),
                  null == this.allowedAttributes &&
                    (this.allowedAttributes = c),
                  (this.body = l(t));
              }
              var c, l, h;
              return (
                r(u, o),
                (c = "style href src width height class".split(" ")),
                (u.sanitize = function(t, e) {
                  var n;
                  return (n = new this(t, e)), n.sanitize(), n;
                }),
                (u.prototype.sanitize = function() {
                  return (
                    this.sanitizeElements(), this.normalizeListElementNesting()
                  );
                }),
                (u.prototype.getHTML = function() {
                  return this.body.innerHTML;
                }),
                (u.prototype.getBody = function() {
                  return this.body;
                }),
                (u.prototype.sanitizeElements = function() {
                  var t, n, r, o, s;
                  for (s = i(this.body), o = []; s.nextNode(); )
                    switch (((r = s.currentNode), r.nodeType)) {
                      case Node.ELEMENT_NODE:
                        h(r) ? o.push(r) : this.sanitizeElement(r);
                        break;
                      case Node.COMMENT_NODE:
                        o.push(r);
                    }
                  for (t = 0, n = o.length; n > t; t++)
                    (r = o[t]), e.removeNode(r);
                  return this.body;
                }),
                (u.prototype.sanitizeElement = function(t) {
                  var e, n, i, r;
                  for (
                    r = s.call(t.attributes), e = 0, n = r.length;
                    n > e;
                    e++
                  )
                    (i = r[e].name),
                      a.call(this.allowedAttributes, i) >= 0 ||
                        0 === i.indexOf("data-trix") ||
                        t.removeAttribute(i);
                  return t;
                }),
                (u.prototype.normalizeListElementNesting = function() {
                  var t, e, i, r, o;
                  for (
                    o = s.call(this.body.querySelectorAll("ul,ol")),
                      t = 0,
                      e = o.length;
                    e > t;
                    t++
                  )
                    (i = o[t]),
                      (r = i.previousElementSibling) &&
                        "li" === n(r) &&
                        r.appendChild(i);
                  return this.body;
                }),
                (h = function(e) {
                  return (null != e ? e.nodeType : void 0) !==
                    Node.ELEMENT_NODE || t(e)
                    ? void 0
                    : "script" === n(e) ||
                        "false" === e.getAttribute("data-trix-serialize");
                }),
                (l = function(t) {
                  var e, n, i, r, o;
                  for (
                    null == t && (t = ""),
                      t = t.replace(/<\/html[^>]*>[^]*$/i, "</html>"),
                      e = document.implementation.createHTMLDocument(""),
                      e.documentElement.innerHTML = t,
                      o = e.head.querySelectorAll("style"),
                      i = 0,
                      r = o.length;
                    r > i;
                    i++
                  )
                    (n = o[i]), e.body.appendChild(n);
                  return e.body;
                }),
                u
              );
            })(e.BasicObject));
        }.call(this),
        function() {
          var t,
            n,
            i,
            r,
            o,
            s,
            a,
            u,
            c,
            l,
            h,
            p = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) d.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            d = {}.hasOwnProperty,
            f =
              [].indexOf ||
              function(t) {
                for (var e = 0, n = this.length; n > e; e++)
                  if (e in this && this[e] === t) return e;
                return -1;
              };
          (t = e.arraysAreEqual),
            (s = e.makeElement),
            (l = e.tagName),
            (o = e.getBlockTagNames),
            (h = e.walkTree),
            (r = e.findClosestElementFromNode),
            (i = e.elementContainsNode),
            (a = e.nodeIsAttachmentElement),
            (u = e.normalizeSpaces),
            (n = e.breakableWhitespacePattern),
            (c = e.squishBreakableWhitespace),
            (e.HTMLParser = (function(d) {
              function g(t, e) {
                (this.html = t),
                  (this.referenceElement = (null != e
                    ? e
                    : {}
                  ).referenceElement),
                  (this.blocks = []),
                  (this.blockElements = []),
                  (this.processedElements = []);
              }
              var m, y, v, b, A, x, C, S, R, k, E, w;
              return (
                p(g, d),
                (g.parse = function(t, e) {
                  var n;
                  return (n = new this(t, e)), n.parse(), n;
                }),
                (g.prototype.getDocument = function() {
                  return e.Document.fromJSON(this.blocks);
                }),
                (g.prototype.parse = function() {
                  var t, n;
                  try {
                    for (
                      this.createHiddenContainer(),
                        t = e.HTMLSanitizer.sanitize(this.html).getHTML(),
                        this.containerElement.innerHTML = t,
                        n = h(this.containerElement, { usingFilter: S });
                      n.nextNode();

                    )
                      this.processNode(n.currentNode);
                    return this.translateBlockElementMarginsToNewlines();
                  } finally {
                    this.removeHiddenContainer();
                  }
                }),
                (g.prototype.createHiddenContainer = function() {
                  return this.referenceElement
                    ? ((this.containerElement = this.referenceElement.cloneNode(
                        !1
                      )),
                      this.containerElement.removeAttribute("id"),
                      this.containerElement.setAttribute(
                        "data-trix-internal",
                        ""
                      ),
                      (this.containerElement.style.display = "none"),
                      this.referenceElement.parentNode.insertBefore(
                        this.containerElement,
                        this.referenceElement.nextSibling
                      ))
                    : ((this.containerElement = s({
                        tagName: "div",
                        style: { display: "none" }
                      })),
                      document.body.appendChild(this.containerElement));
                }),
                (g.prototype.removeHiddenContainer = function() {
                  return e.removeNode(this.containerElement);
                }),
                (S = function(t) {
                  return "style" === l(t)
                    ? NodeFilter.FILTER_REJECT
                    : NodeFilter.FILTER_ACCEPT;
                }),
                (g.prototype.processNode = function(t) {
                  switch (t.nodeType) {
                    case Node.TEXT_NODE:
                      if (!this.isInsignificantTextNode(t))
                        return (
                          this.appendBlockForTextNode(t),
                          this.processTextNode(t)
                        );
                      break;
                    case Node.ELEMENT_NODE:
                      return (
                        this.appendBlockForElement(t), this.processElement(t)
                      );
                  }
                }),
                (g.prototype.appendBlockForTextNode = function(e) {
                  var n, i, r;
                  return (
                    (i = e.parentNode),
                    i !== this.currentBlockElement && this.isBlockElement(i)
                      ? ((n = this.getBlockAttributes(i)),
                        t(
                          n,
                          null != (r = this.currentBlock)
                            ? r.attributes
                            : void 0
                        )
                          ? void 0
                          : ((this.currentBlock = this.appendBlockForAttributesWithElement(
                              n,
                              i
                            )),
                            (this.currentBlockElement = i)))
                      : void 0
                  );
                }),
                (g.prototype.appendBlockForElement = function(e) {
                  var n, r, o, s;
                  if (
                    ((o = this.isBlockElement(e)),
                    (r = i(this.currentBlockElement, e)),
                    o && !this.isBlockElement(e.firstChild))
                  ) {
                    if (
                      !(
                        (this.isInsignificantTextNode(e.firstChild) &&
                          this.isBlockElement(e.firstElementChild)) ||
                        ((n = this.getBlockAttributes(e)),
                        r && t(n, this.currentBlock.attributes))
                      )
                    )
                      return (
                        (this.currentBlock = this.appendBlockForAttributesWithElement(
                          n,
                          e
                        )),
                        (this.currentBlockElement = e)
                      );
                  } else if (this.currentBlockElement && !r && !o)
                    return (s = this.findParentBlockElement(e))
                      ? this.appendBlockForElement(s)
                      : ((this.currentBlock = this.appendEmptyBlock()),
                        (this.currentBlockElement = null));
                }),
                (g.prototype.findParentBlockElement = function(t) {
                  var e;
                  for (
                    e = t.parentElement;
                    e && e !== this.containerElement;

                  ) {
                    if (
                      this.isBlockElement(e) &&
                      f.call(this.blockElements, e) >= 0
                    )
                      return e;
                    e = e.parentElement;
                  }
                  return null;
                }),
                (g.prototype.processTextNode = function(t) {
                  var e, n;
                  return (
                    (n = t.data),
                    y(t.parentNode) ||
                      ((n = c(n)),
                      E(
                        null != (e = t.previousSibling) ? e.textContent : void 0
                      ) && (n = x(n))),
                    this.appendStringWithAttributes(
                      n,
                      this.getTextAttributes(t.parentNode)
                    )
                  );
                }),
                (g.prototype.processElement = function(t) {
                  var e, n, i, r, o;
                  if (a(t))
                    return (
                      (e = v(t)),
                      Object.keys(e).length &&
                        ((r = this.getTextAttributes(t)),
                        this.appendAttachmentWithAttributes(e, r),
                        (t.innerHTML = "")),
                      this.processedElements.push(t)
                    );
                  switch (l(t)) {
                    case "br":
                      return (
                        this.isExtraBR(t) ||
                          this.isBlockElement(t.nextSibling) ||
                          this.appendStringWithAttributes(
                            "\n",
                            this.getTextAttributes(t)
                          ),
                        this.processedElements.push(t)
                      );
                    case "img":
                      (e = {
                        url: t.getAttribute("src"),
                        contentType: "image"
                      }),
                        (i = A(t));
                      for (n in i) (o = i[n]), (e[n] = o);
                      return (
                        this.appendAttachmentWithAttributes(
                          e,
                          this.getTextAttributes(t)
                        ),
                        this.processedElements.push(t)
                      );
                    case "tr":
                      if (t.parentNode.firstChild !== t)
                        return this.appendStringWithAttributes("\n");
                      break;
                    case "td":
                      if (t.parentNode.firstChild !== t)
                        return this.appendStringWithAttributes(" | ");
                  }
                }),
                (g.prototype.appendBlockForAttributesWithElement = function(
                  t,
                  e
                ) {
                  var n;
                  return (
                    this.blockElements.push(e),
                    (n = m(t)),
                    this.blocks.push(n),
                    n
                  );
                }),
                (g.prototype.appendEmptyBlock = function() {
                  return this.appendBlockForAttributesWithElement([], null);
                }),
                (g.prototype.appendStringWithAttributes = function(t, e) {
                  return this.appendPiece(k(t, e));
                }),
                (g.prototype.appendAttachmentWithAttributes = function(t, e) {
                  return this.appendPiece(R(t, e));
                }),
                (g.prototype.appendPiece = function(t) {
                  return (
                    0 === this.blocks.length && this.appendEmptyBlock(),
                    this.blocks[this.blocks.length - 1].text.push(t)
                  );
                }),
                (g.prototype.appendStringToTextAtIndex = function(t, e) {
                  var n, i;
                  return (
                    (i = this.blocks[e].text),
                    (n = i[i.length - 1]),
                    "string" === (null != n ? n.type : void 0)
                      ? (n.string += t)
                      : i.push(k(t))
                  );
                }),
                (g.prototype.prependStringToTextAtIndex = function(t, e) {
                  var n, i;
                  return (
                    (i = this.blocks[e].text),
                    (n = i[0]),
                    "string" === (null != n ? n.type : void 0)
                      ? (n.string = t + n.string)
                      : i.unshift(k(t))
                  );
                }),
                (k = function(t, e) {
                  var n;
                  return (
                    null == e && (e = {}),
                    (n = "string"),
                    (t = u(t)),
                    { string: t, attributes: e, type: n }
                  );
                }),
                (R = function(t, e) {
                  var n;
                  return (
                    null == e && (e = {}),
                    (n = "attachment"),
                    { attachment: t, attributes: e, type: n }
                  );
                }),
                (m = function(t) {
                  var e;
                  return (
                    null == t && (t = {}), (e = []), { text: e, attributes: t }
                  );
                }),
                (g.prototype.getTextAttributes = function(t) {
                  var n, i, o, s, u, c, l, h, p, d, f, g, m;
                  (o = {}), (d = e.config.textAttributes);
                  for (n in d)
                    if (
                      ((u = d[n]),
                      u.tagName &&
                        r(t, {
                          matchingSelector: u.tagName,
                          untilNode: this.containerElement
                        }))
                    )
                      o[n] = !0;
                    else if (u.parser) {
                      if ((m = u.parser(t))) {
                        for (
                          i = !1,
                            f = this.findBlockElementAncestors(t),
                            c = 0,
                            p = f.length;
                          p > c;
                          c++
                        )
                          if (((s = f[c]), u.parser(s) === m)) {
                            i = !0;
                            break;
                          }
                        i || (o[n] = m);
                      }
                    } else
                      u.styleProperty &&
                        (m = t.style[u.styleProperty]) &&
                        (o[n] = m);
                  if (a(t) && (l = t.getAttribute("data-trix-attributes"))) {
                    g = JSON.parse(l);
                    for (h in g) (m = g[h]), (o[h] = m);
                  }
                  return o;
                }),
                (g.prototype.getBlockAttributes = function(t) {
                  var n, i, r, o;
                  for (i = []; t && t !== this.containerElement; ) {
                    o = e.config.blockAttributes;
                    for (n in o)
                      (r = o[n]),
                        r.parse !== !1 &&
                          l(t) === r.tagName &&
                          (("function" == typeof r.test ? r.test(t) : void 0) ||
                            !r.test) &&
                          (i.push(n),
                          r.listAttribute && i.push(r.listAttribute));
                    t = t.parentNode;
                  }
                  return i.reverse();
                }),
                (g.prototype.findBlockElementAncestors = function(t) {
                  var e, n;
                  for (e = []; t && t !== this.containerElement; )
                    (n = l(t)),
                      f.call(o(), n) >= 0 && e.push(t),
                      (t = t.parentNode);
                  return e;
                }),
                (v = function(t) {
                  return JSON.parse(t.getAttribute("data-trix-attachment"));
                }),
                (A = function(t) {
                  var e, n, i;
                  return (
                    (i = t.getAttribute("width")),
                    (n = t.getAttribute("height")),
                    (e = {}),
                    i && (e.width = parseInt(i, 10)),
                    n && (e.height = parseInt(n, 10)),
                    e
                  );
                }),
                (g.prototype.isBlockElement = function(t) {
                  var e;
                  if (
                    (null != t ? t.nodeType : void 0) === Node.ELEMENT_NODE &&
                    !a(t) &&
                    !r(t, {
                      matchingSelector: "td",
                      untilNode: this.containerElement
                    })
                  )
                    return (
                      (e = l(t)),
                      f.call(o(), e) >= 0 ||
                        "block" === window.getComputedStyle(t).display
                    );
                }),
                (g.prototype.isInsignificantTextNode = function(t) {
                  var e, n, i;
                  if (
                    (null != t ? t.nodeType : void 0) === Node.TEXT_NODE &&
                    w(t.data) &&
                    ((n = t.parentNode),
                    (i = t.previousSibling),
                    (e = t.nextSibling),
                    (!C(n.previousSibling) ||
                      this.isBlockElement(n.previousSibling)) &&
                      !y(n))
                  )
                    return (
                      !i ||
                      this.isBlockElement(i) ||
                      !e ||
                      this.isBlockElement(e)
                    );
                }),
                (g.prototype.isExtraBR = function(t) {
                  return (
                    "br" === l(t) &&
                    this.isBlockElement(t.parentNode) &&
                    t.parentNode.lastChild === t
                  );
                }),
                (y = function(t) {
                  var e;
                  return (
                    (e = window.getComputedStyle(t).whiteSpace),
                    "pre" === e || "pre-wrap" === e || "pre-line" === e
                  );
                }),
                (C = function(t) {
                  return t && !E(t.textContent);
                }),
                (g.prototype.translateBlockElementMarginsToNewlines = function() {
                  var t, e, n, i, r, o, s, a;
                  for (
                    e = this.getMarginOfDefaultBlockElement(),
                      s = this.blocks,
                      a = [],
                      i = n = 0,
                      r = s.length;
                    r > n;
                    i = ++n
                  )
                    (t = s[i]),
                      (o = this.getMarginOfBlockElementAtIndex(i)) &&
                        (o.top > 2 * e.top &&
                          this.prependStringToTextAtIndex("\n", i),
                        a.push(
                          o.bottom > 2 * e.bottom
                            ? this.appendStringToTextAtIndex("\n", i)
                            : void 0
                        ));
                  return a;
                }),
                (g.prototype.getMarginOfBlockElementAtIndex = function(t) {
                  var e, n;
                  return !(e = this.blockElements[t]) ||
                    !e.textContent ||
                    ((n = l(e)),
                    f.call(o(), n) >= 0 ||
                      f.call(this.processedElements, e) >= 0)
                    ? void 0
                    : b(e);
                }),
                (g.prototype.getMarginOfDefaultBlockElement = function() {
                  var t;
                  return (
                    (t = s(e.config.blockAttributes["default"].tagName)),
                    this.containerElement.appendChild(t),
                    b(t)
                  );
                }),
                (b = function(t) {
                  var e;
                  return (
                    (e = window.getComputedStyle(t)),
                    "block" === e.display
                      ? {
                          top: parseInt(e.marginTop),
                          bottom: parseInt(e.marginBottom)
                        }
                      : void 0
                  );
                }),
                (x = function(t) {
                  return t.replace(RegExp("^" + n.source + "+"), "");
                }),
                (w = function(t) {
                  return RegExp("^" + n.source + "*$").test(t);
                }),
                (E = function(t) {
                  return /\s$/.test(t);
                }),
                g
              );
            })(e.BasicObject));
        }.call(this),
        function() {
          var t,
            n,
            i,
            r,
            o = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) s.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            s = {}.hasOwnProperty,
            a = [].slice,
            u =
              [].indexOf ||
              function(t) {
                for (var e = 0, n = this.length; n > e; e++)
                  if (e in this && this[e] === t) return e;
                return -1;
              };
          (t = e.arraysAreEqual),
            (i = e.normalizeRange),
            (r = e.rangeIsCollapsed),
            (n = e.getBlockConfig),
            (e.Document = (function(s) {
              function c(t) {
                null == t && (t = []),
                  c.__super__.constructor.apply(this, arguments),
                  0 === t.length && (t = [new e.Block()]),
                  (this.blockList = e.SplittableList.box(t));
              }
              var l;
              return (
                o(c, s),
                (c.fromJSON = function(t) {
                  var n, i;
                  return (
                    (i = (function() {
                      var i, r, o;
                      for (o = [], i = 0, r = t.length; r > i; i++)
                        (n = t[i]), o.push(e.Block.fromJSON(n));
                      return o;
                    })()),
                    new this(i)
                  );
                }),
                (c.fromHTML = function(t, n) {
                  return e.HTMLParser.parse(t, n).getDocument();
                }),
                (c.fromString = function(t, n) {
                  var i;
                  return (
                    (i = e.Text.textForStringWithAttributes(t, n)),
                    new this([new e.Block(i)])
                  );
                }),
                (c.prototype.isEmpty = function() {
                  var t;
                  return (
                    1 === this.blockList.length &&
                    ((t = this.getBlockAtIndex(0)),
                    t.isEmpty() && !t.hasAttributes())
                  );
                }),
                (c.prototype.copy = function(t) {
                  var e;
                  return (
                    null == t && (t = {}),
                    (e = t.consolidateBlocks
                      ? this.blockList.consolidate().toArray()
                      : this.blockList.toArray()),
                    new this.constructor(e)
                  );
                }),
                (c.prototype.copyUsingObjectsFromDocument = function(t) {
                  var n;
                  return (
                    (n = new e.ObjectMap(t.getObjects())),
                    this.copyUsingObjectMap(n)
                  );
                }),
                (c.prototype.copyUsingObjectMap = function(t) {
                  var e, n, i;
                  return (
                    (n = function() {
                      var n, r, o, s;
                      for (
                        o = this.getBlocks(), s = [], n = 0, r = o.length;
                        r > n;
                        n++
                      )
                        (e = o[n]),
                          s.push((i = t.find(e)) ? i : e.copyUsingObjectMap(t));
                      return s;
                    }.call(this)),
                    new this.constructor(n)
                  );
                }),
                (c.prototype.copyWithBaseBlockAttributes = function(t) {
                  var e, n, i;
                  return (
                    null == t && (t = []),
                    (i = function() {
                      var i, r, o, s;
                      for (
                        o = this.getBlocks(), s = [], i = 0, r = o.length;
                        r > i;
                        i++
                      )
                        (n = o[i]),
                          (e = t.concat(n.getAttributes())),
                          s.push(n.copyWithAttributes(e));
                      return s;
                    }.call(this)),
                    new this.constructor(i)
                  );
                }),
                (c.prototype.replaceBlock = function(t, e) {
                  var n;
                  return (
                    (n = this.blockList.indexOf(t)),
                    -1 === n
                      ? this
                      : new this.constructor(
                          this.blockList.replaceObjectAtIndex(e, n)
                        )
                  );
                }),
                (c.prototype.insertDocumentAtRange = function(t, e) {
                  var n, o, s, a, u, c, l;
                  return (
                    (o = t.blockList),
                    (u = (e = i(e))[0]),
                    (c = this.locationFromPosition(u)),
                    (s = c.index),
                    (a = c.offset),
                    (l = this),
                    (n = this.getBlockAtPosition(u)),
                    r(e) && n.isEmpty() && !n.hasAttributes()
                      ? (l = new this.constructor(
                          l.blockList.removeObjectAtIndex(s)
                        ))
                      : n.getBlockBreakPosition() === a && u++,
                    (l = l.removeTextAtRange(e)),
                    new this.constructor(
                      l.blockList.insertSplittableListAtPosition(o, u)
                    )
                  );
                }),
                (c.prototype.mergeDocumentAtRange = function(e, n) {
                  var r, o, s, a, u, c, l, h, p, d, f, g;
                  return (
                    (f = (n = i(n))[0]),
                    (d = this.locationFromPosition(f)),
                    (o = this.getBlockAtIndex(d.index).getAttributes()),
                    (r = e.getBaseBlockAttributes()),
                    (g = o.slice(-r.length)),
                    t(r, g)
                      ? ((l = o.slice(0, -r.length)),
                        (c = e.copyWithBaseBlockAttributes(l)))
                      : (c = e
                          .copy({ consolidateBlocks: !0 })
                          .copyWithBaseBlockAttributes(o)),
                    (s = c.getBlockCount()),
                    (a = c.getBlockAtIndex(0)),
                    t(o, a.getAttributes())
                      ? ((u = a.getTextWithoutBlockBreak()),
                        (p = this.insertTextAtRange(u, n)),
                        s > 1 &&
                          ((c = new this.constructor(c.getBlocks().slice(1))),
                          (h = f + u.getLength()),
                          (p = p.insertDocumentAtRange(c, h))))
                      : (p = this.insertDocumentAtRange(c, n)),
                    p
                  );
                }),
                (c.prototype.insertTextAtRange = function(t, e) {
                  var n, r, o, s, a;
                  return (
                    (a = (e = i(e))[0]),
                    (s = this.locationFromPosition(a)),
                    (r = s.index),
                    (o = s.offset),
                    (n = this.removeTextAtRange(e)),
                    new this.constructor(
                      n.blockList.editObjectAtIndex(r, function(e) {
                        return e.copyWithText(
                          e.text.insertTextAtPosition(t, o)
                        );
                      })
                    )
                  );
                }),
                (c.prototype.removeTextAtRange = function(t) {
                  var e,
                    n,
                    o,
                    s,
                    a,
                    u,
                    c,
                    l,
                    h,
                    p,
                    d,
                    f,
                    g,
                    m,
                    y,
                    v,
                    b,
                    A,
                    x,
                    C,
                    S;
                  return (
                    (p = t = i(t)),
                    (l = p[0]),
                    (A = p[1]),
                    r(t)
                      ? this
                      : ((d = this.locationRangeFromRange(t)),
                        (u = d[0]),
                        (v = d[1]),
                        (a = u.index),
                        (c = u.offset),
                        (s = this.getBlockAtIndex(a)),
                        (y = v.index),
                        (b = v.offset),
                        (m = this.getBlockAtIndex(y)),
                        (f =
                          A - l === 1 &&
                          s.getBlockBreakPosition() === c &&
                          m.getBlockBreakPosition() !== b &&
                          "\n" === m.text.getStringAtPosition(b)),
                        f
                          ? (o = this.blockList.editObjectAtIndex(y, function(
                              t
                            ) {
                              return t.copyWithText(
                                t.text.removeTextAtRange([b, b + 1])
                              );
                            }))
                          : ((h = s.text.getTextAtRange([0, c])),
                            (x = m.text.getTextAtRange([b, m.getLength()])),
                            (C = h.appendText(x)),
                            (g = a !== y && 0 === c),
                            (S =
                              g &&
                              s.getAttributeLevel() >= m.getAttributeLevel()),
                            (n = S ? m.copyWithText(C) : s.copyWithText(C)),
                            (e = y + 1 - a),
                            (o = this.blockList.splice(a, e, n))),
                        new this.constructor(o))
                  );
                }),
                (c.prototype.moveTextFromRangeToPosition = function(t, e) {
                  var n, r, o, s, u, c, l, h, p, d;
                  return (
                    (c = t = i(t)),
                    (p = c[0]),
                    (o = c[1]),
                    e >= p && o >= e
                      ? this
                      : ((r = this.getDocumentAtRange(t)),
                        (h = this.removeTextAtRange(t)),
                        (u = e > p),
                        u && (e -= r.getLength()),
                        (l = r.getBlocks()),
                        (s = l[0]),
                        (n = 2 <= l.length ? a.call(l, 1) : []),
                        0 === n.length
                          ? ((d = s.getTextWithoutBlockBreak()), u && (e += 1))
                          : (d = s.text),
                        (h = h.insertTextAtRange(d, e)),
                        0 === n.length
                          ? h
                          : ((r = new this.constructor(n)),
                            (e += d.getLength()),
                            h.insertDocumentAtRange(r, e)))
                  );
                }),
                (c.prototype.addAttributeAtRange = function(t, e, i) {
                  var r;
                  return (
                    (r = this.blockList),
                    this.eachBlockAtRange(i, function(i, o, s) {
                      return (r = r.editObjectAtIndex(s, function() {
                        return n(t)
                          ? i.addAttribute(t, e)
                          : o[0] === o[1]
                          ? i
                          : i.copyWithText(i.text.addAttributeAtRange(t, e, o));
                      }));
                    }),
                    new this.constructor(r)
                  );
                }),
                (c.prototype.addAttribute = function(t, e) {
                  var n;
                  return (
                    (n = this.blockList),
                    this.eachBlock(function(i, r) {
                      return (n = n.editObjectAtIndex(r, function() {
                        return i.addAttribute(t, e);
                      }));
                    }),
                    new this.constructor(n)
                  );
                }),
                (c.prototype.removeAttributeAtRange = function(t, e) {
                  var i;
                  return (
                    (i = this.blockList),
                    this.eachBlockAtRange(e, function(e, r, o) {
                      return n(t)
                        ? (i = i.editObjectAtIndex(o, function() {
                            return e.removeAttribute(t);
                          }))
                        : r[0] !== r[1]
                        ? (i = i.editObjectAtIndex(o, function() {
                            return e.copyWithText(
                              e.text.removeAttributeAtRange(t, r)
                            );
                          }))
                        : void 0;
                    }),
                    new this.constructor(i)
                  );
                }),
                (c.prototype.updateAttributesForAttachment = function(t, e) {
                  var n, i, r, o;
                  return (
                    (r = (i = this.getRangeOfAttachment(e))[0]),
                    (n = this.locationFromPosition(r).index),
                    (o = this.getTextAtIndex(n)),
                    new this.constructor(
                      this.blockList.editObjectAtIndex(n, function(n) {
                        return n.copyWithText(
                          o.updateAttributesForAttachment(t, e)
                        );
                      })
                    )
                  );
                }),
                (c.prototype.removeAttributeForAttachment = function(t, e) {
                  var n;
                  return (
                    (n = this.getRangeOfAttachment(e)),
                    this.removeAttributeAtRange(t, n)
                  );
                }),
                (c.prototype.insertBlockBreakAtRange = function(t) {
                  var n, r, o, s;
                  return (
                    (s = (t = i(t))[0]),
                    (o = this.locationFromPosition(s).offset),
                    (r = this.removeTextAtRange(t)),
                    0 === o && (n = [new e.Block()]),
                    new this.constructor(
                      r.blockList.insertSplittableListAtPosition(
                        new e.SplittableList(n),
                        s
                      )
                    )
                  );
                }),
                (c.prototype.applyBlockAttributeAtRange = function(t, e, i) {
                  var r, o, s, a;
                  return (
                    (s = this.expandRangeToLineBreaksAndSplitBlocks(i)),
                    (o = s.document),
                    (i = s.range),
                    (r = n(t)),
                    r.listAttribute
                      ? ((o = o.removeLastListAttributeAtRange(i, {
                          exceptAttributeName: t
                        })),
                        (a = o.convertLineBreaksToBlockBreaksInRange(i)),
                        (o = a.document),
                        (i = a.range))
                      : (o = r.exclusive
                          ? o.removeBlockAttributesAtRange(i)
                          : r.terminal
                          ? o.removeLastTerminalAttributeAtRange(i)
                          : o.consolidateBlocksAtRange(i)),
                    o.addAttributeAtRange(t, e, i)
                  );
                }),
                (c.prototype.removeLastListAttributeAtRange = function(t, e) {
                  var i;
                  return (
                    null == e && (e = {}),
                    (i = this.blockList),
                    this.eachBlockAtRange(t, function(t, r, o) {
                      var s;
                      if (
                        (s = t.getLastAttribute()) &&
                        n(s).listAttribute &&
                        s !== e.exceptAttributeName
                      )
                        return (i = i.editObjectAtIndex(o, function() {
                          return t.removeAttribute(s);
                        }));
                    }),
                    new this.constructor(i)
                  );
                }),
                (c.prototype.removeLastTerminalAttributeAtRange = function(t) {
                  var e;
                  return (
                    (e = this.blockList),
                    this.eachBlockAtRange(t, function(t, i, r) {
                      var o;
                      if ((o = t.getLastAttribute()) && n(o).terminal)
                        return (e = e.editObjectAtIndex(r, function() {
                          return t.removeAttribute(o);
                        }));
                    }),
                    new this.constructor(e)
                  );
                }),
                (c.prototype.removeBlockAttributesAtRange = function(t) {
                  var e;
                  return (
                    (e = this.blockList),
                    this.eachBlockAtRange(t, function(t, n, i) {
                      return t.hasAttributes()
                        ? (e = e.editObjectAtIndex(i, function() {
                            return t.copyWithoutAttributes();
                          }))
                        : void 0;
                    }),
                    new this.constructor(e)
                  );
                }),
                (c.prototype.expandRangeToLineBreaksAndSplitBlocks = function(
                  t
                ) {
                  var e, n, r, o, s, a, u, c, l;
                  return (
                    (a = t = i(t)),
                    (l = a[0]),
                    (o = a[1]),
                    (c = this.locationFromPosition(l)),
                    (r = this.locationFromPosition(o)),
                    (e = this),
                    (u = e.getBlockAtIndex(c.index)),
                    null !=
                      (c.offset = u.findLineBreakInDirectionFromPosition(
                        "backward",
                        c.offset
                      )) &&
                      ((s = e.positionFromLocation(c)),
                      (e = e.insertBlockBreakAtRange([s, s + 1])),
                      (r.index += 1),
                      (r.offset -= e.getBlockAtIndex(c.index).getLength()),
                      (c.index += 1)),
                    (c.offset = 0),
                    0 === r.offset && r.index > c.index
                      ? ((r.index -= 1),
                        (r.offset = e
                          .getBlockAtIndex(r.index)
                          .getBlockBreakPosition()))
                      : ((n = e.getBlockAtIndex(r.index)),
                        "\n" ===
                        n.text.getStringAtRange([r.offset - 1, r.offset])
                          ? (r.offset -= 1)
                          : (r.offset = n.findLineBreakInDirectionFromPosition(
                              "forward",
                              r.offset
                            )),
                        r.offset !== n.getBlockBreakPosition() &&
                          ((s = e.positionFromLocation(r)),
                          (e = e.insertBlockBreakAtRange([s, s + 1])))),
                    (l = e.positionFromLocation(c)),
                    (o = e.positionFromLocation(r)),
                    (t = i([l, o])),
                    { document: e, range: t }
                  );
                }),
                (c.prototype.convertLineBreaksToBlockBreaksInRange = function(
                  t
                ) {
                  var e, n, r;
                  return (
                    (n = (t = i(t))[0]),
                    (r = this.getStringAtRange(t).slice(0, -1)),
                    (e = this),
                    r.replace(/.*?\n/g, function(t) {
                      return (
                        (n += t.length),
                        (e = e.insertBlockBreakAtRange([n - 1, n]))
                      );
                    }),
                    { document: e, range: t }
                  );
                }),
                (c.prototype.consolidateBlocksAtRange = function(t) {
                  var e, n, r, o, s;
                  return (
                    (r = t = i(t)),
                    (s = r[0]),
                    (n = r[1]),
                    (o = this.locationFromPosition(s).index),
                    (e = this.locationFromPosition(n).index),
                    new this.constructor(
                      this.blockList.consolidateFromIndexToIndex(o, e)
                    )
                  );
                }),
                (c.prototype.getDocumentAtRange = function(t) {
                  var e;
                  return (
                    (t = i(t)),
                    (e = this.blockList.getSplittableListInRange(t).toArray()),
                    new this.constructor(e)
                  );
                }),
                (c.prototype.getStringAtRange = function(t) {
                  var e, n, r;
                  return (
                    (r = t = i(t)),
                    (n = r[r.length - 1]),
                    n !== this.getLength() && (e = -1),
                    this.getDocumentAtRange(t)
                      .toString()
                      .slice(0, e)
                  );
                }),
                (c.prototype.getBlockAtIndex = function(t) {
                  return this.blockList.getObjectAtIndex(t);
                }),
                (c.prototype.getBlockAtPosition = function(t) {
                  var e;
                  return (
                    (e = this.locationFromPosition(t).index),
                    this.getBlockAtIndex(e)
                  );
                }),
                (c.prototype.getTextAtIndex = function(t) {
                  var e;
                  return null != (e = this.getBlockAtIndex(t))
                    ? e.text
                    : void 0;
                }),
                (c.prototype.getTextAtPosition = function(t) {
                  var e;
                  return (
                    (e = this.locationFromPosition(t).index),
                    this.getTextAtIndex(e)
                  );
                }),
                (c.prototype.getPieceAtPosition = function(t) {
                  var e, n, i;
                  return (
                    (i = this.locationFromPosition(t)),
                    (e = i.index),
                    (n = i.offset),
                    this.getTextAtIndex(e).getPieceAtPosition(n)
                  );
                }),
                (c.prototype.getCharacterAtPosition = function(t) {
                  var e, n, i;
                  return (
                    (i = this.locationFromPosition(t)),
                    (e = i.index),
                    (n = i.offset),
                    this.getTextAtIndex(e).getStringAtRange([n, n + 1])
                  );
                }),
                (c.prototype.getLength = function() {
                  return this.blockList.getEndPosition();
                }),
                (c.prototype.getBlocks = function() {
                  return this.blockList.toArray();
                }),
                (c.prototype.getBlockCount = function() {
                  return this.blockList.length;
                }),
                (c.prototype.getEditCount = function() {
                  return this.editCount;
                }),
                (c.prototype.eachBlock = function(t) {
                  return this.blockList.eachObject(t);
                }),
                (c.prototype.eachBlockAtRange = function(t, e) {
                  var n, r, o, s, a, u, c, l, h, p, d, f;
                  if (
                    ((u = t = i(t)),
                    (d = u[0]),
                    (o = u[1]),
                    (p = this.locationFromPosition(d)),
                    (r = this.locationFromPosition(o)),
                    p.index === r.index)
                  )
                    return (
                      (n = this.getBlockAtIndex(p.index)),
                      (f = [p.offset, r.offset]),
                      e(n, f, p.index)
                    );
                  for (
                    h = [], a = s = c = p.index, l = r.index;
                    l >= c ? l >= s : s >= l;
                    a = l >= c ? ++s : --s
                  )
                    (n = this.getBlockAtIndex(a))
                      ? ((f = (function() {
                          switch (a) {
                            case p.index:
                              return [p.offset, n.text.getLength()];
                            case r.index:
                              return [0, r.offset];
                            default:
                              return [0, n.text.getLength()];
                          }
                        })()),
                        h.push(e(n, f, a)))
                      : h.push(void 0);
                  return h;
                }),
                (c.prototype.getCommonAttributesAtRange = function(t) {
                  var n, o, s;
                  return (
                    (o = (t = i(t))[0]),
                    r(t)
                      ? this.getCommonAttributesAtPosition(o)
                      : ((s = []),
                        (n = []),
                        this.eachBlockAtRange(t, function(t, e) {
                          return e[0] !== e[1]
                            ? (s.push(t.text.getCommonAttributesAtRange(e)),
                              n.push(l(t)))
                            : void 0;
                        }),
                        e.Hash.fromCommonAttributesOfObjects(s)
                          .merge(e.Hash.fromCommonAttributesOfObjects(n))
                          .toObject())
                  );
                }),
                (c.prototype.getCommonAttributesAtPosition = function(t) {
                  var n, i, r, o, s, a, c, h, p, d;
                  if (
                    ((p = this.locationFromPosition(t)),
                    (s = p.index),
                    (h = p.offset),
                    (r = this.getBlockAtIndex(s)),
                    !r)
                  )
                    return {};
                  (o = l(r)),
                    (n = r.text.getAttributesAtPosition(h)),
                    (i = r.text.getAttributesAtPosition(h - 1)),
                    (a = (function() {
                      var t, n;
                      (t = e.config.textAttributes), (n = []);
                      for (c in t) (d = t[c]), d.inheritable && n.push(c);
                      return n;
                    })());
                  for (c in i)
                    (d = i[c]), (d === n[c] || u.call(a, c) >= 0) && (o[c] = d);
                  return o;
                }),
                (c.prototype.getRangeOfCommonAttributeAtPosition = function(
                  t,
                  e
                ) {
                  var n, r, o, s, a, u, c, l, h;
                  return (
                    (a = this.locationFromPosition(e)),
                    (o = a.index),
                    (s = a.offset),
                    (h = this.getTextAtIndex(o)),
                    (u = h.getExpandedRangeForAttributeAtOffset(t, s)),
                    (l = u[0]),
                    (r = u[1]),
                    (c = this.positionFromLocation({ index: o, offset: l })),
                    (n = this.positionFromLocation({ index: o, offset: r })),
                    i([c, n])
                  );
                }),
                (c.prototype.getBaseBlockAttributes = function() {
                  var t, e, n, i, r, o, s;
                  for (
                    t = this.getBlockAtIndex(0).getAttributes(),
                      n = i = 1,
                      s = this.getBlockCount();
                    s >= 1 ? s > i : i > s;
                    n = s >= 1 ? ++i : --i
                  )
                    (e = this.getBlockAtIndex(n).getAttributes()),
                      (o = Math.min(t.length, e.length)),
                      (t = (function() {
                        var n, i, s;
                        for (
                          s = [], r = n = 0, i = o;
                          (i >= 0 ? i > n : n > i) && e[r] === t[r];
                          r = i >= 0 ? ++n : --n
                        )
                          s.push(e[r]);
                        return s;
                      })());
                  return t;
                }),
                (l = function(t) {
                  var e, n;
                  return (n = {}), (e = t.getLastAttribute()) && (n[e] = !0), n;
                }),
                (c.prototype.getAttachmentById = function(t) {
                  var e, n, i, r;
                  for (
                    r = this.getAttachments(), n = 0, i = r.length;
                    i > n;
                    n++
                  )
                    if (((e = r[n]), e.id === t)) return e;
                }),
                (c.prototype.getAttachmentPieces = function() {
                  var t;
                  return (
                    (t = []),
                    this.blockList.eachObject(function(e) {
                      var n;
                      return (
                        (n = e.text), (t = t.concat(n.getAttachmentPieces()))
                      );
                    }),
                    t
                  );
                }),
                (c.prototype.getAttachments = function() {
                  var t, e, n, i, r;
                  for (
                    i = this.getAttachmentPieces(), r = [], t = 0, e = i.length;
                    e > t;
                    t++
                  )
                    (n = i[t]), r.push(n.attachment);
                  return r;
                }),
                (c.prototype.getRangeOfAttachment = function(t) {
                  var e, n, r, o, s, a, u;
                  for (
                    o = 0,
                      s = this.blockList.toArray(),
                      n = e = 0,
                      r = s.length;
                    r > e;
                    n = ++e
                  ) {
                    if (((a = s[n].text), (u = a.getRangeOfAttachment(t))))
                      return i([o + u[0], o + u[1]]);
                    o += a.getLength();
                  }
                }),
                (c.prototype.getLocationRangeOfAttachment = function(t) {
                  var e;
                  return (
                    (e = this.getRangeOfAttachment(t)),
                    this.locationRangeFromRange(e)
                  );
                }),
                (c.prototype.getAttachmentPieceForAttachment = function(t) {
                  var e, n, i, r;
                  for (
                    r = this.getAttachmentPieces(), e = 0, n = r.length;
                    n > e;
                    e++
                  )
                    if (((i = r[e]), i.attachment === t)) return i;
                }),
                (c.prototype.findRangesForBlockAttribute = function(t) {
                  var e, n, i, r, o, s, a;
                  for (
                    o = 0, s = [], a = this.getBlocks(), n = 0, i = a.length;
                    i > n;
                    n++
                  )
                    (e = a[n]),
                      (r = e.getLength()),
                      e.hasAttribute(t) && s.push([o, o + r]),
                      (o += r);
                  return s;
                }),
                (c.prototype.findRangesForTextAttribute = function(t, e) {
                  var n, i, r, o, s, a, u, c, l, h;
                  for (
                    h = (null != e ? e : {}).withValue,
                      a = 0,
                      u = [],
                      c = [],
                      o = function(e) {
                        return null != h
                          ? e.getAttribute(t) === h
                          : e.hasAttribute(t);
                      },
                      l = this.getPieces(),
                      n = 0,
                      i = l.length;
                    i > n;
                    n++
                  )
                    (s = l[n]),
                      (r = s.getLength()),
                      o(s) &&
                        (u[1] === a
                          ? (u[1] = a + r)
                          : c.push((u = [a, a + r]))),
                      (a += r);
                  return c;
                }),
                (c.prototype.locationFromPosition = function(t) {
                  var e, n;
                  return (
                    (n = this.blockList.findIndexAndOffsetAtPosition(
                      Math.max(0, t)
                    )),
                    null != n.index
                      ? n
                      : ((e = this.getBlocks()),
                        {
                          index: e.length - 1,
                          offset: e[e.length - 1].getLength()
                        })
                  );
                }),
                (c.prototype.positionFromLocation = function(t) {
                  return this.blockList.findPositionAtIndexAndOffset(
                    t.index,
                    t.offset
                  );
                }),
                (c.prototype.locationRangeFromPosition = function(t) {
                  return i(this.locationFromPosition(t));
                }),
                (c.prototype.locationRangeFromRange = function(t) {
                  var e, n, r, o;
                  if ((t = i(t)))
                    return (
                      (o = t[0]),
                      (n = t[1]),
                      (r = this.locationFromPosition(o)),
                      (e = this.locationFromPosition(n)),
                      i([r, e])
                    );
                }),
                (c.prototype.rangeFromLocationRange = function(t) {
                  var e, n;
                  return (
                    (t = i(t)),
                    (e = this.positionFromLocation(t[0])),
                    r(t) || (n = this.positionFromLocation(t[1])),
                    i([e, n])
                  );
                }),
                (c.prototype.isEqualTo = function(t) {
                  return this.blockList.isEqualTo(
                    null != t ? t.blockList : void 0
                  );
                }),
                (c.prototype.getTexts = function() {
                  var t, e, n, i, r;
                  for (
                    i = this.getBlocks(), r = [], e = 0, n = i.length;
                    n > e;
                    e++
                  )
                    (t = i[e]), r.push(t.text);
                  return r;
                }),
                (c.prototype.getPieces = function() {
                  var t, e, n, i, r;
                  for (
                    n = [], i = this.getTexts(), t = 0, e = i.length;
                    e > t;
                    t++
                  )
                    (r = i[t]), n.push.apply(n, r.getPieces());
                  return n;
                }),
                (c.prototype.getObjects = function() {
                  return this.getBlocks()
                    .concat(this.getTexts())
                    .concat(this.getPieces());
                }),
                (c.prototype.toSerializableDocument = function() {
                  var t;
                  return (
                    (t = []),
                    this.blockList.eachObject(function(e) {
                      return t.push(
                        e.copyWithText(e.text.toSerializableText())
                      );
                    }),
                    new this.constructor(t)
                  );
                }),
                (c.prototype.toString = function() {
                  return this.blockList.toString();
                }),
                (c.prototype.toJSON = function() {
                  return this.blockList.toJSON();
                }),
                (c.prototype.toConsole = function() {
                  var t;
                  return JSON.stringify(
                    function() {
                      var e, n, i, r;
                      for (
                        i = this.blockList.toArray(),
                          r = [],
                          e = 0,
                          n = i.length;
                        n > e;
                        e++
                      )
                        (t = i[e]), r.push(JSON.parse(t.text.toConsole()));
                      return r;
                    }.call(this)
                  );
                }),
                c
              );
            })(e.Object));
        }.call(this),
        function() {
          e.LineBreakInsertion = (function() {
            function t(t) {
              var e;
              (this.composition = t),
                (this.document = this.composition.document),
                (e = this.composition.getSelectedRange()),
                (this.startPosition = e[0]),
                (this.endPosition = e[1]),
                (this.startLocation = this.document.locationFromPosition(
                  this.startPosition
                )),
                (this.endLocation = this.document.locationFromPosition(
                  this.endPosition
                )),
                (this.block = this.document.getBlockAtIndex(
                  this.endLocation.index
                )),
                (this.breaksOnReturn = this.block.breaksOnReturn()),
                (this.previousCharacter = this.block.text.getStringAtPosition(
                  this.endLocation.offset - 1
                )),
                (this.nextCharacter = this.block.text.getStringAtPosition(
                  this.endLocation.offset
                ));
            }
            return (
              (t.prototype.shouldInsertBlockBreak = function() {
                return this.block.hasAttributes() &&
                  this.block.isListItem() &&
                  !this.block.isEmpty()
                  ? 0 !== this.startLocation.offset
                  : this.breaksOnReturn && "\n" !== this.nextCharacter;
              }),
              (t.prototype.shouldBreakFormattedBlock = function() {
                return (
                  this.block.hasAttributes() &&
                  !this.block.isListItem() &&
                  ((this.breaksOnReturn && "\n" === this.nextCharacter) ||
                    "\n" === this.previousCharacter)
                );
              }),
              (t.prototype.shouldDecreaseListLevel = function() {
                return (
                  this.block.hasAttributes() &&
                  this.block.isListItem() &&
                  this.block.isEmpty()
                );
              }),
              (t.prototype.shouldPrependListItem = function() {
                return (
                  this.block.isListItem() &&
                  0 === this.startLocation.offset &&
                  !this.block.isEmpty()
                );
              }),
              (t.prototype.shouldRemoveLastBlockAttribute = function() {
                return (
                  this.block.hasAttributes() &&
                  !this.block.isListItem() &&
                  this.block.isEmpty()
                );
              }),
              t
            );
          })();
        }.call(this),
        function() {
          var t,
            n,
            i,
            r,
            o,
            s,
            a,
            u,
            c,
            l,
            h = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) p.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            p = {}.hasOwnProperty;
          (s = e.normalizeRange),
            (c = e.rangesAreEqual),
            (u = e.rangeIsCollapsed),
            (a = e.objectsAreEqual),
            (t = e.arrayStartsWith),
            (l = e.summarizeArrayChange),
            (i = e.getAllAttributeNames),
            (r = e.getBlockConfig),
            (o = e.getTextConfig),
            (n = e.extend),
            (e.Composition = (function(p) {
              function d() {
                (this.document = new e.Document()),
                  (this.attachments = []),
                  (this.currentAttributes = {}),
                  (this.revision = 0);
              }
              var f;
              return (
                h(d, p),
                (d.prototype.setDocument = function(t) {
                  var e;
                  return t.isEqualTo(this.document)
                    ? void 0
                    : ((this.document = t),
                      this.refreshAttachments(),
                      this.revision++,
                      null != (e = this.delegate) &&
                      "function" == typeof e.compositionDidChangeDocument
                        ? e.compositionDidChangeDocument(t)
                        : void 0);
                }),
                (d.prototype.getSnapshot = function() {
                  return {
                    document: this.document,
                    selectedRange: this.getSelectedRange()
                  };
                }),
                (d.prototype.loadSnapshot = function(t) {
                  var n, i, r, o;
                  return (
                    (n = t.document),
                    (o = t.selectedRange),
                    null != (i = this.delegate) &&
                      "function" == typeof i.compositionWillLoadSnapshot &&
                      i.compositionWillLoadSnapshot(),
                    this.setDocument(null != n ? n : new e.Document()),
                    this.setSelection(null != o ? o : [0, 0]),
                    null != (r = this.delegate) &&
                    "function" == typeof r.compositionDidLoadSnapshot
                      ? r.compositionDidLoadSnapshot()
                      : void 0
                  );
                }),
                (d.prototype.insertText = function(t, e) {
                  var n, i, r, o;
                  return (
                    (o = (null != e ? e : { updatePosition: !0 })
                      .updatePosition),
                    (i = this.getSelectedRange()),
                    this.setDocument(this.document.insertTextAtRange(t, i)),
                    (r = i[0]),
                    (n = r + t.getLength()),
                    o && this.setSelection(n),
                    this.notifyDelegateOfInsertionAtRange([r, n])
                  );
                }),
                (d.prototype.insertBlock = function(t) {
                  var n;
                  return (
                    null == t && (t = new e.Block()),
                    (n = new e.Document([t])),
                    this.insertDocument(n)
                  );
                }),
                (d.prototype.insertDocument = function(t) {
                  var n, i, r;
                  return (
                    null == t && (t = new e.Document()),
                    (i = this.getSelectedRange()),
                    this.setDocument(this.document.insertDocumentAtRange(t, i)),
                    (r = i[0]),
                    (n = r + t.getLength()),
                    this.setSelection(n),
                    this.notifyDelegateOfInsertionAtRange([r, n])
                  );
                }),
                (d.prototype.insertString = function(t, n) {
                  var i, r;
                  return (
                    (i = this.getCurrentTextAttributes()),
                    (r = e.Text.textForStringWithAttributes(t, i)),
                    this.insertText(r, n)
                  );
                }),
                (d.prototype.insertBlockBreak = function() {
                  var t, e, n;
                  return (
                    (e = this.getSelectedRange()),
                    this.setDocument(this.document.insertBlockBreakAtRange(e)),
                    (n = e[0]),
                    (t = n + 1),
                    this.setSelection(t),
                    this.notifyDelegateOfInsertionAtRange([n, t])
                  );
                }),
                (d.prototype.insertLineBreak = function() {
                  var t, n;
                  return (
                    (n = new e.LineBreakInsertion(this)),
                    n.shouldDecreaseListLevel()
                      ? (this.decreaseListLevel(),
                        this.setSelection(n.startPosition))
                      : n.shouldPrependListItem()
                      ? ((t = new e.Document([n.block.copyWithoutText()])),
                        this.insertDocument(t))
                      : n.shouldInsertBlockBreak()
                      ? this.insertBlockBreak()
                      : n.shouldRemoveLastBlockAttribute()
                      ? this.removeLastBlockAttribute()
                      : n.shouldBreakFormattedBlock()
                      ? this.breakFormattedBlock(n)
                      : this.insertString("\n")
                  );
                }),
                (d.prototype.insertHTML = function(t) {
                  var n, i, r, o;
                  return (
                    (n = e.Document.fromHTML(t)),
                    (r = this.getSelectedRange()),
                    this.setDocument(this.document.mergeDocumentAtRange(n, r)),
                    (o = r[0]),
                    (i = o + n.getLength() - 1),
                    this.setSelection(i),
                    this.notifyDelegateOfInsertionAtRange([o, i])
                  );
                }),
                (d.prototype.replaceHTML = function(t) {
                  var n, i, r;
                  return (
                    (n = e.Document.fromHTML(t).copyUsingObjectsFromDocument(
                      this.document
                    )),
                    (i = this.getLocationRange({ strict: !1 })),
                    (r = this.document.rangeFromLocationRange(i)),
                    this.setDocument(n),
                    this.setSelection(r)
                  );
                }),
                (d.prototype.insertFile = function(t) {
                  return this.insertFiles([t]);
                }),
                (d.prototype.insertFiles = function(t) {
                  var n, i, r, o, s, a;
                  for (i = [], o = 0, s = t.length; s > o; o++)
                    (r = t[o]),
                      (null != (a = this.delegate)
                        ? a.compositionShouldAcceptFile(r)
                        : void 0) &&
                        ((n = e.Attachment.attachmentForFile(r)), i.push(n));
                  return this.insertAttachments(i);
                }),
                (d.prototype.insertAttachment = function(t) {
                  return this.insertAttachments([t]);
                }),
                (d.prototype.insertAttachments = function(t) {
                  var n, i, r, o, s, a, u, c, l;
                  for (c = new e.Text(), o = 0, s = t.length; s > o; o++)
                    (n = t[o]),
                      (l = n.getType()),
                      (a =
                        null != (u = e.config.attachments[l])
                          ? u.presentation
                          : void 0),
                      (r = this.getCurrentTextAttributes()),
                      a && (r.presentation = a),
                      (i = e.Text.textForAttachmentWithAttributes(n, r)),
                      (c = c.appendText(i));
                  return this.insertText(c);
                }),
                (d.prototype.shouldManageDeletingInDirection = function(t) {
                  var e;
                  if (((e = this.getLocationRange()), u(e))) {
                    if ("backward" === t && 0 === e[0].offset) return !0;
                    if (this.shouldManageMovingCursorInDirection(t)) return !0;
                  } else if (e[0].index !== e[1].index) return !0;
                  return !1;
                }),
                (d.prototype.deleteInDirection = function(t, e) {
                  var n, i, r, o, s, a, c, l;
                  return (
                    (o = (null != e ? e : {}).length),
                    (s = this.getLocationRange()),
                    (a = this.getSelectedRange()),
                    (c = u(a)),
                    c
                      ? (r = "backward" === t && 0 === s[0].offset)
                      : (l = s[0].index !== s[1].index),
                    r &&
                    this.canDecreaseBlockAttributeLevel() &&
                    ((i = this.getBlock()),
                    i.isListItem()
                      ? this.decreaseListLevel()
                      : this.decreaseBlockAttributeLevel(),
                    this.setSelection(a[0]),
                    i.isEmpty())
                      ? !1
                      : (c &&
                          ((a = this.getExpandedRangeInDirection(t, {
                            length: o
                          })),
                          "backward" === t &&
                            (n = this.getAttachmentAtRange(a))),
                        n
                          ? (this.editAttachment(n), !1)
                          : (this.setDocument(
                              this.document.removeTextAtRange(a)
                            ),
                            this.setSelection(a[0]),
                            r || l ? !1 : void 0))
                  );
                }),
                (d.prototype.moveTextFromRange = function(t) {
                  var e;
                  return (
                    (e = this.getSelectedRange()[0]),
                    this.setDocument(
                      this.document.moveTextFromRangeToPosition(t, e)
                    ),
                    this.setSelection(e)
                  );
                }),
                (d.prototype.removeAttachment = function(t) {
                  var e;
                  return (e = this.document.getRangeOfAttachment(t))
                    ? (this.stopEditingAttachment(),
                      this.setDocument(this.document.removeTextAtRange(e)),
                      this.setSelection(e[0]))
                    : void 0;
                }),
                (d.prototype.removeLastBlockAttribute = function() {
                  var t, e, n, i;
                  return (
                    (n = this.getSelectedRange()),
                    (i = n[0]),
                    (e = n[1]),
                    (t = this.document.getBlockAtPosition(e)),
                    this.removeCurrentAttribute(t.getLastAttribute()),
                    this.setSelection(i)
                  );
                }),
                (f = " "),
                (d.prototype.insertPlaceholder = function() {
                  return (
                    (this.placeholderPosition = this.getPosition()),
                    this.insertString(f)
                  );
                }),
                (d.prototype.selectPlaceholder = function() {
                  return null != this.placeholderPosition
                    ? (this.setSelectedRange([
                        this.placeholderPosition,
                        this.placeholderPosition + f.length
                      ]),
                      this.getSelectedRange())
                    : void 0;
                }),
                (d.prototype.forgetPlaceholder = function() {
                  return (this.placeholderPosition = null);
                }),
                (d.prototype.hasCurrentAttribute = function(t) {
                  var e;
                  return (e = this.currentAttributes[t]), null != e && e !== !1;
                }),
                (d.prototype.toggleCurrentAttribute = function(t) {
                  var e;
                  return (e = !this.currentAttributes[t])
                    ? this.setCurrentAttribute(t, e)
                    : this.removeCurrentAttribute(t);
                }),
                (d.prototype.canSetCurrentAttribute = function(t) {
                  return r(t)
                    ? this.canSetCurrentBlockAttribute(t)
                    : this.canSetCurrentTextAttribute(t);
                }),
                (d.prototype.canSetCurrentTextAttribute = function() {
                  var t, e, n, i, r;
                  if ((e = this.getSelectedDocument())) {
                    for (
                      r = e.getAttachments(), n = 0, i = r.length;
                      i > n;
                      n++
                    )
                      if (((t = r[n]), !t.hasContent())) return !1;
                    return !0;
                  }
                }),
                (d.prototype.canSetCurrentBlockAttribute = function() {
                  var t;
                  if ((t = this.getBlock())) return !t.isTerminalBlock();
                }),
                (d.prototype.setCurrentAttribute = function(t, e) {
                  return r(t)
                    ? this.setBlockAttribute(t, e)
                    : (this.setTextAttribute(t, e),
                      (this.currentAttributes[t] = e),
                      this.notifyDelegateOfCurrentAttributesChange());
                }),
                (d.prototype.setTextAttribute = function(t, n) {
                  var i, r, o, s;
                  if ((r = this.getSelectedRange()))
                    return (
                      (o = r[0]),
                      (i = r[1]),
                      o !== i
                        ? this.setDocument(
                            this.document.addAttributeAtRange(t, n, r)
                          )
                        : "href" === t
                        ? ((s = e.Text.textForStringWithAttributes(n, {
                            href: n
                          })),
                          this.insertText(s))
                        : void 0
                    );
                }),
                (d.prototype.setBlockAttribute = function(t, e) {
                  var n, i;
                  if ((i = this.getSelectedRange()))
                    return this.canSetCurrentAttribute(t)
                      ? ((n = this.getBlock()),
                        this.setDocument(
                          this.document.applyBlockAttributeAtRange(t, e, i)
                        ),
                        this.setSelection(i))
                      : void 0;
                }),
                (d.prototype.removeCurrentAttribute = function(t) {
                  return r(t)
                    ? (this.removeBlockAttribute(t),
                      this.updateCurrentAttributes())
                    : (this.removeTextAttribute(t),
                      delete this.currentAttributes[t],
                      this.notifyDelegateOfCurrentAttributesChange());
                }),
                (d.prototype.removeTextAttribute = function(t) {
                  var e;
                  if ((e = this.getSelectedRange()))
                    return this.setDocument(
                      this.document.removeAttributeAtRange(t, e)
                    );
                }),
                (d.prototype.removeBlockAttribute = function(t) {
                  var e;
                  if ((e = this.getSelectedRange()))
                    return this.setDocument(
                      this.document.removeAttributeAtRange(t, e)
                    );
                }),
                (d.prototype.canDecreaseNestingLevel = function() {
                  var t;
                  return (
                    (null != (t = this.getBlock())
                      ? t.getNestingLevel()
                      : void 0) > 0
                  );
                }),
                (d.prototype.canIncreaseNestingLevel = function() {
                  var e, n, i;
                  if ((e = this.getBlock()))
                    return (null != (i = r(e.getLastNestableAttribute()))
                    ? i.listAttribute
                    : 0)
                      ? (n = this.getPreviousBlock())
                        ? t(
                            n.getListItemAttributes(),
                            e.getListItemAttributes()
                          )
                        : void 0
                      : e.getNestingLevel() > 0;
                }),
                (d.prototype.decreaseNestingLevel = function() {
                  var t;
                  if ((t = this.getBlock()))
                    return this.setDocument(
                      this.document.replaceBlock(t, t.decreaseNestingLevel())
                    );
                }),
                (d.prototype.increaseNestingLevel = function() {
                  var t;
                  if ((t = this.getBlock()))
                    return this.setDocument(
                      this.document.replaceBlock(t, t.increaseNestingLevel())
                    );
                }),
                (d.prototype.canDecreaseBlockAttributeLevel = function() {
                  var t;
                  return (
                    (null != (t = this.getBlock())
                      ? t.getAttributeLevel()
                      : void 0) > 0
                  );
                }),
                (d.prototype.decreaseBlockAttributeLevel = function() {
                  var t, e;
                  return (t =
                    null != (e = this.getBlock())
                      ? e.getLastAttribute()
                      : void 0)
                    ? this.removeCurrentAttribute(t)
                    : void 0;
                }),
                (d.prototype.decreaseListLevel = function() {
                  var t, e, n, i, r, o;
                  for (
                    o = this.getSelectedRange()[0],
                      r = this.document.locationFromPosition(o).index,
                      n = r,
                      t = this.getBlock().getAttributeLevel();
                    (e = this.document.getBlockAtIndex(n + 1)) &&
                    e.isListItem() &&
                    e.getAttributeLevel() > t;

                  )
                    n++;
                  return (
                    (o = this.document.positionFromLocation({
                      index: r,
                      offset: 0
                    })),
                    (i = this.document.positionFromLocation({
                      index: n,
                      offset: 0
                    })),
                    this.setDocument(
                      this.document.removeLastListAttributeAtRange([o, i])
                    )
                  );
                }),
                (d.prototype.updateCurrentAttributes = function() {
                  var t, e, n, r, o, s;
                  if ((s = this.getSelectedRange({ ignoreLock: !0 }))) {
                    for (
                      e = this.document.getCommonAttributesAtRange(s),
                        o = i(),
                        n = 0,
                        r = o.length;
                      r > n;
                      n++
                    )
                      (t = o[n]),
                        e[t] || this.canSetCurrentAttribute(t) || (e[t] = !1);
                    if (!a(e, this.currentAttributes))
                      return (
                        (this.currentAttributes = e),
                        this.notifyDelegateOfCurrentAttributesChange()
                      );
                  }
                }),
                (d.prototype.getCurrentAttributes = function() {
                  return n.call({}, this.currentAttributes);
                }),
                (d.prototype.getCurrentTextAttributes = function() {
                  var t, e, n, i;
                  (t = {}), (n = this.currentAttributes);
                  for (e in n) (i = n[e]), i !== !1 && o(e) && (t[e] = i);
                  return t;
                }),
                (d.prototype.freezeSelection = function() {
                  return this.setCurrentAttribute("frozen", !0);
                }),
                (d.prototype.thawSelection = function() {
                  return this.removeCurrentAttribute("frozen");
                }),
                (d.prototype.hasFrozenSelection = function() {
                  return this.hasCurrentAttribute("frozen");
                }),
                d.proxyMethod("getSelectionManager().getPointRange"),
                d.proxyMethod(
                  "getSelectionManager().setLocationRangeFromPointRange"
                ),
                d.proxyMethod(
                  "getSelectionManager().createLocationRangeFromDOMRange"
                ),
                d.proxyMethod("getSelectionManager().locationIsCursorTarget"),
                d.proxyMethod("getSelectionManager().selectionIsExpanded"),
                d.proxyMethod("delegate?.getSelectionManager"),
                (d.prototype.setSelection = function(t) {
                  var e, n;
                  return (
                    (e = this.document.locationRangeFromRange(t)),
                    null != (n = this.delegate)
                      ? n.compositionDidRequestChangingSelectionToLocationRange(
                          e
                        )
                      : void 0
                  );
                }),
                (d.prototype.getSelectedRange = function() {
                  var t;
                  return (t = this.getLocationRange())
                    ? this.document.rangeFromLocationRange(t)
                    : void 0;
                }),
                (d.prototype.setSelectedRange = function(t) {
                  var e;
                  return (
                    (e = this.document.locationRangeFromRange(t)),
                    this.getSelectionManager().setLocationRange(e)
                  );
                }),
                (d.prototype.getPosition = function() {
                  var t;
                  return (t = this.getLocationRange())
                    ? this.document.positionFromLocation(t[0])
                    : void 0;
                }),
                (d.prototype.getLocationRange = function(t) {
                  var e, n;
                  return null !=
                    (e =
                      null != (n = this.targetLocationRange)
                        ? n
                        : this.getSelectionManager().getLocationRange(t))
                    ? e
                    : s({ index: 0, offset: 0 });
                }),
                (d.prototype.withTargetLocationRange = function(t, e) {
                  var n;
                  this.targetLocationRange = t;
                  try {
                    n = e();
                  } finally {
                    this.targetLocationRange = null;
                  }
                  return n;
                }),
                (d.prototype.withTargetRange = function(t, e) {
                  var n;
                  return (
                    (n = this.document.locationRangeFromRange(t)),
                    this.withTargetLocationRange(n, e)
                  );
                }),
                (d.prototype.withTargetDOMRange = function(t, e) {
                  var n;
                  return (
                    (n = this.createLocationRangeFromDOMRange(t, {
                      strict: !1
                    })),
                    this.withTargetLocationRange(n, e)
                  );
                }),
                (d.prototype.getExpandedRangeInDirection = function(t, e) {
                  var n, i, r, o;
                  return (
                    (i = (null != e ? e : {}).length),
                    (r = this.getSelectedRange()),
                    (o = r[0]),
                    (n = r[1]),
                    "backward" === t
                      ? i
                        ? (o -= i)
                        : (o = this.translateUTF16PositionFromOffset(o, -1))
                      : i
                      ? (n += i)
                      : (n = this.translateUTF16PositionFromOffset(n, 1)),
                    s([o, n])
                  );
                }),
                (d.prototype.shouldManageMovingCursorInDirection = function(t) {
                  var e;
                  return this.editingAttachment
                    ? !0
                    : ((e = this.getExpandedRangeInDirection(t)),
                      null != this.getAttachmentAtRange(e));
                }),
                (d.prototype.moveCursorInDirection = function(t) {
                  var e, n, i, r;
                  return (
                    this.editingAttachment
                      ? (i = this.document.getRangeOfAttachment(
                          this.editingAttachment
                        ))
                      : ((r = this.getSelectedRange()),
                        (i = this.getExpandedRangeInDirection(t)),
                        (n = !c(r, i))),
                    this.setSelectedRange("backward" === t ? i[0] : i[1]),
                    n && (e = this.getAttachmentAtRange(i))
                      ? this.editAttachment(e)
                      : void 0
                  );
                }),
                (d.prototype.expandSelectionInDirection = function(t, e) {
                  var n, i;
                  return (
                    (n = (null != e ? e : {}).length),
                    (i = this.getExpandedRangeInDirection(t, { length: n })),
                    this.setSelectedRange(i)
                  );
                }),
                (d.prototype.expandSelectionForEditing = function() {
                  return this.hasCurrentAttribute("href")
                    ? this.expandSelectionAroundCommonAttribute("href")
                    : void 0;
                }),
                (d.prototype.expandSelectionAroundCommonAttribute = function(
                  t
                ) {
                  var e, n;
                  return (
                    (e = this.getPosition()),
                    (n = this.document.getRangeOfCommonAttributeAtPosition(
                      t,
                      e
                    )),
                    this.setSelectedRange(n)
                  );
                }),
                (d.prototype.selectionContainsAttachments = function() {
                  var t;
                  return (
                    (null != (t = this.getSelectedAttachments())
                      ? t.length
                      : void 0) > 0
                  );
                }),
                (d.prototype.selectionIsInCursorTarget = function() {
                  return (
                    this.editingAttachment ||
                    this.positionIsCursorTarget(this.getPosition())
                  );
                }),
                (d.prototype.positionIsCursorTarget = function(t) {
                  var e;
                  return (e = this.document.locationFromPosition(t))
                    ? this.locationIsCursorTarget(e)
                    : void 0;
                }),
                (d.prototype.positionIsBlockBreak = function(t) {
                  var e;
                  return null != (e = this.document.getPieceAtPosition(t))
                    ? e.isBlockBreak()
                    : void 0;
                }),
                (d.prototype.getSelectedDocument = function() {
                  var t;
                  return (t = this.getSelectedRange())
                    ? this.document.getDocumentAtRange(t)
                    : void 0;
                }),
                (d.prototype.getSelectedAttachments = function() {
                  var t;
                  return null != (t = this.getSelectedDocument())
                    ? t.getAttachments()
                    : void 0;
                }),
                (d.prototype.getAttachments = function() {
                  return this.attachments.slice(0);
                }),
                (d.prototype.refreshAttachments = function() {
                  var t, e, n, i, r, o, s, a, u, c, h, p;
                  for (
                    n = this.document.getAttachments(),
                      a = l(this.attachments, n),
                      t = a.added,
                      h = a.removed,
                      this.attachments = n,
                      i = 0,
                      o = h.length;
                    o > i;
                    i++
                  )
                    (e = h[i]),
                      (e.delegate = null),
                      null != (u = this.delegate) &&
                        "function" == typeof u.compositionDidRemoveAttachment &&
                        u.compositionDidRemoveAttachment(e);
                  for (p = [], r = 0, s = t.length; s > r; r++)
                    (e = t[r]),
                      (e.delegate = this),
                      p.push(
                        null != (c = this.delegate) &&
                          "function" == typeof c.compositionDidAddAttachment
                          ? c.compositionDidAddAttachment(e)
                          : void 0
                      );
                  return p;
                }),
                (d.prototype.attachmentDidChangeAttributes = function(t) {
                  var e;
                  return (
                    this.revision++,
                    null != (e = this.delegate) &&
                    "function" == typeof e.compositionDidEditAttachment
                      ? e.compositionDidEditAttachment(t)
                      : void 0
                  );
                }),
                (d.prototype.attachmentDidChangePreviewURL = function(t) {
                  var e;
                  return (
                    this.revision++,
                    null != (e = this.delegate) &&
                    "function" ==
                      typeof e.compositionDidChangeAttachmentPreviewURL
                      ? e.compositionDidChangeAttachmentPreviewURL(t)
                      : void 0
                  );
                }),
                (d.prototype.editAttachment = function(t, e) {
                  var n;
                  if (t !== this.editingAttachment)
                    return (
                      this.stopEditingAttachment(),
                      (this.editingAttachment = t),
                      null != (n = this.delegate) &&
                      "function" ==
                        typeof n.compositionDidStartEditingAttachment
                        ? n.compositionDidStartEditingAttachment(
                            this.editingAttachment,
                            e
                          )
                        : void 0
                    );
                }),
                (d.prototype.stopEditingAttachment = function() {
                  var t;
                  if (this.editingAttachment)
                    return (
                      null != (t = this.delegate) &&
                        "function" ==
                          typeof t.compositionDidStopEditingAttachment &&
                        t.compositionDidStopEditingAttachment(
                          this.editingAttachment
                        ),
                      (this.editingAttachment = null)
                    );
                }),
                (d.prototype.updateAttributesForAttachment = function(t, e) {
                  return this.setDocument(
                    this.document.updateAttributesForAttachment(t, e)
                  );
                }),
                (d.prototype.removeAttributeForAttachment = function(t, e) {
                  return this.setDocument(
                    this.document.removeAttributeForAttachment(t, e)
                  );
                }),
                (d.prototype.breakFormattedBlock = function(t) {
                  var n, i, r, o, s;
                  return (
                    (i = t.document),
                    (n = t.block),
                    (o = t.startPosition),
                    (s = [o - 1, o]),
                    n.getBlockBreakPosition() === t.startLocation.offset
                      ? (n.breaksOnReturn() && "\n" === t.nextCharacter
                          ? (o += 1)
                          : (i = i.removeTextAtRange(s)),
                        (s = [o, o]))
                      : "\n" === t.nextCharacter
                      ? "\n" === t.previousCharacter
                        ? (s = [o - 1, o + 1])
                        : ((s = [o, o + 1]), (o += 1))
                      : t.startLocation.offset - 1 !== 0 && (o += 1),
                    (r = new e.Document([
                      n.removeLastAttribute().copyWithoutText()
                    ])),
                    this.setDocument(i.insertDocumentAtRange(r, s)),
                    this.setSelection(o)
                  );
                }),
                (d.prototype.getPreviousBlock = function() {
                  var t, e;
                  return (e = this.getLocationRange()) &&
                    ((t = e[0].index), t > 0)
                    ? this.document.getBlockAtIndex(t - 1)
                    : void 0;
                }),
                (d.prototype.getBlock = function() {
                  var t;
                  return (t = this.getLocationRange())
                    ? this.document.getBlockAtIndex(t[0].index)
                    : void 0;
                }),
                (d.prototype.getAttachmentAtRange = function(t) {
                  var n;
                  return (
                    (n = this.document.getDocumentAtRange(t)),
                    n.toString() === e.OBJECT_REPLACEMENT_CHARACTER + "\n"
                      ? n.getAttachments()[0]
                      : void 0
                  );
                }),
                (d.prototype.notifyDelegateOfCurrentAttributesChange = function() {
                  var t;
                  return null != (t = this.delegate) &&
                    "function" == typeof t.compositionDidChangeCurrentAttributes
                    ? t.compositionDidChangeCurrentAttributes(
                        this.currentAttributes
                      )
                    : void 0;
                }),
                (d.prototype.notifyDelegateOfInsertionAtRange = function(t) {
                  var e;
                  return null != (e = this.delegate) &&
                    "function" == typeof e.compositionDidPerformInsertionAtRange
                    ? e.compositionDidPerformInsertionAtRange(t)
                    : void 0;
                }),
                (d.prototype.translateUTF16PositionFromOffset = function(t, e) {
                  var n, i;
                  return (
                    (i = this.document.toUTF16String()),
                    (n = i.offsetFromUCS2Offset(t)),
                    i.offsetToUCS2Offset(n + e)
                  );
                }),
                d
              );
            })(e.BasicObject));
        }.call(this),
        function() {
          var t = function(t, e) {
              function i() {
                this.constructor = t;
              }
              for (var r in e) n.call(e, r) && (t[r] = e[r]);
              return (
                (i.prototype = e.prototype),
                (t.prototype = new i()),
                (t.__super__ = e.prototype),
                t
              );
            },
            n = {}.hasOwnProperty;
          e.UndoManager = (function(e) {
            function n(t) {
              (this.composition = t),
                (this.undoEntries = []),
                (this.redoEntries = []);
            }
            var i;
            return (
              t(n, e),
              (n.prototype.recordUndoEntry = function(t, e) {
                var n, r, o, s, a;
                return (
                  (s = null != e ? e : {}),
                  (r = s.context),
                  (n = s.consolidatable),
                  (o = this.undoEntries.slice(-1)[0]),
                  n && i(o, t, r)
                    ? void 0
                    : ((a = this.createEntry({ description: t, context: r })),
                      this.undoEntries.push(a),
                      (this.redoEntries = []))
                );
              }),
              (n.prototype.undo = function() {
                var t, e;
                return (e = this.undoEntries.pop())
                  ? ((t = this.createEntry(e)),
                    this.redoEntries.push(t),
                    this.composition.loadSnapshot(e.snapshot))
                  : void 0;
              }),
              (n.prototype.redo = function() {
                var t, e;
                return (t = this.redoEntries.pop())
                  ? ((e = this.createEntry(t)),
                    this.undoEntries.push(e),
                    this.composition.loadSnapshot(t.snapshot))
                  : void 0;
              }),
              (n.prototype.canUndo = function() {
                return this.undoEntries.length > 0;
              }),
              (n.prototype.canRedo = function() {
                return this.redoEntries.length > 0;
              }),
              (n.prototype.createEntry = function(t) {
                var e, n, i;
                return (
                  (i = null != t ? t : {}),
                  (n = i.description),
                  (e = i.context),
                  {
                    description: null != n ? n.toString() : void 0,
                    context: JSON.stringify(e),
                    snapshot: this.composition.getSnapshot()
                  }
                );
              }),
              (i = function(t, e, n) {
                return (
                  (null != t ? t.description : void 0) ===
                    (null != e ? e.toString() : void 0) &&
                  (null != t ? t.context : void 0) === JSON.stringify(n)
                );
              }),
              n
            );
          })(e.BasicObject);
        }.call(this),
        function() {
          var t;
          (e.attachmentGalleryFilter = function(e) {
            var n;
            return (n = new t(e)), n.perform(), n.getSnapshot();
          }),
            (t = (function() {
              function t(t) {
                (this.document = t.document),
                  (this.selectedRange = t.selectedRange);
              }
              var e, n, i;
              return (
                (e = "attachmentGallery"),
                (n = "presentation"),
                (i = "gallery"),
                (t.prototype.perform = function() {
                  return (
                    this.removeBlockAttribute(), this.applyBlockAttribute()
                  );
                }),
                (t.prototype.getSnapshot = function() {
                  return {
                    document: this.document,
                    selectedRange: this.selectedRange
                  };
                }),
                (t.prototype.removeBlockAttribute = function() {
                  var t, n, i, r, o;
                  for (
                    r = this.findRangesOfBlocks(), o = [], t = 0, n = r.length;
                    n > t;
                    t++
                  )
                    (i = r[t]),
                      o.push(
                        (this.document = this.document.removeAttributeAtRange(
                          e,
                          i
                        ))
                      );
                  return o;
                }),
                (t.prototype.applyBlockAttribute = function() {
                  var t, n, i, r, o, s;
                  for (
                    i = 0,
                      o = this.findRangesOfPieces(),
                      s = [],
                      t = 0,
                      n = o.length;
                    n > t;
                    t++
                  )
                    (r = o[t]),
                      r[1] - r[0] > 1 &&
                        ((r[0] += i),
                        (r[1] += i),
                        "\n" !== this.document.getCharacterAtPosition(r[1]) &&
                          ((this.document = this.document.insertBlockBreakAtRange(
                            r[1]
                          )),
                          r[1] < this.selectedRange[1] &&
                            this.moveSelectedRangeForward(),
                          r[1]++,
                          i++),
                        0 !== r[0] &&
                          "\n" !==
                            this.document.getCharacterAtPosition(r[0] - 1) &&
                          ((this.document = this.document.insertBlockBreakAtRange(
                            r[0]
                          )),
                          r[0] < this.selectedRange[0] &&
                            this.moveSelectedRangeForward(),
                          r[0]++,
                          i++),
                        s.push(
                          (this.document = this.document.applyBlockAttributeAtRange(
                            e,
                            !0,
                            r
                          ))
                        ));
                  return s;
                }),
                (t.prototype.findRangesOfBlocks = function() {
                  return this.document.findRangesForBlockAttribute(e);
                }),
                (t.prototype.findRangesOfPieces = function() {
                  return this.document.findRangesForTextAttribute(n, {
                    withValue: i
                  });
                }),
                (t.prototype.moveSelectedRangeForward = function() {
                  return (
                    (this.selectedRange[0] += 1), (this.selectedRange[1] += 1)
                  );
                }),
                t
              );
            })());
        }.call(this),
        function() {
          var t = function(t, e) {
            return function() {
              return t.apply(e, arguments);
            };
          };
          e.Editor = (function() {
            function n(n, r, o) {
              (this.composition = n),
                (this.selectionManager = r),
                (this.element = o),
                (this.insertFiles = t(this.insertFiles, this)),
                (this.undoManager = new e.UndoManager(this.composition)),
                (this.filters = i.slice(0));
            }
            var i;
            return (
              (i = [e.attachmentGalleryFilter]),
              (n.prototype.loadDocument = function(t) {
                return this.loadSnapshot({
                  document: t,
                  selectedRange: [0, 0]
                });
              }),
              (n.prototype.loadHTML = function(t) {
                return (
                  null == t && (t = ""),
                  this.loadDocument(
                    e.Document.fromHTML(t, { referenceElement: this.element })
                  )
                );
              }),
              (n.prototype.loadJSON = function(t) {
                var n, i;
                return (
                  (n = t.document),
                  (i = t.selectedRange),
                  (n = e.Document.fromJSON(n)),
                  this.loadSnapshot({ document: n, selectedRange: i })
                );
              }),
              (n.prototype.loadSnapshot = function(t) {
                return (
                  (this.undoManager = new e.UndoManager(this.composition)),
                  this.composition.loadSnapshot(t)
                );
              }),
              (n.prototype.getDocument = function() {
                return this.composition.document;
              }),
              (n.prototype.getSelectedDocument = function() {
                return this.composition.getSelectedDocument();
              }),
              (n.prototype.getSnapshot = function() {
                return this.composition.getSnapshot();
              }),
              (n.prototype.toJSON = function() {
                return this.getSnapshot();
              }),
              (n.prototype.deleteInDirection = function(t) {
                return this.composition.deleteInDirection(t);
              }),
              (n.prototype.insertAttachment = function(t) {
                return this.composition.insertAttachment(t);
              }),
              (n.prototype.insertDocument = function(t) {
                return this.composition.insertDocument(t);
              }),
              (n.prototype.insertFile = function(t) {
                return this.composition.insertFile(t);
              }),
              (n.prototype.insertFiles = function(t) {
                return this.composition.insertFiles(t);
              }),
              (n.prototype.insertHTML = function(t) {
                return this.composition.insertHTML(t);
              }),
              (n.prototype.insertString = function(t) {
                return this.composition.insertString(t);
              }),
              (n.prototype.insertText = function(t) {
                return this.composition.insertText(t);
              }),
              (n.prototype.insertLineBreak = function() {
                return this.composition.insertLineBreak();
              }),
              (n.prototype.getSelectedRange = function() {
                return this.composition.getSelectedRange();
              }),
              (n.prototype.getPosition = function() {
                return this.composition.getPosition();
              }),
              (n.prototype.getClientRectAtPosition = function(t) {
                var e;
                return (
                  (e = this.getDocument().locationRangeFromRange([t, t + 1])),
                  this.selectionManager.getClientRectAtLocationRange(e)
                );
              }),
              (n.prototype.expandSelectionInDirection = function(t) {
                return this.composition.expandSelectionInDirection(t);
              }),
              (n.prototype.moveCursorInDirection = function(t) {
                return this.composition.moveCursorInDirection(t);
              }),
              (n.prototype.setSelectedRange = function(t) {
                return this.composition.setSelectedRange(t);
              }),
              (n.prototype.activateAttribute = function(t, e) {
                return (
                  null == e && (e = !0),
                  this.composition.setCurrentAttribute(t, e)
                );
              }),
              (n.prototype.attributeIsActive = function(t) {
                return this.composition.hasCurrentAttribute(t);
              }),
              (n.prototype.canActivateAttribute = function(t) {
                return this.composition.canSetCurrentAttribute(t);
              }),
              (n.prototype.deactivateAttribute = function(t) {
                return this.composition.removeCurrentAttribute(t);
              }),
              (n.prototype.canDecreaseNestingLevel = function() {
                return this.composition.canDecreaseNestingLevel();
              }),
              (n.prototype.canIncreaseNestingLevel = function() {
                return this.composition.canIncreaseNestingLevel();
              }),
              (n.prototype.decreaseNestingLevel = function() {
                return this.canDecreaseNestingLevel()
                  ? this.composition.decreaseNestingLevel()
                  : void 0;
              }),
              (n.prototype.increaseNestingLevel = function() {
                return this.canIncreaseNestingLevel()
                  ? this.composition.increaseNestingLevel()
                  : void 0;
              }),
              (n.prototype.canRedo = function() {
                return this.undoManager.canRedo();
              }),
              (n.prototype.canUndo = function() {
                return this.undoManager.canUndo();
              }),
              (n.prototype.recordUndoEntry = function(t, e) {
                var n, i, r;
                return (
                  (r = null != e ? e : {}),
                  (i = r.context),
                  (n = r.consolidatable),
                  this.undoManager.recordUndoEntry(t, {
                    context: i,
                    consolidatable: n
                  })
                );
              }),
              (n.prototype.redo = function() {
                return this.canRedo() ? this.undoManager.redo() : void 0;
              }),
              (n.prototype.undo = function() {
                return this.canUndo() ? this.undoManager.undo() : void 0;
              }),
              n
            );
          })();
        }.call(this),
        function() {
          var t = function(t, e) {
              function i() {
                this.constructor = t;
              }
              for (var r in e) n.call(e, r) && (t[r] = e[r]);
              return (
                (i.prototype = e.prototype),
                (t.prototype = new i()),
                (t.__super__ = e.prototype),
                t
              );
            },
            n = {}.hasOwnProperty;
          e.ManagedAttachment = (function(e) {
            function n(t, e) {
              var n;
              (this.attachmentManager = t),
                (this.attachment = e),
                (n = this.attachment),
                (this.id = n.id),
                (this.file = n.file);
            }
            return (
              t(n, e),
              (n.prototype.remove = function() {
                return this.attachmentManager.requestRemovalOfAttachment(
                  this.attachment
                );
              }),
              n.proxyMethod("attachment.getAttribute"),
              n.proxyMethod("attachment.hasAttribute"),
              n.proxyMethod("attachment.setAttribute"),
              n.proxyMethod("attachment.getAttributes"),
              n.proxyMethod("attachment.setAttributes"),
              n.proxyMethod("attachment.isPending"),
              n.proxyMethod("attachment.isPreviewable"),
              n.proxyMethod("attachment.getURL"),
              n.proxyMethod("attachment.getHref"),
              n.proxyMethod("attachment.getFilename"),
              n.proxyMethod("attachment.getFilesize"),
              n.proxyMethod("attachment.getFormattedFilesize"),
              n.proxyMethod("attachment.getExtension"),
              n.proxyMethod("attachment.getContentType"),
              n.proxyMethod("attachment.getFile"),
              n.proxyMethod("attachment.setFile"),
              n.proxyMethod("attachment.releaseFile"),
              n.proxyMethod("attachment.getUploadProgress"),
              n.proxyMethod("attachment.setUploadProgress"),
              n
            );
          })(e.BasicObject);
        }.call(this),
        function() {
          var t = function(t, e) {
              function i() {
                this.constructor = t;
              }
              for (var r in e) n.call(e, r) && (t[r] = e[r]);
              return (
                (i.prototype = e.prototype),
                (t.prototype = new i()),
                (t.__super__ = e.prototype),
                t
              );
            },
            n = {}.hasOwnProperty;
          e.AttachmentManager = (function(n) {
            function i(t) {
              var e, n, i;
              for (
                null == t && (t = []),
                  this.managedAttachments = {},
                  n = 0,
                  i = t.length;
                i > n;
                n++
              )
                (e = t[n]), this.manageAttachment(e);
            }
            return (
              t(i, n),
              (i.prototype.getAttachments = function() {
                var t, e, n, i;
                (n = this.managedAttachments), (i = []);
                for (e in n) (t = n[e]), i.push(t);
                return i;
              }),
              (i.prototype.manageAttachment = function(t) {
                var n, i;
                return null != (n = this.managedAttachments)[(i = t.id)]
                  ? n[i]
                  : (n[i] = new e.ManagedAttachment(this, t));
              }),
              (i.prototype.attachmentIsManaged = function(t) {
                return t.id in this.managedAttachments;
              }),
              (i.prototype.requestRemovalOfAttachment = function(t) {
                var e;
                return this.attachmentIsManaged(t) &&
                  null != (e = this.delegate) &&
                  "function" ==
                    typeof e.attachmentManagerDidRequestRemovalOfAttachment
                  ? e.attachmentManagerDidRequestRemovalOfAttachment(t)
                  : void 0;
              }),
              (i.prototype.unmanageAttachment = function(t) {
                var e;
                return (
                  (e = this.managedAttachments[t.id]),
                  delete this.managedAttachments[t.id],
                  e
                );
              }),
              i
            );
          })(e.BasicObject);
        }.call(this),
        function() {
          var t, n, i, r, o, s, a, u, c, l, h;
          (t = e.elementContainsNode),
            (n = e.findChildIndexOfNode),
            (o = e.nodeIsBlockStart),
            (s = e.nodeIsBlockStartComment),
            (r = e.nodeIsBlockContainer),
            (a = e.nodeIsCursorTarget),
            (u = e.nodeIsEmptyTextNode),
            (c = e.nodeIsTextNode),
            (i = e.nodeIsAttachmentElement),
            (l = e.tagName),
            (h = e.walkTree),
            (e.LocationMapper = (function() {
              function e(t) {
                this.element = t;
              }
              var p, d, f, g;
              return (
                (e.prototype.findLocationFromContainerAndOffset = function(
                  e,
                  i,
                  r
                ) {
                  var s, u, l, p, g, m, y;
                  for (
                    m = (null != r ? r : { strict: !0 }).strict,
                      u = 0,
                      l = !1,
                      p = { index: 0, offset: 0 },
                      (s = this.findAttachmentElementParentForNode(e)) &&
                        ((e = s.parentNode), (i = n(s))),
                      y = h(this.element, { usingFilter: f });
                    y.nextNode();

                  ) {
                    if (((g = y.currentNode), g === e && c(e))) {
                      a(g) || (p.offset += i);
                      break;
                    }
                    if (g.parentNode === e) {
                      if (u++ === i) break;
                    } else if (!t(e, g) && u > 0) break;
                    o(g, { strict: m })
                      ? (l && p.index++, (p.offset = 0), (l = !0))
                      : (p.offset += d(g));
                  }
                  return p;
                }),
                (e.prototype.findContainerAndOffsetFromLocation = function(t) {
                  var e, i, s, u, l;
                  if (0 === t.index && 0 === t.offset) {
                    for (e = this.element, u = 0; e.firstChild; )
                      if (((e = e.firstChild), r(e))) {
                        u = 1;
                        break;
                      }
                    return [e, u];
                  }
                  if (
                    ((l = this.findNodeAndOffsetFromLocation(t)),
                    (i = l[0]),
                    (s = l[1]),
                    i)
                  ) {
                    if (c(i))
                      0 === d(i)
                        ? ((e = i.parentNode.parentNode),
                          (u = n(i.parentNode)),
                          a(i, { name: "right" }) && u++)
                        : ((e = i), (u = t.offset - s));
                    else {
                      if (((e = i.parentNode), !o(i.previousSibling) && !r(e)))
                        for (
                          ;
                          i === e.lastChild &&
                          ((i = e), (e = e.parentNode), !r(e));

                        );
                      (u = n(i)), 0 !== t.offset && u++;
                    }
                    return [e, u];
                  }
                }),
                (e.prototype.findNodeAndOffsetFromLocation = function(t) {
                  var e, n, i, r, o, s, u, l;
                  for (
                    u = 0,
                      l = this.getSignificantNodesForIndex(t.index),
                      n = 0,
                      i = l.length;
                    i > n;
                    n++
                  ) {
                    if (((e = l[n]), (r = d(e)), t.offset <= u + r))
                      if (c(e)) {
                        if (((o = e), (s = u), t.offset === s && a(o))) break;
                      } else o || ((o = e), (s = u));
                    if (((u += r), u > t.offset)) break;
                  }
                  return [o, s];
                }),
                (e.prototype.findAttachmentElementParentForNode = function(t) {
                  for (; t && t !== this.element; ) {
                    if (i(t)) return t;
                    t = t.parentNode;
                  }
                }),
                (e.prototype.getSignificantNodesForIndex = function(t) {
                  var e, n, i, r, o;
                  for (
                    i = [], o = h(this.element, { usingFilter: p }), r = !1;
                    o.nextNode();

                  )
                    if (((n = o.currentNode), s(n))) {
                      if (
                        ("undefined" != typeof e && null !== e ? e++ : (e = 0),
                        e === t)
                      )
                        r = !0;
                      else if (r) break;
                    } else r && i.push(n);
                  return i;
                }),
                (d = function(t) {
                  var e;
                  return t.nodeType === Node.TEXT_NODE
                    ? a(t)
                      ? 0
                      : ((e = t.textContent), e.length)
                    : "br" === l(t) || i(t)
                    ? 1
                    : 0;
                }),
                (p = function(t) {
                  return g(t) === NodeFilter.FILTER_ACCEPT
                    ? f(t)
                    : NodeFilter.FILTER_REJECT;
                }),
                (g = function(t) {
                  return u(t)
                    ? NodeFilter.FILTER_REJECT
                    : NodeFilter.FILTER_ACCEPT;
                }),
                (f = function(t) {
                  return i(t.parentNode)
                    ? NodeFilter.FILTER_REJECT
                    : NodeFilter.FILTER_ACCEPT;
                }),
                e
              );
            })());
        }.call(this),
        function() {
          var t,
            n,
            i = [].slice;
          (t = e.getDOMRange),
            (n = e.setDOMRange),
            (e.PointMapper = (function() {
              function e() {}
              return (
                (e.prototype.createDOMRangeFromPoint = function(e) {
                  var i, r, o, s, a, u, c, l;
                  if (((c = e.x), (l = e.y), document.caretPositionFromPoint))
                    return (
                      (a = document.caretPositionFromPoint(c, l)),
                      (o = a.offsetNode),
                      (r = a.offset),
                      (i = document.createRange()),
                      i.setStart(o, r),
                      i
                    );
                  if (document.caretRangeFromPoint)
                    return document.caretRangeFromPoint(c, l);
                  if (document.body.createTextRange) {
                    s = t();
                    try {
                      (u = document.body.createTextRange()),
                        u.moveToPoint(c, l),
                        u.select();
                    } catch (h) {}
                    return (i = t()), n(s), i;
                  }
                }),
                (e.prototype.getClientRectsForDOMRange = function(t) {
                  var e, n, r;
                  return (
                    (n = i.call(t.getClientRects())),
                    (r = n[0]),
                    (e = n[n.length - 1]),
                    [r, e]
                  );
                }),
                e
              );
            })());
        }.call(this),
        function() {
          var t,
            n = function(t, e) {
              return function() {
                return t.apply(e, arguments);
              };
            },
            i = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) r.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            r = {}.hasOwnProperty,
            o =
              [].indexOf ||
              function(t) {
                for (var e = 0, n = this.length; n > e; e++)
                  if (e in this && this[e] === t) return e;
                return -1;
              };
          (t = e.getDOMRange),
            (e.SelectionChangeObserver = (function(e) {
              function r() {
                (this.run = n(this.run, this)),
                  (this.update = n(this.update, this)),
                  (this.selectionManagers = []);
              }
              var s;
              return (
                i(r, e),
                (r.prototype.start = function() {
                  return this.started
                    ? void 0
                    : ((this.started = !0),
                      "onselectionchange" in document
                        ? document.addEventListener(
                            "selectionchange",
                            this.update,
                            !0
                          )
                        : this.run());
                }),
                (r.prototype.stop = function() {
                  return this.started
                    ? ((this.started = !1),
                      document.removeEventListener(
                        "selectionchange",
                        this.update,
                        !0
                      ))
                    : void 0;
                }),
                (r.prototype.registerSelectionManager = function(t) {
                  return o.call(this.selectionManagers, t) < 0
                    ? (this.selectionManagers.push(t), this.start())
                    : void 0;
                }),
                (r.prototype.unregisterSelectionManager = function(t) {
                  var e;
                  return (
                    (this.selectionManagers = function() {
                      var n, i, r, o;
                      for (
                        r = this.selectionManagers, o = [], n = 0, i = r.length;
                        i > n;
                        n++
                      )
                        (e = r[n]), e !== t && o.push(e);
                      return o;
                    }.call(this)),
                    0 === this.selectionManagers.length ? this.stop() : void 0
                  );
                }),
                (r.prototype.notifySelectionManagersOfSelectionChange = function() {
                  var t, e, n, i, r;
                  for (
                    n = this.selectionManagers, i = [], t = 0, e = n.length;
                    e > t;
                    t++
                  )
                    (r = n[t]), i.push(r.selectionDidChange());
                  return i;
                }),
                (r.prototype.update = function() {
                  var e;
                  return (
                    (e = t()),
                    s(e, this.domRange)
                      ? void 0
                      : ((this.domRange = e),
                        this.notifySelectionManagersOfSelectionChange())
                  );
                }),
                (r.prototype.reset = function() {
                  return (this.domRange = null), this.update();
                }),
                (r.prototype.run = function() {
                  return this.started
                    ? (this.update(), requestAnimationFrame(this.run))
                    : void 0;
                }),
                (s = function(t, e) {
                  return (
                    (null != t ? t.startContainer : void 0) ===
                      (null != e ? e.startContainer : void 0) &&
                    (null != t ? t.startOffset : void 0) ===
                      (null != e ? e.startOffset : void 0) &&
                    (null != t ? t.endContainer : void 0) ===
                      (null != e ? e.endContainer : void 0) &&
                    (null != t ? t.endOffset : void 0) ===
                      (null != e ? e.endOffset : void 0)
                  );
                }),
                r
              );
            })(e.BasicObject)),
            null == e.selectionChangeObserver &&
              (e.selectionChangeObserver = new e.SelectionChangeObserver());
        }.call(this),
        function() {
          var t,
            n,
            i,
            r,
            o,
            s,
            a,
            u,
            c,
            l,
            h = function(t, e) {
              return function() {
                return t.apply(e, arguments);
              };
            },
            p = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) d.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            d = {}.hasOwnProperty;
          (i = e.getDOMSelection),
            (n = e.getDOMRange),
            (l = e.setDOMRange),
            (t = e.elementContainsNode),
            (s = e.nodeIsCursorTarget),
            (o = e.innerElementIsActive),
            (r = e.handleEvent),
            (a = e.normalizeRange),
            (u = e.rangeIsCollapsed),
            (c = e.rangesAreEqual),
            (e.SelectionManager = (function(d) {
              function f(t) {
                (this.element = t),
                  (this.selectionDidChange = h(this.selectionDidChange, this)),
                  (this.didMouseDown = h(this.didMouseDown, this)),
                  (this.locationMapper = new e.LocationMapper(this.element)),
                  (this.pointMapper = new e.PointMapper()),
                  (this.lockCount = 0),
                  r("mousedown", {
                    onElement: this.element,
                    withCallback: this.didMouseDown
                  });
              }
              return (
                p(f, d),
                (f.prototype.getLocationRange = function(t) {
                  var e, i;
                  return (
                    null == t && (t = {}),
                    (e =
                      t.strict === !1
                        ? this.createLocationRangeFromDOMRange(n(), {
                            strict: !1
                          })
                        : t.ignoreLock
                        ? this.currentLocationRange
                        : null != (i = this.lockedLocationRange)
                        ? i
                        : this.currentLocationRange)
                  );
                }),
                (f.prototype.setLocationRange = function(t) {
                  var e;
                  if (!this.lockedLocationRange)
                    return (
                      (t = a(t)),
                      (e = this.createDOMRangeFromLocationRange(t))
                        ? (l(e), this.updateCurrentLocationRange(t))
                        : void 0
                    );
                }),
                (f.prototype.setLocationRangeFromPointRange = function(t) {
                  var e, n;
                  return (
                    (t = a(t)),
                    (n = this.getLocationAtPoint(t[0])),
                    (e = this.getLocationAtPoint(t[1])),
                    this.setLocationRange([n, e])
                  );
                }),
                (f.prototype.getClientRectAtLocationRange = function(t) {
                  var e;
                  return (e = this.createDOMRangeFromLocationRange(t))
                    ? this.getClientRectsForDOMRange(e)[1]
                    : void 0;
                }),
                (f.prototype.locationIsCursorTarget = function(t) {
                  var e, n, i;
                  return (
                    (i = this.findNodeAndOffsetFromLocation(t)),
                    (e = i[0]),
                    (n = i[1]),
                    s(e)
                  );
                }),
                (f.prototype.lock = function() {
                  return 0 === this.lockCount++
                    ? (this.updateCurrentLocationRange(),
                      (this.lockedLocationRange = this.getLocationRange()))
                    : void 0;
                }),
                (f.prototype.unlock = function() {
                  var t;
                  return 0 === --this.lockCount &&
                    ((t = this.lockedLocationRange),
                    (this.lockedLocationRange = null),
                    null != t)
                    ? this.setLocationRange(t)
                    : void 0;
                }),
                (f.prototype.clearSelection = function() {
                  var t;
                  return null != (t = i()) ? t.removeAllRanges() : void 0;
                }),
                (f.prototype.selectionIsCollapsed = function() {
                  var t;
                  return (null != (t = n()) ? t.collapsed : void 0) === !0;
                }),
                (f.prototype.selectionIsExpanded = function() {
                  return !this.selectionIsCollapsed();
                }),
                (f.prototype.createLocationRangeFromDOMRange = function(t, e) {
                  var n, i;
                  if (
                    null != t &&
                    this.domRangeWithinElement(t) &&
                    (i = this.findLocationFromContainerAndOffset(
                      t.startContainer,
                      t.startOffset,
                      e
                    ))
                  )
                    return (
                      t.collapsed ||
                        (n = this.findLocationFromContainerAndOffset(
                          t.endContainer,
                          t.endOffset,
                          e
                        )),
                      a([i, n])
                    );
                }),
                f.proxyMethod(
                  "locationMapper.findLocationFromContainerAndOffset"
                ),
                f.proxyMethod(
                  "locationMapper.findContainerAndOffsetFromLocation"
                ),
                f.proxyMethod("locationMapper.findNodeAndOffsetFromLocation"),
                f.proxyMethod("pointMapper.createDOMRangeFromPoint"),
                f.proxyMethod("pointMapper.getClientRectsForDOMRange"),
                (f.prototype.didMouseDown = function() {
                  return this.pauseTemporarily();
                }),
                (f.prototype.pauseTemporarily = function() {
                  var e, n, i, o;
                  return (
                    (this.paused = !0),
                    (n = (function(e) {
                      return function() {
                        var n, r, s;
                        for (
                          e.paused = !1, clearTimeout(o), r = 0, s = i.length;
                          s > r;
                          r++
                        )
                          (n = i[r]), n.destroy();
                        return t(document, e.element)
                          ? e.selectionDidChange()
                          : void 0;
                      };
                    })(this)),
                    (o = setTimeout(n, 200)),
                    (i = (function() {
                      var t, i, o, s;
                      for (
                        o = ["mousemove", "keydown"],
                          s = [],
                          t = 0,
                          i = o.length;
                        i > t;
                        t++
                      )
                        (e = o[t]),
                          s.push(
                            r(e, { onElement: document, withCallback: n })
                          );
                      return s;
                    })())
                  );
                }),
                (f.prototype.selectionDidChange = function() {
                  return this.paused || o(this.element)
                    ? void 0
                    : this.updateCurrentLocationRange();
                }),
                (f.prototype.updateCurrentLocationRange = function(t) {
                  var e;
                  return (null != t
                    ? t
                    : (t = this.createLocationRangeFromDOMRange(n()))) &&
                    !c(t, this.currentLocationRange)
                    ? ((this.currentLocationRange = t),
                      null != (e = this.delegate) &&
                      "function" == typeof e.locationRangeDidChange
                        ? e.locationRangeDidChange(
                            this.currentLocationRange.slice(0)
                          )
                        : void 0)
                    : void 0;
                }),
                (f.prototype.createDOMRangeFromLocationRange = function(t) {
                  var e, n, i, r;
                  return (
                    (i = this.findContainerAndOffsetFromLocation(t[0])),
                    (n = u(t)
                      ? i
                      : null !=
                        (r = this.findContainerAndOffsetFromLocation(t[1]))
                      ? r
                      : i),
                    null != i && null != n
                      ? ((e = document.createRange()),
                        e.setStart.apply(e, i),
                        e.setEnd.apply(e, n),
                        e)
                      : void 0
                  );
                }),
                (f.prototype.getLocationAtPoint = function(t) {
                  var e, n;
                  return (e = this.createDOMRangeFromPoint(t)) &&
                    null != (n = this.createLocationRangeFromDOMRange(e))
                    ? n[0]
                    : void 0;
                }),
                (f.prototype.domRangeWithinElement = function(e) {
                  return e.collapsed
                    ? t(this.element, e.startContainer)
                    : t(this.element, e.startContainer) &&
                        t(this.element, e.endContainer);
                }),
                f
              );
            })(e.BasicObject));
        }.call(this),
        function() {
          var t,
            n,
            i,
            r,
            o = function(t, e) {
              function n() {
                this.constructor = t;
              }
              for (var i in e) s.call(e, i) && (t[i] = e[i]);
              return (
                (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.__super__ = e.prototype),
                t
              );
            },
            s = {}.hasOwnProperty,
            a = [].slice;
          (i = e.rangeIsCollapsed),
            (r = e.rangesAreEqual),
            (n = e.objectsAreEqual),
            (t = e.getBlockConfig),
            (e.EditorController = (function(s) {
              function u(t) {
                var n, i;
                (this.editorElement = t.editorElement),
                  (n = t.document),
                  (i = t.html),
                  (this.selectionManager = new e.SelectionManager(
                    this.editorElement
                  )),
                  (this.selectionManager.delegate = this),
                  (this.composition = new e.Composition()),
                  (this.composition.delegate = this),
                  (this.attachmentManager = new e.AttachmentManager(
                    this.composition.getAttachments()
                  )),
                  (this.attachmentManager.delegate = this),
                  (this.inputController = new e[
                    "Level" + e.config.input.getLevel() + "InputController"
                  ](this.editorElement)),
                  (this.inputController.delegate = this),
                  (this.inputController.responder = this.composition),
                  (this.compositionController = new e.CompositionController(
                    this.editorElement,
                    this.composition
                  )),
                  (this.compositionController.delegate = this),
                  (this.toolbarController = new e.ToolbarController(
                    this.editorElement.toolbarElement
                  )),
                  (this.toolbarController.delegate = this),
                  (this.editor = new e.Editor(
                    this.composition,
                    this.selectionManager,
                    this.editorElement
                  )),
                  null != n
                    ? this.editor.loadDocument(n)
                    : this.editor.loadHTML(i);
              }
              var c;
              return (
                o(u, s),
                (u.prototype.registerSelectionManager = function() {
                  return e.selectionChangeObserver.registerSelectionManager(
                    this.selectionManager
                  );
                }),
                (u.prototype.unregisterSelectionManager = function() {
                  return e.selectionChangeObserver.unregisterSelectionManager(
                    this.selectionManager
                  );
                }),
                (u.prototype.render = function() {
                  return this.compositionController.render();
                }),
                (u.prototype.reparse = function() {
                  return this.composition.replaceHTML(
                    this.editorElement.innerHTML
                  );
                }),
                (u.prototype.compositionDidChangeDocument = function() {
                  return (
                    this.notifyEditorElement("document-change"),
                    this.handlingInput ? void 0 : this.render()
                  );
                }),
                (u.prototype.compositionDidChangeCurrentAttributes = function(
                  t
                ) {
                  return (
                    (this.currentAttributes = t),
                    this.toolbarController.updateAttributes(
                      this.currentAttributes
                    ),
                    this.updateCurrentActions(),
                    this.notifyEditorElement("attributes-change", {
                      attributes: this.currentAttributes
                    })
                  );
                }),
                (u.prototype.compositionDidPerformInsertionAtRange = function(
                  t
                ) {
                  return this.pasting ? (this.pastedRange = t) : void 0;
                }),
                (u.prototype.compositionShouldAcceptFile = function(t) {
                  return this.notifyEditorElement("file-accept", { file: t });
                }),
                (u.prototype.compositionDidAddAttachment = function(t) {
                  var e;
                  return (
                    (e = this.attachmentManager.manageAttachment(t)),
                    this.notifyEditorElement("attachment-add", {
                      attachment: e
                    })
                  );
                }),
                (u.prototype.compositionDidEditAttachment = function(t) {
                  var e;
                  return (
                    this.compositionController.rerenderViewForObject(t),
                    (e = this.attachmentManager.manageAttachment(t)),
                    this.notifyEditorElement("attachment-edit", {
                      attachment: e
                    }),
                    this.notifyEditorElement("change")
                  );
                }),
                (u.prototype.compositionDidChangeAttachmentPreviewURL = function(
                  t
                ) {
                  return (
                    this.compositionController.invalidateViewForObject(t),
                    this.notifyEditorElement("change")
                  );
                }),
                (u.prototype.compositionDidRemoveAttachment = function(t) {
                  var e;
                  return (
                    (e = this.attachmentManager.unmanageAttachment(t)),
                    this.notifyEditorElement("attachment-remove", {
                      attachment: e
                    })
                  );
                }),
                (u.prototype.compositionDidStartEditingAttachment = function(
                  t,
                  e
                ) {
                  return (
                    (this.attachmentLocationRange = this.composition.document.getLocationRangeOfAttachment(
                      t
                    )),
                    this.compositionController.installAttachmentEditorForAttachment(
                      t,
                      e
                    ),
                    this.selectionManager.setLocationRange(
                      this.attachmentLocationRange
                    )
                  );
                }),
                (u.prototype.compositionDidStopEditingAttachment = function() {
                  return (
                    this.compositionController.uninstallAttachmentEditor(),
                    (this.attachmentLocationRange = null)
                  );
                }),
                (u.prototype.compositionDidRequestChangingSelectionToLocationRange = function(
                  t
                ) {
                  return !this.loadingSnapshot || this.isFocused()
                    ? ((this.requestedLocationRange = t),
                      (this.compositionRevisionWhenLocationRangeRequested = this.composition.revision),
                      this.handlingInput ? void 0 : this.render())
                    : void 0;
                }),
                (u.prototype.compositionWillLoadSnapshot = function() {
                  return (this.loadingSnapshot = !0);
                }),
                (u.prototype.compositionDidLoadSnapshot = function() {
                  return (
                    this.compositionController.refreshViewCache(),
                    this.render(),
                    (this.loadingSnapshot = !1)
                  );
                }),
                (u.prototype.getSelectionManager = function() {
                  return this.selectionManager;
                }),
                u.proxyMethod("getSelectionManager().setLocationRange"),
                u.proxyMethod("getSelectionManager().getLocationRange"),
                (u.prototype.attachmentManagerDidRequestRemovalOfAttachment = function(
                  t
                ) {
                  return this.removeAttachment(t);
                }),
                (u.prototype.compositionControllerWillSyncDocumentView = function() {
                  return (
                    this.inputController.editorWillSyncDocumentView(),
                    this.selectionManager.lock(),
                    this.selectionManager.clearSelection()
                  );
                }),
                (u.prototype.compositionControllerDidSyncDocumentView = function() {
                  return (
                    this.inputController.editorDidSyncDocumentView(),
                    this.selectionManager.unlock(),
                    this.updateCurrentActions(),
                    this.notifyEditorElement("sync")
                  );
                }),
                (u.prototype.compositionControllerDidRender = function() {
                  return (
                    null != this.requestedLocationRange &&
                      (this.compositionRevisionWhenLocationRangeRequested ===
                        this.composition.revision &&
                        this.selectionManager.setLocationRange(
                          this.requestedLocationRange
                        ),
                      (this.requestedLocationRange = null),
                      (this.compositionRevisionWhenLocationRangeRequested = null)),
                    this.renderedCompositionRevision !==
                      this.composition.revision &&
                      (this.runEditorFilters(),
                      this.composition.updateCurrentAttributes(),
                      this.notifyEditorElement("render")),
                    (this.renderedCompositionRevision = this.composition.revision)
                  );
                }),
                (u.prototype.compositionControllerDidFocus = function() {
                  return (
                    this.toolbarController.hideDialog(),
                    this.notifyEditorElement("focus")
                  );
                }),
                (u.prototype.compositionControllerDidBlur = function() {
                  return this.notifyEditorElement("blur");
                }),
                (u.prototype.compositionControllerDidSelectAttachment = function(
                  t,
                  e
                ) {
                  return this.composition.editAttachment(t, e);
                }),
                (u.prototype.compositionControllerDidRequestDeselectingAttachment = function(
                  t
                ) {
                  var e, n;
                  return (
                    (e =
                      null != (n = this.attachmentLocationRange)
                        ? n
                        : this.composition.document.getLocationRangeOfAttachment(
                            t
                          )),
                    this.selectionManager.setLocationRange(e[1])
                  );
                }),
                (u.prototype.compositionControllerWillUpdateAttachment = function(
                  t
                ) {
                  return this.editor.recordUndoEntry("Edit Attachment", {
                    context: t.id,
                    consolidatable: !0
                  });
                }),
                (u.prototype.compositionControllerDidRequestRemovalOfAttachment = function(
                  t
                ) {
                  return this.removeAttachment(t);
                }),
                (u.prototype.inputControllerWillHandleInput = function() {
                  return (this.handlingInput = !0), (this.requestedRender = !1);
                }),
                (u.prototype.inputControllerDidRequestRender = function() {
                  return (this.requestedRender = !0);
                }),
                (u.prototype.inputControllerDidHandleInput = function() {
                  return (
                    (this.handlingInput = !1),
                    this.requestedRender
                      ? ((this.requestedRender = !1), this.render())
                      : void 0
                  );
                }),
                (u.prototype.inputControllerDidAllowUnhandledInput = function() {
                  return this.notifyEditorElement("change");
                }),
                (u.prototype.inputControllerDidRequestReparse = function() {
                  return this.reparse();
                }),
                (u.prototype.inputControllerWillPerformTyping = function() {
                  return this.recordTypingUndoEntry();
                }),
                (u.prototype.inputControllerWillPerformFormatting = function(
                  t
                ) {
                  return this.recordFormattingUndoEntry(t);
                }),
                (u.prototype.inputControllerWillCutText = function() {
                  return this.editor.recordUndoEntry("Cut");
                }),
                (u.prototype.inputControllerWillPaste = function(t) {
                  return (
                    this.editor.recordUndoEntry("Paste"),
                    (this.pasting = !0),
                    this.notifyEditorElement("before-paste", { paste: t })
                  );
                }),
                (u.prototype.inputControllerDidPaste = function(t) {
                  return (
                    (t.range = this.pastedRange),
                    (this.pastedRange = null),
                    (this.pasting = null),
                    this.notifyEditorElement("paste", { paste: t })
                  );
                }),
                (u.prototype.inputControllerWillMoveText = function() {
                  return this.editor.recordUndoEntry("Move");
                }),
                (u.prototype.inputControllerWillAttachFiles = function() {
                  return this.editor.recordUndoEntry("Drop Files");
                }),
                (u.prototype.inputControllerWillPerformUndo = function() {
                  return this.editor.undo();
                }),
                (u.prototype.inputControllerWillPerformRedo = function() {
                  return this.editor.redo();
                }),
                (u.prototype.inputControllerDidReceiveKeyboardCommand = function(
                  t
                ) {
                  return this.toolbarController.applyKeyboardCommand(t);
                }),
                (u.prototype.inputControllerDidStartDrag = function() {
                  return (this.locationRangeBeforeDrag = this.selectionManager.getLocationRange());
                }),
                (u.prototype.inputControllerDidReceiveDragOverPoint = function(
                  t
                ) {
                  return this.selectionManager.setLocationRangeFromPointRange(
                    t
                  );
                }),
                (u.prototype.inputControllerDidCancelDrag = function() {
                  return (
                    this.selectionManager.setLocationRange(
                      this.locationRangeBeforeDrag
                    ),
                    (this.locationRangeBeforeDrag = null)
                  );
                }),
                (u.prototype.locationRangeDidChange = function(t) {
                  return (
                    this.composition.updateCurrentAttributes(),
                    this.updateCurrentActions(),
                    this.attachmentLocationRange &&
                      !r(this.attachmentLocationRange, t) &&
                      this.composition.stopEditingAttachment(),
                    this.notifyEditorElement("selection-change")
                  );
                }),
                (u.prototype.toolbarDidClickButton = function() {
                  return this.getLocationRange()
                    ? void 0
                    : this.setLocationRange({ index: 0, offset: 0 });
                }),
                (u.prototype.toolbarDidInvokeAction = function(t) {
                  return this.invokeAction(t);
                }),
                (u.prototype.toolbarDidToggleAttribute = function(t) {
                  return (
                    this.recordFormattingUndoEntry(t),
                    this.composition.toggleCurrentAttribute(t),
                    this.render(),
                    this.selectionFrozen ? void 0 : this.editorElement.focus()
                  );
                }),
                (u.prototype.toolbarDidUpdateAttribute = function(t, e) {
                  return (
                    this.recordFormattingUndoEntry(t),
                    this.composition.setCurrentAttribute(t, e),
                    this.render(),
                    this.selectionFrozen ? void 0 : this.editorElement.focus()
                  );
                }),
                (u.prototype.toolbarDidRemoveAttribute = function(t) {
                  return (
                    this.recordFormattingUndoEntry(t),
                    this.composition.removeCurrentAttribute(t),
                    this.render(),
                    this.selectionFrozen ? void 0 : this.editorElement.focus()
                  );
                }),
                (u.prototype.toolbarWillShowDialog = function() {
                  return (
                    this.composition.expandSelectionForEditing(),
                    this.freezeSelection()
                  );
                }),
                (u.prototype.toolbarDidShowDialog = function(t) {
                  return this.notifyEditorElement("toolbar-dialog-show", {
                    dialogName: t
                  });
                }),
                (u.prototype.toolbarDidHideDialog = function(t) {
                  return (
                    this.thawSelection(),
                    this.editorElement.focus(),
                    this.notifyEditorElement("toolbar-dialog-hide", {
                      dialogName: t
                    })
                  );
                }),
                (u.prototype.freezeSelection = function() {
                  return this.selectionFrozen
                    ? void 0
                    : (this.selectionManager.lock(),
                      this.composition.freezeSelection(),
                      (this.selectionFrozen = !0),
                      this.render());
                }),
                (u.prototype.thawSelection = function() {
                  return this.selectionFrozen
                    ? (this.composition.thawSelection(),
                      this.selectionManager.unlock(),
                      (this.selectionFrozen = !1),
                      this.render())
                    : void 0;
                }),
                (u.prototype.actions = {
                  undo: {
                    test: function() {
                      return this.editor.canUndo();
                    },
                    perform: function() {
                      return this.editor.undo();
                    }
                  },
                  redo: {
                    test: function() {
                      return this.editor.canRedo();
                    },
                    perform: function() {
                      return this.editor.redo();
                    }
                  },
                  link: {
                    test: function() {
                      return this.editor.canActivateAttribute("href");
                    }
                  },
                  increaseNestingLevel: {
                    test: function() {
                      return this.editor.canIncreaseNestingLevel();
                    },
                    perform: function() {
                      return (
                        this.editor.increaseNestingLevel() && this.render()
                      );
                    }
                  },
                  decreaseNestingLevel: {
                    test: function() {
                      return this.editor.canDecreaseNestingLevel();
                    },
                    perform: function() {
                      return (
                        this.editor.decreaseNestingLevel() && this.render()
                      );
                    }
                  },
                  attachFiles: {
                    test: function() {
                      return !0;
                    },
                    perform: function() {
                      return e.config.input.pickFiles(this.editor.insertFiles);
                    }
                  }
                }),
                (u.prototype.canInvokeAction = function(t) {
                  var e, n;
                  return this.actionIsExternal(t)
                    ? !0
                    : !!(null != (e = this.actions[t]) && null != (n = e.test)
                        ? n.call(this)
                        : void 0);
                }),
                (u.prototype.invokeAction = function(t) {
                  var e, n;
                  return this.actionIsExternal(t)
                    ? this.notifyEditorElement("action-invoke", {
                        actionName: t
                      })
                    : null != (e = this.actions[t]) && null != (n = e.perform)
                    ? n.call(this)
                    : void 0;
                }),
                (u.prototype.actionIsExternal = function(t) {
                  return /^x-./.test(t);
                }),
                (u.prototype.getCurrentActions = function() {
                  var t, e;
                  e = {};
                  for (t in this.actions) e[t] = this.canInvokeAction(t);
                  return e;
                }),
                (u.prototype.updateCurrentActions = function() {
                  var t;
                  return (
                    (t = this.getCurrentActions()),
                    n(t, this.currentActions)
                      ? void 0
                      : ((this.currentActions = t),
                        this.toolbarController.updateActions(
                          this.currentActions
                        ),
                        this.notifyEditorElement("actions-change", {
                          actions: this.currentActions
                        }))
                  );
                }),
                (u.prototype.runEditorFilters = function() {
                  var t, e, n, i, r, o, s, a;
                  for (
                    a = this.composition.getSnapshot(),
                      r = this.editor.filters,
                      n = 0,
                      i = r.length;
                    i > n;
                    n++
                  )
                    (e = r[n]),
                      (t = a.document),
                      (s = a.selectedRange),
                      (a = null != (o = e.call(this.editor, a)) ? o : {}),
                      null == a.document && (a.document = t),
                      null == a.selectedRange && (a.selectedRange = s);
                  return c(a, this.composition.getSnapshot())
                    ? void 0
                    : this.composition.loadSnapshot(a);
                }),
                (c = function(t, e) {
                  return (
                    r(t.selectedRange, e.selectedRange) &&
                    t.document.isEqualTo(e.document)
                  );
                }),
                (u.prototype.updateInputElement = function() {
                  var t, n;
                  return (
                    (t = this.compositionController.getSerializableElement()),
                    (n = e.serializeToContentType(t, "text/html")),
                    this.editorElement.setInputElementValue(n)
                  );
                }),
                (u.prototype.notifyEditorElement = function(t, e) {
                  switch (t) {
                    case "document-change":
                      this.documentChangedSinceLastRender = !0;
                      break;
                    case "render":
                      this.documentChangedSinceLastRender &&
                        ((this.documentChangedSinceLastRender = !1),
                        this.notifyEditorElement("change"));
                      break;
                    case "change":
                    case "attachment-add":
                    case "attachment-edit":
                    case "attachment-remove":
                      this.updateInputElement();
                  }
                  return this.editorElement.notify(t, e);
                }),
                (u.prototype.removeAttachment = function(t) {
                  return (
                    this.editor.recordUndoEntry("Delete Attachment"),
                    this.composition.removeAttachment(t),
                    this.render()
                  );
                }),
                (u.prototype.recordFormattingUndoEntry = function(e) {
                  var n, r;
                  return (
                    (n = t(e)),
                    (r = this.selectionManager.getLocationRange()),
                    n || !i(r)
                      ? this.editor.recordUndoEntry("Formatting", {
                          context: this.getUndoContext(),
                          consolidatable: !0
                        })
                      : void 0
                  );
                }),
                (u.prototype.recordTypingUndoEntry = function() {
                  return this.editor.recordUndoEntry("Typing", {
                    context: this.getUndoContext(this.currentAttributes),
                    consolidatable: !0
                  });
                }),
                (u.prototype.getUndoContext = function() {
                  var t;
                  return (
                    (t = 1 <= arguments.length ? a.call(arguments, 0) : []),
                    [this.getLocationContext(), this.getTimeContext()].concat(
                      a.call(t)
                    )
                  );
                }),
                (u.prototype.getLocationContext = function() {
                  var t;
                  return (
                    (t = this.selectionManager.getLocationRange()),
                    i(t) ? t[0].index : t
                  );
                }),
                (u.prototype.getTimeContext = function() {
                  return e.config.undoInterval > 0
                    ? Math.floor(new Date().getTime() / e.config.undoInterval)
                    : 0;
                }),
                (u.prototype.isFocused = function() {
                  var t;
                  return (
                    this.editorElement ===
                    (null != (t = this.editorElement.ownerDocument)
                      ? t.activeElement
                      : void 0)
                  );
                }),
                u
              );
            })(e.Controller));
        }.call(this),
        function() {
          var t, n, i, r, o, s;
          (n = e.browser),
            (o = e.makeElement),
            (s = e.triggerEvent),
            (i = e.handleEvent),
            (r = e.handleEventOnce),
            (t = e.AttachmentView.attachmentSelector),
            e.registerElement(
              "trix-editor",
              (function() {
                var a, u, c, l, h, p, d, f;
                return (
                  (p = 0),
                  (u = function(t) {
                    return !document.querySelector(":focus") &&
                      t.hasAttribute("autofocus") &&
                      document.querySelector("[autofocus]") === t
                      ? t.focus()
                      : void 0;
                  }),
                  (d = function(t) {
                    return t.hasAttribute("contenteditable")
                      ? void 0
                      : (t.setAttribute("contenteditable", ""),
                        r("focus", {
                          onElement: t,
                          withCallback: function() {
                            return c(t);
                          }
                        }));
                  }),
                  (a = function(t) {
                    return t.hasAttribute("role")
                      ? void 0
                      : t.setAttribute("role", "textbox");
                  }),
                  (c = function(t) {
                    return h(t), f(t);
                  }),
                  (h = function(t) {
                    return ("function" == typeof document.queryCommandSupported
                    ? document.queryCommandSupported("enableObjectResizing")
                    : void 0)
                      ? (document.execCommand("enableObjectResizing", !1, !1),
                        i("mscontrolselect", {
                          onElement: t,
                          preventDefault: !0
                        }))
                      : void 0;
                  }),
                  (f = function() {
                    var t;
                    return ("function" == typeof document.queryCommandSupported
                      ? document.queryCommandSupported(
                          "DefaultParagraphSeparator"
                        )
                      : void 0) &&
                      ((t = e.config.blockAttributes["default"].tagName),
                      "div" === t || "p" === t)
                      ? document.execCommand("DefaultParagraphSeparator", !1, t)
                      : void 0;
                  }),
                  (l = (function() {
                    return n.forcesObjectResizing
                      ? { display: "inline", width: "auto" }
                      : { display: "inline-block", width: "1px" };
                  })()),
                  {
                    defaultCSS:
                      "%t {\n  display: block;\n}\n\n%t:empty:not(:focus)::before {\n  content: attr(placeholder);\n  color: graytext;\n  cursor: text;\n}\n\n%t a[contenteditable=false] {\n  cursor: text;\n}\n\n%t img {\n  max-width: 100%;\n  height: auto;\n}\n\n%t " +
                      t +
                      " figcaption textarea {\n  resize: none;\n}\n\n%t " +
                      t +
                      " figcaption textarea.trix-autoresize-clone {\n  position: absolute;\n  left: -9999px;\n  max-height: 0px;\n}\n\n%t " +
                      t +
                      " figcaption[data-trix-placeholder]:empty::before {\n  content: attr(data-trix-placeholder);\n  color: graytext;\n}\n\n%t [data-trix-cursor-target] {\n  display: " +
                      l.display +
                      " !important;\n  width: " +
                      l.width +
                      " !important;\n  padding: 0 !important;\n  margin: 0 !important;\n  border: none !important;\n}\n\n%t [data-trix-cursor-target=left] {\n  vertical-align: top !important;\n  margin-left: -1px !important;\n}\n\n%t [data-trix-cursor-target=right] {\n  vertical-align: bottom !important;\n  margin-right: -1px !important;\n}",
                    trixId: {
                      get: function() {
                        return this.hasAttribute("trix-id")
                          ? this.getAttribute("trix-id")
                          : (this.setAttribute("trix-id", ++p), this.trixId);
                      }
                    },
                    toolbarElement: {
                      get: function() {
                        var t, e, n;
                        return this.hasAttribute("toolbar")
                          ? null != (e = this.ownerDocument)
                            ? e.getElementById(this.getAttribute("toolbar"))
                            : void 0
                          : this.parentNode
                          ? ((n = "trix-toolbar-" + this.trixId),
                            this.setAttribute("toolbar", n),
                            (t = o("trix-toolbar", { id: n })),
                            this.parentNode.insertBefore(t, this),
                            t)
                          : void 0;
                      }
                    },
                    inputElement: {
                      get: function() {
                        var t, e, n;
                        return this.hasAttribute("input")
                          ? null != (n = this.ownerDocument)
                            ? n.getElementById(this.getAttribute("input"))
                            : void 0
                          : this.parentNode
                          ? ((e = "trix-input-" + this.trixId),
                            this.setAttribute("input", e),
                            (t = o("input", { type: "hidden", id: e })),
                            this.parentNode.insertBefore(
                              t,
                              this.nextElementSibling
                            ),
                            t)
                          : void 0;
                      }
                    },
                    editor: {
                      get: function() {
                        var t;
                        return null != (t = this.editorController)
                          ? t.editor
                          : void 0;
                      }
                    },
                    name: {
                      get: function() {
                        var t;
                        return null != (t = this.inputElement)
                          ? t.name
                          : void 0;
                      }
                    },
                    value: {
                      get: function() {
                        var t;
                        return null != (t = this.inputElement)
                          ? t.value
                          : void 0;
                      },
                      set: function(t) {
                        var e;
                        return (
                          (this.defaultValue = t),
                          null != (e = this.editor)
                            ? e.loadHTML(this.defaultValue)
                            : void 0
                        );
                      }
                    },
                    notify: function(t, e) {
                      return this.editorController
                        ? s("trix-" + t, { onElement: this, attributes: e })
                        : void 0;
                    },
                    setInputElementValue: function(t) {
                      var e;
                      return null != (e = this.inputElement)
                        ? (e.value = t)
                        : void 0;
                    },
                    initialize: function() {
                      return d(this), a(this);
                    },
                    connect: function() {
                      return this.hasAttribute("data-trix-internal")
                        ? void 0
                        : (this.editorController ||
                            (s("trix-before-initialize", { onElement: this }),
                            (this.editorController = new e.EditorController({
                              editorElement: this,
                              html: (this.defaultValue = this.value)
                            })),
                            requestAnimationFrame(
                              (function(t) {
                                return function() {
                                  return s("trix-initialize", { onElement: t });
                                };
                              })(this)
                            )),
                          this.editorController.registerSelectionManager(),
                          this.registerResetListener(),
                          u(this));
                    },
                    disconnect: function() {
                      var t;
                      return (
                        null != (t = this.editorController) &&
                          t.unregisterSelectionManager(),
                        this.unregisterResetListener()
                      );
                    },
                    registerResetListener: function() {
                      return (
                        (this.resetListener = this.resetBubbled.bind(this)),
                        window.addEventListener("reset", this.resetListener, !1)
                      );
                    },
                    unregisterResetListener: function() {
                      return window.removeEventListener(
                        "reset",
                        this.resetListener,
                        !1
                      );
                    },
                    resetBubbled: function(t) {
                      var e;
                      return t.target !==
                        (null != (e = this.inputElement) ? e.form : void 0) ||
                        t.defaultPrevented
                        ? void 0
                        : this.reset();
                    },
                    reset: function() {
                      return (this.value = this.defaultValue);
                    }
                  }
                );
              })()
            );
        }.call(this),
        function() {}.call(this));
    }.call(this),
      "object" == typeof module && module.exports
        ? (module.exports = e)
        : "function" == typeof define && define.amd && define(e));
  }.call(this));
