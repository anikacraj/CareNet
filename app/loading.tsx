// app/[userId]/loading.tsx (or wherever needed)

export default function Loading() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-6">
          {/* Heartbeat Circle Animation */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
            <div className="relative w-full h-full rounded-full bg-emerald-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              💚
            </div>
          </div>
  
          {/* Loading Text */}
          <div className="text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200 font-semibold animate-pulse">
              Loading Doctor Profile...
            </p>
          </div>
        </div>
      </div>
    );
  }
  