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
            saveActivityEvent: 'saveFinancialRecord',
            joinActivityEvent: 'joinActivity',
            joinOnBehalfOfActivityEvent: 'joinActivityOnBehalfOf',
            finishActivityEvent: 'finishActivity'
          }
        }
    },

    slideLeftTransition: { type: 'slide', direction: 'left' },

    slideRightTransition: { type: 'slide', direction: 'right' },

    showNewFinancialRecord: function(){
        if (!this.getActivityDetailView()){
          this.activityDetail = Ext.create('FinancialRecorderApp.view.ActivityDetail');
        }

        this.getActivityDetailView().getForm().reset();
        this.getActivityDetailView().nameField.setReadOnly(false);
        this.getActivityDetailView().totalFeeField.setReadOnly(false);
        this.getActivityDetailView().totalFeeField.setValue(0);
        this.getActivityDetailView().attendUserField.setReadOnly(false);
        this.getActivityDetailView().attendUserField.setValue('');
        this.getActivityDetailView().getSaveButton().show();
        this.getActivityDetailView().getJoinButton().hide();
        this.getActivityDetailView().getFinishButton().hide();
        this.getActivityDetailView().getJoinOnBehalfOfButton().hide();
        Ext.Viewport.animateActiveItem(this.getActivityDetailView(), this.slideLeftTransition);
    },

    viewFinancialRecord: function(list, record) {
        if (!this.getActivityDetailView()){
          this.activityDetail = Ext.create('FinancialRecorderApp.view.ActivityDetail');
        }
        this.getActivityDetailView().loadRecord(record);
        this.getActivityDetailView().getActivityDate().setValue(new Date(record.data.recordDate));
        if (record.data.userNameList != ''){
          this.getActivityDetailView().getUserField().setValue(record.data.userNameList.join(','));
          this.getActivityDetailView().getAttendUserAreaField().setValue(record.data.userNameList);
        }

        this.getActivityDetailView().getSaveButton().hide();
        if (FinancialRecorderApp.app.getCurrentUser().data.type == 1){
          this.getActivityDetailView().getJoinOnBehalfOfButton().show();
          this.getActivityDetailView().getFinishButton().show();
          this.getActivityDetailView().attendUserField.setReadOnly(false);
          this.getActivityDetailView().totalFeeField.setReadOnly(false);
        }else{
          this.getActivityDetailView().attendUserField.setReadOnly(true);
          this.getActivityDetailView().getJoinOnBehalfOfButton().hide();
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
        if (financialRecord.userNameList != ''){
          userNameArray = financialRecord.userNameList.split(',');
          for(i=0; i < userNameArray.length; i ++){
            userNameStringArray[i] = '"' + userNameArray[i] + '"';
          };
        }

        var financialRecordJson = '{"name": "'+ financialRecord.name +'", "totalFee": "'+ financialRecord.totalFee +'", "recordDate": "'+ this.getActivityDetailView().getActivityDate().getFormattedValue() +'", "userNameList": ['+ userNameStringArray +']}';
        console.log('post json: ' + financialRecordJson);
        Ext.Viewport.animateActiveItem(this.getActivityView(), this.slideRightTransition);

        Ext.Ajax.request({
          url: 'http://financialrecorder.herokuapp.com/api/finance/create',
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

    joinActivity: function() {
        var activityDetail = this.getActivityDetailView().getForm();
        var financialRecord = activityDetail.getRecord();
        var currentUserName = FinancialRecorderApp.app.getCurrentUser().data.name;

        var addFinancialRecordUserJson = '{"financialRecordId": '+ financialRecord.data.id +', "userNameList": ["' + currentUserName + '"]}';
        console.log('post add financial record user json: ' + addFinancialRecordUserJson);
        Ext.Viewport.animateActiveItem(this.getActivityView(), this.slideRightTransition);

        Ext.Ajax.request({
          url: 'http://financialrecorder.herokuapp.com/api/finance/addUsers',
          method: 'POST',
          jsonData: addFinancialRecordUserJson,
          success: function(response, options) {
            console.log("Successfully add user.");
            Ext.Msg.alert('Successful', 'Add user successfully.', Ext.emptyFn);            
          },
          failure: function(response,options){
            console.log("Failed to add user.");
            Ext.Msg.alert('Fail', 'Add user failed.', Ext.emptyFn);
          }
        });
    },

    joinActivityOnBehalfOf: function(){
        var activityDetail = this.getActivityDetailView().getForm();
        var financialRecord = activityDetail.getRecord();
        var financialRecordFormValues = activityDetail.getValues();
        var userNameStringArray = new Array();
        if (financialRecordFormValues.userNameList != ''){
          userNameArray = financialRecordFormValues.userNameList.split(',');
          for(i=0; i < userNameArray.length; i ++){
            userNameStringArray[i] = '"' + userNameArray[i] + '"';
          };
        }

        var addFinancialRecordUserJson = '{"financialRecordId": '+ financialRecord.data.id +', "userNameList": [' + userNameStringArray + ']}';
        console.log('post add financial record user json: ' + addFinancialRecordUserJson);
        Ext.Viewport.animateActiveItem(this.getActivityView(), this.slideRightTransition);

        Ext.Ajax.request({
          url: 'http://financialrecorder.herokuapp.com/api/finance/addUsers',
          method: 'POST',
          jsonData: addFinancialRecordUserJson,
          success: function(response, options) {
            console.log("Successfully add user.");
            Ext.Msg.alert('Successful', 'Add user successfully.', Ext.emptyFn);            
          },
          failure: function(response,options){
            console.log("Failed to add user.");
            Ext.Msg.alert('Fail', 'Add user failed.', Ext.emptyFn);
          }
        });        
    },

    finishActivity: function() {
        var activityDetail = this.getActivityDetailView().getForm();
        var financialRecord = activityDetail.getRecord();

        var finishFinancialRecordJson = '{"financialRecordId": '+ financialRecord.data.id +', "totalFee": '+ activityDetail.getValues().totalFee +'}';
        console.log('post update financial record json: ' + finishFinancialRecordJson);
        Ext.Viewport.animateActiveItem(this.getActivityView(), this.slideRightTransition);

        Ext.Ajax.request({
          url: 'http://financialrecorder.herokuapp.com/api/finance/update',
          method: 'POST',
          jsonData: finishFinancialRecordJson,
          success: function(response, options) {
            console.log("Successfully finish activity.");
            Ext.Msg.alert('Successful', 'Successfully finish activity.', Ext.emptyFn);
          },
          failure: function(response,options){
            console.log("Failed to finish activity.");
            Ext.Msg.alert('Fail', 'Failed finish activity.', Ext.emptyFn);
          }
        });
    },
});
