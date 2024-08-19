import { useScrollPosition } from "@/lib/useScrollPosition";
import ArtifactPhoto from "../ArtifactPhoto";
import { useEffect } from "react";
import { client } from "@/lib/api-client";

function App() {
  const scrollPosition = useScrollPosition();
  console.log(scrollPosition);

  useEffect(() => {
    client(4000)
      .then((data) => console.log(data))
      .catch((err) => console.log(`error: ${err.message}`));
  }, []);

  return (
    <main className="container mx-auto">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mx-4 font-bold mb-10 mt-2">REACT TYPESCRIPT APP</h1>
      </div>
      <div className="flex flex-col items-center space-y-10">
        <ArtifactPhoto />
      </div>
    </main>
  );
}

export default App;
