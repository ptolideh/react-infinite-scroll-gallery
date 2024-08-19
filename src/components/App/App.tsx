// import { useScrollPosition } from "@/lib/useScrollPosition";
import ArtifactPhoto from "../ArtifactPhoto";
import { useEffect, useState } from "react";
import { useScrollEnd } from "@/lib/useScrollEnd";
import { pexelClient } from "@/lib/pexel-api-client";

type ImageType = { id: number; src: string; alt: string };

function App() {
  // const scrollPosition = useScrollPosition();
  const isScrollEnd = useScrollEnd();
  const [images, setImages] = useState<ImageType[]>([]);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {}, []);

  useEffect(() => {
    if (pageCount === 1 || isScrollEnd) {
      pexelClient(pageCount).then(async (data) => {
        try {
          const { photos } = data;
          const nextImages = photos.map(({ id, src: { large }, alt }) => ({
            id,
            src: large,
            alt,
          }));
          const nextPageCount = pageCount + 1;
          setImages([...images, ...nextImages]);
          setPageCount(nextPageCount);
        } catch (error) {
          if (error instanceof Error) {
            console.error(`Error! Source: pexelClient': ${error.message}`);
          } else {
            console.error(`Error! Unknown Error:`, error);
          }
        }
      });
    }
  }, [isScrollEnd, pageCount, images]);

  return (
    <main className="container mx-auto">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mx-4 font-bold mb-10 mt-2">REACT TYPESCRIPT APP</h1>
      </div>
      <div className="flex flex-col items-center space-y-10">
        {images.map((image) => (
          <ArtifactPhoto key={image.id} imageSrc={image.src} alt={image.alt} />
        ))}
      </div>
    </main>
  );
}

export default App;
