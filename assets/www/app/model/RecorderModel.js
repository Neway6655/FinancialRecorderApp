Ext.define('FinancialRecorderApp.model.RecorderModel', {
	extend: 'Ext.data.Model',
	config: {
		idProperty: 'id',
		fields: [
					{name: 'id', type: 'int'},
					{name: 'name', type: 'string'},
					{name: 'totalFee', type: 'int'},
					{name: 'userNameList', type: 'auto'},
					{name: 'recordDate', type: 'int'}
				]
	}
});