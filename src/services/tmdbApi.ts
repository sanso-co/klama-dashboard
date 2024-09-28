import axios, { AxiosInstance } from "axios";

class ApiService {
    private api: AxiosInstance;

    constructor() {
        const TMDB_URL = "https://api.themoviedb.org/3";

        this.api = axios.create({
            baseURL: TMDB_URL,
            params: {
                api_key: import.meta.env.VITE_TMDB_KEY,
            },
        });
    }

    searchShows = async (searchTerm: string) => {
        try {
            const response = await this.api.get("/search/tv", {
                params: {
                    query: searchTerm,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error searching shows", error);
        }
    };

    async getShowDetails(id: string) {
        try {
            const response = await this.api.get(`/tv/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching show details", error);
            throw error;
        }
    }

    async getProviders(id: number) {
        try {
            const response = await this.api.get(`/tv/${id}/watch/providers`);
            return response.data;
        } catch (error) {
            console.error("Error fetching providers", error);
            throw error;
        }
    }

    async getCast(id: number) {
        try {
            const response = await this.api.get(`/tv/${id}/aggregate_credits?language=en-US`);
            return response.data;
        } catch (error) {
            console.error("Error fetching keywords", error);
            throw error;
        }
    }
}

export const apiService = new ApiService();
