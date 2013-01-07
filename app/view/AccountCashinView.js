Ext.define('FinancialRecorderApp.view.AccountCashinView', {
    extend: 'Ext.Panel',
	xtype: 'accountcashinview',
    requires: "Ext.form.FieldSet",

	config: {
		layout: 'fit',
    },

    formPanel: '',

    initialize: function() {
        var topBar = {
            xtype: 'titlebar',
            docked: 'top',
            title: 'Cash in',
            items: [{
                xtype: 'button',
                ui: 'back',
                align: 'left',
                text: 'Back',
                handler: this.back,
                scope: this
            },{
                xtype: 'button',
                align: 'right',
                text: 'Cashin',
                handler: this.cashin,
                scope: this
            }]
        };

        var nameField = Ext.create('Ext.field.Text',{
            xtype: 'textfield',
            name : 'name',
            label: 'Name',
        });

        var balanceField =  Ext.create('Ext.field.Number',{
            xtype: 'numberfield',
            name : 'amount',
            label: 'Amount',
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

    back: function() {
        this.fireEvent('backToMainViewEvent', this);
    },

    cashin: function() {
        console.log('cash in');
        this.fireEvent('accountCashinEvent', this)
    },

    getCashinForm: function() {
        return this.formPanel;
    }
});