"use client";

import { useState } from "react";
import {
  DECK_EMBED_URL,
  DECK_PAGES,
  DECK_TITLE,
  DECK_VIEW_URL,
  isDeckEmbeddable,
} from "@/lib/deck";

/* ============================================================
   サービス紹介資料の埋め込み。

   25ページ・1920×1080 の資料をページ読み込みと同時に取得すると
   ページが重くなるため、クリックされるまで iframe を作らない。
   表紙だけを先に出し、押されてから読み込む。

   埋め込みURLが未設定のあいだは iframe を出さず、Canva を別タブで
   開くリンクだけを見せる。押しても何も起きない状態を作らないため。
   ============================================================ */

export function DeckEmbed() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-10 md:mt-14">
      {open && isDeckEmbeddable ? (
        <div
          className="relative w-full overflow-hidden border border-charcoal/15 bg-charcoal/[0.07]"
          style={{ aspectRatio: "16 / 9" }}
        >
          <iframe
            src={DECK_EMBED_URL}
            title={DECK_TITLE}
            loading="lazy"
            allow="fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      ) : (
        <div className="border-t-2 border-sage bg-white px-6 py-10 md:px-10 md:py-12">
          <p className="text-[12px] font-bold tracking-[0.14em] text-charcoal/50">
            全{DECK_PAGES}ページ
          </p>
          <p
            className="mt-4 font-semibold leading-[1.3] tracking-[-0.02em] text-charcoal"
            style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}
          >
            {DECK_TITLE}
          </p>
          <p className="mt-5 max-w-[34em] text-[15px] leading-[2] text-charcoal/75">
            人がやらなくてもいい仕事の5つの型、削減できる時間とコストの試算、
            改善の進め方をまとめています。社内で共有いただいても構いません。
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            {isDeckEmbeddable && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="btn btn-ghost-navy px-9 py-4 text-[15px]"
              >
                このページで見る <span aria-hidden>→</span>
              </button>
            )}
            <a
              href={DECK_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              /* relative の理由は ExternalLink と同じ（中の sr-only の基準） */
              className="relative inline-block border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
            >
              {isDeckEmbeddable ? "全画面で開く" : "資料を開く"} <span aria-hidden>↗</span>
              <span className="sr-only">（別タブで開きます）</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
