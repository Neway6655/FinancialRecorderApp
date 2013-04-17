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

    activityDate: '',

    attendUserField: '',

    saveButton: '',

    joinButton: '',

    joinOnBehalfOfButton: '',

    finishButton: '',

	initialize: function() {
		console.log('init activity detail view.');

		this.nameField = Ext.create('Ext.field.Text',{
			xtype: 'textfield',
			name : 'name',
			label: 'Name',
			value: Ext.Date.format(new Date(),'n/j/Y')
		});

		this.totalFeeField =  Ext.create('Ext.field.Number',{
			xtype: 'numberfield',
			name : 'totalFee',
			label: 'Total Fee',
			value: 0
		});

		this.activityDate = Ext.create('Ext.field.DatePicker',{
			xtype: 'datepickerfield',
			name : 'recordDate',
			label: 'Date',
			value: new Date()
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

		this.joinButton = Ext.create('Ext.Button', {
			xtype: 'button',
    		align: 'left',
    		text: 'Join',
    		width: 70,
    		handler: this.join,
    		scope: this
		});

		this.joinOnBehalfOfButton = Ext.create('Ext.Button', {
			xtype: 'button',
    		align: 'middle',
    		text: 'JoinOnBehalfOf',
    		width: 70,
    		handler: this.joinOnBehalfOf,
    		scope: this
		});

		this.finishButton = Ext.create('Ext.Button', {
			xtype: 'button',
    		align: 'right',
    		text: 'Finish',
    		width: 70,
    		ui: 'confirm',
    		handler: this.finish,
    		scope: this
		});

		var buttonPanel = {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align:'center',
                pack:'center'
            },
            height: '100%',
            padding: '10',

            items: [
                this.joinButton, this.joinOnBehalfOfButton, this.finishButton
            ]
        };

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
					this.nameField, this.activityDate, this.totalFeeField, this.attendUserField, buttonPanel
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

	join: function(){
		console.log('join the activity.');
		this.fireEvent('joinActivityEvent', this);
	},

	joinOnBehalfOf: function(){
		console.log('join on behalf of.')
		this.fireEvent('joinOnBehalfOfActivityEvent', this);
	},

	finish: function(){
		console.log('finish the activity.');
		this.fireEvent('finishActivityEvent', this);
	},

	getForm: function(){
		return this.formPanel;
	},

	getActivityDate: function(){
		return this.activityDate;
	},

	getSaveButton: function(){
		return this.saveButton;
	},

	getJoinButton: function(){
		return this.joinButton;
	},

	getJoinOnBehalfOfButton: function(){
		return this.joinOnBehalfOfButton;
	},

	getFinishButton: function(){
		return this.finishButton;
	}
});