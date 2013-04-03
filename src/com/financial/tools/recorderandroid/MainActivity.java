package com.financial.tools.recorderandroid;

import org.apache.cordova.DroidGap;

import android.os.Bundle;

import com.google.android.gcm.GCMRegistrar;

public class MainActivity extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setIntegerProperty("loadUrlTimeoutValue", 70000);
		super.loadUrl("file:///android_asset/www/index.html");
	}

	@Override
	public void onStop() {
		GCMRegistrar.unregister(getContext());
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		super.onStop();
	}

	@Override
	public void onBackPressed() {
	}

}
