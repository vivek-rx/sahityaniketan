export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent overflow-hidden pointer-events-none">
      <div className="h-full bg-gradient-to-r from-[#800020] via-[#E5B869] to-[#800020] animate-pulse w-full" />
    </div>
  );
}
