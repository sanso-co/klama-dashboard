import { CustomShow } from "../../../interfaces/show";
import usePostData from "../usePostData";

export const usePostShow = () => {
  const { postData, error, status } = usePostData("/shows");

  const postShow = (data: CustomShow) => {
    postData(data);
  };

  return { postShow, error, status };
};
