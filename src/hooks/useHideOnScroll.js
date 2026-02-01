import { useEffect, useRef, useState } from "react";

export default function useHideOnScroll({ threshold = 8, topOffset = 10 } = {}) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY || 0;

    const onScroll = () => {
      const y = window.scrollY || 0;

      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const prev = lastY.current;
        const delta = y - prev;

        if (y <= topOffset) {
          setHidden(false);
        } else if (Math.abs(delta) >= threshold) {
          setHidden(delta > 0);
        }

        lastY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, topOffset]);

  return hidden;
}
