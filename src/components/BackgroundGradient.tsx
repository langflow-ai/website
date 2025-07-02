export function BackgroundGradient() {
  return (
    <img
      alt="gradient"
      fetchPriority="high"
      width="0"
      height="0"
      decoding="async"
      data-nimg="fill"
      srcSet="/images/Gradient.png?w=16&q=75 1x"
      src="/images/Gradient.png?w=16&q=75"
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        inset: "0px",
        color: "transparent",
        pointerEvents: "none",
        zIndex: -1,
      }}
    ></img>
  );
}
