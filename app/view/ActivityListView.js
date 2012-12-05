Ext.define('FinancialRecorderApp.view.ActivityListView', {
    extend: 'Ext.List',
	requires: ['FinancialRecorderApp.store.RecorderStore'],
    xtype: 'activitylistview',    
    
    config: {
        title: 'Activities',
        loadingText: "Loading Activity List",
        emptyText: '<div><p>No Activity Found.</div>',
        itemTpl:
				'{name}---' + 
				'<small>TotalFee: {totalFee}</small></br>' + 
				'<small>({userNameList})</small>',
        store: Ext.create("FinancialRecorderApp.store.RecorderStore"),
        listeners: {
            itemtap: 'activityRecordTap'
        }
    },

    activityRecordTap: function (list, index, item, record) {
        console.log('activity record tapped.' + record.data.name);
        this.fireEvent('activityRecordTapEvent', this, record);
    }
});