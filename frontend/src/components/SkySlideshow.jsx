// src/components/SkySlideshow.jsx
import { useEffect, useMemo, useState } from "react";

const SkySlideshow = ({
  interval = 5000,
  transition = 1000,
  images,
  className = "",
}) => {
  const IMAGES = useMemo(
    () =>
      images && images.length
        ? images
        : [
            // clear blue
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1920&auto=format&fit=crop",
            // golden hour clouds
            "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1920&auto=format&fit=crop",
            // dramatic stormy sky
            "https://images.unsplash.com/photo-1500674425229-f692875b0ab7?q=80&w=1920&auto=format&fit=crop",
            // pink sunset
            "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?q=80&w=1920&auto=format&fit=crop",
            // night sky (stars)
            "https://images.unsplash.com/photo-1444703686981-3c9a0a2d9d8d?q=80&w=1920&auto=format&fit=crop",
            // overcast soft clouds
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1920&auto=format&fit=crop",
          ],
    [images]
  );

  const [active, setActive] = useState(0);

  // Preload images
  useEffect(() => {
    IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [IMAGES]);

  // Rotate
  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % IMAGES.length);
    }, interval);
    return () => clearInterval(id);
  }, [IMAGES.length, interval]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* layers */}
      {IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-center bg-cover transition-opacity"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === active ? 1 : 0,
            transitionDuration: `${transition}ms`,
          }}
          aria-hidden={i !== active}
        />
      ))}
      {/* overlay tint to keep form readable */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};

export default SkySlideshow;
