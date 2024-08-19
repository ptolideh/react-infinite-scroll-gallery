// import { useScrollPosition } from "@/lib/useScrollPosition";
import ArtifactPhoto from "../ArtifactPhoto";
import { useEffect } from "react";
import { useScrollEnd } from "@/lib/useScrollEnd";

function App() {
  // const scrollPosition = useScrollPosition();
  const isScrollEnd = useScrollEnd();
  // const imageGenRef = useRef(new ImageGenerator());
  // useEffect(() => {
  // imageGenRef.current
  //   .fetchImages()
  //   .then((res) => console.log(res))
  //   .catch((err) => console.error(err));
  // }, [imageGenRef]);
  // useEffect(() => {
  //   client(4000)
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(`error: ${err.message}`));
  // }, []);

  useEffect(() => {
    if (isScrollEnd) {
      alert("End of the line buddy!");
    }
  }, [isScrollEnd]);

  return (
    <main className="container mx-auto">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mx-4 font-bold mb-10 mt-2">REACT TYPESCRIPT APP</h1>
      </div>
      <div className="flex flex-col items-center space-y-10">
        <ArtifactPhoto />
        <ArtifactPhoto />
        <ArtifactPhoto />
      </div>
    </main>
  );
}

export default App;
