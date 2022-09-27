import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionTemplate from "../../../services/questionTemplates";
import { TableTemplates } from "./TableTemplates";
import { getTemplateList } from "../Slice";
import styles from "../templates.module.scss";
import className from "classnames/bind";
import PaginatedItems from "../../../components/Pagination";
import { ModalDeleteTemplate } from "../Modal/ModalDeleteTemplate";
import ViewDetailTemplate from "./ViewDetailTemplate";
import { getDetailTemplate } from "../Slice";
import { ModalViewDetailQuestion } from "../Modal/ModalViewDetailQuestion";
import { getDetailQuestion } from "../../getDetailQuestion/Slice";
import { ModalSharingTemplate } from "../Modal/ModalSharingTemplate";
import { SearchForm } from "../../../components/SearchForm";

const cx = className.bind(styles);

export const TemplatesContent = ({ handleEditTemplate }) => {
  const dispatch = useDispatch();
  const templatesList = useSelector((state) => state.template.templateList);
  const dataInDetailtemplate = useSelector((state) => state.template.detailTemplate);
  const dataDetaiQuestion = useSelector((state) => state.getDetailQuestion);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalSharing, setShowModalSharing] = useState(false);
  const [showModalViewDetailQuestion, setShowModalViewDetailQuestion] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const [idTemplate, setIdTemplate] = useState();

  const [paramStatus, setParamStatus] = useState({
    keyword: "",
    pageSize: 5,
  });

  useEffect(() => {
    dispatch(getTemplateList(paramStatus));
  }, [paramStatus]);
  const onValueSearch = (e) => {
    const newParams = { ...paramStatus, keyword: e };
    setParamStatus(newParams);
    dispatch(getTemplateList(newParams));
  };
  const onPageChange = (page) => {
    const newParams = { ...paramStatus, page };
    dispatch(getTemplateList(newParams));
  };
  const onChangePageSize = async (e) => {
    const newParams = { ...paramStatus, pageSize: e };
    setParamStatus({ ...newParams });
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

      .then((response) => alert("Delete primaryfully"))
      .catch((error) => {
        console.log("ERROR ", error);
      });

    dispatch(getTemplateList());

    setShowModalDelete(false);
  };
  const handleSharing = (id) => {
    // console.log("Sharing", id);
    questionTemplate.subMitToQueue(id);
    alert("Sharing primaryfully! Please waiting for aprroved from Admin");
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
        <SearchForm onValueSearch={onValueSearch} />
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
        <PaginatedItems
          pagination={templatesList?.pagination}
          onPageChange={onPageChange}
          pageSize={paramStatus.pageSize}
          onChangePageSize={onChangePageSize}
        />
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
