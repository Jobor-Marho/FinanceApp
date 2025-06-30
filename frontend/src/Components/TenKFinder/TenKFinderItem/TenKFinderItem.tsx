import type { CompanyTenK } from "../../../company.d";
import { Link } from "react-router-dom";

type Props = {
  tenK: CompanyTenK;
};

const TenKFinderItem = ({ tenK }: Props) => {
  const fillingDate = new Date(tenK.filingDate).getFullYear();

  return (
    <Link
      reloadDocument
      to={tenK.finalLink}
      type="button"
      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border  rounded-l-lg hover:bg-gray-100 bg-green-500 dark:border-gray-200 dark:text-white dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-red-500 dark:focus:text-white me-2"
    >
      {" "}
      10k - {tenK.symbol} - {fillingDate}
    </Link>
  );
};

export default TenKFinderItem;
