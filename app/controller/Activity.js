Ext.define('FinancialRecorderApp.controller.Activity', {
    extend: 'Ext.app.Controller',

    requires: ['FinancialRecorderApp.store.UserStore'],

    launch: function () {
       this.callParent();
       console.log("financial record launch");
    },

    init: function () {
       this.callParent();
       console.log("financial record init");
    },

    config: {
        refs: {
          main: 'mainpanel',
    			activityList: 'activitylist',
    			activityDetail: 'activitydetail',
          userSelector: 'userselector',
  			},
        control: {
          main: {
            showNewFinancialRecordEvent: 'showNewFinancialRecord',
          },
          activityList: {
            activityRecordTapEvent: 'viewFinancialRecord',
          },
          activityDetail: {
            backToActivityListEvent: 'onBackToActivityList',
            saveActivityEvent: 'saveFinancialRecord'
          }
        }
    },

    slideLeftTransition: { type: 'slide', direction: 'left' },

    slideRightTransition: { type: 'slide', direction: 'right' },

    showNewFinancialRecord: function(){
        if (!this.getActivityDetail()){
          this.activityDetail = Ext.create('FinancialRecorderApp.view.ActivityDetail');
        }

        this.getUserSelector().setDisableSelection(false);
        this.getUserSelector().deselectAll();
        this.getActivityDetail().getSaveButton().show();
        this.getActivityDetail().getForm().reset();
        Ext.Viewport.animateActiveItem(this.getActivityDetail(), this.slideLeftTransition);
    },

    viewFinancialRecord: function(list, record) {
        if (!this.getActivityDetail()){
          this.activityDetail = Ext.create('FinancialRecorderApp.view.ActivityDetail');
        }
    		this.getActivityDetail().loadRecord(record);
        var userStore = this.getUserSelector().getStore();

        for (i=0; i < record.data.userNameList.length; i++){
          var user = userStore.queryBy(function(userRecord){
              var userName = record.data.userNameList[i];
              if (userName === userRecord.get('name')){
                return true;
              }
            });
          if(user){
            this.getUserSelector().select(user.items[0], true);
          }
        }
        
        this.getUserSelector().setDisableSelection(true);
        this.getActivityDetail().getSaveButton().hide();
        Ext.Viewport.animateActiveItem(this.getActivityDetail(), this.slideLeftTransition);
    },

    onBackToActivityList: function() {
        Ext.Viewport.animateActiveItem(this.getMain(), this.slideRightTransition);
    },

    saveFinancialRecord: function(){
        var activityDetail = this.getActivityDetail().getForm();
        var financialRecord = activityDetail.getValues();
        console.log('name: ' + financialRecord.name);
        console.log('total fee: ' + financialRecord.totalFee);

        var userIdArray = new Array();
        var selectedUserList = this.getUserSelector().getSelection();
        for (i=0; i < selectedUserList.length; i ++) { 
          userIdArray[i] = selectedUserList[i].getData().id;
          console.log('select user ' + selectedUserList[i].getData().name);
        }

        var financialRecordJson = '{"name": "'+ financialRecord.name +'", "totalFee": '+ financialRecord.totalFee +', "userIdList": ['+ userIdArray +']}';
        Ext.Ajax.request({
          url: 'http://financialrecorder.cloudfoundry.com/api/finance/create',
          method: 'POST',
          jsonData: financialRecordJson,
          success: function(response, options) {
            console.log("Successfully create financial record.");
            alert('Successfully');
          },
          failure: function(response,options){
            console.log("Failed to create financial record.");
            alert('Failed');
          }
        });
    }
});
