export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center">
        {/* Animated Logo/Spinner */}
        <div className="relative w-24 h-24 mb-8">
          {/* Outer Ring */}
          <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-muted animate-pulse" />

          {/* Spinning Ring */}
          <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-orange-500 animate-spin" />
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            Loading...
          </h2>
          <p className="text-muted-foreground text-sm">
            Please wait a moment
          </p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
