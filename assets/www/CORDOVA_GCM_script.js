gApp = new Array();

gApp.deviceready = false;
gApp.gcmregid = '';

window.onbeforeunload  =  function(e) {

    if ( gApp.gcmregid.length > 0 )
    {
      // The same routines are called for success/fail on the unregister. You can make them unique if you like
      window.GCM.unregister( GCM_Success, GCM_Fail );      // close the GCM

    }
};


//document.addEventListener('deviceready', function() {
//  // This is the Cordova deviceready event. Once this is called Cordova is available to be used
//
//  gApp.DeviceReady = true;
//
//  // Some Unique stuff here,
//  // The first Parm is your Google email address that you were authorized to use GCM with
//  // the Event Processing rountine (2nd parm) we pass in the String name
//  // not a pointer to the routine, under the covers a JavaScript call is made so the name is used
//  // to generate the function name to call. I didn't know how to call a JavaScript routine from Java
//  // The last two parms are used by Cordova, they are the callback routines if the call is successful or fails
//  //
//  window.plugins.GCM.register("116491689837", "GCM_Event", GCM_Success, GCM_Fail );
//
//}, false );


function
GCM_Event(e)
{

  switch( e.event )
  {
  case 'registered':
    // the definition of the e variable is json return defined in GCMReceiver.java
    // In my case on registered I have EVENT and REGID defined
    gApp.gcmregid = e.regid;
    if ( gApp.gcmregid.length > 0 )
    {
      var deviceRegRequestJson = '{"userName": "' + FinancialRecorderApp.app.getCurrentUser() + '", "deviceRegId": "'+ e.regid +'"}';
      Ext.Ajax.request({
          url: 'http://financialrecorder.cloudfoundry.com/api/device/register',
          method: 'POST',
          jsonData: deviceRegRequestJson,
          success: function(response, options) {
        	  console.log("Device Registered.");
        	  alert("Device Registered.");
          },
          failure: function(response,options){
        	  console.log("Device Register Failed.");
          }
      });
    }
    break;
    
  case 'message':
	  alert("received msg: " + e.message);
    break;
    
  case 'error':
	  alert('received error: ' + e.msg)
    break;
	  
  default:
    break;
  }
}

function
GCM_Success(e)
{
  $("#app-status-ul").append('<li>GCM_Success -> We have successfully registered and called the GCM plugin, waiting for GCM_Event:registered -> REGID back from Google</li>');

}

function
GCM_Fail(e)
{
  $("#app-status-ul").append('<li>GCM_Fail -> GCM plugin failed to register</li>');

  $("#app-status-ul").append('<li>GCM_Fail -> ' + e.msg + '</li>');

}

