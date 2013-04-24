Ext.define('FinancialRecorderApp.view.ActivityListView', {
    extend: 'Ext.List',
    xtype: 'activitylistview', 
	requires: ['FinancialRecorderApp.store.RecorderStore'],
    
    config: {
        title: 'Activities',
        loadingText: "Loading Activity List",
        emptyText: '<div><p>No Activity Found.</div>',
        itemTpl:
				'{name}---' + 
				'<small>TotalFee: {totalFee}</small></br>' + 
				'<small>({userNameList})</small>',
        store: Ext.create("FinancialRecorderApp.store.RecorderStore"),
        plugins: [
            {
                xclass: 'Ext.plugin.PullRefresh',
                pullRefreshText: 'Pull down to refresh activity list.'
            },
        ],
        listeners: {
            itemtap: 'activityRecordTap'
        }
    },

    activityRecordTap: function (list, index, item, record) {
        console.log('activity record tapped.' + record.data.name);
        this.fireEvent('activityRecordTapEvent', this, record);
    }
});