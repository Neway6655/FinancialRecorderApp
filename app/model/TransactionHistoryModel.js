Ext.define('FinancialRecorderApp.model.TransactionHistoryModel', {
	extend: 'Ext.data.Model',
	config: {
		fields: [
					{name: 'userName', type: 'string'},
					{name: 'type', type: 'string'},
					{name: 'createdTime', type: 'string'},
					{name: 'amount', type: 'float'}
				]
	}
});