Ext.namespace( 'seiho.ihm' );

seiho.ihm.App = function() {
	return {
		init: function() {
			Ext.QuickTips.init();

			// panel centralny
			var viewport = new Ext.Viewport({
				layout: 'border',
				items: [
					{
						contentEl: 'header',
						region: 'north',
						height: 60,
						border: false,
						bodyStyle: 'background: #e5e5e5',
					},{
						region: 'center',
						layout: 'fit',
						border: false,
						bodyStyle: 'background: #e5e5e5',
						items: new seiho.ihm.MainPanel()
					}
				]
			})
		},

		shareLocation: function( e, t ) {			
			e.preventDefault();
		
			if( this.shareLocationWindow ) {
				this.shareLocationWindow.toFront();
				this.shareLocationWindow.getEl().frame();

				return false;
			}

			this.shareLocationWindow = new Ext.Window({
				layout: 'fit',
				iconCls: 'icon-map',
				title: 'Twoja lokalizacja',
				modal: true,
				width: 600,
				height: 200,
				x: e.getXY()[0] - 600,
				y: e.getXY()[1] + 35,
				items: new Ext.ux.GMapPanel({
					listeners: {
						render: {
							fn: function( panel ) {
								panel.getEl().mask( 'Trwa pobieranie danych o lokacji ...', 'x-mask-loading' );
								// ..
								if ( navigator.geolocation ) {
									navigator.geolocation.getCurrentPosition( function( pos ) {
										var point = new GLatLng( pos.coords.latitude, pos.coords.longitude );
										// ..
										panel.getMap().setCenter( point, 13 )
										panel.addMarker( point, { title: 'Tu jesteś koksie ...' } )
										// ..
										panel.getEl().unmask();
									});
								}
							},
							delay: 2000						
						}
					},
					xtype: 'gmappanel',
					zoomLevel: 5,
					gmapType: 'map',
					mapConfOpts: ['enableScrollWheelZoom', 'enableDoubleClickZoom', 'enableDragging' ],
					mapControls: ['GSmallMapControl', 'GmapTypeControl', 'NonExistantControl'],
					setCenter: {
						lat: 52,
						lng: 19
					}
				}),
				listeners: {
					close: {
						fn: function() {
							this.shareLocationWindow = undefined
						},
						scope: this
					}
				}
			}).show( t )			
		}
	}
}();


seiho.ihm.MainPanel = Ext.extend( Ext.Panel, {
	border: false,
	initComponent: function() {
		Ext.apply( this, {
			frame: true,
			baseCls: 'canvas',
			layout: 'fit',
			items: [
				new Ext.TabPanel({
					activeItem: 0,
					items: [
						new Ext.Panel( { title: 'HOME', iconCls: 'icon-house' } ),
						new Ext.Panel( { title: 'Alarmy', iconCls: 'icon-tag_orange' } ),
						new Ext.Panel( { title: 'Czujniki', iconCls: 'icon-tag_green' } ),
						new Ext.Panel( { title: 'Plan Budynku', iconCls: 'icon-tag_blue' } ),
					]
				})
			],
			gbar: [
				' ', { iconCls: 'icon-book_open', text: 'dziennik treningowy', pressed: true, toggleGroup: 'main-bar' },
				// { iconCls: 'icon-delete', text: 'wyczyść', toggleGroup: 'main-bar' }, '-', 
				// { iconCls: 'icon-application_osx_terminal', text: 'szablon', toggleGroup: 'main-bar' },
				// { iconCls: 'icon-map', text: 'mapa', toggleGroup: 'main-bar', disabled: 'true' }, 
				'->', { xtype: 'textfield', width: 200, emptyText: 'Wyszukaj w serwisie ...' },' '
			]
		});
		seiho.ihm.MainPanel.superclass.initComponent.apply( this, arguments );
	}
});

Ext.onReady( seiho.ihm.App.init, seiho.ihm.App );
