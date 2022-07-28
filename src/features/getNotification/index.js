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

export const Notifications = () => {
  const navigate = useNavigate();
  const [unreadNotificationNumber, setUnreadNotificationNumber] = useState(0);
  const [isShowNotificationList, setShowNotificationList] = useState(false);
  const [isNextNotification, setNextNotification] = useState(true);
  const [notificationList, setNotificationList] = useState([]);
  const [profile, setProfile] = useState({});

  const role = sessionStorage.getItem("isRole");
  Moment.locale("en");

  const [paramStatus, setParamStatus] = useState({
    // page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    getUnreadNotificationNumber();


        axiosClient
          .get(`user/profile`)
          .then((res) => {
            const newProfile = { ...profile, res };
            setProfile(newProfile);
          })
          .catch((err) => {
            console.log("ERROR axios profile >>> ", err);
          });

  });

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
    console.log(msg.content);
    toast(msg.content, {
      autoClose: 3000,
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
    // alert("view more");
    setParamStatus({ pageSize: paramStatus.pageSize + 10 });
    getNotification();
    console.log(paramStatus);
  };

  const handleReadNotification = (item) => {
    if(item.notificationType.toLowerCase() === "question"){
        notificationApi.getById(item.id).then(()=>{
            getNotification();
        });
        navigate(`/question/${item.questionBank.id}`)
    }
  };

  return (
    <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={[`/user/${profile?.res?.username}/queue/notification`]}
        onDisconnect={console.log("app.js Disconnected!")}
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
        <div className={cx("notification-container")}>
          <div className={cx("notification-bar")}>
            <div className={cx("notification-header")}>
              <p style={{ fontSize: "18px", textAlign: "left", width: "93%" }}>
                Notifications
              </p>
              <FontAwesomeIcon
                className={cx("x-icon")}
                icon={faX}
                onClick={handleCloseNotification}
              />
            </div>
            <p className={cx("mark-read")} onClick={handleReadAll}>
              <b>Mark all as read</b>
            </p>
          </div>

          <div className={cx("item-container")}>
            {notificationList.map((item, index) => {
              return (
                <div
                  className={cx("line-itmes")}
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
                  <span
                    className={cx("content")}
                    style={{ fontWeight: item.read ? "normal" : "bold" }}
                  >
                    {item.content}
                  </span>
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
