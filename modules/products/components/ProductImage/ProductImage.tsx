"use client";

import { useState } from "react";
import Image from "next/image";

const FALLBACK_IMAGE = "/products/product-placeholder.svg";

type ProductImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export const ProductImage = ({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className,
}: ProductImageProps) => {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const imageSource = failedSource === src ? FALLBACK_IMAGE : src;

  return (
    <Image
      src={imageSource}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailedSource(src)}
    />
  );
};
