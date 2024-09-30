const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_APP_TMDB_API_KEY;

export async function fetchDataFromApi(url, params) {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    ...params,
  }).toString();

  try {
    const response = await fetch(`${BASE_URL}${url}?${queryParams}`);

    if (!response.ok) {
      throw new Error("HTTP error: status code:" + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
