import { useEffect, useState } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
    deltaX: number;
    deltaY: number;
  }>({ x: 0, y: 0, deltaX: 0, deltaY: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition((prev) => ({
        x: ev.clientX,
        y: ev.clientY,
        deltaX: ev.clientX - prev.x,
        deltaY: ev.clientY - prev.y,
      }));
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
};
export default useMousePosition;
