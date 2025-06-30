import { useOutletContext } from "react-router-dom";
import type { CompanyBalanceSheet } from "../../company.d";
import { useEffect, useState } from "react";
import { getBalanceSheet } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinners from "../Spinners/Spinners";
import "./BalanceSheet.css";
import { formatLargeMonetaryNumber } from "../../Helpers/NumbersFormatter";

type Props = {};

const config = [
  {
    label: <span className="font-bold">Total Assets</span>,
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalAssets),
  },
  {
    label: "Current Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalCurrentAssets),
  },
  {
    label: "Total Cash",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.cashAndCashEquivalents),
  },
  {
    label: "Property & equipment",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.propertyPlantEquipmentNet),
  },
  {
    label: "Intangible Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.intangibleAssets),
  },
  {
    label: "Long Term Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.longTermDebt),
  },
  {
    label: "Total Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.otherCurrentLiabilities),
  },
  {
    label: <span className="font-bold">Total Liabilites</span>,
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalLiabilities),
  },
  {
    label: "Current Liabilities",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalCurrentLiabilities),
  },
  {
    label: "Long-Term Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.longTermDebt),
  },
  {
    label: "Long-Term Income Taxes",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.otherLiabilities),
  },
  {
    label: "Stakeholder's Equity",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalStockholdersEquity),
  },
  {
    label: "Retained Earnings",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.retainedEarnings),
  },
];

const BalanceSheet = (props: Props) => {
  // Get the symbol
  const symbol = useOutletContext<string>();

  // Set our usestates
  const [balanceSheetReportData, setBalanceSheetReportData] =
    useState<CompanyBalanceSheet>();

  //Set Our Use Effect to actually call the API to fetch the data and set the value to our usestate container
  useEffect(() => {
    const getBalanceSheetData = async () => {
      const res = await getBalanceSheet(symbol!);
      console.log(res?.data);
      console.log(res?.data[0]);
      setBalanceSheetReportData(res?.data[0]);
    };
    getBalanceSheetData();
  }, []);

  return (
    <>
      <div id="bal-sheet">
        {balanceSheetReportData ? (
          <>
            <h2 className="font-bold ms-4">Balance Sheet</h2>
            <RatioList data={balanceSheetReportData} config={config} />
          </>
        ) : (
          <Spinners />
        )}
      </div>
    </>
  );
};

export default BalanceSheet;
