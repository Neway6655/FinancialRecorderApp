Ext.define('FinancialRecorderApp.controller.MainController', {
    extend: 'Ext.app.Controller',

    requires: ['Ext.MessageBox'],

    launch: function () {
       this.callParent();
       console.log("main controller launch");
    },

    init: function () {
       this.callParent();
       console.log("main controller init");
    },

    config: {
        refs: {
          loginView: 'loginview',
          mainView: 'mainview',
          activityView: 'activityview',
          accountView: 'accountview',
  		  },
        control: {
          loginView: {
            signinEvent: 'signin',
            signupEvent: 'signup',
          },
          mainView: {
          	selectActivityEvent: 'selectActivity',
            selectAccountEvent: 'selectAccount',
          },
          activityView: {
            backToManViewEvent: 'backToMainView',
          },
          accountView: {
            backToManViewEvent: 'backToMainView',
          }
        }
    },

    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    signin: function(){
      var loginFormValue = this.getLoginView().getLoginForm().getValues();

      var loginRequestJson = '{"userName": "'+ loginFormValue.userName +'", "password": "'+ loginFormValue.password +'"}';
      Ext.Ajax.request({
          // url: 'http://localhost:8080/recorder-server/api/user/login',
          url: 'http://financialrecorder.cloudfoundry.com/api/user/login',
          method: 'POST',
          jsonData: loginRequestJson,
          success: function(response, options) {
            console.log("Login Successful.");
            Ext.Viewport.animateActiveItem(Ext.getCmp('mainViewId'), { type: 'slide', direction: 'left' });
          },
          failure: function(response,options){
            console.log("Login Failed.");
            Ext.Msg.alert('Error', 'User name or password not correct, please try again.', Ext.emptyFn);
          }
        });
    },

    signup: function(){
      var signupFormValue = this.getLoginView().getLoginForm().getValues();

      var registerRequestJson = '{"userName": "'+ signupFormValue.userName +'", "password": "'+ signupFormValue.password +'"}';
      Ext.Ajax.request({
          // url: 'http://localhost:8080/recorder-server/api/user/register',
          url: 'http://financialrecorder.cloudfoundry.com/api/user/login',
          method: 'POST',
          jsonData: registerRequestJson,
          success: function(response, options) {
            console.log("Sign up Successful.");
            Ext.Viewport.animateActiveItem(Ext.getCmp('mainViewId'), { type: 'slide', direction: 'left' });
          },
          failure: function(response,options){
            console.log("Sign up Failed.");
            Ext.Msg.alert('Error', 'User name already registered, please try again.', Ext.emptyFn);
          }
        });
    },

    selectActivity: function(){
		  Ext.Viewport.animateActiveItem(this.getActivityView(), this.slideLeftTransition);
    },

    selectAccount: function(){
      Ext.Viewport.animateActiveItem(this.getAccountView(), this.slideLeftTransition);
    },

    backToMainView: function(){
      Ext.Viewport.animateActiveItem(this.getMainView(), this.slideRightTransition);
    }
});