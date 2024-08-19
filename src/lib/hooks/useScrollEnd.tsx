import { useEffect, useState } from "react";
import { useScrollPosition } from "./useScrollPosition";

export const useScrollEnd = () => {
  const [isScrollEnd, setScrollEnd] = useState(false);
  const { y: scrollYOffset } = useScrollPosition();

  useEffect(() => {
    const ROUNDING_ERROR = 50;

    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    const viewportHeight = window.innerHeight;
    const scrollableHeight = documentHeight - viewportHeight - ROUNDING_ERROR;

    console.log({ scrollYOffset, scrollableHeight });

    if (scrollYOffset > 0 && scrollYOffset >= scrollableHeight) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  }, [scrollYOffset]);

  return isScrollEnd;
};
