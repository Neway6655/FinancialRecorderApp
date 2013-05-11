Ext.define('FinancialRecorderApp.view.TransactionHistoryView', {
    extend: 'Ext.Panel',
	requires: ['FinancialRecorderApp.store.TransactionHistoryStore'],
    xtype: 'transactionhistoryview',

    config: {
        layout: 'fit',
    },

    transactionHistoryList: '',

    initialize: function() {
        var topBar = {
            xtype: 'titlebar',
            title: 'Transaction History',
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

        this.transactionHistoryList = Ext.create('Ext.List', {
            xtype: 'list',
            title: 'Transaction History',
            loadingText: "Loading Transaction History",
            emptyText: '<div><p>No Transaction Found.</div>',
            itemTpl: new Ext.XTemplate (
                    '<p>Event: {type}, Date: {createdTime} </p>', 
                    '<p>Amount:{[this.floatFormat(values.amount)]} </p>',
                    {
                        compiled: true,
                        floatFormat: function (float){
                            return (parseInt(float * 100))/100;
                        }
                    }),
            store: Ext.create("FinancialRecorderApp.store.TransactionHistoryStore"),
        });

        this.add(topBar, this.transactionHistoryList);
    },

    back: function(){
        console.log('back to main view');
        this.fireEvent('backToMainViewEvent', this);
    },

    getTransactionHistoryList: function() {
        return this.transactionHistoryList;
    }
});