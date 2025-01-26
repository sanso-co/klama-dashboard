export const formatShowId = (showId: number): number => {
    const showIdStr = showId.toString();
    return showIdStr.startsWith("99") ? parseInt(showIdStr.slice(3)) : showId;
};
