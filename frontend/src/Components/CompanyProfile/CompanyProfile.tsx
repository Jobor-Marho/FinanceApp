import React, { useEffect, useState } from "react";
import type { CompanyKeyMetrics } from "../../company.d";
import { useOutletContext } from "react-router-dom";
import { getCompanyMetrics } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinners from "../Spinners/Spinners";
import {
  formatLargeNonMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumbersFormatter";

interface Props {}

const tableConfig = [
  {
    label: "Enterprise Value (TTM)",
    render: (company: CompanyKeyMetrics) =>
      formatLargeNonMonetaryNumber(company.enterpriseValueTTM),
    subTitle:
      "Total company value including equity, debt, and cash over the trailing 12 months.",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.currentRatioTTM),
    subTitle:
      "Measures the companies ability to pay short term debt obligations",
  },
  {
    label: "Net Income Per Share TTM",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.netIncomePerShareTTM),
    subTitle: "Net Income Earned Per Share Over the Last 12 Months",
  },
  {
    label: "Tangible Book Value Per Share (TTM)",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.tangibleBookValuePerShareTTM),
    subTitle:
      "The value of a company’s physical net assets allocated to each share over the past 12 months.",
  },
  {
    label: "Free Cashflow Per Share",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.freeCashFlowPerShareTTM),
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Book Value Per Share TTM",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.bookValuePerShareTTM),
    subTitle:
      "Book value per share indicates a firm's net asset value (total assets - total liabilities) on per share basis",
  },
  {
    label: "Divdend Yield TTM",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.dividendYieldTTM),
    subTitle: "Shows how much a company pays each year relative to stock price",
  },
  {
    label: "Capex Per Share TTM",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.capexPerShareTTM),
    subTitle:
      "Capex is used by a company to aquire, upgrade, and maintain physical assets",
  },

];

const CompanyProfile = (props: Props) => {
  const symbol = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getCompanyKeyMetrics = async () => {
      try {
        const res = await getCompanyMetrics(symbol);
        setCompanyData(res?.data[0]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    getCompanyKeyMetrics();
  }, [symbol]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!companyData) {
        setLoading(false);
        setError(true);
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [companyData]);

  return (
    <>
      {loading ? (
        <Spinners />
      ) : error || !companyData ? (
        <>
          <div>Error displaying company data</div>
        </>
      ) : (
        <>
          <RatioList data={companyData} config={tableConfig} />
        </>
      )}
    </>
  );
};

export default CompanyProfile;
