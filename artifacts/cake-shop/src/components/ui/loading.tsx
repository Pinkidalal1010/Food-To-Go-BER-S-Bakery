import { Loader2 } from "lucide-react";

export function LoadingSpinner({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
      <p className="text-muted-foreground font-display text-lg animate-pulse">Baking something sweet...</p>
    </div>
  );
}

export function LoadingScreen() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
