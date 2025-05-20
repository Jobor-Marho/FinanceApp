import { searchCompanies, type SearchResponse } from "./api";
import type { CompanySearch, Dummies } from "./company.d";
import CardList from "./Components/CardList/CardList";
import Hero from "./Components/Hero/Hero";
import Navbar from "./Components/Navbar/Navbar";
import ListPortfolio from "./Components/Portfolio/ListPortfolio/ListPortfolio";
import Search from "./Components/Search/Search";
import { useState } from "react";

function App() {
  //practicing initializing a variable with an empty array of type Dummies
  const companyData: Dummies[] = [
    {
      companyName: "Apple",
      price: 150,
      description:
        "Apple Inc. is an American multinational technology company that specializes in consumer electronics, computer software, and online services.",
    },
    {
      companyName: "Microsoft",
      price: 250,
      description:
        "Microsoft Corporation is an American multinational technology company with headquarters in Redmond, Washington.",
    },
    {
      companyName: "Google",
      price: 2800,
      description:
        "Google LLC is an American multinational conglomerate specializing in various technology-related services and products.",
    },
    {
      companyName: "Amazon",
      price: 3400,
      description:
        "Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    },
    {
      companyName: "Tesla",
      price: 700,
      description:
        "Tesla, Inc. is an American electric vehicle and clean energy company based in Palo Alto, California.",
    },
    {
      companyName: "Facebook",
      price: 350,
      description:
        "Meta Platforms, Inc. is an American multinational technology conglomerate based in Menlo Park, California.",
    },
  ];
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CompanySearch[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [porfolioList, setPortfolioList] = useState<CompanySearch[]>([]);

  const handleSeachValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //Get Comapnies based on provided search query
      const results = await searchCompanies(searchValue);

      // Type checking to see if there is an error
      if (results.length < 1) {
        setError("Network Failed");
        return;
      }
      //set search result if the type is a valid response
      setError(null);
      setSearchResults(results);
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]); // optional fallback
    }
  };

  // For Portfolio Component
  const portfolioCreateHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const symbol = formData.get("symbol") as string;
    const company = searchResults.find((result) => result.symbol === symbol);
    if (company) {
      setPortfolioList((prev) => [...prev, company]);
      setSearchResults((prev) =>
        prev.filter((result) => result.symbol !== symbol)
      );
    }
  };


  // For Portfolio Component
  const portfolioDeleteHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const symbol = formData.get("symbol") as string;
    const company = porfolioList.find((result) => result.symbol === symbol);
    if (company) {
      setPortfolioList((prev) => prev.filter((result) => result.symbol !== symbol));
      setSearchResults((prev) => [...prev, company]);
    }
  };
  return (
    <>
    <Navbar/>
    {/* <Hero /> */}

      <Search
        search={searchValue}
        onChange={handleSeachValue}
        onSearch={handleSearchSubmit}
        error={error}
      />
      <ListPortfolio porfolioList={porfolioList} portfolioDeleteHandler={portfolioDeleteHandler}/>
      <CardList
        searchResults={searchResults}
        portfolioCreateHandler={portfolioCreateHandler}
      />
    </>
  );
}

export default App;
