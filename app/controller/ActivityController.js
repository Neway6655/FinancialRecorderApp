Ext.define('FinancialRecorderApp.controller.ActivityController', {
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
          activityView: 'activityview',
    			activityList: 'activitylistview',
    			activityDetail: 'activitydetailview',
  			},
        control: {
          activityView: {
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

        this.getActivityDetail().nameField.setReadOnly(false);
        this.getActivityDetail().nameField.setValue('');
        this.getActivityDetail().totalFeeField.setReadOnly(false);
        this.getActivityDetail().totalFeeField.setValue('');
        this.getActivityDetail().attendUserField.setReadOnly(false);
        this.getActivityDetail().attendUserField.setValue('');
        this.getActivityDetail().getSaveButton().show();
        this.getActivityDetail().getForm().reset();
        Ext.Viewport.animateActiveItem(this.getActivityDetail(), this.slideLeftTransition);
    },

    viewFinancialRecord: function(list, record) {
        if (!this.getActivityDetail()){
          this.activityDetail = Ext.create('FinancialRecorderApp.view.ActivityDetail');
        }
        this.getActivityDetail().loadRecord(record);

        this.getActivityDetail().getSaveButton().hide();
        Ext.Viewport.animateActiveItem(this.getActivityDetail(), this.slideLeftTransition);
    },

    onBackToActivityList: function() {
        Ext.Viewport.animateActiveItem(this.getActivityView(), this.slideRightTransition);
    },

    saveFinancialRecord: function(){
        var activityDetail = this.getActivityDetail().getForm();
        var financialRecord = activityDetail.getValues();
        console.log('name: ' + financialRecord.name);
        console.log('total fee: ' + financialRecord.totalFee);
        console.log('attend users: ' + financialRecord.userNameList);

        var userNameStringArray = new Array();
        userNameArray = financialRecord.userNameList.split(',');
        for(i=0; i < userNameArray.length; i ++){
          userNameStringArray[i] = '"' + userNameArray[i] + '"';
        };

        var financialRecordJson = '{"name": "'+ financialRecord.name +'", "totalFee": '+ financialRecord.totalFee +', "userNameList": ['+ userNameStringArray +']}';
        console.log('post json: ' + financialRecordJson);

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
    },
});
