import { useOutletContext } from "react-router-dom";
import type { CompanyCashFlow } from "../../company.d";
import { useEffect, useState } from "react";
import { getCashflowStatement, getIncomeStatement } from "../../api";
import Table from "../Table/Table";
import Spinners from "../Spinners/Spinners";
import { formatLargeMonetaryNumber } from "../../Helpers/NumbersFormatter";

type Props = {};

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.operatingCashFlow),
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashProvidedByInvestingActivities),
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashProvidedByFinancingActivities),
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.capitalExpenditure),
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.commonStockIssuance),
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.freeCashFlow),
  },
];

const CashFlowStatement = (props: Props) => {
  //Get symbol
  const symbol = useOutletContext<string>();

  // Set CFS state data

  const [cashFlowStatementData, setCashFlowStatementData] =
    useState<CompanyCashFlow[]>();

  // Load up the data from the API

  useEffect(() => {
    const getCFSdata = async () => {
      const data = await getCashflowStatement(symbol);
      console.log(data!.data);
      setCashFlowStatementData(data!.data);
    };
    getCFSdata();
  }, []);

  return (
    <>
      {cashFlowStatementData ? (
        <>
          <h2 className="font-bold ms-4">CashFlow Statement</h2>

          <div className="overflow-x-auto  max-w-4/6">
            <Table data={cashFlowStatementData} config={config} />
          </div>
        </>
      ) : (
        <Spinners />
      )}
    </>
  );
};

export default CashFlowStatement;
