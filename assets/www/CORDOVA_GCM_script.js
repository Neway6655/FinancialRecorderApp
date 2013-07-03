gApp = new Array();

gApp.gcmregid = '';

function
GCM_Event(e)
{

  switch( e.event )
  {
  case 'registered':
    gApp.gcmregid = e.regid;
    if ( gApp.gcmregid.length > 0 )
    {
      var deviceRegRequestJson = '{"userName": "' + FinancialRecorderApp.app.getCurrentUser().data.name + '", "deviceRegId": "'+ e.regid +'"}';
      Ext.Ajax.request({
          url: 'http://financialrecorder.herokuapp.com/api/device/register',
          method: 'POST',
          jsonData: deviceRegRequestJson,
          success: function(response, options) {
        	  console.log("Device Registered.");
          },
          failure: function(response,options){
        	  console.log("Device Register Failed.");
          }
      });
    }
    break;
    
  case 'error':
    break;
	  
  default:
    break;
  }
}

function
GCM_Success(e)
{
	console.log('We have successfully registered and called the GCM plugin');
}

function
GCM_Fail(e)
{
	console.log('Registration failed.');
}

