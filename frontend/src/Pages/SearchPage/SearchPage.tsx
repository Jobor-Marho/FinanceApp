import React, { useState } from "react";
import type { CompanySearch } from "../../company.d";
import { searchCompanies } from "../../api";
import Navbar from "../../Components/Navbar/Navbar";
import Search from "../../Components/Search/Search";
import CardList from "../../Components/CardList/CardList";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";

interface Props {}

const SearchPage = (props: Props) => {
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
      setPortfolioList((prev) =>
        prev.filter((result) => result.symbol !== symbol)
      );
      setSearchResults((prev) => [...prev, company]);
    }
  };
  return (
    <>
      {/* <Hero /> */}

      <Search
        search={searchValue}
        onChange={handleSeachValue}
        onSearch={handleSearchSubmit}
        error={error}
      />
      <ListPortfolio
        porfolioList={porfolioList}
        portfolioDeleteHandler={portfolioDeleteHandler}
      />
      <CardList
        searchResults={searchResults}
        portfolioCreateHandler={portfolioCreateHandler}
      />
    </>
  );
};

export default SearchPage;
