import Badge from "@mui/material/Badge";
import React, { useState, useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import styles from "./getNotification.module.scss";
import className from "classnames/bind";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SockJsClient from "react-stomp";
import notificationApi from "../../services/notificationApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Moment from "moment";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../services/AxiosClient";

const cx = className.bind(styles);
const SOCKET_URL = "http://localhost:8080/ws";

export const Notifications = ({profile}) => {
  const navigate = useNavigate();
  const [unreadNotificationNumber, setUnreadNotificationNumber] = useState(0);
  const [isShowNotificationList, setShowNotificationList] = useState(false);
  const [isNextNotification, setNextNotification] = useState(true);
  const [notificationList, setNotificationList] = useState([]);
  // const [profile, setProfile] = useState({});

  Moment.locale("en");

  const [paramStatus, setParamStatus] = useState({
    pageSize: 10,
  });

  useEffect(() => {
    getUnreadNotificationNumber();
  }, []);

  const handleShowNotification = () => {
    setShowNotificationList(!isShowNotificationList);
    setParamStatus({ pageSize: 10 });
    setNextNotification(true);
    getNotification();
  };

  const handleCloseNotification = () => {
    setShowNotificationList(false);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onMessageReceived = async (msg) => {
    showNotification(msg);
    await delay(100);
    getUnreadNotificationNumber();
  };

  const showNotification = (msg) => {
    toast(msg.content, {
      autoClose: 3000,
      onClick: () => {
        handleReadNotification(msg);
      },
    });
  };

  const getUnreadNotificationNumber = () => {
    notificationApi
      .getUnreadNotificationNumber()
      .then((res) => {
        setUnreadNotificationNumber(res.number);
      })
      .catch((errors) => {
        console.log("ERROR Get unread Notification " + errors);
      });
  };

  const getNotification = () => {
    notificationApi
      .getAllNotification(paramStatus)
      .then((res) => {
        setNotificationList(res.data);
        if (res.pagination.pageSize >= res.pagination.total) {
          setNextNotification(false);
        }
      })
      .catch((errors) => {
        console.log("ERROR Get Notification " + errors);
      });
  };

  const handleReadAll = () => {
    notificationApi
      .readAll()
      .then((res) => {
        getUnreadNotificationNumber();
        getNotification();
      })
      .catch((errors) => {
        console.log("ERROR Get unread Notification " + errors);
      });
  };

  const handleViewMore = () => {
    setParamStatus({ pageSize: paramStatus.pageSize + 10 });
    getNotification();
  };

  const handleReadNotification = (item) => {
    notificationApi.getById(item.id).then(() => {
      getNotification();
    });
    if (item.notificationType.toLowerCase() === "question") {
      navigate(`/question/${item.questionBank.id}`);
    }
  };

  return (
    <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={[`/user/${profile?.res?.username}/queue/notification`]}
        onMessage={(msg) => onMessageReceived(msg)}
        debug={false}
      />
      <ToastContainer className={cx("toast-container")} />
      <Badge
        className={cx("badge-container")}
        badgeContent={unreadNotificationNumber}
        color="error"
        onClick={handleShowNotification}
      >
        <NotificationsIcon />
      </Badge>
      {isShowNotificationList && (
        <div className={cx("notification-content")}>
          <div className={cx("notification-header")}>
            <span className={cx("notification-title")}> NOTIFICATION</span>
            <div className={cx(" align-items-center")}>
              <button
                className={cx("mark-read position-relative", "notification-mark-read")}
                onClick={handleReadAll}
              >
                Mark all as read
              </button>
              <button className={cx("notification-close")}>
                <FontAwesomeIcon
                  className={cx("x-icon")}
                  icon={faX}
                  onClick={handleCloseNotification}
                />
              </button>
            </div>
          </div>

          <div className={cx("notification-body")}>
            {notificationList.map((item) => {
              return (
                <div
                  className={cx("line-itmes")}
                  style={{ fontWeight: item.read ? "normal" : "bold" }}
                  onClick={() => handleReadNotification(item)}
                >
                  <div>
                    <p className={cx("author")}>
                      {item.user.username}
                      <span className={cx("date")}>
                        {Moment(item.createdDate).format("HH:mm DD/MM/YYYY")}
                      </span>
                    </p>
                  </div>
                  <span className={cx("content")}>{item.content}</span>
                </div>
              );
            })}
            {isNextNotification && (
              <p className={cx("view-more")} onClick={handleViewMore}>
                view more
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
