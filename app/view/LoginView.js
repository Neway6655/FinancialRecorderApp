Ext.define('FinancialRecorderApp.view.LoginView', {
    extend: 'Ext.Panel',
    requires: "Ext.form.FieldSet",
    xtype: 'loginview',

    config:{
    	layout: 'fit',
        scrollable:'vertical',
    },

    formPanel: '',
   
    loginButton: '',

	initialize: function() {
		console.log('init login view.');

		var userNameField = Ext.create('Ext.field.Text',{
			xtype: 'textfield',
			name : 'userName',
			label: 'User Name',
			useClearIcon: true,
		});

		var passwordField=  Ext.create('Ext.field.Password',{
			xtype: 'passwordfield',
			name : 'password',
			label: 'Password',
		});

		this.formPanel = Ext.create('Ext.form.Panel',{
			items: [{
				xtype: 'fieldset',
				instructions: 'Please enter your credentials.',
				defaults: {
					required: true,
					labelAlign: 'left',
					labelWidth: '35%'
				},
				items: [
					userNameField, passwordField
				],
			}]
		});

		this.loginButton = Ext.create('Ext.Button', {
			xtype: 'button',
    		align: 'right',
    		text: 'Login',
    		ui: 'confirm',
    		width: '100px',
            left: '100px',
            top: '150px',
    		handler: this.login,
    		scope: this
		});

		var topBar = {
    		xtype: 'titlebar',
    		docked: 'top',
    		title: 'Financial Recorder',
    	};

		this.add(topBar, this.formPanel, this.loginButton);
	},


	login: function(){
		console.log('login tapped.');
		this.fireEvent('loginEvent', this);
	},

	getLoginForm: function(){
		return this.formPanel;
	},

});