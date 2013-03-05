Ext.define('FinancialRecorderApp.view.AccountDetailView', {
    extend: 'Ext.Panel',
	xtype: 'accountdetailview',
    requires: "Ext.form.FieldSet",

	config: {
		layout: 'fit',
    },

    formPanel: '',

    initialize: function() {
        var topBar = {
            xtype: 'titlebar',
            docked: 'top',
            title: 'Account Detail',
            items: [{
                xtype: 'button',
                ui: 'back',
                align: 'left',
                text: 'Back',
                handler: this.back,
                scope: this
            }]
        };

        var nameField = Ext.create('Ext.field.Text',{
            xtype: 'textfield',
            name : 'name',
            label: 'Name',
            readOnly: true
        });

        var balanceField =  Ext.create('Ext.field.Number',{
            xtype: 'numberfield',
            name : 'balance',
            label: 'Balance',
            readOnly: true
        });

        this.formPanel = Ext.create('Ext.form.Panel',{
            items: [{
                xtype: 'fieldset',
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '35%'
                },
                items: [
                    nameField, balanceField
                ],
            }]
        });

        this.add(topBar, this.formPanel);
    },

    loadFormRecord: function(record){
        console.log('load account detail record');
        this.formPanel.setRecord(record);
    },

    back: function(){
        this.fireEvent('backToMainViewEvent', this);
    }
});