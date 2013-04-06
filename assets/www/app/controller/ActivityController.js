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
    			activityDetailView: 'activitydetailview',
  			},
        control: {
          activityView: {
            showNewFinancialRecordEvent: 'showNewFinancialRecord',
          },
          activityList: {
            activityRecordTapEvent: 'viewFinancialRecord',
          },
          activityDetailView: {
            backToActivityListEvent: 'onBackToActivityList',
            saveActivityEvent: 'saveFinancialRecord'
          }
        }
    },

    slideLeftTransition: { type: 'slide', direction: 'left' },

    slideRightTransition: { type: 'slide', direction: 'right' },

    showNewFinancialRecord: function(){
        if (!this.getActivityDetailView()){
          this.activityDetail = Ext.create('FinancialRecorderApp.view.ActivityDetail');
        }

        Ext.getStore('UserStore').load(function(records, operation, success){
          var currentUserName = FinancialRecorderApp.app.getCurrentUser();   
          var index;
          for(index = 0; index < records.length; index ++){
            if (currentUserName === records[index].data.name){
              break;
            }
          }
          var currentUser = records[index];
        }, this);

        this.getActivityDetailView().nameField.setReadOnly(false);
        this.getActivityDetailView().totalFeeField.setReadOnly(false);
        this.getActivityDetailView().attendUserField.setReadOnly(false);
        this.getActivityDetailView().attendUserField.setValue('');
        this.getActivityDetailView().getSaveButton().show();
        this.getActivityDetailView().getJoinButton().hide();
        this.getActivityDetailView().getFinishButton().hide();
        this.getActivityDetailView().getForm().reset();
        Ext.Viewport.animateActiveItem(this.getActivityDetailView(), this.slideLeftTransition);
    },

    viewFinancialRecord: function(list, record) {
        if (!this.getActivityDetailView()){
          this.activityDetail = Ext.create('FinancialRecorderApp.view.ActivityDetail');
        }
        this.getActivityDetailView().loadRecord(record);
        this.getActivityDetailView().getActivityDate().setValue(new Date(record.data.recordDate));

        this.getActivityDetailView().getSaveButton().hide();
        if (FinancialRecorderApp.app.getCurrentUser().data.type == 1){
          this.getActivityDetailView().getFinishButton().show();
        }else{
          this.getActivityDetailView().getFinishButton().hide();
        }
        this.getActivityDetailView().getJoinButton().show();
        Ext.Viewport.animateActiveItem(this.getActivityDetailView(), this.slideLeftTransition);
    },

    onBackToActivityList: function() {
        Ext.Viewport.animateActiveItem(this.getActivityView(), this.slideRightTransition);
    },

    saveFinancialRecord: function(){
        var activityDetail = this.getActivityDetailView().getForm();
        var financialRecord = activityDetail.getValues();
        console.log('name: ' + financialRecord.name);
        console.log('total fee: ' + financialRecord.totalFee);
        console.log('date: ' + this.getActivityDetailView().getActivityDate().getFormattedValue());
        console.log('attend users: ' + financialRecord.userNameList);

        var userNameStringArray = new Array();
        userNameArray = financialRecord.userNameList.split(',');
        for(i=0; i < userNameArray.length; i ++){
          userNameStringArray[i] = '"' + userNameArray[i] + '"';
        };

        var financialRecordJson = '{"name": "'+ financialRecord.name +'", "totalFee": "'+ financialRecord.totalFee +'", "recordDate": "'+ this.getActivityDetailView().getActivityDate().getFormattedValue() +'", "userNameList": ['+ userNameStringArray +']}';
        console.log('post json: ' + financialRecordJson);
        Ext.Viewport.animateActiveItem(this.getActivityView(), this.slideRightTransition);  

        Ext.Ajax.request({
          url: 'http://financialrecorder.cloudfoundry.com/api/finance/create',
          method: 'POST',
          jsonData: financialRecordJson,
          success: function(response, options) {
            console.log("Successfully create financial record.");
            Ext.Msg.alert('Successful', 'Financial record has been created successfully.', Ext.emptyFn);
          },
          failure: function(response,options){
            console.log("Failed to create financial record.");
            Ext.Msg.alert('Fail', 'Financial record created failed.', Ext.emptyFn);
          }
        });
    },
});
