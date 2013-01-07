Ext.define('FinancialRecorderApp.controller.AccountController', {
    extend: 'Ext.app.Controller',

    requires: ['Ext.MessageBox', 'FinancialRecorderApp.store.UserStore'],

    launch: function () {
       this.callParent();
       console.log("account controller launch");
    },

    init: function () {
       this.callParent();
       console.log("account controller init");
    },

    config: {
        refs: {
          accountView: 'accountview',
          accountListView: 'accountlistview',
          accountCashinView: 'accountcashinview',
  		  },
        control: {
          accountListView: {
            accountRecordTapEvent: 'gotoAccountCashinView',
          },
          accountCashinView: {
            backToMainViewEvent: 'backToMainView',
            accountCashinEvent: 'accountCashin',
          }
        }
    },

    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    gotoAccountCashinView: function(){
      Ext.Viewport.animateActiveItem(this.getAccountCashinView(), this.slideLeftTransition);
    },

    backToMainView: function(){
      Ext.Viewport.animateActiveItem(this.getAccountView(), this.slideRightTransition);
    },

    accountCashin: function(){
      var cashinFormData = this.getAccountCashinView().getCashinForm().getValues();
      var cashinRequestJson = '{"userName":"' + cashinFormData.name + '", "amount":"' + cashinFormData.amount + '"}';
      console.log('cashinRequestJson: ' + cashinRequestJson);

      Ext.Viewport.animateActiveItem(this.getAccountView(), this.slideRightTransition);
      Ext.Ajax.request({
          // url: 'http://financialrecorder.cloudfoundry.com/api/finance/cashin',
          url: 'http://localhost:8080/recorder-server/api/finance/cashin',
          method: 'POST',
          jsonData: cashinRequestJson,
          success: function(response, options) {
            console.log("Cashin Successfully.");
            Ext.Msg.alert('Successful', 'Cashin successfully.', Ext.emptyFn);
          },
          failure: function(response,options){
            console.log("Cashin Failed.");
            Ext.Msg.alert('Fail', 'Cashin failed.', Ext.emptyFn);
          }
        });
    }
});