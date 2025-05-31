import React from "react";
import { TestDataCompany } from "../Table/TestData";

type Props = {};

const data = TestDataCompany[0];

type Company = typeof data;

const config = [
  {
    label: "Company Name",
    render: (company: Company) => company.companyName,
    subTitle: "The name of the company as registered with the SEC.",
  },
  {
    label: "Company Name",
    render: (company: Company) => company.companyName,
    subTitle: "The name of the company as registered with the SEC.",
  },
  {
    label: "Company Name",
    render: (company: Company) => company.companyName,
    subTitle: "The name of the company as registered with the SEC.",
  },
  {
    label: "Company Name",
    render: (company: Company) => company.companyName,
    subTitle: "The name of the company as registered with the SEC.",
  },
];

const RatioList = (props: Props) => {
  const renderedRows = config.map((row) => {
    return (
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {row.label}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {row.subTitle && row.subTitle}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900">
            {row.render(data)}
          </div>
        </div>
      </li>
    );
  });
  return (
    <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
      <ul className="divide-y divided-gray-200">{renderedRows}</ul>
    </div>
  );
};

export default RatioList;
