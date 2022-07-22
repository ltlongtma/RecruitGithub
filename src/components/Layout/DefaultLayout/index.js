import styles from "./DefaultLayout.module.scss";
import className from "classnames/bind";
import { Header } from "../Common/Header";
import { Navigation } from "../../Navigation";
import { useNavigate } from "react-router-dom";
import SockJsClient from "react-stomp";
import { Notifications } from "react-push-notification";
import addNotification from "react-push-notification";
const SOCKET_URL = "http://localhost:8080/ws";
const cx = className.bind(styles);

export const DefaultLayout = ({ children }) => {
  let onMessageReceived = (msg) => {
    console.log(msg);
    console.log("app.js message received");
    successNotification(msg);
  };
  function successNotification(msg) {
    console.log("notification");
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
  }
  return (
    <div className={cx("wrapper")}>
      <Header>
        <Navigation />
        <SockJsClient
          url={SOCKET_URL}
          topics={["/user/admin/queue/notification"]}
          // topics={['/topic/message']}
          onDisconnect={console.log("app.js Disconnected!")}
          onMessage={(msg) => onMessageReceived(msg)}
          debug={false}
        />
      </Header>
{/* 
      <div className={cx("right")}>

      </div> */}
      <Notifications className={cx("khanh")}/>
      <div className={cx("container")}>
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
};