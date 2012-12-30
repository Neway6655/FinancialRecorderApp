Ext.define('FinancialRecorderApp.view.LoginView', {
    extend: 'Ext.Panel',
    requires: "Ext.form.FieldSet",
    xtype: 'loginview',

    config:{
    	layout: 'fit',
        scrollable:'vertical',
    },

    formPanel: '',
   
    signinButton: '',

    signupButton: '',

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

		this.signinButton = Ext.create('Ext.Button', {
			xtype: 'button',
    		align: 'right',
    		text: 'Sign In',
    		ui: 'normal',
    		width: '100px',
            left: '80px',
            top: '150px',
    		handler: this.signin,
    		scope: this
		});

		this.signupButton = Ext.create('Ext.Button', {
			xtype: 'button',
    		align: 'right',
    		text: 'Sign up now.',
    		ui: 'confirm',
    		width: '140px',
            left: '200px',
            top: '150px',
    		handler: this.signup,
    		scope: this
		});

		var topBar = {
    		xtype: 'titlebar',
    		docked: 'top',
    		title: 'Financial Recorder',
    	};

		this.add(topBar, this.formPanel, this.signinButton, this.signupButton);
	},


	signin: function(){
		console.log('login tapped.');
		this.fireEvent('signinEvent', this);
	},

	signup: function(){
		console.log('sign up tapped.');
		this.fireEvent('signupEvent', this);
	},

	getLoginForm: function(){
		return this.formPanel;
	},

});