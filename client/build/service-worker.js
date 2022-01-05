importScripts("https://js.pusher.com/beams/service-worker.js");

const func = async (payload) => {
  return await fetch("http://localhost:5376/api/print/receipt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

PusherPushNotifications.onNotificationReceived = ({
  pushEvent,
  payload,
  handleNotification,
}) => {
  func(payload);
  pushEvent.waitUntil(handleNotification(payload));
};
