import { useEffect, useState } from "react";
import { useScrollPosition } from "./useScrollPosition";

export const useScrollEnd = () => {
  const [isScrollEnd, setScrollEnd] = useState(false);
  const { y: scrollOffsetY } = useScrollPosition();

  useEffect(() => {
    // Helps reaching end earlier to metigate rounding errors of different browsers
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

    // console.log({ scrollOffsetY, scrollableHeight });

    if (scrollOffsetY > 0 && scrollOffsetY >= scrollableHeight) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  }, [scrollOffsetY]);

  return isScrollEnd;
};
