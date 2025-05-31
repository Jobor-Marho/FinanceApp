import Table from "../../Components/Table/Table";
import RatioList from "../../Components/RatioList/RatioList";
import { testIncomeStatementData } from "../../Components/Table/TestData";

type Props = {}

const config = [
  {
    label: "Market Cap",
    render: (company: any) => company.marketCapTTM,
    subTitle: "Total value of all a company's shares of stock",
  },
];

const DesignPage = (props: Props) => {
  return (
    <>
      <h1 className="mt-4 mb-4 text-center font-bold">
        Design guide - This is the design guide for FinShark. These are
        reuseable components of the app with brief instructions on how to use
        them.
      </h1>
      <hr className="my-4" />
      <h3 className="mt-4 mb-4 ms-10">
        Ratio List - Ratio List takes in a configuration object and company data
        as params. Use the config to style your list.
      </h3>
      <RatioList data={testIncomeStatementData} config={config} />
      <hr className="my-4" />
      <h3 className="mt-4 mb-4 ms-10">
        Table - Table takes in a configuration object and data as params. Use the
        config to style your table.
      </h3>
      <Table />
      <hr className="my-4" />
    </>
  );
};

export default DesignPage;
