Ext.define('FinancialRecorderApp.view.ActivityDetailView', {
    extend: 'Ext.Panel',
    requires: "Ext.form.FieldSet",
    xtype: 'activitydetailview',

    config:{
    	layout: 'fit',
        scrollable:'vertical',
    },

    formPanel: '',

    nameField: '',

    totalFeeField: '',

    attendUserField: '',

    saveButton: '',

	initialize: function() {
		console.log('init activity detail view.');

		this.nameField = Ext.create('Ext.field.Text',{
			xtype: 'textfield',
			name : 'name',
			label: 'Name',
		});

		this.totalFeeField =  Ext.create('Ext.field.Number',{
			xtype: 'numberfield',
			name : 'totalFee',
			label: 'Total Fee',
		});

		this.attendUserField = Ext.create('FinancialRecorderApp.view.MultiSelect',{
			xtype : 'multiselectfield',
            name : 'userNameList',
            label : 'Members',
            store : Ext.create("FinancialRecorderApp.store.UserStore"),
            displayField : 'name',
            valueField : 'name',
            usePicker : false
		});

		this.formPanel = Ext.create('Ext.form.Panel',{
			items: [{
				xtype: 'fieldset',
				instructions: 'Please check the activity detail information.',
				defaults: {
					required: true,
					labelAlign: 'left',
					labelWidth: '35%'
				},
				items: [
					this.nameField, this.totalFeeField, this.attendUserField
				],
			}]
		});

		this.saveButton = Ext.create('Ext.Button', {
			xtype: 'button',
    		align: 'right',
    		text: 'Save',
    		handler: this.save,
    		scope: this
		});

		var topBar = {
    		xtype: 'titlebar',
    		docked: 'top',
    		title: 'Activity Detail',
    		items: [{
    			xtype: 'button',
    			ui: 'back',
    			align: 'left',
    			text: 'Back',
    			handler: this.back,
    			scope: this
    		}, this.saveButton]
    	};

		this.add(topBar, this.formPanel);
	},

	loadRecord: function(record){
		this.formPanel.setRecord(record);
		this.nameField.setReadOnly(true);
		this.totalFeeField.setReadOnly(true);
		this.attendUserField.setReadOnly(true);
	},

	back: function() {
		console.log('back button tapped.');
		this.fireEvent('backToActivityListEvent', this);
	},

	save: function(){
		console.log('save activity.');
		this.fireEvent('saveActivityEvent', this);
	},

	getForm: function(){
		return this.formPanel;
	},

	getSaveButton: function(){
		return this.saveButton;
	}
});