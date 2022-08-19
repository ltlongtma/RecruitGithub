import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionBankApi from "../../services/questionBankApi";
import questionCriteriaApi from "../../services/questionCriteriaApi";
import { getDetailQuestion } from "./getDetailQuestionSlice";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getQuestionBank } from "../getQuestionBank/getQuestionBankSlice";
import { TableDetailQuestion } from "./Table";
import { ModalDeletQuestion } from "./Modal/ModalDelete";
import { getFilterCriteria } from "../../features/getQuestionBank/FormFilter/getFilterCriteriaSlice";
import { ModalApproveQuestion } from "./Modal/ModalApprove";
import { ModalRejectQuestion } from "./Modal/ModalReject";

export const DetailQuestion = () => {
  const data = useSelector((state) => state.getDetailQuestion);
  const location = useLocation();
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

  useEffect(() => {
    // questionBankApi
    //   .getById(questionId)
    //   .then((response) => {
    //     dispatch(getDetailQuestion(response));
    //   })
    //   .catch((error) => {
    //     console.log("ERROR getDetailQuestion >>>", error);
    //   });
    dispatch(getDetailQuestion(questionId));

    setShowEditAndDeleteButton(location.state);

    // questionCriteriaApi
    //   .getAll()
    //   .then((res) => {
    //     dispatch(getFilterCriteria(res));
    //   })
    //   .catch((error) => {
    //     console.log("ERROR getFilterCriteria >>> " + error);
    //   });
    dispatch(getFilterCriteria());
  }, [location]);
  const handleApproveQuestion = async () => {
    await questionBankApi
      .approveQuestion(questionId, data)
      .then((response) => {
        alert("APPROVE SUCCESSFUL");
      })
      .catch((error) => {
        console.log("ERROR APPROVE QUESTION >>>", error);
      });

    questionBankApi
      .getAll()

      .then((res) => {
        dispatch(getQuestionBank(res));
      })
      .catch((error) => {
        console.log("ERROR getQuestionBank >>> " + error);
      });
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
      .then((response) => {})
      .catch((error) => {
        console.log("ERROR DELETE QUESTION >>>", error);
      });
    alert("DELETE SUCCESSFUL");
    questionBankApi
      .getAll()

      .then((res) => {
        dispatch(getQuestionBank(res));
      })
      .catch((error) => {
        console.log("ERROR getQuestionBank >>> " + error);
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
      .then((result) => {
        alert("updated successfully!");
      })
      .catch((err) => {
        console.log("ERROR Update >>> " + err);
      });
    await questionBankApi
      .getAll()

      .then((res) => {
        dispatch(getQuestionBank(res));
      })
      .catch((error) => {
        console.log("ERROR getQuestionBank >>> " + error);
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
    </div>
  );
};
