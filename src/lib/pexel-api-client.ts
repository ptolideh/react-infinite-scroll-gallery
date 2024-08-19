interface Src {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

interface Photo {
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

export interface PexelResponse {
  page: number;
  per_page: number;
  photos: Photo[];
  total_results: number;
  next_page: string;
}

export const pexelClient = (pageNum: number): Promise<PexelResponse> => {
  return fetch(
    `${import.meta.env.VITE_API_URL}?page=${pageNum}&per_page=5`
  ).then(async (res) => {
    try {
      const resText = await res.text();
      if (!res.ok) {
        throw new Error(`HTTP Error! message: ${resText}`);
      }
      const data: PexelResponse = JSON.parse(resText);
      return data;
    } catch (err) {
      let errMessage = "Unknown API Client Error! message: ";
      errMessage += err instanceof Error ? err.message : JSON.stringify(err);
      throw new Error(errMessage);
    }
  });
};
