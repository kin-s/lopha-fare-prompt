export function PageLoader() {
  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6 animate-pulse-soft">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-8 w-48 bg-gray-200 rounded-md"></div>
        <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
      </div>
      
      {/* Content Skeleton */}
      <div className="bg-white border border-lopha-border rounded-xl p-6 space-y-4 shadow-sm">
        <div className="h-12 bg-gray-100 rounded-lg w-full"></div>
        <div className="h-12 bg-gray-100 rounded-lg w-full"></div>
        <div className="h-12 bg-gray-100 rounded-lg w-full"></div>
        <div className="h-12 bg-gray-100 rounded-lg w-full"></div>
      </div>
    </div>
  );
}