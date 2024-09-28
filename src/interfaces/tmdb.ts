export interface TMDBShowLean {
    id: number;
    name: string;
    original_name: string;
    poster_path: string;
    first_air_date: string;
    genre_ids?: [number];
}

export interface TMDBSearchResults {
    page: number;
    total_pages: number;
    total_results: number;
    results: TMDBShowLean[];
}

export interface TMDBShowDetails {
    id: number;
    name: string;
    original_name: string;
    poster_path: string;
    first_air_date: string;
    overview: string;
    number_of_episodes?: number;
    genres: [
        {
            id: number;
            name: string;
        }
    ];
    homepage: string;
    networks?: {
        id: number;
        name: string;
        logo_path: string;
        origin_country: string;
    }[];
    production_companies?: {
        id: number;
        name: string;
        logo_path: string;
        origin_country: string;
    }[];
    created_by?: {
        id: number;
        name: string;
        original_name: string;
    }[];
}

export interface ProviderInfo {
    provider_name: string;
    provider_id: number;
    logo_path: string;
    display_priority: number;
}

export interface ProviderType {
    [key: string]: {
        link: string;
        flatrate: ProviderInfo[];
    };
}

export interface ProviderResponse {
    id: number;
    results: ProviderType;
}

export interface CastType {
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    profile_path: string;
    roles: [
        {
            character: string;
        }
    ];
    order: number;
}
