Ext.define('FinancialRecorderApp.model.TransactionHistoryModel', {
	extend: 'Ext.data.Model',
	config: {
		fields: [
					{name: 'userName', type: 'string'},
					{name: 'type', type: 'string'},
					{name: 'createdTime', type: 'date', dateFormat: 'Y-m-d'},
					{name: 'amount', type: 'float'}
				]
	}
});