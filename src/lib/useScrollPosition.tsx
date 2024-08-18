import { useEffect, useState } from "react";

export type ScrollPosType = {
  x: number;
  y: number;
};

const getX = () => Math.round(window.screenX);
const getY = () => Math.round(window.screenY);

export const useScrollPosition = (): ScrollPosType => {
  const [scrollPos, setScrollPos] = useState<ScrollPosType>(() => {
    return { x: getX(), y: getY() };
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos({ x: getX(), y: getY() });
    };
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPos;
};
