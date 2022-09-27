import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CandidateCard } from "./CandidateCard";
import { FormInput } from "./FormInput";
import { PendingCandidateTable } from "./PendingCandidateTable";
import { filterCandidateByAdmin, getDetailPendingCandidate } from "./Slice";
import { ourRequest } from "../../getQuestionBank/Slice";
import { ModalViewDetailPendingCandidate } from "./ModalViewDetailPendingCandidate";
import { getUsersByAdmin } from "../../getUser/Slice";

export default function FillInfo({ activeStep, handleNext, steps }) {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user);
  const candidatePendingList = useSelector((state) => state.interview.pendingList);
  const dataDetailPendingCandidate = useSelector((state) => state.interview.detailPendingCandidate);
  const [hiddenFormInput, setHiddenFormInput] = React.useState(true);
  const [hiddenCardOptions, setHiddenCardOptions] = React.useState(false);
  const [hiddenTablePendingcandidate, setHiddenTablePendingcandidate] = React.useState(true);
  const [showModalViewDetailPendingCandidate, setShowModalViewDetailPendingCandidate] =
    React.useState(false);

  const userListSuggest = userList?.data.map((data) => {
    return data.username;
  });
  const [paramStatus, setParamStatus] = React.useState({
    keyword: "",
    pageSize: 5,
  });

  React.useEffect(() => {
    dispatch(filterCandidateByAdmin(paramStatus));
    dispatch(getUsersByAdmin());
    return () => {
      ourRequest.cancel();
    };
  }, [paramStatus]);

  const handleNewCandidate = () => {
    setHiddenFormInput(false);
    setHiddenCardOptions(true);
  };
  const handlePendingCandidate = () => {
    setHiddenCardOptions(true);
    setHiddenTablePendingcandidate(false);
  };
  const handleBack = () => {
    setHiddenFormInput(true);
    setHiddenCardOptions(false);
    setHiddenTablePendingcandidate(true);
  };
  const onPageChange = async (page) => {
    const newParamStatus = { ...paramStatus, page };
    await setParamStatus(newParamStatus);
  };
  const onChangePageSize = async (e) => {
    await setParamStatus({ ...paramStatus, pageSize: e });
  };
  const handleSearchValue = (e) => {
    setParamStatus({ ...paramStatus, keyword: e });
  };
  const handleCloseModalViewDetailPendingCandidate = () =>
    setShowModalViewDetailPendingCandidate(false);
  const handleViewDetailPendingCandidate = async (id) => {
    await dispatch(getDetailPendingCandidate(id));
    setShowModalViewDetailPendingCandidate(true);
  };
  const handleFillDataIntoFormInput = async (id) => {
    await dispatch(getDetailPendingCandidate(id));
    setHiddenCardOptions(true);
    setHiddenTablePendingcandidate(true);
    setHiddenFormInput(false);
  };

  return (
    <div>
      <CandidateCard
        hiddenCardOptions={hiddenCardOptions}
        handleNewCandidate={handleNewCandidate}
        handlePendingCandidate={handlePendingCandidate}
      />

      <FormInput
        hiddenFormInput={hiddenFormInput}
        userListSuggest={userListSuggest}
        activeStep={activeStep}
        handleNext={handleNext}
        steps={steps}
        handleBack={handleBack}
        dataFromPendingCandidate={dataDetailPendingCandidate}
      />
      <PendingCandidateTable
        candidatePendingList={candidatePendingList}
        hiddenTablePendingcandidate={hiddenTablePendingcandidate}
        onPageChange={onPageChange}
        onChangePageSize={onChangePageSize}
        handleBack={handleBack}
        onValueSearch={handleSearchValue}
        handleViewDetailPendingCandidate={handleViewDetailPendingCandidate}
        handleFillDataIntoFormInput={handleFillDataIntoFormInput}
      />
      <ModalViewDetailPendingCandidate
        centered
        show={showModalViewDetailPendingCandidate}
        onHide={handleCloseModalViewDetailPendingCandidate}
        closeModal={handleCloseModalViewDetailPendingCandidate}
        data={dataDetailPendingCandidate}
      />
    </div>
  );
}
