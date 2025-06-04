import { useOutletContext } from "react-router-dom";
import type { CompanyBalanceSheet } from "../../company.d";
import { useEffect, useState } from "react";
import { getBalanceSheet } from "../../api";
import RatioList from "../RatioList/RatioList";

type Props = {};

const config = [
  {
    label: <span className="font-bold">Total Assets</span>,
    render: (company: CompanyBalanceSheet) => company.totalAssets,
  },
  {
    label: "Current Assets",
    render: (company: CompanyBalanceSheet) => company.totalCurrentAssets,
  },
  {
    label: "Total Cash",
    render: (company: CompanyBalanceSheet) => company.cashAndCashEquivalents,
  },
  {
    label: "Property & equipment",
    render: (company: CompanyBalanceSheet) => company.propertyPlantEquipmentNet,
  },
  {
    label: "Intangible Assets",
    render: (company: CompanyBalanceSheet) => company.intangibleAssets,
  },
  {
    label: "Long Term Debt",
    render: (company: CompanyBalanceSheet) => company.longTermDebt,
  },
  {
    label: "Total Debt",
    render: (company: CompanyBalanceSheet) => company.otherCurrentLiabilities,
  },
  {
    label: <span className="font-bold">Total Liabilites</span>,
    render: (company: CompanyBalanceSheet) => company.totalLiabilities,
  },
  {
    label: "Current Liabilities",
    render: (company: CompanyBalanceSheet) => company.totalCurrentLiabilities,
  },
  {
    label: "Long-Term Debt",
    render: (company: CompanyBalanceSheet) => company.longTermDebt,
  },
  {
    label: "Long-Term Income Taxes",
    render: (company: CompanyBalanceSheet) => company.otherLiabilities,
  },
  {
    label: "Stakeholder's Equity",
    render: (company: CompanyBalanceSheet) => company.totalStockholdersEquity,
  },
  {
    label: "Retained Earnings",
    render: (company: CompanyBalanceSheet) => company.retainedEarnings,
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
      {balanceSheetReportData ? (
        <RatioList data={balanceSheetReportData} config={config} />
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default BalanceSheet;
