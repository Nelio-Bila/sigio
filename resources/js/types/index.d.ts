import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    roles: string[];
}

export interface Province {
    id: string;
    name: string;
    created_at: string;
}

export interface District {
    id: string;
    name: string;
    province_id: string;
    created_at: string;
}

export interface Neighbourhood {
    id: string;
    name: string;
    district_id: string;
    created_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
