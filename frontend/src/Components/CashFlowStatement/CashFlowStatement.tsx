import { useOutletContext } from "react-router-dom";
import type { CompanyCashFlow } from "../../company.d";
import { useEffect, useState } from "react";
import { getCashflowStatement, getIncomeStatement } from "../../api";
import Table from "../Table/Table";
import Spinners from "../Spinners/Spinners";

type Props = {};

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) => company.operatingCashFlow,
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      company.netCashProvidedByInvestingActivities,
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      company.netCashProvidedByFinancingActivities,
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) => company.cashAtEndOfPeriod,
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) => company.capitalExpenditure,
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) => company.commonStockIssuance,
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) => company.freeCashFlow,
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
    const getCISdata = async () => {
      const data = await getCashflowStatement(symbol);
      console.log(data!.data);
      setCashFlowStatementData(data!.data);
    };
    getCISdata();
  }, []);

  return (
    <>
      {cashFlowStatementData ? (
        <>
          <h2 className="font-bold ms-4">CashFlow Statement</h2>
          <Table data={cashFlowStatementData} config={config} />
        </>
      ) : (
        <Spinners />
      )}
    </>
  );
};

export default CashFlowStatement;
