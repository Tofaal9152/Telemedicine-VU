"use client";

import imagePath from "@/constants/imagePath";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface AppImageProps extends ImageProps {
  fallbackSrc?: string;
}

const AppImage = ({
  src,
  alt = "",
  className,
  fallbackSrc = imagePath.logo,
  ...props
}: AppImageProps) => {
  const safeSrc =
    !src || src === "" || src === "null" || src === undefined
      ? fallbackSrc
      : src;

  const [imgSrc, setImgSrc] = useState(safeSrc);

  return (
    <Image
      {...props}
      src={imgSrc || fallbackSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
      quality={75}
      priority
      className={clsx(className)}
    />
  );
};

export default AppImage;
