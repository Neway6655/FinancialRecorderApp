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

		this.formPanel = Ext.create('Ext.form.Panel',{
			items: [{
				xtype: 'fieldset',
				instructions: 'Please check the activity detail information.',
				defaults: {
					required: true,
					labelAlign: 'left',
					labelWidth: '50%'
				},
				items: [
					this.nameField,this.totalFeeField
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

    	userSelectorPanel = Ext.create('Ext.Panel', {
            width: '100%',
            height: '100%',
            top: 120,
            layout: {
                type: 'fit',
            },
             items: [{
                xtype: 'userselectorview',
            }],
        });

		this.add(topBar, this.formPanel, userSelectorPanel);
	},

	loadRecord: function(record){
		this.formPanel.setRecord(record);
		this.nameField.setReadOnly(true);
		this.totalFeeField.setReadOnly(true);
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