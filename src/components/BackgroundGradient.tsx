export function BackgroundGradient() {
  return (
    <picture>
      <source srcSet="/images/Gradient.avif?w=16&q=75 1x" type="image/avif" />
      <source srcSet="/images/Gradient.webp?w=16&q=75 1x" type="image/webp" />
      <img
        alt="gradient"
        loading="lazy"
        decoding="async"
        data-nimg="fill"
        srcSet="/images/HeroBackground.webp?w=16&q=75 1x"
        src="/images/HeroBackground.webp?w=16&q=75"
        style={{
          position: "absolute",
          width: "100%",
          inset: "0px",
          color: "transparent",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
    </picture>
  );
}
