Ext.define('FinancialRecorderApp.model.UserModel', {
	extend: 'Ext.data.Model',
	config: {
		fields: [
					{name: 'id', type: 'int'},
					{name: 'name', type: 'string'},
					{name: 'balance', type: 'int'},
					{name: 'type', type: 'int'}
				]
	}
});