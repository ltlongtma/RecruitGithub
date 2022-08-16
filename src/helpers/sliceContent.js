const sliceContent = (desc) => {
  if (!String(desc)) return;

  return desc?.length > 70 ? desc?.slice(0, 70) + "..." : desc;
};

export default sliceContent;
