import addNotification from "react-push-notification";

export const successNotification = (msg) => {
  addNotification({
    title: "Success",
    subtitle: "notification",
    message: msg.content,
    theme: "light",
    container: "top-right",
    closeButton: "X",
    backgroundTop: "green",
    backgroundBottom: "yellowgreen",
    duration: 10000,
  });
  return;
};
export const onMessageReceived = (msg) => {
  console.log(msg);
  console.log("app.js message received");
  successNotification(msg);
};
