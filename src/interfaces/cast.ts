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

export interface Cast {
    id: number;
    name: string;
    original_name: string;
    profile_path: string;
    known_for_department: string;
    role: string;
    original_role: string;
    order: number;
}
