import { useState } from "react";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export default function ImageWithSkeleton({
  src,
  alt,
  className = "w-full h-full object-cover",
  aspectRatio = "aspect-[4/3]",
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden w-full ${aspectRatio} bg-slate-100 rounded-xl`}>
      {/* Shimmer Skeleton - absolute positioning */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse"
             style={{
               backgroundSize: "200% 100%",
               animation: "pulse 1.5s infinite ease-in-out"
             }}
        />
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-500 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
