export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surf">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-copper/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-copper rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-sm text-ink/60 animate-pulse">Cargando...</p>
      </div>
    </div>
  );
}
