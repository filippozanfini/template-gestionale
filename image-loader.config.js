// image-loader.config.js
import { imageLoader } from "next-image-loader/build/image-loader";

// write self-define a custom loader
// (resolverProps: { src: string; width: number; quality?: number }) => string
imageLoader.loader = ({ src, width, quality }) => src;
//`${process.env.NEXT_PUBLIC_OPTIMIZE_DOMAIN}?url=${encodeURIComponent(src)}&w=${Math.min(width, 1080)}&q=${quality || 75}`
