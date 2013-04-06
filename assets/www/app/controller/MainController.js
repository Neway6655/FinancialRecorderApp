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
          transactionHistoryView: 'transactionhistoryview',
  		  },
        control: {
          loginView: {
            signinEvent: 'signin',
            signupEvent: 'signup',
          },
          mainView: {
          	selectActivityEvent: 'selectActivity',
            selectAccountEvent: 'selectAccount',
            selectTransactionHistoryEvent: 'selectTransactionHistory',
          },
          activityView: {
            backToMainViewEvent: 'backToMainView',
          },
          accountView: {
            backToMainViewEvent: 'backToMainView',
          },
          accountDetailView: {
            backToMainViewEvent: 'backToMainView',
          },
          transactionHistoryView: {
            backToMainViewEvent: 'backToMainView',
          }
        }
    },

    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    signin: function(){
      var loginFormValue = this.getLoginView().getLoginForm().getValues();

      var loginRequestJson = '{"userName": "'+ loginFormValue.userName +'", "password": "'+ loginFormValue.password +'"}';
      Ext.Viewport.setMasked({xtype:'loadmask', message:'Loading...'});
      Ext.Ajax.request({
         url: 'http://localhost:8080/recorder-server/api/user/login',
           // url: 'http://financialrecorder.cloudfoundry.com/api/user/login',
          method: 'POST',
          jsonData: loginRequestJson,
          success: function(response, options) {
            // FinancialRecorderApp.app.setCurrentUser(response.responseText);
            Ext.getStore('UserStore').load(function(records, operation, success){
              var currentUserName = response.responseText;
              var index;
              for(index = 0; index < records.length; index ++){
                if (currentUserName === records[index].data.name){
                  break;
                }
              }
              var currentUser = records[index];
              FinancialRecorderApp.app.setCurrentUser(currentUser);
              Ext.Viewport.setMasked(false);
              Ext.Viewport.animateActiveItem(Ext.getCmp('mainViewId'), { type: 'slide', direction: 'left' });
            }, this);
            // window.plugins.GCM.register("116491689837", "GCM_Event", GCM_Success, GCM_Fail);
          },
          failure: function(response,options){
            console.log("Login Failed.");
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert('Error', 'User name or password not correct, please try again.', Ext.emptyFn);
          }
        });
    },

    signup: function(){
      var signupFormValue = this.getLoginView().getLoginForm().getValues();

      var registerRequestJson = '{"userName": "'+ signupFormValue.userName +'", "password": "'+ signupFormValue.password +'"}';
      Ext.Viewport.setMasked({xtype:'loadmask', message:'Loading...'});
      Ext.Ajax.request({
         url: 'http://localhost:8080/recorder-server/api/user/register',
          // url: 'http://financialrecorder.cloudfoundry.com/api/user/register',
          method: 'POST',
          jsonData: registerRequestJson,
          success: function(response, options) {
            console.log("Sign up Successful, user: " + response.responseText);
            Ext.getStore('UserStore').load(function(records, operation, success){
              var currentUserName = response.responseText;
              var index;
              for(index = 0; index < records.length; index ++){
                if (currentUserName === records[index].data.name){
                  break;
                }
              }
              var currentUser = records[index];
              FinancialRecorderApp.app.setCurrentUser(currentUser);
              Ext.Viewport.setMasked(false);
              Ext.Viewport.animateActiveItem(Ext.getCmp('mainViewId'), { type: 'slide', direction: 'left' });
            }, this);
            // window.plugins.GCM.register("116491689837", "GCM_Event", GCM_Success, GCM_Fail);
          },
          failure: function(response,options){
            console.log("Sign up Failed.");
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert('Error', 'User name already registered, please try again.', Ext.emptyFn);
          }
        });
    },

    selectActivity: function(){
      Ext.Viewport.setMasked({xtype:'loadmask', message:'Loading...'});
      var currentUser = FinancialRecorderApp.app.getCurrentUser();
      Ext.Viewport.setMasked(false);
      this.showActivityView(currentUser.data.type);
    },

    showActivityView: function(userType){
      var recorderStore = this.getActivityView().getActivityList().getStore();
      if (userType === 2){
        // if normal user, only show the related activities.
        this.getActivityView().getNewButton().hide();
        // recorderStore.getProxy().setUrl('http://localhost:8080/recorder-server/api/jsonp/user/search?userName=' + FinancialRecorderApp.app.getCurrentUser());
        recorderStore.getProxy().setUrl('http://financialrecorder.cloudfoundry.com/api/jsonp/user/search?userName=' + FinancialRecorderApp.app.getCurrentUser().data.name);
        recorderStore.load(function(records, operation, success){
          Ext.Viewport.animateActiveItem(this.getActivityView(), this.slideLeftTransition);
        }, this);
      }else {
        // if administrator, show all activities.
        this.getActivityView().getNewButton().show();
        Ext.Viewport.animateActiveItem(this.getActivityView(), this.slideLeftTransition);
      }
    },


    selectAccount: function(){
      Ext.Viewport.setMasked({xtype:'loadmask', message:'Loading...'});
      var currentUser = FinancialRecorderApp.app.getCurrentUser();
      if (currentUser.data.type === 2){
          // normal user.
          this.getAccountDetailView().loadFormRecord(currentUser);
          Ext.Viewport.animateActiveItem(this.getAccountDetailView(), this.slideLeftTransition);
      }else {
          // administrator.
          Ext.Viewport.animateActiveItem(this.getAccountView(), this.slideLeftTransition);
      }
      Ext.Viewport.setMasked(false);

    },

    selectTransactionHistory: function(){
      var transactionHistoryStore = this.getTransactionHistoryView().getTransactionHistoryList().getStore();
      transactionHistoryStore.getProxy().setUrl('http://financialrecorder.cloudfoundry.com/api/jsonp/finance/search?userName=' + FinancialRecorderApp.app.getCurrentUser().data.name);
      // transactionHistoryStore.getProxy().setUrl('http://localhost:8080/recorder-server/api/jsonp/finance/search?userName=' + FinancialRecorderApp.app.getCurrentUser().data.name);
      Ext.Viewport.setMasked({xtype:'loadmask', message:'Loading...'});
      transactionHistoryStore.load(function(records, operation, success){
        Ext.Viewport.setMasked(false);
        Ext.Viewport.animateActiveItem(this.getTransactionHistoryView(), this.slideLeftTransition);
      }, this);
    },

    backToMainView: function(){
      Ext.Viewport.animateActiveItem(this.getMainView(), this.slideRightTransition);
    },

});