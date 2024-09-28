import { Cast } from "@/interfaces/cast";
import { Credit } from "@/interfaces/credit";
import { Keyword } from "@/interfaces/keyword";
import { List, Periodic } from "@/interfaces/periodic";
import { Permanent } from "@/interfaces/permanent";
import { Provider } from "@/interfaces/provider";
import { Show } from "@/interfaces/show";
import axios, { AxiosInstance } from "axios";

class ApiService {
    private api: AxiosInstance;

    constructor() {
        const LOCALURL = import.meta.env.VITE_API_URL;

        this.api = axios.create({
            baseURL: LOCALURL,
        });
    }

    // PERIODIC COLLECITON
    async getAllPeriodicCollections() {
        try {
            const response = await this.api.get("periodic-collection");
            return response.data;
        } catch (error) {
            console.error("Error fetching periodic collections", error);
        }
    }

    async createPeriodicCollection(data: Periodic) {
        try {
            const response = await this.api.post("periodic-collection", data);
            return response.data;
        } catch (error) {
            console.error("Error creating periodic collection", error);
        }
    }

    async getPeriodicCollectionDetails(id: string) {
        try {
            const response = await this.api.get(`periodic-collection/${id}/all`);
            return response.data;
        } catch (error) {
            console.error("Error fetching periodic collection details", error);
        }
    }

