import { Site } from "./site.entity";

export interface SiteRepository {
    save(site: Site): Promise<Site>;
    findAll(): Promise<Site[]>;
    findById(id: string): Promise<Site | null>;
    delete(id: string): Promise<void>;
}

// Token de inyección
export const SITE_REPOSITORY = 'SITE_REPOSITORY';