import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Props {}

const Sidebar = (props: Props) => {
  return (
    <nav className="block py-4 px-6 top-0 bottom-0 w-[200px] bg-white shadow-xl left-0 absolute flex-row flex-nowrap md:z-10 z-9999 transition-all duration-300 ease-in-out transform md:translate-x-0 -translate-x-full">
      <button className="md:hidden flex items-center justify-center cursor-pointer text-blueGray-700 w-6 h-10 border-l-0 border-r border-t border-b border-solid border-blueGray-100 text-xl leading-none bg-white rounded-r border border-solid border-transparent absolute top-1/2 -right-24-px focus:outline-none z-9998">
        <i className="fas fa-ellipsis-v"></i>
      </button>

      <div className="flex-col min-h-full px-0 flex flex-wrap items-center justify-between w-full mx-auto overflow-y-auto overflow-x-hidden">
        <div className="flex bg-white flex-col items-stretch opacity-100 relative mt-4 overflow-y-auto overflow-x-hidden h-auto z-40 items-center flex-1 rounded w-full">
          <div className="md:flex-col md:min-w-full flex flex-col list-none">
            <Link
              to={"company-profile"}
              className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline hover:text-blue-500 transition duration-300 hover:underline "
            >
              <div className="flex items-center">
                <FaHome />
                <h6 className="ml-3">Company Profile</h6>
              </div>
            </Link>

            <Link
              to={"income-statement"}
              className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline hover:text-blue-500 transition duration-300 hover:underline "
            >
              <div className="flex">
                <FaHome />
                <h6 className="ml-3">Income Statement</h6>
              </div>
            </Link>

            <Link
              to={"balance-sheet"}
              className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline hover:text-blue-500 transition duration-300 hover:underline "
            >
              <div className="flex">
                <FaHome />
                <h6 className="ml-3">Balance Statement</h6>
              </div>
            </Link>

            <Link
              to={"cashflow-statement"}
              className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline hover:text-blue-500 transition duration-300 hover:underline "
            >
              <div className="flex">
                <FaHome />
                <h6 className="ml-3">CashFlow Statement</h6>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
