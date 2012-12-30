Ext.Loader.setPath({
	'Ext': 'sdk/src'
});

Ext.application({
    name: 'FinancialRecorderApp',
		
	requires: [
		'FinancialRecorderApp.view.ActivityView', 'FinancialRecorderApp.store.UserStore'
    ],

	models: ['RecorderModel'],
    stores: ['UserStore', 'RecorderStore'],
	controllers: ['MainController','ActivityController'],
	views: ['LoginView','MainView','ActivityView', 'ActivityListView', 'ActivityDetailView', 'AccountView', 'MultiSelect'],
	
	launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        var loginView = Ext.create('FinancialRecorderApp.view.LoginView');
        var mainView = Ext.create('FinancialRecorderApp.view.MainView');
        var activityView = Ext.create('FinancialRecorderApp.view.ActivityView');
        var activityDetailView = Ext.create('FinancialRecorderApp.view.ActivityDetailView');
        
        var accountView = Ext.create('FinancialRecorderApp.view.AccountView');

        Ext.Viewport.add(loginView, mainView, activityView, activityDetailView, accountView);
    }
});