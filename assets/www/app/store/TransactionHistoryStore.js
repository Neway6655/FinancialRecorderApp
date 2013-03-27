Ext.define('FinancialRecorderApp.store.TransactionHistoryStore',{	

	extend: 'Ext.data.Store',
	requires: [
        'Ext.data.proxy.JsonP',
		'FinancialRecorderApp.model.TransactionHistoryModel'
    ],
	
	config: {
		autoLoad: true,
		sorters: [{
	        property: 'createdTime',
	        direction: 'DESC'
    	}],
		model: 'FinancialRecorderApp.model.TransactionHistoryModel',
		proxy: {
			type: 'jsonp',
			url : 'http://financialrecorder.cloudfoundry.com/api/jsonp/finance/search',
			reader: {
				type: 'json',
				rootProperty: 'budgetTrailList'
			}
		},
	}
});