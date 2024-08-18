import { useScrollPosition } from "@/lib/useScrollPosition";
import React, { useState } from "react";

function App() {
  const scrollPosition = useScrollPosition();
  return (
    <main className="container mx-auto h-[1000px]">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="mx-4 font-bold mb-10 mt-2">REACT TYPESCRIPT APP</h1>
        {JSON.stringify(scrollPosition)}
      </div>
    </main>
  );
}

export default App;
