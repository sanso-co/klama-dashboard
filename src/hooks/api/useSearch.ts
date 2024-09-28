import { Show } from "../../interfaces/show";
import useGet from "./useTMDBData";

//check
const useSearch = (searchTerm: string) =>
  useGet(
    "/search/tv",
    (data) => ({
      results: data.results as Show[],
    }),
    {
      params: {
        query: searchTerm,
      },
    },
    [searchTerm]
  );

export default useSearch;
