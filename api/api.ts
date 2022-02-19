import axios, { AxiosInstance, AxiosResponse } from "axios";

const BASE_SERVER_URL = process.env.API_URL;
const BASE_FRONT_URL = process.env.NEXT_PUBLIC_API_URL;

export const getApi = async (
  uri: string,
  isServerMode: boolean
): Promise<{ state: AxiosResponse; isSuccess: boolean }> => {
  const executedApi = await createAxios(isServerMode).get(uri);

  return getResult(executedApi);
};

export const putApi = async <T>(
  uri: string,
  params: T,
  isServerMode: boolean
): Promise<{ state: AxiosResponse; isSuccess: boolean }> => {
  const executedApi = await createAxios(isServerMode)
    .put(uri, params)
    .then((res) => res)
    .catch((e) => e.response);

  return getResult(executedApi);
};

export const postApi = async <T>(
  uri: string,
  params: T,
  isServerMode: boolean
): Promise<{ state: any; isSuccess: boolean }> => {
  const executedApi = await createAxios(isServerMode)
    .post(uri, params)
    .then((res) => res)
    .catch((e) => e.response);

  return getResult(executedApi);
};

function createAxios(isServerMode: boolean): AxiosInstance {
  return axios.create({
    baseURL: isServerMode ? BASE_SERVER_URL : BASE_FRONT_URL,
  });
}

function getResult(axios: AxiosResponse): {
  state: any;
  isSuccess: boolean;
} {
  const state = axios.data;
  const isSuccess = axios.data.result;

  return { state, isSuccess };
}
