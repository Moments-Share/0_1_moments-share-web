import { BOOKING_URL } from "@/lib/contact";

/* ============================================================
   予約ページへのリンク。

   外部サイト（Google カレンダー）へ飛ばすため、必ず別タブで開き、
   rel="noopener noreferrer" を付ける。付け忘れを防ぐために部品にしている。
   別タブで開くことは見た目（↗）と読み上げ（sr-only）の両方で伝える。

   variant:
     text    … 下線のテキストリンク。写真の上や本文中で使う
     outline … 枠線ボタン。明るい背景のセクションで使う
     onGreen … 濃い緑のバンドの上で使う。枠線を明るい色に反転させる
   ============================================================ */

type Variant = "text" | "outline" | "onGreen";

const variantClass: Record<Variant, string> = {
  text: "inline-block border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green",
  outline: "btn btn-ghost-navy px-9 py-4 text-[15px]",
  onGreen:
    "inline-block border-b border-white/40 pb-0.5 text-[14px] font-bold text-white/85 transition-colors hover:border-white hover:text-white",
};

export function BookingLink({
  children = "日程を決めて相談する",
  variant = "text",
  className = "",
}: {
  children?: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      /* relative の理由は ExternalLink と同じ（中の sr-only の基準） */
      className={`relative ${variantClass[variant]} ${className}`}
    >
      {children} <span aria-hidden>↗</span>
      <span className="sr-only">（別タブで開きます）</span>
    </a>
  );
}
