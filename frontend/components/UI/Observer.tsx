import React, { useEffect, useRef } from "react";

const Observer: React.FC<{ setInView: (val: boolean) => void }> = ({
  setInView,
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([div]) => setInView(div.isIntersecting),
      {
        root: null, // browser viewport
        rootMargin: "0px",
      }
    );
    observer.observe(divRef.current!);
  }, []);

  return <div ref={divRef}></div>;
};

export default Observer;
