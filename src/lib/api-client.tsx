export const client = (objectId: number): Promise<Response> => {
  return fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
  ).then(async (res) => {
    try {
      const data = await res.json();
      if (!res.ok) throw data;
      return data;
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  });
};
