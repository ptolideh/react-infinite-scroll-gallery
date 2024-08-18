import React, { useState } from "react";

function App() {
  const [scrollYPos, setScrollYPos] = useState<number>(0);
  React.useEffect(() => {
    const scrollTracker = () => {
      setScrollYPos(window?.scrollY);
    };
    document.addEventListener("scroll", scrollTracker);

    return () => {
      document.removeEventListener("scroll", scrollTracker);
    };
  }, []);
  return (
    <main className="container mx-auto h-[1000px]">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="mx-4 font-bold mb-10 mt-2">REACT TYPESCRIPT APP</h1>
        {scrollYPos}
      </div>
    </main>
  );
}

export default App;
