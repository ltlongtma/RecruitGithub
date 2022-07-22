import styles from "./DefaultLayout.module.scss";
import className from "classnames/bind";
import { Header } from "../Common/Header";
import { Navigation } from "../../Navigation";
import SockJsClient from "react-stomp";
import { Notifications } from "react-push-notification";
import { onMessageReceived } from "../../Notification";
const SOCKET_URL = "http://localhost:8080/ws";
const cx = className.bind(styles);

export const DefaultLayout = ({ children }) => {

  return (
    <div className={cx("wrapper")}>
      <div>
        <Header>
          <Navigation />
        </Header>
      </div>

      <div className={cx("container")}>
        <div>
          {/* <SockJsClient
            url={SOCKET_URL}
            topics={["/user/admin/queue/notification"]}
            onDisconnect={console.log("app.js Disconnected!")}
            onMessage={(msg) => onMessageReceived(msg)}
            debug={false}
          />
          <Notifications className={cx("khanh")} /> */}
        </div>
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
};
