import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionTemplate from "../../services/questionTemplates";
import { FormFilterTemplates } from "./FormFilter";
import { TableTemplates } from "./TableTemplates";
import { getTemplateList } from "./getTemplateListSlice";
import styles from "./templates.module.scss";
import className from "classnames/bind";
import PaginatedItems from "../../components/Pagination";
import { ModalDeleteTemplate } from "./ModalDeleteTemplate";

const cx = className.bind(styles);

export const TemplatesContent = () => {
  const dispatch = useDispatch();
  const templatesList = useSelector((state) => state.getTemplateList);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [idTemplate, setIdTemplate] = useState();

  const [params, setParams] = useState({
    keyword: "",
  });
  useEffect(() => {
    questionTemplate
      .getFilter()

      .then((res) => {
        dispatch(getTemplateList(res));
      })
      .catch((error) => {
        console.log("ERROR getTemplateList >>> " + error);
      });
  }, [templatesList]);
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
  const handleDelete = (id) => {
    questionTemplate
      .delete(id)

      .then((response) => alert("Delete successfully"))
      .catch((error) => {
        console.log("ERROR ", error);
      });
    questionTemplate
      .getFilter()

      .then((res) => {
        dispatch(getTemplateList(res));
      })
      .catch((error) => {
        console.log("ERROR getTemplateList >>> " + error);
      });

    setShowModalDelete(false);
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
        />
        <PaginatedItems pagination={templatesList?.pagination} onPageChange={onPageChange} />
        <ModalDeleteTemplate
          centered
          show={showModalDelete}
          onHide={handleCloseModalDeleteTemplate}
          closeModal={handleCloseModalDeleteTemplate}
          onDelete={() => handleDelete(idTemplate)}
        />
      </div>
    </div>
  );
};
