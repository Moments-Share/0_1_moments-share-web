/* ============================================================
   外部サイトへのリンク。

   BookingLink と同じ作法（別タブ・rel="noopener noreferrer"・
   ↗ と読み上げ用テキストの両方で「別タブ」を伝える）を、
   任意のURLに対して使えるようにしたもの。

   予約ページ専用の導線は BookingLink を使う。こちらは
   Instagram や note など、行き先が増えていくリンク用。
   ============================================================ */

type Variant = "text" | "outline" | "onGreen";

const variantClass: Record<Variant, string> = {
  text: "inline-block border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green",
  outline: "btn btn-ghost-navy px-9 py-4 text-[15px]",
  onGreen:
    "inline-block border-b border-white/40 pb-0.5 text-[14px] font-bold text-white/85 transition-colors hover:border-white hover:text-white",
};

export function ExternalLink({
  href,
  children,
  variant = "text",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      /* relative を付けておく。中の sr-only は position:absolute なので、
         位置の基準になる祖先が無いと、ページの左上を基準に置かれてしまう。
         横スクロールの中にこのリンクがあると、その「静的な位置」は
         画面の外（右）になり、ページ全体に横スクロールが出る */
      className={`relative ${variantClass[variant]} ${className}`}
    >
      {children} <span aria-hidden>↗</span>
      <span className="sr-only">（別タブで開きます）</span>
    </a>
  );
}
