import React, { useEffect, useRef } from "react";

const Observer: React.FC<{ callback: () => void }> = ({ callback }) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleIntersection: IntersectionObserverCallback = ([div]) => {
    if (div.isIntersecting) callback(); // run callback on intersection ie, scrolled into view
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // browser viewport
      rootMargin: "0px",
    });
    observer.observe(divRef.current!);
  }, []);

  return <div ref={divRef}></div>;
};

export default Observer;
