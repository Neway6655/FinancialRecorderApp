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
	        direction: 'ASCE'
    	}],
		model: 'FinancialRecorderApp.model.RecorderModel',
		listeners: {
		    load: {
		        fn: function(){console.log('RecorderStore Loaded!')},
		        scope: this,   
		    }
		},
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