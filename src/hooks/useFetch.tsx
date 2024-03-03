import { api } from "@/http/axios";

const useFetch = <TBody, TData>() => {
  // TData extends unknown
  const getData = async (url: string): Promise<TData> => {
    const response = await api.get(url);

    return response.data;
  };

  const putData = async (url: string, body: TBody): Promise<TData> => {
    const response = await api.put(url, {
      ...body,
    });

    return response.data;
  };

  const postData = async (url: string, body: TBody): Promise<TData> => {
    const response = await api.post(url, {
      ...body,
    });

    return response.data;
  };

  const deleteData = async (url: string): Promise<TData> => {
    const response = await api.delete(url);
    return response.data;
  };

  return { getData, putData, postData, deleteData };
};

export default useFetch;
