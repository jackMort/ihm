import settings
from django.conf.urls.defaults import *
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    url( r'^admin/', include( admin.site.urls ) ),
    url( r'^media/(.*)$', 'django.views.static.serve', { 'document_root' : settings.MEDIA_ROOT } ),
    url( r'^/?$', 'ihm.core.views.index', name='index' ),

    # accounts
    url( r'^accounts/login/$', 'ihm.core.views.login_user', name='login' ),
    url( r'^accounts/logout/$', 'ihm.core.views.logout_user', name='logout' ),
    url( r'^accounts/login/json$', 'ihm.core.views.json_login' )
)
