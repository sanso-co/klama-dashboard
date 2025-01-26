import moment from "moment";

interface FormattedDate {
    month: string;
    day: number;
    year: number;
}

export const formatDate = (dateString?: string): string => {
    const formattedDate: FormattedDate = {
        month: "",
        day: 0,
        year: 0,
    };

    const date = moment.utc(dateString);

    formattedDate.month = date.format("MMMM");
    formattedDate.day = parseInt(date.format("D"));
    formattedDate.year = parseInt(date.format("YYYY"));

    return `${formattedDate.month} ${formattedDate.day}, ${formattedDate.year}`;
};

export const formatYear = (dateString?: string): string => {
    const formattedDate: FormattedDate = {
        month: "",
        day: 0,
        year: 0,
    };

    const date = moment(dateString);

    formattedDate.year = parseInt(date.format("YYYY"));

    return `${formattedDate.year}`;
};

export const formatMonth = (dateString?: string): string => {
    if (!dateString) return "";

    const date = moment.utc(dateString);
    return date.format("MMMM");
};

export const releaseQuarter = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    let quarter = "";

    if (month >= 0 && month <= 2) {
        quarter = "Q1";
    } else if (month >= 3 && month <= 5) {
        quarter = "Q2";
    } else if (month >= 6 && month <= 8) {
        quarter = "Q3";
    } else if (month >= 9 && month <= 11) {
        quarter = "Q4";
    }

    return `${quarter} ${year}`;
};
