import axios from "axios";
import {
  type CompanyIncomeStatement,
  type CompanyKeyMetrics,
  type CompanyBalanceSheet,
  type CompanySearch,
  type CompanyCashFlow,
  type CompanyTenK,
  type CompanyDCF,
} from "./company.d";

const today = new Date();
const from = new Date(today.getFullYear(), today.getMonth(), 1);
const fromDate = from.toISOString().split("T")[0];
const toDate = today.toISOString().split("T")[0];

export interface SearchResponse {
  data: CompanySearch[];
}

// API to Seacrh for a Company
export const searchCompanies = async (
  query: string
): Promise<CompanySearch[]> => {
  try {
    const response = await axios.get<CompanySearch[]>(
      `https://financialmodelingprep.com/stable/search-symbol?query=${query}&apikey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn("error message: ", error.message);
      return [];
    } else {
      console.warn("unexpected error: ", error);
      return [];
    }
  }
};

// Company Profile API
export const getCompanyProfile = async (query: string) => {
  try {
    const response = await axios.get<any>(
      `https://financialmodelingprep.com/stable/profile?symbol=${query}&apikey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    return response;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

// Company statement API
export const getCompanyMetrics = async (query: string) => {
  try {
    const res = await axios.get<CompanyKeyMetrics[]>(
      `https://financialmodelingprep.com/stable/ratios-ttm?symbol=${query}&apikey=${
        import.meta.env.VITE_API_KEY
      }`
    );

    return res;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

//Income Statement API
export const getIncomeStatement = async (query: string) => {
  try {
    const res = axios.get<CompanyIncomeStatement[]>(`
      https://financialmodelingprep.com/stable/income-statement?symbol=${query}&apikey=${
      import.meta.env.VITE_API_KEY
    }
      `);
    return res;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

//BalanceSheet API
export const getBalanceSheet = async (query: string) => {
  try {
    const res = axios.get<CompanyBalanceSheet[]>(
      `https://financialmodelingprep.com/stable/balance-sheet-statement?symbol=${query}&apikey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    return res;
  } catch (error: any) {
    console.log("Error Msg: ", error.message);
  }
};

//CashFlow Statement API
export const getCashflowStatement = async (query: string) => {
  try {
    const res = axios.get<CompanyCashFlow[]>(
      `https://financialmodelingprep.com/stable/cash-flow-statement?symbol=${query}&apikey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    return res;
  } catch (error: any) {
    console.log("Error Msg: ", error.message);
  }
};

//SEC filings 10-k API
export const getTenk = async (query: string) => {
  try {
    const res = axios.get<CompanyTenK[]>(
      `https://financialmodelingprep.com/stable/sec-filings-search/symbol?symbol=${query}&from=${fromDate}&to=${toDate}&page=0&limit=10&apikey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    return res;
  } catch (error: any) {
    console.log("Error Msg: ", error.message);
  }
};

// DCF API
export const getDCF = async (query: string) => {
  try {
    const res = axios.get<CompanyDCF[]>(
      `https://financialmodelingprep.com/stable/discounted-cash-flow?symbol=${query}&apikey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    return res;
  } catch (error: any) {
    console.log("Error Msg:", error.message);
  }
};
// API to Generate image URL based on the company name
export const generateImageUrl = async (companyName: string): Promise<string> => {
  const encodedName = encodeURIComponent(companyName.trim());
  console.log(
    `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&bold=true`
  );
  return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&bold=true`;
};
