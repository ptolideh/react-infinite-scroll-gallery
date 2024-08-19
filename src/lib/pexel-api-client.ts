export interface Src {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface PexelResponse {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: Src;
  liked: boolean;
  alt: string;
}

export const pexelClient = (
  pageNum: number
): Promise<PexelResponse | undefined> => {
  return fetch(
    `${import.meta.env.VITE_API_URL}?page=${pageNum}&per_page=5`
  ).then(async (res) => {
    try {
      const data: PexelResponse = await res.json();
      if (!res.body) {
        throw data;
      }
      return data;
    } catch (err) {
      console.error("Error | pexelClient\n", err);
      throw err;
    }
  });
};
