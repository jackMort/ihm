from django.db import models
from django.utils.translation import gettext_lazy as _

class Type( models.Model ):
    name = models.CharField( max_length=100 )
    description = models.TextField( blank=True, null=True )

    def __str__( self ):
        return self.name

    class Meta:
        verbose_name = _( "Sensor Type" )
        verbose_name_plural = _( "Sensor Types" )


class Sensor( models.Model ):
    type = models.ForeignKey( Type )
    name = models.CharField( max_length=100 )
    description = models.TextField( blank=True, null=True )

    def __str__( self ):
        return "%s [%s]" % ( self.name, self.type )

    class Meta:
        verbose_name = _( "Sensor" )
        verbose_name_plural = _( "Sensors" )

# vim: fdm=marker ts=4 sw=4 sts=4
