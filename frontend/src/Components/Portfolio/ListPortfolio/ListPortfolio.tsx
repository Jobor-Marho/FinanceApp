
import { v4 as uuid } from "uuid";
import type { CompanySearch } from "../../../company.d";
import CardPortfolio from "../CardPortfolio/CardPortfolio";
import "./ListPortfolio.css"
import Spinners from "../../Spinners/Spinners";

interface Props {
  porfolioList: CompanySearch[];
  portfolioDeleteHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ListPortfolio = ({ porfolioList, portfolioDeleteHandler }: Props) => {
    return (

      <section id="portfolio">
        <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
          My Portfolio
        </h2>

        <div className="ListPortfolio">
          <>
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
            <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl mx-auto">
              No portfolio found 🥹
            </p>

         )}
          </>
        </div>
      </section>

    );
  };

export default ListPortfolio;
