import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginatedItems from "../../../../components/Pagination";
import questionTemplate from "../../../../services/questionTemplates";
import { getDetailQuestion } from "../../../getDetailQuestion/Slice";
import { getDetailTemplate, removeOldDetailTemplate, templatesFilterByAdmin } from "../../Slice";
import { ModalApproveTemplate } from "../../Modal/ModalApprovedTemplate ";
import { ModalDeleteTemplate } from "../../Modal/ModalDeleteTemplate";
import { ModalViewDetailQuestion } from "../../Modal/ModalViewDetailQuestion";
import TemplateDetail from "../TemplateDetail";
import { TemplatesList } from "./TemplatesList";
import AlertSuccess from "../../../../components/Alert";

export const PendingTemplates = ({ onPageChange, paramStatus, onChangePageSize }) => {
  const templateList = useSelector((state) => state.template.templateList);
  const dataInDetailtemplate = useSelector((state) => state.template.detailTemplate);
  const dataDetaiQuestion = useSelector((state) => state.getDetailQuestion);
  const [showModalViewDetailQuestion, setShowModalViewDetailQuestion] = useState(false);
  const [showModalApprove, setShowModalApprove] = useState(false);
  const handleCloseModalApprove = () => setShowModalApprove(false);

  const [idTemplate, setIdTemplate] = useState();

  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleCloseModalDeleteTemplate = () => setShowModalDelete(false);

  const handleCloseModalViewDetailQuestion = () => setShowModalViewDetailQuestion(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(templatesFilterByAdmin(paramStatus));
  }, []);
  const ViewDetailTemplate = (item) => {
    dispatch(getDetailTemplate(item.id));
  };

  const handleModalViewDetailQuestionEachTemplate = async (data) => {
    await dispatch(getDetailQuestion(data.id));
    setShowModalViewDetailQuestion(true);
  };
  const handleShowModalDelete = (id) => {
    setIdTemplate(id);
    setShowModalDelete(true);
  };
  const handleShowModalApprove = (id) => {
    setIdTemplate(id);
    setShowModalApprove(true);
  };
  const handleDelete = (id) => {
    questionTemplate
      .reject(id)

      .then((response) => {
        dispatch(removeOldDetailTemplate(paramStatus));
        dispatch(templatesFilterByAdmin(paramStatus));

        setTileAlert("Rejected successfully");
        setOpenAlert(true);
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });

    setShowModalDelete(false);
  };
  const handleApprove = (id) => {
    questionTemplate
      .approve(id)

      .then((response) => {
        dispatch(removeOldDetailTemplate(paramStatus));
        dispatch(templatesFilterByAdmin(paramStatus));

        setTileAlert(" Template was approved successfully");
        setOpenAlert(true);
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });

    setShowModalApprove(false);
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
      <TemplatesList
        templateList={templateList}
        ViewDetailTemplate={ViewDetailTemplate}
        showActionColumn={false}
      />
      <PaginatedItems
        pagination={templateList?.pagination}
        onPageChange={onPageChange}
        pageSize={paramStatus.pageSize}
        onChangePageSize={onChangePageSize}
      />

      <TemplateDetail
        dataInDetailtemplate={dataInDetailtemplate}
        handleModalViewDetailQuestionEachTemplate={handleModalViewDetailQuestionEachTemplate}
        handleShowModalDelete={handleShowModalDelete}
        handleShowModalApprove={handleShowModalApprove}
      />
      <ModalViewDetailQuestion
        centered
        show={showModalViewDetailQuestion}
        onHide={handleCloseModalViewDetailQuestion}
        closeModal={handleCloseModalViewDetailQuestion}
        data={dataDetaiQuestion}
      />
      <ModalDeleteTemplate
        centered
        show={showModalDelete}
        onHide={handleCloseModalDeleteTemplate}
        closeModal={handleCloseModalDeleteTemplate}
        onDelete={() => handleDelete(idTemplate)}
      />
      <ModalApproveTemplate
        centered
        show={showModalApprove}
        onHide={handleCloseModalApprove}
        closeModal={handleCloseModalApprove}
        handleApprove={() => handleApprove(idTemplate)}
      />
      <AlertSuccess title={titleAlert} openAlert={openAlert} closeAlert={handleCloseAlert} />
    </div>
  );
};
