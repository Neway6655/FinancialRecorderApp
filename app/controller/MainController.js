Ext.define('FinancialRecorderApp.controller.MainController', {
    extend: 'Ext.app.Controller',

    requires: ['Ext.MessageBox', 'FinancialRecorderApp.store.UserStore'],

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
          accountDetailView: 'accountdetailview',
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
            backToMainViewEvent: 'backToMainView',
          },
          accountView: {
            backToMainViewEvent: 'backToMainView',
          },
          accountDetailView: {
            backToMainViewEvent: 'backToMainView',
          }
        }
    },

    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    signin: function(){
      var loginFormValue = this.getLoginView().getLoginForm().getValues();

      var loginRequestJson = '{"userName": "'+ loginFormValue.userName +'", "password": "'+ loginFormValue.password +'"}';
      Ext.Ajax.request({
          url: 'http://localhost:8080/recorder-server/api/user/login',
          // url: 'http://financialrecorder.cloudfoundry.com/api/user/login',
          method: 'POST',
          jsonData: loginRequestJson,
          success: function(response, options) {
            FinancialRecorderApp.app.setCurrentUser(response.responseText);
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
          url: 'http://localhost:8080/recorder-server/api/user/register',
          // url: 'http://financialrecorder.cloudfoundry.com/api/user/login',
          method: 'POST',
          jsonData: registerRequestJson,
          success: function(response, options) {
            console.log("Sign up Successful, user: " + response.responseText);
            FinancialRecorderApp.app.setCurrentUser(response.responseText);
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
      Ext.getStore('UserStore').load(function(records, operation, success){
        console.log('UserStore reload records: ' + records);
        var currentUserName = FinancialRecorderApp.app.getCurrentUser();   
        var index;
        for(index = 0; index < records.length; index ++){
          if (currentUserName === records[index].data.name){
            break;
          }
        }
        var currentUser = records[index];
        if (currentUser.data.type === 2){
          // normal user.
          this.getAccountDetailView().loadFormRecord(currentUser);
          Ext.Viewport.animateActiveItem(this.getAccountDetailView(), this.slideLeftTransition);
        }else {
          // administrator.
          Ext.Viewport.animateActiveItem(this.getAccountView(), this.slideLeftTransition);
        }
      }, this);
    },

    backToMainView: function(){
      Ext.Viewport.animateActiveItem(this.getMainView(), this.slideRightTransition);
    },
});