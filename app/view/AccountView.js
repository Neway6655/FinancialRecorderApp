Ext.define('FinancialRecorderApp.view.AccountView', {
    extend: 'Ext.Panel',
	xtype: 'accountview',
    id: 'accountView',

	requires: [
		'FinancialRecorderApp.view.AccountListView'
    ],
	
	config: {
		layout: 'fit',
    },

    accountList: '',

    initialize: function() {
        var topBar = {
            xtype: 'titlebar',
            title: 'Account List',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                align: 'left',
                handler: this.back,
                scope: this
            }],
        };

        this.accountList = Ext.create('FinancialRecorderApp.view.AccountListView', {
            xtype: 'accountlistview',
        });

        this.add(topBar, this.accountList);
    },

    back: function(){
        console.log('back to main view');
        this.fireEvent('backToMainViewEvent', this);
    },

    getAccountList: function() {
        return this.accountList;
    }
});