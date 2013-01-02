Ext.define('FinancialRecorderApp.view.ActivityView', {
    extend: 'Ext.Panel',
	xtype: 'activityview',

	requires: [
		'FinancialRecorderApp.view.ActivityListView'
    ],
	
	config: {
		layout: 'fit',
    },

    initialize: function() {
        var topBar = {
            xtype: 'titlebar',
            title: 'Activity List',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                align: 'left',
                handler: this.back,
                scope: this
            },
            {
                xtype: 'button',
                text: 'New',
                align: 'right',
                handler: this.create,
                scope: this
            }],
        };

        var activityList = {
            xtype: 'activitylistview',
        };

        this.add(topBar, activityList);
    },

    create: function(){
        console.log('create an new record');
        this.fireEvent('showNewFinancialRecordEvent', this);
    },

    back: function(){
        console.log('back to main view');
        this.fireEvent('backToMainViewEvent', this);
    },
});