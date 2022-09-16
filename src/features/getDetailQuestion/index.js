import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionBankApi from "../../services/questionBankApi";
import { useParams, useNavigate } from "react-router-dom";
import { TableDetailQuestion } from "./Table";
import { ModalDeletQuestion } from "./Modal/ModalDelete";
import { ModalApproveQuestion } from "./Modal/ModalApprove";
import { ModalRejectQuestion } from "./Modal/ModalReject";
import AlertSuccess from "../../components/Alert";
import { ApproveQuestion } from "./Slice";

export const DetailQuestion = () => {
  const data = useSelector((state) => state.getDetailQuestion);
  // const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSaveAndBackButton, setShowSaveAndBackButton] = useState(true);
  const [showEditAndDeleteButton, setShowEditAndDeleteButton] = useState(false);
  const [showRejectAndApproveButton, setShowRejectAndApproveButton] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalApprove, setShowModalApprove] = useState(false);
  const [showModalReject, setShowModalReject] = useState(false);
  const [readOnly, setReadOnly] = useState(true);

  const { questionId } = useParams();
  const criteria = useSelector((state) => state.filterCriteria);


  const handleApproveQuestion = async () => {
   
    await dispatch(ApproveQuestion(questionId)).then(
      await setOpenAlert(true),
      await setTileAlert("Approved successfully")
    );

    navigate(`../question`);
  };
  const handleCloseModalDelete = () => setShowModalDelete(false);
  const handleShowModalDelete = (item) => {
    setShowModalDelete(true);
  };
  const handleCloseModalApprove = () => setShowModalApprove(false);
  const handleShowModalApprove = (item) => {
    setShowModalApprove(true);
  };
  const handleShowModalReject = () => {
    setShowModalReject(true);
  };
  const handleCloseModalReject = () => setShowModalReject(false);

  const handleDeleteQuestion = async () => {
    await questionBankApi
      .delete(questionId)
      .then(await setTileAlert("Deleted successfully"), await setOpenAlert(true))
      .catch((error) => {
        console.log("ERROR DELETE QUESTION >>>", error);
      });

    navigate(`../question`);
  };

  const handleEditQuestionApproved = () => {
    setReadOnly(!readOnly);
    setShowSaveAndBackButton(false);
    setShowEditAndDeleteButton(true);
  };
  const handleEditQuestionPending = () => {
    setReadOnly(!readOnly);
    setShowRejectAndApproveButton(true);
    setShowSaveAndBackButton(false);
  };

  const handleSave = async (refContent, refAnswer) => {
    const data = {
      content: refContent,
      answer: refAnswer,
    };
    await questionBankApi
      .update(questionId, data)
      .then(await setTileAlert("Updated successfully"), await setOpenAlert(true))
      .catch((err) => {
        console.log("ERROR Update >>> " + err);
      });

    navigate(`../question`);
  };

  const handleBackApproved = () => {
    setShowSaveAndBackButton(true);
    setShowEditAndDeleteButton(false);
  };
  const handleBackPending = () => {
    setShowRejectAndApproveButton(false);
    setShowSaveAndBackButton(true);
  };
  //handle alert dialog
  const [openAlert, setOpenAlert] = React.useState(false);
  const [titleAlert, setTileAlert] = React.useState("");

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  return (
    <div>
      <TableDetailQuestion
        data={data}
        readOnly={readOnly}
        criteria={criteria}
        handleApproveQuestion={handleApproveQuestion}
        handleEditQuestionApproved={handleEditQuestionApproved}
        handleEditQuestionPending={handleEditQuestionPending}
        showEditAndDeleteButton={showEditAndDeleteButton}
        handleBackApproved={handleBackApproved}
        showSaveAndBackButton={showSaveAndBackButton}
        handleShowModalDelete={handleShowModalDelete}
        handleShowModalApprove={handleShowModalApprove}
        handleShowModalReject={handleShowModalReject}
        handleSave={handleSave}
        handleBackPending={handleBackPending}
        showRejectAndApproveButton={showRejectAndApproveButton}
      />
      <ModalDeletQuestion
        centered
        show={showModalDelete}
        onHide={handleCloseModalDelete}
        closeModal={handleCloseModalDelete}
        onDelete={handleDeleteQuestion}
      />
      <ModalApproveQuestion
        centered
        show={showModalApprove}
        onHide={handleCloseModalApprove}
        closeModal={handleCloseModalApprove}
        onApprove={handleApproveQuestion}
      />
      <ModalRejectQuestion
        centered
        show={showModalReject}
        onHide={handleCloseModalReject}
        closeModal={handleCloseModalReject}
        onReject={handleDeleteQuestion}
      />
      <AlertSuccess title={titleAlert} openAlert={openAlert} closeAlert={handleCloseAlert} />
    </div>
  );
};
