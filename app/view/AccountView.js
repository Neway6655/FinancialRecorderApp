Ext.define('FinancialRecorderApp.view.AccountView', {
    extend: 'Ext.Panel',
	xtype: 'accountview',

	requires: [
		'FinancialRecorderApp.view.AccountListView'
    ],
	
	config: {
		layout: 'fit',
    },

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

        var accountList = {
            xtype: 'accountlistview',
        };

        this.add(topBar, accountList);
    },

    back: function(){
        console.log('back to main view');
        this.fireEvent('backToMainViewEvent', this);
    },
});