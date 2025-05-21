import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type CompanyProfile } from "../../company.d";
import { getCompanyProfile } from "../../api";

interface Props {}

const CompanyPage = (props: Props) => {
  let { symbol } = useParams();

  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(symbol!);
      setCompany(result?.data[0]);
    };
    getProfileInit();
  }, []);

  return (
    <>
      {company ? <div>{company.companyName}</div> : <h2>Company not found!</h2>}
    </>
  );
};

export default CompanyPage;
