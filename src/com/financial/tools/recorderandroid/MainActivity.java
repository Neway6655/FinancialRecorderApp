package com.financial.tools.recorderandroid;

import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class MainActivity extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		// GCMRegistrar.checkDevice(this);
		// GCMRegistrar.checkManifest(this);
		// final String regId = GCMRegistrar.getRegistrationId(this);
		// if (regId.equals("")) {
		// GCMRegistrar.register(this, "116491689837");
		// } else {
		// Log.v(TAG, "Already registered");
		// }
		super.setIntegerProperty("loadUrlTimeoutValue", 70000);
		super.loadUrl("file:///android_asset/www/index.html");
	}
}
