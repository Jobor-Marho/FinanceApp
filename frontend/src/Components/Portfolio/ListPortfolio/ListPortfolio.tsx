import "./ListPortfolio.css";
import { v4 as uuid } from "uuid";
import type { CompanySearch } from "../../../company.d";
import CardPortfolio from "../CardPortfolio/CardPortfolio";

interface Props {
  porfolioList: CompanySearch[];
  portfolioDeleteHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ListPortfolio = ({ porfolioList, portfolioDeleteHandler }: Props) => {
    return (
      <>
        <h1 className="text-2xl font-bold text-center my-6">My Portfolio</h1>

        <div className="ListPortfolio mx-auto">
          {porfolioList.length > 0 ? (
            porfolioList.map((item) => (
              <CardPortfolio
                key={uuid()}
                name={item.name}
                portfolioValue={item.symbol}
                portfolioDeleteHandler={portfolioDeleteHandler}
              />
            ))
          ) : (
            <h1 className="noResults mx-auto italic">No portfolio found 🥹</h1>
          )}
        </div>
      </>
    );
  };

export default ListPortfolio;
