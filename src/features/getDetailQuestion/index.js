import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import questionBankApi from "../../services/questionBankApi";
import { getDetailQuestion } from "./getDetailQuestionSlice";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestionBank } from "../getQuestionBank/getQuestionBankSlice";
import { TableDetailQuestion } from "./Table";
import { ModalDeletQuestion } from "./Modal";

export const DetailQuestion = () => {
  const data = useSelector((state) => state.getDetailQuestion);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSaveAndBackButton, setShowSaveAndBackButton] = useState(true);
  const [showEditAndDeleteButton, setShowEditAndDeleteButton] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const { questionId } = useParams();
  useEffect(() => {
    questionBankApi
      .getById(questionId)
      .then((response) => {
        dispatch(getDetailQuestion(response));
      })
      .catch((error) => {
        console.log("ERROR getDetailQuestion >>>", error);
      });
  }, []);
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
        dispatch(getQuestionBank(res.data));
      })
      .catch((error) => {
        console.log("ERROR getQuestionBank >>> " + error);
      });
    navigate(`../question`);
  };
  const handleCloseModalDelete = () => setShowModalDelete(false);
  const handleShowModalDelete = (item) => {
    setShowModalDelete(true);
    // setUser(item);
  };
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
        dispatch(getQuestionBank(res.data));
      })
      .catch((error) => {
        console.log("ERROR getQuestionBank >>> " + error);
      });

    navigate(`../question`);
  };
  const handleEditQuestion = () => {
    setShowSaveAndBackButton(false);
    setShowEditAndDeleteButton(true);
  };
  const handleBack = () => {
    setShowSaveAndBackButton(true);
    setShowEditAndDeleteButton(false);
  };

  return (
    <div>
      <TableDetailQuestion
        data={data}
        handleApproveQuestion={handleApproveQuestion}
        handleEditQuestion={handleEditQuestion}
        showEditAndDeleteButton={showEditAndDeleteButton}
        handleBack={handleBack}
        showSaveAndBackButton={showSaveAndBackButton}
        handleShowModalDelete={handleShowModalDelete}
      />
      <ModalDeletQuestion
        centered
        show={showModalDelete}
        onHide={handleCloseModalDelete}
        closeModal={handleCloseModalDelete}
        onDelete={handleDeleteQuestion}
      />
    </div>
  );
};
