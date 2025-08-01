import { v4 as uuid } from "uuid";

interface Props {
  data?: any;
  config?: any;
}

const Table = ({ data, config }: Props) => {
  // This component renders a table's rows based on the provided data and configuration.
  const renderedRows = data.map((company: any) => {
    return (
      <tr key={company.cik}>
        {config.map((val: any) => {
          return <td className="p-3">{val.render(company)}</td>;
        })}
      </tr>
    );
  });

  // This component renders the table headers based on the configuration object
  const renderHeaders = config.map((config: any) => {
    return (
      <th
        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        key={uuid()}
      >
        {config.label}
      </th>
    );
  });

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
      <table className="min-w-max table-auto text-sm">
        <thead className="min-w-full divide-y divide-gray-200 m-5">
          {renderHeaders}
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
