Ext.define('FinancialRecorderApp.controller.Main', {
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
          main: 'mainview',
          activityPanel: 'activitypanel',
  		},
        control: {
          main: {
          	selectActivityEvent: 'selectActivity',
          },
          activityPanel: {
            backToManViewEvent: 'backToMainView',
          }
        }
    },

    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    selectActivity: function(){
		  Ext.Viewport.animateActiveItem(this.getActivityPanel(), this.slideLeftTransition);
    },

    backToMainView: function(){
      Ext.Viewport.animateActiveItem(this.getMain(), this.slideRightTransition);
    }
});