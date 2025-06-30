import React, { useEffect, useState } from "react";
import type { CompanyIncomeStatement } from "../../company.d";
import { useOutletContext } from "react-router-dom";
import { getIncomeStatement } from "../../api";
import Table from "../Table/Table";
import Spinners from "../Spinners/Spinners";
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumbersFormatter";

interface Props {}

const configs = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: "Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.revenue),
  },
  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.costOfRevenue),
  },
  {
    label: "Depreciation",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.depreciationAndAmortization),
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.operatingIncome),
  },
  {
    label: "Income Before Taxes",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.incomeBeforeTax),
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.netIncome),
  },
  {
    label: "Net Income Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.netIncomeRatio),
  },
  {
    label: "Earnings Per Share",
    render: (company: CompanyIncomeStatement) => formatRatio(company.eps),
  },
  {
    label: "Earnings Per Diluted",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.epsdiluted),
  },
  {
    label: "Gross Profit Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.grossProfitRatio),
  },
  {
    label: "Opearting Income Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.operatingIncomeRatio),
  },
  {
    label: "Income Before Taxes Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.incomeBeforeTaxRatio),
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

  return (
    <>
      {incomeStatementData ? (
        <>
          <h2 className="font-bold ms-4">Income Statement</h2>
          <div className="overflow-x-auto  max-w-4/6">
            <Table data={incomeStatementData} config={configs} />
          </div>
        </>
      ) : (
        <Spinners />
      )}
    </>
  );
};

export default IncomeStatement;
