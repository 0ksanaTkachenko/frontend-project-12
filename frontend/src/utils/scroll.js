const scroll = (direction, containerRef, behavior = 'smooth') => {
  if (containerRef.current) {
    const scrollTop = direction === 'top' ? 0 : containerRef.current.scrollHeight;
    containerRef.current.scrollTo({
      top: scrollTop,
      behavior,
    });
  }
};

export default scroll;
