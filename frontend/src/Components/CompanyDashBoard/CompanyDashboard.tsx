import { Outlet } from "react-router-dom";
import React from "react";

interface Props {
  children: React.ReactNode;
  ticker: string;
}

const CompanyDashboard = ({ children, ticker }: Props) => {
  const childrenArray = React.Children.toArray(children);

  // Example: first 3 items in flex, rest below
  const flexChildren = childrenArray.slice(0, 4);
  const restChildren = childrenArray.slice(4);

  return (
    <div className="relative md:ml-[200px] bg-blueGray-100 w-full">
      <div className="relative pt-5 pb-32 bg-lightBlue-500">
        <div className="px-4 md:px-6 mx-auto">

          <div>
            <div className="flex flex-wrap ">{flexChildren}</div>
            <div className="mt-6 space-y-4 ">{restChildren}</div>
            <div className="flex flex-wrap">
              <Outlet context={ticker} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
