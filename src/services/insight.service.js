import axiosInstance from "../axios/axiosInstance";

export const getInsights = async () => {
  try {
    const { data } = await axiosInstance.get(`/insights`);
    return data.insights;
  } catch (error) {
    console.log(error.response?.data.message || error.message);
  }
};
