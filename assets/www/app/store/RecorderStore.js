Ext.define('FinancialRecorderApp.store.RecorderStore',{	

	extend: 'Ext.data.Store',
	requires: [
        'Ext.data.proxy.JsonP',
		'FinancialRecorderApp.model.RecorderModel'
    ],
	
	config: {
		autoLoad: true,
		sorters: [{
	        property: 'recordDate',
	        direction: 'DESC'
    	}],
		model: 'FinancialRecorderApp.model.RecorderModel',
		proxy: {
			type: 'jsonp',
			url : 'http://financialrecorder.cloudfoundry.com/api/jsonp/finance/list',
			reader: {
				type: 'json',
				rootProperty: 'recordList'
			}
		},
	}
});