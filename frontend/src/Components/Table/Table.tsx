import { testIncomeStatementData } from "./TestData";

const data = testIncomeStatementData;

interface Props {}

type Company = (typeof data)[0];

// This is a configuration object for the table headers
const configs = [
  {
    Label: "Year",
    render: (company: Company) => company.acceptedDate,
  },
  {
    Label: "Revenue",
    render: (company: Company) => company.revenue,
  },
];

const Table = (props: Props) => {
  // This component renders a table's rows based on the provided data and configuration.
  const renderedRows = data.map((company) => {
    return (
      <tr key={company.cik}>
        {configs.map((val: any) => {
          return (
            <td className="p-4 whitespace-nowrap text-sm text-gray-900 font-light">
              {val.render(company)}
            </td>
          );
        })}
      </tr>
    );
  });

  // This component renders the table headers based on the configuration object
  const renderHeaders = configs.map((config: any) => {
    return (
      <th
        className="p-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        key={config.Label}
      >
        {config.Label}
      </th>
    );
  });

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <table>
        <thead className="min-w-full divide-y divide-gray-200 m-5">
          {renderHeaders}
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
  