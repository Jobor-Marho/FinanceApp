import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { type CompanyDCF, type CompanyProfile } from "../../company.d";
import { getCompanyProfile, getDCF } from "../../api";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/SideBar/Sidebar";
import CompanyDashboard from "../../Components/CompanyDashBoard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";
import Spinners from "../../Components/Spinners/Spinners";
import TenkFinder from "../../Components/TenKFinder/TenKFinder";
import  { formatLargeMonetaryNumber } from "../../Helpers/NumbersFormatter";


interface Props {}

const CompanyPage = (props: Props) => {
  let { symbol } = useParams();

  const [company, setCompany] = useState<CompanyProfile>();
  const [stockdcf, setStockdcf] = useState<CompanyDCF>();

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(symbol!);
      setCompany(result?.data[0]);

      const res = await getDCF(symbol!);
      setStockdcf(res?.data[0]);
    };
    getProfileInit();
  }, [symbol]);



  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard ticker={symbol!}>
            {/* Flex children */}
            <Tile title="Company Name" subTitle={company.companyName} />
            <Tile
              title="Price"
              subTitle={formatLargeMonetaryNumber(company.price)}
            />
            <Tile title="Sector" subTitle={company.sector} />
            <Tile
              title="Market Cap"
              subTitle={formatLargeMonetaryNumber(company.marketCap)}
            />
            <Tile title="DCF" subTitle={formatLargeMonetaryNumber(stockdcf?.dcf)} />

            {/* Non-flex child */}
            <>
              <TenkFinder ticker={company.symbol} />
              <p className="bg-white shadow rounded text-medium text-justify font-medium text-gray-900 p-3 mt-1 m-4">
                {company.description}
              </p>
            </>
          </CompanyDashboard>
        </div>
      ) : (
        <Spinners />
      )}
    </>
  );
};

export default CompanyPage;
