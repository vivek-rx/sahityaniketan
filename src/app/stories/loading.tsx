export default function Loading() {
  // Matches the route-change sweep in src/app/template.tsx exactly (same
  // gradient, same height, same z-index) so the two overlap seamlessly
  // instead of rendering two competing bars at slightly different sizes.
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2.5px] overflow-hidden pointer-events-none">
      <div className="h-full w-full bg-gradient-to-r from-[#C5A059] via-[#FDE68A] to-[#800020] animate-pulse" />
    </div>
  );
}
