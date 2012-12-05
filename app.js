Ext.Loader.setPath({
	'Ext': 'sdk/src'
});

Ext.application({
    name: 'FinancialRecorderApp',
		
	requires: [
		'FinancialRecorderApp.view.ActivityView'
    ],

	models: ['RecorderModel'],
	controllers: ['MainController','ActivityController'],
	views: ['MainView','ActivityView', 'ActivityListView', 'ActivityDetailView', 'UserSelectorView'],
	
	launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        var mainView = Ext.create('FinancialRecorderApp.view.MainView');
        var activityMainView = Ext.create('FinancialRecorderApp.view.ActivityView');
        var activityDetailView = Ext.create('FinancialRecorderApp.view.ActivityDetailView');
        Ext.Viewport.add(mainView, activityMainView, activityDetailView);
    }
});