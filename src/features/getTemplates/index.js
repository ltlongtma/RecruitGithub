import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionTemplate from "../../services/questionTemplates";
import { FormFilterTemplates } from "./FormFilter";
import { TableTemplates } from "./TableTemplates";
import { getTemplateList } from "./getTemplateListSlice";
import styles from "./templates.module.scss";
import className from "classnames/bind";
import PaginatedItems from "../../components/Pagination";
import { ModalDeleteTemplate } from "./Modal/ModalDeleteTemplate";
import ViewDetailTemplate from "./ViewDetailTemplate";
import { getDetailTemplate } from "./getDetailTemplateSlice";
import { ModalViewDetailQuestion } from "./Modal/ModalViewDetailQuestion";
import questionBankApi from "../../services/questionBankApi";
import { getDetailQuestion } from "../getDetailQuestion/getDetailQuestionSlice";

const cx = className.bind(styles);

export const TemplatesContent = () => {
  const dispatch = useDispatch();
  const templatesList = useSelector((state) => state.getTemplateList);
  const dataInDetailtemplate = useSelector((state) => state.getDetailTemplate);
  const dataDetaiQuestion = useSelector((state) => state.getDetailQuestion);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalViewDetailQuestion, setShowModalViewDetailQuestion] = useState(false);

  const [idTemplate, setIdTemplate] = useState();

  const [params, setParams] = useState({
    keyword: "",
  });

  useEffect(() => {
    // questionTemplate
    //   .getFilter()

    //   .then((res) => {
    //     dispatch(getTemplateList(res));
    //   })
    //   .catch((error) => {
    //     console.log("ERROR getTemplateList >>> " + error);
    //   });
    dispatch(getTemplateList());
  }, []);
  const valueSearch = (e) => {
    setParams({ keyword: e });
    const newParams = { ...params, keyword: e };
    questionTemplate
      .getFilter(newParams)
      .then((res) => {
        dispatch(getTemplateList(res));
      })
      .catch((error) => {
        console.log("ERROR getTemplateList >>> " + error);
      });
  };
  const onPageChange = (page) => {
    const newParams = { ...params, page };
    questionTemplate
      .getFilter(newParams)
      .then((res) => {
        dispatch(getTemplateList(res));
      })
      .catch((error) => {
        console.log("ERROR getTemplateList >>> " + error);
      });
  };
  const handleShowModalDeleteTemplate = (item) => {
    setShowModalDelete(true);
    setIdTemplate(item);
  };
  const handleCloseModalDeleteTemplate = () => setShowModalDelete(false);
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
  const handleViewDetailTemplate = (id) => {
    questionTemplate
      .getById(id)
      .then((result) => {
        dispatch(getDetailTemplate(result));
      })
      .catch((err) => {
        console.log("ERROR getDetailTemplate >>> " + err);
      });
  };
  const handleModalViewDetailQuestionEachTemplate = async (data) => {
    await dispatch(getDetailQuestion(data));

    setShowModalViewDetailQuestion(true);
  };
  return (
    <div className={cx("templates")}>
      <div className={cx("templates-searchForm")}>
        <FormFilterTemplates valueSearch={valueSearch} />
      </div>
      <div>
        <TableTemplates
          templateList={templatesList}
          handleShowModalDeleteTemplate={handleShowModalDeleteTemplate}
          handleViewDetailTemplate={handleViewDetailTemplate}
        />
        <PaginatedItems pagination={templatesList?.pagination} onPageChange={onPageChange} />
        <ViewDetailTemplate
          dataInDetailtemplate={dataInDetailtemplate}
          handleModalViewDetailQuestionEachTemplate={handleModalViewDetailQuestionEachTemplate}
        />
        <ModalDeleteTemplate
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
      </div>
    </div>
  );
};
