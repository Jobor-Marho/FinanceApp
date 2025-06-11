import axios from "axios";
import {
  type CompanyIncomeStatement,
  type CompanyKeyMetrics,
  type CompanyBalanceSheet,
  type CompanySearch,
  type CompanyCashFlow,
} from "./company.d";

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

// API to Generate image URL based on the company name
export const generateImageUrl = (companyName: string) => {
  const encodedName = encodeURIComponent(companyName.trim());
  return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&bold=true`;
};
