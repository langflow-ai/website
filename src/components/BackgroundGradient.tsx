export function BackgroundGradient() {
  return (
    <div
      style={{
        position: "fixed",
        top: "50vh", // Start at middle of viewport (middle of hero)
        left: "0",
        right: "0",
        height: "50vh", // Extend exactly 50% below hero
        backgroundImage: "url('/images/Gradient.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
        pointerEvents: "none",
        // Mask to control where the gradient appears - smoother fade
        mask: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0) 100%)",
        WebkitMask: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0) 100%)",
      }}
    />
  );
}
