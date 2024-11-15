export interface HeroType {
    _id?: string;
    order: number;
    title: string;
    tag?: {
        label: string;
        color: string;
    };
    url: string;
    img: string | null;
}
