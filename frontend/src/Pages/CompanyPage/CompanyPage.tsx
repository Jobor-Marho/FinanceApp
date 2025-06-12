import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { type CompanyProfile } from "../../company.d";
import { getCompanyProfile } from "../../api";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/SideBar/Sidebar";
import CompanyDashboard from "../../Components/CompanyDashBoard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";
import Spinners from "../../Components/Spinners/Spinners";

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
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard ticker={symbol!}>
            <Tile title="Company Name" subTitle={company.companyName} />
            <Tile title="Price" subTitle={company.price.toString()} />
            <Tile title="Sector" subTitle={company.sector} />
            {/* <Tile title="DCF" subTitle={company.dcf.toString()} /> */}
            <p className="bg-white text-justify mt-4 m-4 rounded text-gray-500">{company.description}</p>
          </CompanyDashboard>
        </div>
      ) : (
        <Spinners />
      )}
    </>
  );
};

export default CompanyPage;
