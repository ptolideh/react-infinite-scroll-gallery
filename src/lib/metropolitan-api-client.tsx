type ResponseType = { [k: string]: string; primaryImage: string };

export class ImageGenerator {
  private readonly maxImageCount = 914892;
  private readonly maxRetries = 50;
  private objectIds: number[] = [];

  private generateObjectId() {
    // Goal of this loop is to keep digging until it finds a unique id
    // However, it shouldn't look up indefinitely
    for (let i = 0; i < this.maxImageCount; i++) {
      const nextId = Math.floor(Math.random() * this.maxImageCount);
      if (!this.objectIds.includes(nextId)) {
        return nextId;
      }
    }
    return null;
  }

  private client(objectId: number): Promise<ResponseType> {
    return fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
    ).then(async (res) => {
      try {
        const data: ResponseType = await res.json();
        if (!res.ok && res.status === 400) {
          throw "Invalid Object Id";
        } else if (!res.ok) {
          throw data;
        } else if (!data.primaryImage) {
          throw "No Image Found";
        } else {
          return data;
        }
      } catch (error) {
        console.log(`Error | apiClient | ObjectId: ${objectId}`, error);
        throw error;
      }
    });
  }

  public async fetchImages() {
    const targetObjectId = this.generateObjectId();
    const noImageRemaining = targetObjectId === null;

    if (noImageRemaining) {
      console.log("objectId", targetObjectId);
      return Promise.reject("No Image Remaining");
    }

    let retries = 0;
    while (retries < this.maxRetries) {
      try {
        const data = await this.client(targetObjectId);
        return data;
      } catch (err) {
        console.log(`Error | ImageGenerator.fetchImage | ${targetObjectId}\n`);
        console.error(JSON.stringify(err));
        retries++;
      }
    }

    throw "No Image Found";
  }
}
