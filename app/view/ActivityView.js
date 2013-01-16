Ext.define('FinancialRecorderApp.view.ActivityView', {
    extend: 'Ext.Panel',
	xtype: 'activityview',

	requires: [
		'FinancialRecorderApp.view.ActivityListView'
    ],
	
	config: {
		layout: 'fit',
    },

    activityList: '',

    newButton: '',

    initialize: function() {
        this.newButton = Ext.create('Ext.Button', {
            xtype: 'button',
            text: 'New',
            align: 'right',
            handler: this.create,
            scope: this
        });

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
            this.newButton],
        };

        this.activityList = Ext.create('FinancialRecorderApp.view.ActivityListView',{
            xtype: 'activitylistview',
        });

        this.add(topBar, this.activityList);
    },

    create: function(){
        console.log('create an new record');
        this.fireEvent('showNewFinancialRecordEvent', this);
    },

    back: function(){
        console.log('back to main view');
        this.fireEvent('backToMainViewEvent', this);
    },

    getActivityList: function(){
        return this.activityList;
    },

    getNewButton: function(){
        return this.newButton;
    },
});