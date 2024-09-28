import usePostData from "./api/usePostData";

export const useAddKeyword = () => {
  const { postData, error, status } = usePostData("/keywords");

  const postKeyword = (data: any) => {
    postData(data);
  };

  return { postKeyword, error, status };
};
