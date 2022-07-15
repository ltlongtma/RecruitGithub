import React, { useState, useRef, useEffect } from "react";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import className from "classnames/bind";
import styles from "./UserDetail.module.scss";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import axiosClient from "../../services/AxiosClient";

const cx = className.bind(styles);

export function UserDetail() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axiosClient
      .get(`user/profile`)
      .then((res) => {
        const newProfile = { ...profile, res };
        setProfile(newProfile);
      })
      .catch((err) => {
        console.log("ERROR axios profile >>> ", err);
      });
  }, []);

  const navigate = useNavigate();
  const ref = useRef(null);

  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [target, setTarget] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleClickAvatar = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  const handleChangePassword = () => {
    navigate("/change-password");
  };
  const handleCreateQuestion = () => {
    navigate("/question/create")
  };
  const role = sessionStorage.getItem("isRole");
  return (
    <div ref={ref}>
      <Avatar
        src="https://luv.vn/wp-content/uploads/2021/08/hinh-anh-gai-xinh-73.jpg"
        alt="avarta"
        sx={{ width: 32, height: 32 }}
        onClick={handleClickAvatar}
      ></Avatar>

      <Overlay
        show={show}
        onHide={() => setShow(false)}
        rootClose
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained" className={cx("popover")}>
          <Popover.Header className={cx("popover-header")}>
            {role !== "undefined" ? role : "GUEST"}
            <h6>{`Hi, ${profile?.res?.username} `}</h6>
          </Popover.Header>
          <Popover.Body>
            <VpnKeyIcon fontSize="small" color="warning" />
            <span className={cx("popover-body")} onClick={handleChangePassword}>
              Change password
            </span>
          </Popover.Body>
          <Popover.Body>
            <LogoutIcon fontSize="small" color="success" />
            <span className={cx("popover-body")} onClick={handleShow}>
              Log Out
            </span>
          </Popover.Body>
          <Popover.Body>
            <span className={cx("popover-body")} onClick={handleCreateQuestion}>
              Create question
            </span>
          </Popover.Body>
        </Popover>
      </Overlay>
      {/* ModalConfirmLogout */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure want to log out?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="success" onClick={handleLogout}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
