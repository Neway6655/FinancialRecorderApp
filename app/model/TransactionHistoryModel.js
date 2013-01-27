Ext.define('FinancialRecorderApp.model.TransactionHistoryModel', {
	extend: 'Ext.data.Model',
	config: {
		fields: [
					{name: 'userName', type: 'string'},
					{name: 'type', type: 'string'},
					{name: 'createdTime', type: 'int'},
					{name: 'amount', type: 'float'}
				]
	}
});