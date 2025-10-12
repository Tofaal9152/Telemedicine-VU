"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import clsx from "clsx";
import imagePath from "@/constants/imagePath";


interface AppImageProps extends ImageProps {
  fallbackSrc?: string;
}

const CustomImage = ({
  src,
  alt = "",
  className,
  fallbackSrc = imagePath.logo,
  ...props
}: AppImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.classList.remove("opacity-0");
  };

  if (!src) {
    return (
      <Image
        {...props}
        src={fallbackSrc}
        alt={alt}
        onError={() => setImgSrc(fallbackSrc)}
        quality={100}
        priority
        className={clsx(
          className,
          "transition-opacity duration-700 opacity-0",
          "will-change-transform"
        )}
        onLoad={handleImageLoad}
      />
    );
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
      quality={100}
      className={clsx(
        className,
        "transition-opacity duration-700 opacity-0",
        "will-change-transform"
      )}
      onLoad={handleImageLoad}
    />
  );
};

export default CustomImage;
