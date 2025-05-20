import { Link } from "react-router-dom";
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";

interface Props {
  portfolioValue: string;
  portfolioDeleteHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  name: string;
}

const CardPortfolio = ({
  portfolioDeleteHandler,
  portfolioValue,
  name,
}: Props) => {
  return (
    <>
      <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
        <Link to={`/company/${name}`} className="pt-6 text-xl font-bold">
          {name}
        </Link>
        <DeletePortfolio
          portfolioDeleteHandler={portfolioDeleteHandler}
          portfolioValue={portfolioValue}
        />
      </div>
    </>
  );
};

export default CardPortfolio;
