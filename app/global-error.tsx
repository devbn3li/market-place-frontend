"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Bug } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="flex flex-col items-center justify-center text-center max-w-lg">
            {/* Error Icon */}
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-16 h-16 text-red-500" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white animate-bounce">
                <Bug className="w-5 h-5" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Something went wrong!
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Sorry, a critical error occurred. Please try again.
            </p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === "development" && error.message && (
              <div className="w-full mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <p className="text-sm font-mono text-red-600 break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-gray-500 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={reset}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
              Try Again
            </button>

            {/* Help Text */}
            <p className="mt-8 text-sm text-gray-500">
              If the problem persists, please refresh the page or contact support.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
