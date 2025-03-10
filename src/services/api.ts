import axios, { AxiosInstance } from "axios";

import { useAuthStore } from "@/store/authStore";

import { CastType } from "@/types/cast";
import { CreditType } from "@/types/credit";
import { KeywordType } from "@/types/keyword";
import { ToneType } from "@/types/tone";
import { HeroType } from "@/types/marketing";
import { CollectionListType, PeriodicType } from "@/types/periodic";
import { PermanentType } from "@/types/permanent";
import { ProviderType } from "@/types/provider";
import { ShowType } from "@/types/show";
import { LoginType } from "@/types/auth";
import { GenreType } from "@/types/genre";
import { OriginalWorkType } from "@/types/originalWork";

class ApiService {
    private api: AxiosInstance;

    constructor() {
        const LOCALURL = import.meta.env.VITE_API_URL;

        this.api = axios.create({
            baseURL: LOCALURL,
        });

        // Refresh token interceptor
        this.api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // Add checks to prevent infinite loops
                if (
                    error.response?.status === 401 &&
                    !originalRequest._retry &&
                    originalRequest.url !== "auth/refresh" // Prevent refresh attempts on the refresh endpoint
                ) {
                    originalRequest._retry = true;

                    try {
                        const refreshToken = useAuthStore.getState().refreshToken;

                        // Check if we have a refresh token before attempting refresh
                        if (!refreshToken) {
                            useAuthStore.getState().logout();
                            window.location.href = "/login";
                            return Promise.reject(error);
                        }

                        const response = await axios.post(`${LOCALURL}/auth/refresh`, {
                            refreshToken,
                        });
                        const { accessToken, refreshToken: newRefreshToken } = response.data;

                        useAuthStore.getState().setTokens(accessToken, newRefreshToken);
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                        return this.api(originalRequest);
                    } catch (refreshError) {
                        useAuthStore.getState().logout();
                        window.location.href = "/login";
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        // Attach token interceptor
        this.api.interceptors.request.use(
            (config) => {
                // Don't attach token for refresh requests
                if (config.url === "auth/refresh") {
                    return config;
                }

                const accessToken = useAuthStore.getState().accessToken;
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
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

    async createPeriodicCollection(data: Partial<PeriodicType>) {
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

    async addListToPeriodicCollection({ id, data }: { id: string; data: CollectionListType }) {
        try {
            const response = await this.api.patch(`periodic-collection/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error fetching periodic collection details", error);
        }
    }

    async getPeriodicSubDetails({
        collectionId,
        listId,
    }: {
        collectionId: string;
        listId: string;
    }) {
        try {
            const response = await this.api.get(
                `periodic-collection/${collectionId}/sub/${listId}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching periodic collection details", error);
        }
    }

    async addShowToPeriodicList({
        collectionId,
        listId,
        showId,
    }: {
        collectionId: string;
        listId: string;
        showId: string;
    }) {
        try {
            const response = await this.api.patch(
                `periodic-collection/${collectionId}/add/${listId}`,
                { showId }
            );
            return response.data;
        } catch (error) {
            console.error("Error adding a show to periodic collection", error);
            throw error;
        }
    }

    async removeShowFromPeriodicList({
        collectionId,
        listId,
        showId,
    }: {
        collectionId: string;
        listId: string;
        showId: string;
    }) {
        try {
            const response = await this.api.patch(
                `periodic-collection/${collectionId}/remove/${listId}`,
                { showId }
            );
            return response.data;
        } catch (error) {
            console.error("Error removing a show to periodic collection", error);
            throw error;
        }
    }

    // PERMANENT COLLECTION
    async createPermanentCollection(data: Partial<PermanentType>) {
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

    async getPermanentCollectionDetails(payload: {
        collectionId: string;
        page: number;
        limit: number;
        sort: string;
    }) {
        try {
            const response = await this.api.get(
                `permanent-collection/${payload.collectionId}?page=${payload.page}&limit=${payload.limit}&sort=${payload.sort}`
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

    // PROVIDERS
    async addProvider(data: Partial<ProviderType>) {
        try {
            const response = await this.api.post(`provider`, data);
            return response.data;
        } catch (error) {
            console.error("Error creating provider", error);
        }
    }

    async getAllProviders() {
        try {
            const response = await this.api.get(`provider`);
            return response.data;
        } catch (error) {
            console.error("Error creating provider", error);
        }
    }

    async getProvidersForShow(showId: number) {
        try {
            const response = await this.api.get(`provider/show/${showId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching providers", error);
        }
    }

    async addShowToProvider({ id, showId }: { id: number; showId: number }) {
        try {
            const response = await this.api.patch(`provider/add/${id}`, {
                showId,
            });
            return response.data;
        } catch (error) {
            console.error("Error adding a show to provider", error);
            throw error;
        }
    }

    async updateProvider(data: ProviderType) {
        try {
            const response = await this.api.patch(`provider/modify/${data.id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating keyword", error);
        }
    }

    // GENRE
    async createGenre(data: Partial<GenreType>) {
        try {
            const response = await this.api.post(`genre`, data);
            return response.data;
        } catch (error) {
            console.error("Error creating genre", error);
        }
    }

    async getAllGenre() {
        try {
            const response = await this.api.get("genre");
            return response.data;
        } catch (error) {
            console.error("Error fetching genre", error);
        }
    }

    async updateGenre(data: GenreType) {
        try {
            const response = await this.api.patch(`genre/modify/${data.id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating genre", error);
        }
    }

    // KEYWORDS
    async createKeyword(data: Partial<KeywordType>) {
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

    async updateKeyword(data: KeywordType) {
        try {
            const response = await this.api.patch(`keyword/modify/${data.id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating keyword", error);
        }
    }

    // TONE
    async createTone(data: Partial<ToneType>) {
        try {
            const response = await this.api.post(`tone`, data);
            return response.data;
        } catch (error) {
            console.error("Error creating tone", error);
        }
    }

    async getAllTone() {
        try {
            const response = await this.api.get("tone");
            return response.data;
        } catch (error) {
            console.error("Error fetching tone", error);
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

    async addCastForShow({ showId, mainCast }: { showId: number; mainCast: CastType[] }) {
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
        additionalCasts: CastType[];
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
    async createCredit(data: Partial<CreditType>) {
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
            const response = await this.api.patch(`credit/add/${id}`, {
                showId,
            });
            return response.data;
        } catch (error) {
            console.error("Error adding a show to keyword", error);
            throw error;
        }
    }

    async updateCredit(data: CreditType) {
        try {
            const response = await this.api.patch(`credit/modify/${data.id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating credit", error);
        }
    }

    // recommendations
    async getRecommendationDetails(showId: number) {
        try {
            const response = await this.api.get(`recommendations/details/${showId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching permanent collection details", error);
        }
    }

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

    async updateRecommendations({ showId, shows }: { showId: number; shows: string[] }) {
        try {
            const response = await this.api.patch(`recommendations/reorder/${showId}`, {
                shows,
            });
            return response.data;
        } catch (error) {
            console.error("Error adding a show to recommendations", error);
            throw error;
        }
    }

    async getSimilarRecommendations(showId: number) {
        try {
            const response = await this.api.get(`recommendations/similar/${showId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching similar recommendations details", error);
        }
    }

    async getAiRecommendations(userPrompt: string) {
        try {
            const response = await this.api.post("airecommendations", {
                userPrompt,
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching shows for ai recommendations", error);
        }
    }

    async getShow(page: number, sort: string) {
        try {
            const response = await this.api.get(`show?page=${page}&sort=${sort}`);
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

    async addShow({ show }: { show: Partial<ShowType> }) {
        try {
            const response = await this.api.post("show", { show });
            return response.data;
        } catch (error) {
            console.error("Error adding a show", error);
            throw error;
        }
    }

    async addNewShow({ show }: { show: ShowType }) {
        try {
            const response = await this.api.post("show/new", { show });
            return response.data;
        } catch (error) {
            console.error("Error adding a show", error);
            throw error;
        }
    }

    async updateShow(id: number, data: Partial<ShowType>) {
        try {
            const response = await this.api.patch(`show/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating show", error);
        }
    }

    // hero
    async createHero(data: HeroType) {
        try {
            const response = await this.api.post(`hero`, data);
            return response.data;
        } catch (error) {
            console.error("Error creating hero", error);
        }
    }

    async removeHero(id: string) {
        try {
            const response = await this.api.delete(`hero/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error creating hero", error);
        }
    }

    async updateHero(id: string, data: HeroType) {
        try {
            const response = await this.api.patch(`hero/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error creating hero", error);
        }
    }

    async getAllHeroes() {
        try {
            const response = await this.api.get("hero");
            return response.data;
        } catch (error) {
            console.error("Error fetching heroes", error);
        }
    }

    // ADMIN
    async login({ username, password }: LoginType) {
        try {
            const response = await this.api.post("auth/login", { username, password });
            const { accessToken, refreshToken, ...userData } = response.data;
            useAuthStore.getState().setTokens(accessToken, refreshToken);
            useAuthStore.getState().setUser(userData);
            return response.data;
        } catch (error) {
            console.error("Error loggin in", error);
            throw error;
        }
    }

    async validateToken() {
        try {
            const response = await this.api.get("auth/validate");
            return response.data;
        } catch (error) {
            console.error("Error fetching heroes", error);
        }
    }

    // PROFILE
    async getProfile() {
        try {
            const response = await this.api.get("profile");
            return response.data;
        } catch (error) {
            console.error("Error fetching profile", error);
        }
    }

    async updateProfile(about: string) {
        try {
            const response = await this.api.patch("profile", { about });
            return response.data;
        } catch (error) {
            console.error("Error updateing profile", error);
        }
    }

    // ORIGINAL WORK
    async getOriginalWorkForShow(showId: number) {
        try {
            const response = await this.api.get(`original/show/${showId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching original work", error);
        }
    }

    async createOriginalWork(data: OriginalWorkType) {
        try {
            const response = await this.api.post(`original`, data);
            return response.data;
        } catch (error) {
            console.error("Error creating original work", error);
        }
    }

    async addShowToOriginalWork(id: string, showId: number) {
        try {
            const response = await this.api.patch(`original/add/${id}`, {
                showId,
            });
            return response.data;
        } catch (error) {
            console.error("Error adding a show to original work", error);
            throw error;
        }
    }
}

export const apiService = new ApiService();
