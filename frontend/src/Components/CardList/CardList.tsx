import type { CompanySearch, Dummies } from "../../company.d";
import Card from "../Card/Card";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";
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
        <div className="CardList">
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
            <h1 className="noResults mx-auto italic">No data found 🥹</h1>
        )}

        </div>
    </>
  );
};

export default CardList;