    async addListToPeriodicCollection({ id, data }: { id: string; data: List }) {
        try {
            const response = await this.api.patch(`periodic-collection/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error fetching periodic collection details", error);
        }
    }

    // PERMANENT COLLECTION

    async createPermanentCollection(data: Permanent) {
        try {
            const response = await this.api.post("permanent-collection", data);
            return response.data;
        } catch (error) {
            console.error("Error creating permanent collection", error);
        }
    }

    async getAllPermanentCollections() {
        try {
            const response = await this.api.get("permanent-collection");
            return response.data;
        } catch (error) {
            console.error("Error fetching permanent collections", error);
        }
    }

    async getPermanentCollectionDetails(payload: { id: string; page: number; limit: number }) {
        try {
            const response = await this.api.get(
                `permanent-collection/${payload.id}?page=${payload.page}&limit=${payload.limit}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching permanent collection details", error);
        }
    }

    async addShowToPermanentCollection({ id, showObjId }: { id: string; showObjId: string }) {
        try {
            const response = await this.api.patch(`permanent-collection/add/${id}`, { showObjId });
            return response.data;
        } catch (error) {
            console.error("Error adding a show to permanent collection", error);
            throw error;
        }
    }

    async removeShowFromPermanentCollection({ id, showId }: { id: number; showId: number }) {
        try {
            const response = await this.api.patch(`permanent-collection/remove/${id}`, { showId });
            return response.data;
        } catch (error) {
            console.error("Error adding a show to permanent collection", error);
        }
    }

    // PROVIDER COLLECTION

    async createProviderCollection(data: Provider) {
        try {
            const response = await this.api.post("provider-collection", data);
            return response.data;
        } catch (error) {
            console.error("Error creating provider collection", error);
        }
    }

    async getAllProviderCollections() {
        try {
            const response = await this.api.get("provider-collection");
            return response.data;
        } catch (error) {
            console.error("Error fetching provider collections", error);
        }
    }

    async getProviderCollectionDetails(payload: { id: string; page: number; limit: number }) {
        try {
            const response = await this.api.get(
                `provider-collection/${payload.id}?page=${payload.page}&limit=${payload.limit}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching provider collection details", error);
        }
    }

    async addShowToProviderCollection({
        providerId,
        providerName,
        showId,
    }: {
        providerId: number;
        providerName: string;
        showId: number;
    }) {
        try {
            const response = await this.api.patch(`provider-collection/add/${providerId}`, {
                providerName,
                showId,
            });
            return response.data;
        } catch (error) {
            console.error("Error adding a show to provider collection", error);
            throw error;
        }
    }

    async removeShowFromProviderCollection({ id, showId }: { id: string; showId: string }) {
        try {
            const response = await this.api.patch(`provider-collection/remove/${id}`, { showId });
            return response.data;
        } catch (error) {
            console.error("Error adding a show to provider collection", error);
        }
    }

    // KEYWORDS

    async createKeyword(data: Keyword) {
        try {
            const response = await this.api.post(`keyword`, data);
            return response.data;
        } catch (error) {
            console.error("Error creating keyword", error);
        }
    }

    async getAllKeywords() {
        try {
            const response = await this.api.get("keyword");
            return response.data;
        } catch (error) {
            console.error("Error fetching keywords", error);
        }
    }

    async updateKeyword(data: Keyword) {
        try {
            const response = await this.api.patch(`keyword/modify/${data.id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating keyword", error);
        }
    }

    async addShowToKeyword({ id, showId }: { id: string; showId: number }) {
        try {
            const response = await this.api.patch(`keyword/add/${id}`, { showId });
            return response.data;
        } catch (error) {
            console.error("Error adding a show to keyword", error);
            throw error;
        }
    }

    async getKeywordsForShow(showId: number) {
        try {
            const response = await this.api.get(`keyword/show/${showId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching keywords", error);
        }
    }

    // CAST

    async getCastForShow(showId: number) {
        try {
            const response = await this.api.get(`cast/${showId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching casts", error);
        }
    }

    async addCastForShow({ showId, mainCast }: { showId: number; mainCast: Cast[] }) {
        try {
            const response = await this.api.patch(`cast/add/${showId}`, {
                mainCast,
            });
            return response.data;
        } catch (error) {
            console.error("Error adding a show to provider collection", error);
            throw error;
        }
    }

    async updateAdditionalCasts({
        showId,
        additionalCasts,
    }: {
        showId: number;
        additionalCasts: Cast[];
    }) {
        try {
            const response = await this.api.patch(`cast/update/${showId}`, {
                additionalCasts,
            });
            return response.data;
        } catch (error) {
            console.error("Error adding a show to provider collection", error);
            throw error;
        }
    }

    // credit
    async createCredit(data: Credit) {
        try {
            const response = await this.api.post(`credit`, data);
            return response.data;
        } catch (error) {
            console.error("Error creating keyword", error);
        }
    }

    async getAllCredits() {
        try {
            const response = await this.api.get("credit");
            return response.data;
        } catch (error) {
            console.error("Error fetching keywords", error);
        }
    }

    async getCreditForShow(showId: number) {
        try {
            const response = await this.api.get(`credit/show/${showId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching keywords", error);
        }
    }

    async addShowToCredit({ id, showId }: { id: string; showId: number }) {
        try {
            const response = await this.api.patch(`credit/add/${id}`, { showId });
            return response.data;
        } catch (error) {
            console.error("Error adding a show to keyword", error);
            throw error;
        }
    }

    async updateCredit(data: Credit) {
        try {
            const response = await this.api.patch(`credit/modify/${data.id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating credit", error);
        }
    }

    // recommendations

    async addShowToRecommendation({ showId, recoShowId }: { showId: number; recoShowId: number }) {
        try {
            const response = await this.api.patch(`recommendations/add/${showId}`, {
                recoShowId,
            });
            return response.data;
        } catch (error) {
            console.error("Error adding a show to recommendations", error);
            throw error;
        }
    }

    async getRecommendationDetails(showId: number) {
        try {
            const response = await this.api.get(`recommendations/details/${showId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching permanent collection details", error);
        }
    }

    async getAllShowsForRecommendations() {
        try {
            const response = await this.api.get("recommendations");
            return response.data;
        } catch (error) {
            console.error("Error fetching shows for recommendations", error);
        }
    }

    async getAiRecommendations(userPrompt: string) {
        try {
            const response = await this.api.post("airecommendations", { userPrompt });
            return response.data;
        } catch (error) {
            console.error("Error fetching shows for ai recommendations", error);
        }
    }

    async getShow(page: number) {
        try {
            const response = await this.api.get(`show?page=${page}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching shows", error);
        }
    }

    async getShowDetails(id: number) {
        try {
            const response = await this.api.get(`show/details/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching drama details", error);
        }
    }

    async addShow({ show }: { show: Show }) {
        try {
            const response = await this.api.post("show", { show });
            return response.data;
        } catch (error) {
            console.error("Error adding a show", error);
            throw error;
        }
    }

    async updateShow(id: number, data: Partial<Show>) {
        try {
            const response = await this.api.patch(`show/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating show", error);
        }
    }
}

export const apiService = new ApiService();
