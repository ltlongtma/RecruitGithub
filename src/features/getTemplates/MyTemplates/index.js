import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionTemplate from "../../../services/questionTemplates";
import { FormFilterTemplates } from "../FormFilter";
import { TableTemplates } from "./TableTemplates";
import { getTemplateList } from "../getTemplateListSlice";
import styles from "../templates.module.scss";
import className from "classnames/bind";
import PaginatedItems from "../../../components/Pagination";
import { ModalDeleteTemplate } from "../Modal/ModalDeleteTemplate";
import ViewDetailTemplate from "./ViewDetailTemplate";
import { getDetailTemplate } from "../getDetailTemplateSlice";
import { ModalViewDetailQuestion } from "../Modal/ModalViewDetailQuestion";
import { getDetailQuestion } from "../../getDetailQuestion/Slice";
import { ModalSharingTemplate } from "../Modal/ModalSharingTemplate";

const cx = className.bind(styles);

export const TemplatesContent = ({ handleEditTemplate }) => {
  const dispatch = useDispatch();
  const templatesList = useSelector((state) => state.getTemplateList);
  const dataInDetailtemplate = useSelector((state) => state.getDetailTemplate);
  const dataDetaiQuestion = useSelector((state) => state.getDetailQuestion);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalSharing, setShowModalSharing] = useState(false);
  const [showModalViewDetailQuestion, setShowModalViewDetailQuestion] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const [idTemplate, setIdTemplate] = useState();

  const [params, setParams] = useState({
    keyword: "",
    pageSize: 5,
  });

  useEffect(() => {
    dispatch(getTemplateList(params));
  }, []);
  const onValueSearch = (e) => {
    const newParams = { ...params, keyword: e };
    setParams(newParams);
    dispatch(getTemplateList(newParams));
  };
  const onPageChange = (page) => {
    const newParams = { ...params, page };
    dispatch(getTemplateList(newParams));
  };
  const handleShowModalDeleteTemplate = (item) => {
    setShowModalDelete(true);
    setIdTemplate(item);
  };
  const handleCloseModalDeleteTemplate = () => setShowModalDelete(false);
  const handleCloseModalSharing = () => setShowModalSharing(false);
  const handleCloseModalViewDetailQuestion = () => setShowModalViewDetailQuestion(false);

  const handleDelete = async (id) => {
    await questionTemplate
      .delete(id)

      .then((response) => alert("Delete successfully"))
      .catch((error) => {
        console.log("ERROR ", error);
      });

    dispatch(getTemplateList());

    setShowModalDelete(false);
  };
  const handleSharing = (id) => {
    // console.log("Sharing", id);
    questionTemplate.subMitToQueue(id);
    alert("Sharing successfully! Please waiting for aprroved from Admin");
    setShowModalSharing(false);
  };
  const handleViewDetailTemplate = (id) => {
    setSelectedRow(id);
    dispatch(getDetailTemplate(id));
  };
  const handleModalViewDetailQuestionEachTemplate = async (data) => {
    await dispatch(getDetailQuestion(data.id));
    setShowModalViewDetailQuestion(true);
  };
  const handleModalSharing = (item) => {
    setShowModalSharing(true);
    setIdTemplate(item);
  };

  return (
    <div className={cx("templates")}>
      <div className={cx("templates-searchForm")}>
        <FormFilterTemplates onValueSearch={onValueSearch} />
      </div>
      <div>
        <TableTemplates
          templateList={templatesList}
          handleShowModalDeleteTemplate={handleShowModalDeleteTemplate}
          handleViewDetailTemplate={handleViewDetailTemplate}
          handleEditTemplate={handleEditTemplate}
          handleModalSharing={handleModalSharing}
          selectedRow={selectedRow}
        />
        <PaginatedItems pagination={templatesList?.pagination} onPageChange={onPageChange} />
        <ViewDetailTemplate
          dataInDetailtemplate={dataInDetailtemplate}
          handleModalViewDetailQuestionEachTemplate={handleModalViewDetailQuestionEachTemplate}
        />
        <ModalDeleteTemplate
          centered
          show={showModalDelete}
          onHide={handleCloseModalDeleteTemplate}
          closeModal={handleCloseModalDeleteTemplate}
          onDelete={() => handleDelete(idTemplate)}
        />
        <ModalViewDetailQuestion
          centered
          show={showModalViewDetailQuestion}
          onHide={handleCloseModalViewDetailQuestion}
          closeModal={handleCloseModalViewDetailQuestion}
          data={dataDetaiQuestion}
        />
        <ModalSharingTemplate
          show={showModalSharing}
          onHide={handleCloseModalSharing}
          closeModal={handleCloseModalSharing}
          handleSharing={() => handleSharing(idTemplate)}
        />
      </div>
    </div>
  );
};
