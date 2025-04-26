import axios from "axios";

export interface SearchParams {
  query: string;
  category?: string;
  author?: string;
  publishedOnly?: boolean;
  page?: number;
  pageSize?: number;
}

export interface SearchResult {
  id: string;
  category: string;
  title: string;
  publisher: boolean;
  author: string;
}

export interface SearchResponse {
  results: SearchResult[];
  totalResults: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// This would be configured properly in a real environment
const SOLR_API_URL = (q: URLSearchParams) =>
  `/solr/lab10/select?indent=true&q.op=OR&${q}&useParams=`;

export const searchService = {
  search: async (params: SearchParams): Promise<SearchResponse> => {
    // In a real app, this would call the actual Solr API
    try {
      const response = await axios.get(SOLR_API_URL(new URLSearchParams({q: params.query})));
      
      return {
        results: response.data.response.docs.map((doc: any) => ({
          id: doc.id,
          category: doc.category?.[0],
          title: doc.title?.[0],
          publisher: doc.publisher?.[0], 
          author: doc.author?.[0],
        })),
        totalResults: response.data.response.numFound,
        page: params.page || 1,
        pageSize: params.pageSize || 10,
        totalPages: Math.ceil(response.data.response.numFound / (params.pageSize || 10)),
      };
    } catch (error) {
      console.error("Error searching Solr:", error);
      throw error;
    }
  },

  getCategories: async (): Promise<string[]> => {
    // In a real app, this would get unique categories from Solr
    // For now, extract unique categories from mock data
    const categories = [...new Set(mockData.map((item) => item.category))];
    return categories;
  },

  getAuthors: async (): Promise<string[]> => {
    // In a real app, this would get unique authors from Solr
    // For now, extract unique authors from mock data
    const authors = [...new Set(mockData.map((item) => item.author))];
    return authors;
  },
};
