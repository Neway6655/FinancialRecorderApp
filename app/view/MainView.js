Ext.define('FinancialRecorderApp.view.MainView', {
    extend: 'Ext.Panel',
    xtype: 'mainview',
    id: 'mainViewId',

    layout: {
        type: 'fit',
    },

    activityButton: '',

    accountButton: '',

    initialize: function() {
        this.activityButton = Ext.create('Ext.Button', {
            handler: this.selectActivity,
            scope: this,
            height: 80,
            width: 80,
            icon: 'resources/images/activities.png',
        });

        this.accountButton = Ext.create('Ext.Button', {
            handler: this.selectAccount,
            scope: this,
            height: 80,
            width: 80,
            icon: 'resources/images/accounts.png',
        });

        var topBar = {
            xtype: 'titlebar',
            title: 'Activity Recorder',
            docked: 'top',
        };

        var spacer = {
            xtype: 'spacer',
        };

        var centerPanel = {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align:'center',
                pack:'center'
            },
            height: '100%',
            padding: '50',
            cls: 'home_panel',

            items: [
                this.activityButton, spacer, this.accountButton
            ]
        }

        this.add(topBar, centerPanel);
    },

    selectActivity: function() {
        console.log('activity button tapped.');
        this.fireEvent('selectActivityEvent', this);
    },

    selectAccount: function(){
        console.log('account button tapped.');
        this.fireEvent('selectAccountEvent', this);
    }
});