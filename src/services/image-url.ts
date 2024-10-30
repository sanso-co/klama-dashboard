import noImage from "../assets/no-image-placeholder.webp";

const base = "https://image.tmdb.org/t/p/";
const krBase = "https://res.cloudinary.com/fw7128/image/upload/v1729270705/drama";

export const getCroppedImageUrl = (url: string) => {
    if (!url) return noImage;

    return base + "w300_and_h450_bestv2" + url;
};

export const getKrImageUrl = (url: string) => {
    if (!url) return noImage;

    return krBase + url;
};

const imageBase = "https://media.themoviedb.org/t/p/w276_and_h350_face/";

export const getProfileImage = (url?: string) => {
    if (!url) return "no-image";

    return imageBase + url;
};
