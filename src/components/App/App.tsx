// import { useScrollPosition } from "@/lib/useScrollPosition";
import ArtifactPhoto from "../ArtifactPhoto";
import { useEffect, useState } from "react";
import { useScrollEnd } from "@/lib/hooks/useScrollEnd";
import { pexelClient } from "@/lib/api/pexel-api-client";
import { LoaderPinwheel } from "lucide-react";

type ImageType = { id: number; src: string; alt: string };
type StatusType = "idle" | "pending" | "success" | "error";

function App() {
  const isScrollEnd = useScrollEnd();
  const [images, setImages] = useState<ImageType[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [status, setStatus] = useState<StatusType>("idle");

  useEffect(() => {
    if (pageCount === 1 || isScrollEnd) {
      setStatus("pending");
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
          setStatus("success");
        } catch (error) {
          if (error instanceof Error) {
            console.error(`Error! Source: pexelClient': ${error.message}`);
          } else {
            console.error(`Error! Unknown Error:`, error);
          }
          setStatus("error");
        }
      });
    }
  }, [isScrollEnd, pageCount, images]);

  return (
    <main className="container mx-auto">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mx-4 font-bold mb-10 mt-2">
          React Infinite Scroll X Pexel Gallery
        </h1>
      </div>
      <div className="flex flex-col items-center space-y-10">
        {images.map((image) => (
          <ArtifactPhoto key={image.id} imageSrc={image.src} alt={image.alt} />
        ))}
        {status === "pending" && (
          <div className="w-full flex items-center justify-center pt-2 pb-10">
            <LoaderPinwheel size={36} className="animate-spin" />
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
