import React, { useState, useRef } from "react";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import className from "classnames/bind";
import styles from "./UserDetail.module.scss";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const cx = className.bind(styles);

export function UserDetail() {
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
    navigate("/change-password")
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
            {role != "undefined" ? role : "GUEST"}
          </Popover.Header>
          <Popover.Body>
            <span className={cx("popover-body")} onClick={handleShow}>
              <LogoutIcon sx={{ fontSize: 25 }} />
              Log Out
            </span>
          </Popover.Body>
          <Popover.Body>
            <span className={cx("popover-body")} onClick={handleChangePassword}>
              Change password
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
          <Modal.Title>Are you sure to log out?</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>Are you sure to log out?</Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLogout}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
