import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginatedItems from "../../../../components/Pagination";
import { getDetailQuestion } from "../../../getDetailQuestion/Slice";
import { ModalViewDetailQuestion } from "../../Modal/ModalViewDetailQuestion";
import { ModalCloneTemplate } from "../../Modal/ModalCloneTemplate";
import { cloneTemplate, getDetailTemplate, templatesFilterByAdmin } from "../../Slice";
import { TemplatesList } from "../Pending/TemplatesList";
import TemplateDetail from "../TemplateDetail";
import questionTemplate from "../../../../services/questionTemplates";

export const ApprovedTemplates = ({ onPageChange, onChangePageSize, paramStatus }) => {
  const templateList = useSelector((state) => state.template.templateList);
  const dataInDetailtemplate = useSelector((state) => state.template.detailTemplate);
  const dataDetaiQuestion = useSelector((state) => state.getDetailQuestion);
  const [showModalViewDetailQuestion, setShowModalViewDetailQuestion] = useState(false);
  const [showModalCloneTemplate, setShowModalCloneTemplate] = useState(false);
  const [idTemplate, setIdTemplate] = useState();
  const handleCloseModalCloneTemplate = () => setShowModalCloneTemplate(false);

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
  const handleModalCloneTemplate = (item) => {
    setIdTemplate(item.id);
    setShowModalCloneTemplate(true);
  };
  const handleCloneTemplate = async (id) => {
    // console.log("E >>", id);
    // questionTemplate.cloneToMyTemplate(id);
    await dispatch(cloneTemplate(id));
    setShowModalCloneTemplate(false);
  };

  return (
    <div>
      <TemplatesList
        templateList={templateList}
        ViewDetailTemplate={ViewDetailTemplate}
        showActionColumn={true}
        handleModalCloneTemplate={handleModalCloneTemplate}
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
        setHiddenBtn={true}
      />
      <ModalViewDetailQuestion
        centered
        show={showModalViewDetailQuestion}
        onHide={handleCloseModalViewDetailQuestion}
        closeModal={handleCloseModalViewDetailQuestion}
        data={dataDetaiQuestion}
      />
      <ModalCloneTemplate
        centered
        show={showModalCloneTemplate}
        onHide={handleCloseModalCloneTemplate}
        closeModal={handleCloseModalCloneTemplate}
        handleClone={() => handleCloneTemplate(idTemplate)}
      />
    </div>
  );
};
