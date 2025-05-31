import React, { useEffect, useState } from "react";
import type { CompanyIncomeStatement } from "../../company.d";
import { useOutlet, useOutletContext } from "react-router-dom";
import { getIncomeStatement } from "../../api";
import Table from "../Table/Table";

interface Props {}

const configs = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: "Revenue",
    render: (company: CompanyIncomeStatement) => company.revenue,
  },
  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) => company.costOfRevenue,
  },
  {
    label: "Depreciation",
    render: (company: CompanyIncomeStatement) =>
      company.depreciationAndAmortization,
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) => company.operatingIncome,
  },
  {
    label: "Income Before Taxes",
    render: (company: CompanyIncomeStatement) => company.incomeBeforeTax,
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) => company.netIncome,
  },
  {
    label: "Net Income Ratio",
    render: (company: CompanyIncomeStatement) => company.netIncomeRatio,
  },
  {
    label: "Earnings Per Share",
    render: (company: CompanyIncomeStatement) => company.eps,
  },
  {
    label: "Earnings Per Diluted",
    render: (company: CompanyIncomeStatement) => company.epsdiluted,
  },
  {
    label: "Gross Profit Ratio",
    render: (company: CompanyIncomeStatement) => company.grossProfitRatio,
  },
  {
    label: "Opearting Income Ratio",
    render: (company: CompanyIncomeStatement) => company.operatingIncomeRatio,
  },
  {
    label: "Income Before Taxes Ratio",
    render: (company: CompanyIncomeStatement) => company.incomeBeforeTaxRatio,
  },
];

const IncomeStatement = (props: Props) => {
  const symbol = useOutletContext<string>();
  const [incomeStatementData, setIncomeStatementData] =
    useState<CompanyIncomeStatement[]>();

  useEffect(() => {
    const getIncomeStatements = async () => {
      const res = await getIncomeStatement(symbol);
      setIncomeStatementData(res?.data);
    };
    getIncomeStatements();
  }, []);

  return <>{incomeStatementData ? (
    <Table data={incomeStatementData} config={configs}/>
  ):(<>Loading...</>)}</>;
};

export default IncomeStatement;
