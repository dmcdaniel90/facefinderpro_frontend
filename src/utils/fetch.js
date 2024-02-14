import axios from "axios";

export const fetchData = async (url, config) => {
  const res = await axios.get(url, config);
  return res.data;
};
