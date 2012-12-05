Ext.define('FinancialRecorderApp.view.UserSelectorView', {
    extend: 'Ext.List',
    xtype: 'userselectorview',

    requires: ['FinancialRecorderApp.store.UserStore'],

    config: {
        title: 'Select the participants',
        allowDeselect: true,
        mode: 'MULTI',
        itemTpl: '{name}',
        store: Ext.create("FinancialRecorderApp.store.UserStore"),
        listeners: {
            select: 'userSelected',
        }
    },

    userSelected: function(list, record, item, a, b, c) {
        console.log("itemtap: " + record.data.name);
        // this.fireEvent('friendSelectedEvent', record.data.name, item);
    },
});