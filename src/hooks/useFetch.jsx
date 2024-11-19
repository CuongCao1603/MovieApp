import { useEffect, useState } from "react";

const DEFAULT_HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
};

const useFetch = ({ url = "", method = "GET", headers = {} }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_HOST}${url}`, {
          method,
          headers: {
            ...DEFAULT_HEADERS,
            ...headers,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setData(data);
        } else {
          console.error("Failed to fetch movies");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, method, JSON.stringify(headers)]);

  return { isLoading, data };
};

export default useFetch;
