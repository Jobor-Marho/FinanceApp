import axios from "axios";
import type { CompanySearch } from "./company.d";

export interface SearchResponse {
  data: CompanySearch[];
}

export const searchCompanies = async (query: string): Promise<CompanySearch[]> => {
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

//Generate image URL based on the company name
export const generateImageUrl = (companyName: string) => {
  const encodedName = encodeURIComponent(companyName.trim());
  return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&bold=true`;
};
