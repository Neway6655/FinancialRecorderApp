package com.financial.tools.recorderandroid;

import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class MainActivity extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setIntegerProperty("loadUrlTimeoutValue", 70000);
		super.loadUrl("file:///android_asset/www/index.html");
	}

	@Override
	public void onBackPressed() {
	}

}
