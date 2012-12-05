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
  		},
        control: {
          mainView: {
          	selectActivityEvent: 'selectActivity',
          },
          activityView: {
            backToManViewEvent: 'backToMainView',
          }
        }
    },

    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    selectActivity: function(){
		  Ext.Viewport.animateActiveItem(this.getActivityView(), this.slideLeftTransition);
    },

    backToMainView: function(){
      Ext.Viewport.animateActiveItem(this.getMainView(), this.slideRightTransition);
    }
});