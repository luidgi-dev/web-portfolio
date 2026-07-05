export function WarmAmbientGlow() {
  return (
    <div
      className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-xl"
      style={{
        background: 'radial-gradient(circle, var(--glow-color-strong), transparent 70%)',
      }}
      aria-hidden="true"
    />
  );
}
