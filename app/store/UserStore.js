Ext.define('FinancialRecorderApp.store.UserStore',{	

	extend: 'Ext.data.Store',
	requires: [
        'Ext.data.proxy.JsonP',
		'FinancialRecorderApp.model.UserModel'
    ],
	
	config: {
		autoLoad: true,
		storeId: 'UserStore',
		model: 'FinancialRecorderApp.model.UserModel',
		listeners: {
		    load: {
		        fn: function(){console.log('UserStore Loaded!')},
		        scope: this,   
		    }
		},
		proxy: {
			type: 'jsonp',
			url : 'http://financialrecorder.cloudfoundry.com/api/jsonp/user/list',
			reader: {
				type: 'json',
				rootProperty: 'userList'
			}
		},
	}
});