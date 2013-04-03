package com.financial.tools.recorderandroid; //Edit this to match the name of your application

import org.json.JSONException;
import org.json.JSONObject;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;
import android.support.v4.app.NotificationCompat.Builder;
import android.util.Log;

import com.google.android.gcm.GCMBaseIntentService;
import com.plugin.GCM.GCMPlugin;

public class GCMIntentService extends GCMBaseIntentService {

	public static final String ME = "GCMReceiver";

	private static final int NOTIFICATION_ID = 052;

	public GCMIntentService() {
		super("GCMIntentService");
	}

	private static final String TAG = "GCMIntentService";

	@Override
	public void onRegistered(Context context, String regId) {

		Log.v(ME + ":onRegistered", "Registration ID arrived!");
		Log.v(ME + ":onRegistered", regId);

		JSONObject json;

		try {
			json = new JSONObject().put("event", "registered");
			json.put("regid", regId);

			Log.v(ME + ":onRegisterd", json.toString());

			// Send this JSON data to the JavaScript application above EVENT
			// should be set to the msg type
			// In this case this is the registration ID
			GCMPlugin.sendJavascript(json);

		} catch (JSONException e) {
			// No message to the user is sent, JSON failed
			Log.e(ME + ":onRegisterd", "JSON exception");
		}
	}

	@Override
	public void onUnregistered(Context context, String regId) {
		Log.d(TAG, "onUnregistered - regId: " + regId);
	}

	@Override
	protected void onMessage(Context context, Intent intent) {
		Log.d(TAG, "onMessage - context: " + context);

		// Extract the payload from the message
		Bundle extras = intent.getExtras();
		if (extras != null) {
			String title = extras.getString("title");
			String message = extras.getString("message");
			Log.v(ME + ":onMessage extras ", message + ", title: " + title);

			Intent mainIntent = new Intent(context, MainActivity.class);
			PendingIntent mainPendingIntent = PendingIntent.getActivity(context, 0, mainIntent,
					PendingIntent.FLAG_UPDATE_CURRENT);
			Builder notificationBuilder = new NotificationCompat.Builder(this).setSmallIcon(R.drawable.ic_launcher)
					.setContentTitle(title).setTicker("FinancialRecorder").setVibrate(new long[] { 0, 100, 200, 300 })
					.setContentText(message).setContentIntent(mainPendingIntent)
					.setDefaults(Notification.DEFAULT_VIBRATE);

			NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
			notificationManager.notify(NOTIFICATION_ID, notificationBuilder.build());
		}
	}

	@Override
	public void onError(Context context, String errorId) {
		Log.e(TAG, "onError - errorId: " + errorId);
	}

}
