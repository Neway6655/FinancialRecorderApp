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
		proxy: {
			type: 'jsonp',
			url : 'http://financialrecorder.cloudfoundry.com/api/jsonp/user/list',
			// url : 'http://localhost:8080/recorder-server/api/jsonp/user/list',
			reader: {
				type: 'json',
				rootProperty: 'userList'
			}
		},
	}
});