export interface HeroType {
    _id?: string;
    order: number;
    title: string;
    tagline?: string;
    tag?: {
        label: string;
        color: string;
    };
    url: string;
    img: string | null;
}
