Ext.define('FinancialRecorderApp.view.MainView', {
    extend: 'Ext.Panel',
    xtype: 'mainview',

    layout: {
        type: 'vbox',
        align:'center',
        pack:'center'
    },

    activityButton: '',

    accountButton: '',

    initialize: function() {
        this.activityButton = Ext.create('Ext.Button', {
            text: 'Activity',
            flex: 1,
            handler: this.selectActivity,
            scope: this
       });

        this.accountButton = Ext.create('Ext.Button', {
            text: 'Account',
            flex: 1,
            handler: this.selectAccount,
            scope: this
        });

        var topBar = {
            xtype: 'titlebar',
            title: 'Activity recorder',
            docked: 'top',
        };


        var centerPanel = {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align:'center',
                pack:'center'
            },

            items: [
                this.activityButton, this.accountButton
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