===========
django-trix
===========

`Trix rich text editor <http://trix-editor.org>`_ widget for Django, using Trix 1.2.1.

.. image:: https://circleci.com/gh/istrategylabs/django-trix/tree/master.svg?style=shield
    :target: https://circleci.com/gh/istrategylabs/django-trix/tree/master
    

Using django-trix
-----------------

django-trix includes a form widget, a model field, and a model admin mixin that
enables the rich text editor. You can use any of these methods, but you do not
need to use all.

Model
~~~~~

To enable the editor in the Django admin (or any form) via the model field, use
the Trix model field *TrixField* which inherits from
django.db.models.TextField::

    from django.db import models
    from trix.fields import TrixField

    class Post(models.Model):
        content = TrixField('Content')


Admin
~~~~~

To enable the editor in the Django admin, inherit from TrixAdmin and set
the *trix_fields* attribute to a list of the fields that use an editor::

    from myawesomeblogapp.models import Post
    from trix.admin import TrixAdmin

    @admin.register(Post)
    class PostAdmin(TrixAdmin, admin.ModelAdmin):
        trix_fields = ('content',)


Forms and Templates
~~~~~~~~~~~~~~~~~~~

The editor can be used in forms and templates by adding the *TrixEditor* widget
to a form field::

    from django import forms
    from trix.widgets import TrixEditor

    class EditorForm(forms.Form):
        content = forms.CharField(widget=TrixEditor)

In the template, just use the form as you normally would, but be sure to
include the associated media::

    <!doctype html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Trix Editor Test</title>
            {{ form.media.css }}
        </head>
        <body>
            <form>
                {{ form }}
            </form>
            {{ form.media.js }}
        </body>
    </html>

CSS in head, JS at end of body, because you are a responsible developer.


Installation
------------

It's on `PyPI <https://pypi.python.org/pypi/django-trix>`_::

    pip install django-trix

Add to *INSTALLED_APPS*::

    INSTALLED_APPS = (
        ...
        'trix',
        ...
    )

Add route to *urls.py*::

    urlpatterns = [
        ...
        url(r'^trixorwhateveryouwant/', include('trix.urls')),
        ...
    ]


TODO
----

* A bunch of stuff!
* Attachment uploads
