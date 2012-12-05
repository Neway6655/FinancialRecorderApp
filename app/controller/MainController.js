Ext.define('FinancialRecorderApp.controller.MainController', {
    extend: 'Ext.app.Controller',

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
          mainView: 'mainview',
          activityView: 'activityview',
          accountView: 'accountview',
  		},
        control: {
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