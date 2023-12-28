import { useState, useEffect } from "react";

const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, error };
};

export default useApi;
