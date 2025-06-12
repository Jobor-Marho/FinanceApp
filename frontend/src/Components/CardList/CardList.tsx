import type { CompanySearch, Dummies } from "../../company.d";
import Card from "../Card/Card";
import Spinners from "../Spinners/Spinners";
import "./CardList.css";
import { v4 as uuid } from "uuid";

interface Props {
  searchResults: CompanySearch[];
  portfolioCreateHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CardList = ({ searchResults, portfolioCreateHandler }: Props) => {

  return (
    <>
        <h1 className="text-2xl font-bold text-center my-6">Search Results</h1>
        <div className="CardList ">
        {/* using map */}
        {searchResults.length > 0 ? (
            searchResults.map((result) => (
            <Card
                key={uuid()}
                companyName={result.name}
                price={result.currency}
                description={result.exchangeShortName}
                ticker={result.symbol}
                portfolioCreateHandler={portfolioCreateHandler}
            />
            ))

        ) : (
            <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
              No data found 🥹
            </p>
            
        )}

        </div>
    </>
  );
};

export default CardList;
