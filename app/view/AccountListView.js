Ext.define('FinancialRecorderApp.view.AccountListView', {
    extend: 'Ext.List',
	requires: ['FinancialRecorderApp.store.UserStore'],
    xtype: 'accountlistview',
    
    config: {
        title: 'Accounts',
        loadingText: "Loading Accounts Info",
        emptyText: '<div><p>No Account Found.</div>',
        itemTpl:
				'{name}---' + 
				'<small>Balance: {balance}</small>',
        store: Ext.create("FinancialRecorderApp.store.UserStore"),
        plugins: [
            {
                xclass: 'Ext.plugin.PullRefresh',
                pullRefreshText: 'Pull down to refresh account list.'
            },
        ],
        listeners: {
            itemtap: 'accountRecordTap'
        }
    },

    accountRecordTap: function (list, index, item, record) {
        console.log('account record tapped.' + record.data.name);
        this.fireEvent('accountRecordTapEvent', this, record);
    }
});