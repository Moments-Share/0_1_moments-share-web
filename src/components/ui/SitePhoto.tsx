import Image from "next/image";
import {
  isImageReady,
  resolveImageSrc,
  SHOW_PHOTO_SPECS,
  siteImages,
  type SiteImage,
  type SiteImageKey,
} from "@/lib/site-images";

/**
 * 写真がまだ無い枠。どんな写真が必要かをその場に出しておき、撮影・選定の指示書を兼ねる。
 * 実写が揃ったら site-images.ts の src を埋めるだけで、この表示は消える。
 */
function PhotoSpec({ image }: { image: SiteImage }) {
  const dark = image.tone === "dark";
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center px-6 ${
        dark ? "bg-[#16281f]" : "bg-charcoal/[0.07]"
      }`}
    >
      {SHOW_PHOTO_SPECS && (
        <div className={`max-w-[34ch] text-center ${dark ? "text-white/50" : "text-charcoal/45"}`}>
          <p className="text-[10px] font-bold tracking-[0.24em]">PHOTO</p>
          <p className="mt-3 text-[12px] leading-[1.9]">{image.spec}</p>
        </div>
      )}
    </div>
  );
}

/** 比率つきの箱として写真を置く。ratio を渡すとマニフェストの既定比率を上書きできる。 */
export function SitePhoto({
  name,
  image,
  ratio,
  sizes = "100vw",
  priority = false,
  className = "",
}: {
  /** site-images.ts のキー。image を直接渡す場合は省略できる */
  name?: SiteImageKey;
  /** マニフェスト外の画像（NEWS・パートナー等）を直接渡す場合 */
  image?: SiteImage;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const resolved = image ?? (name ? siteImages[name] : undefined);
  if (!resolved) return null;

  /* 文字入りの画像は切らない。枠の比率と合わないぶんは余白にして、
     その余白が「切れている」ように見えないよう、薄い地を敷く */
  const contain = resolved.fit === "contain";

  return (
    <div
      className={`relative w-full overflow-hidden ${contain ? "bg-charcoal/[0.05]" : ""} ${className}`}
      style={{ aspectRatio: ratio ?? resolved.ratio }}
    >
      {isImageReady(resolved) ? (
        <Image
          src={resolveImageSrc(resolved) as string}
          alt={resolved.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-center ${contain ? "object-contain" : "object-cover"}`}
        />
      ) : (
        <PhotoSpec image={resolved} />
      )}
    </div>
  );
}

/** 親要素（position:relative）を埋める全面表示。HERO や VISION の背景に使う。 */
export function SitePhotoFill({
  name,
  sizes = "100vw",
  priority = false,
}: {
  name: SiteImageKey;
  sizes?: string;
  priority?: boolean;
}) {
  const image = siteImages[name];
  const src = resolveImageSrc(image);
  if (!src) return <PhotoSpec image={image} />;

  return (
    <Image
      src={src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover object-center"
    />
  );
}
