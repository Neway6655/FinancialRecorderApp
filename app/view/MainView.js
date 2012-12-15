Ext.define('FinancialRecorderApp.view.MainView', {
    extend: 'Ext.Panel',
    xtype: 'mainview',

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
            text: 'Activity'
        });

        this.accountButton = Ext.create('Ext.Button', {
            handler: this.selectAccount,
            scope: this,
            height: 80,
            width: 80,
            text: 'Account'
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
            // margin: '100 50 0 50',
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