import { useCallback, useState } from "react";
import { postApi, putApi } from "../api/api";

export const usePutSubmit = <T>(submitBaseUrl: string, uri: string, state: T) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isError, setIsError] = useState(false);

  const submit = useCallback(async () => {
    const result = await putApi(
      uri,
      state,
      submitBaseUrl === process.env.API_URL
    );
    setIsComplete(result.isSuccess);
    setIsError(!result.isSuccess);
  }, [state]);

  return { submit, isComplete, isError };
};

export const usePostSubmit = <T>(submitBaseUrl: string, uri: string, state: T) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  const submit = useCallback(async () => {
    const result = await postApi(
      uri,
      state,
      submitBaseUrl === process.env.API_URL
    );

    if (!result.isSuccess) {
      setErrorMessages(result.state.errors)
    }
    setIsComplete(result.isSuccess);
    setIsError(!result.isSuccess);
  }, [state]);

  return { submit, isComplete, isError, errorMessages };
};
