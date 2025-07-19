// src/utils/apiHelper.js
import { apiCall } from "../apiCall";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

export const useApiHelper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleApiCall = async (
    method,
    url,
    body,
    onSuccess,
    onFailure,
    componentAction,
    dealy
  ) => {
    await new Promise((resolve) => setTimeout(resolve, (dealy = 1000)));

    try {
      const data = await apiCall(method, url, body);
      if (data.status === "ok") {
        onSuccess(data);
      } else {
        if (
          data?.message === "Token is invalid" ||
          data?.status === "Token is invalid"
        ) {
          navigate("/auth/signin");
        }
        if (data?.status === "error" || data?.status === "fail") {
          onFailure(data);
        }
      }
    } catch (error) {
      console.error(error);
      if (onFailure) {
        onFailure(error);
      }
    } finally {
    }
  };

  return { handleApiCall };
};
