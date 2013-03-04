Ext.define('FinancialRecorderApp.view.MainView', {
    extend: 'Ext.Panel',
    xtype: 'mainview',
    id: 'mainViewId',

    layout: {
        type: 'fit',
    },

    activityButton: '',

    accountButton: '',

    transactionHistoryButton: '',

    initialize: function() {
        this.activityButton = Ext.create('Ext.Button', {
            handler: this.selectActivity,
            scope: this,
            height: 80,
            width: 120,
            text: 'Activity',
        });

        this.accountButton = Ext.create('Ext.Button', {
            handler: this.selectAccount,
            scope: this,
            height: 80,
            width: 120,
            text: 'Account',
        });

        this.transactionHistoryButton = Ext.create('Ext.Button', {
            handler: this.selectTransactionHistory,
            scope: this,
            height: 80,
            width: 120,
            text: 'History',
        });

        var topBar = {
            xtype: 'titlebar',
            title: 'Activity Recorder',
            docked: 'top',
        };

        var spacer = {
            xtype: 'spacer',
        };

        var upPanel = {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align:'center',
                pack:'center'
            },
            height: '100%',
            padding: '10',
            cls: 'home_panel',

            items: [
                this.activityButton, spacer, this.accountButton
            ]
        };

        var downPanel = {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align:'center',
                pack:'center'
            },
            height: '100%',
            padding: '10',
            cls: 'home_panel',

            items: [
                this.transactionHistoryButton, spacer, spacer
            ]
        };

        this.add(topBar, upPanel, downPanel);
    },

    selectActivity: function() {
        console.log('activity button tapped.');
        this.fireEvent('selectActivityEvent', this);
    },

    selectAccount: function(){
        console.log('account button tapped.');
        this.fireEvent('selectAccountEvent', this);
    },

    selectTransactionHistory: function(){
        console.log('transaction history button tapped.');
        this.fireEvent('selectTransactionHistoryEvent', this);  
    }
});