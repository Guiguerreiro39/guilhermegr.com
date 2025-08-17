import { useEffect, useState } from "react";
import { RefObject } from "react";

const useMousePosition = (ref?: RefObject<HTMLDivElement | null>) => {
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
    deltaX: number;
    deltaY: number;
    xOffset: number;
    yOffset: number;
  }>({ x: 0, y: 0, deltaX: 0, deltaY: 0, xOffset: 0, yOffset: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      let xOffset = 0;
      let yOffset = 0;

      if (ref?.current) {
        const rect = ref.current.getBoundingClientRect();
        const relX = ev.clientX - rect.left;
        const relY = ev.clientY - rect.top;
        xOffset = (relX / rect.width - 0.5) * 2; // -1 to 1
        yOffset = (relY / rect.height - 0.5) * 2; // -1 to 1
      }

      setMousePosition((prev) => ({
        x: ev.clientX,
        y: ev.clientY,
        deltaX: ev.clientX - prev.x,
        deltaY: ev.clientY - prev.y,
        xOffset,
        yOffset,
      }));
    };

    const element = ref?.current;

    if (element) {
      element.addEventListener("mousemove", updateMousePosition as EventListener);
      return () => {
        element.removeEventListener(
          "mousemove",
          updateMousePosition as EventListener,
        );
      };
    }

    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [ref]);

  return mousePosition;
};
export default useMousePosition;
