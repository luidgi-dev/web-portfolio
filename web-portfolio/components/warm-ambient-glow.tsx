export function WarmAmbientGlow() {
  return (
    <div
      className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-20 mix-blend-screen blur-xl"
      style={{
        background: 'radial-gradient(circle, rgba(214,137,42,0.4), transparent 70%)',
      }}
      aria-hidden="true"
    />
  );
}
