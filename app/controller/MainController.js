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
      this.fetchLatest();
    },

    showAccountView: function(userStore){
      var currentUserName = FinancialRecorderApp.app.getCurrentUser();
      var currentUser = userStore.queryBy(function(record){
        var userName = record.get('name');
        if (userName === currentUserName){
          return true;
        }
      });

      if (currentUser.get(0).data.type === 2){
        // normal user.
        this.getAccountDetailView().loadFormRecord(currentUser.get(0));
        Ext.Viewport.animateActiveItem(this.getAccountDetailView(), this.slideLeftTransition);
      }else {
        // administrator.
        Ext.Viewport.animateActiveItem(this.getAccountView(), this.slideLeftTransition);
      }
    },

    backToMainView: function(){
      Ext.Viewport.animateActiveItem(this.getMainView(), this.slideRightTransition);
    },

    fetchLatest: function() {
        var store = Ext.getStore('UserStore'),
            proxy = store.getProxy(),
            operation;

        operation = Ext.create('Ext.data.Operation', {
            page: 1,
            start: 0,
            model: store.getModel(),
            limit: store.getPageSize(),
            action: 'read',
            filters: store.getRemoteFilter() ? store.getFilters() : []
        });

        proxy.read(operation, this.onLatestFetched, this);
    },

    onLatestFetched: function(operation) {
        var store      = Ext.getStore('UserStore'),
            oldRecords = store.getData(),
            newRecords = operation.getRecords(),
            length     = newRecords.length,
            toInsert   = [],
            newRecord, oldRecord, i;

        for (i = 0; i < length; i++) {
            newRecord = newRecords[i];
            oldRecord = oldRecords.getByKey(newRecord.getId());

            if (oldRecord) {
                oldRecord.set(newRecord.getData());
            } else {
                toInsert.push(newRecord);
            }

            oldRecord = undefined;
        }
        store.insert(0, toInsert);

        this.showAccountView(store);
    },
});