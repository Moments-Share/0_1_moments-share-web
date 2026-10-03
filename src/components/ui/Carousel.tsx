"use client";

import { useEffect, useRef } from "react";

/* ============================================================
   横スクロールのカルーセル。

   スクロール自体はブラウザの機能（scroll-snap）に任せる。
   自前で位置計算をしないので、スワイプ・トラックパッド・
   キーボードの矢印・スクリーンリーダーの読み進めが全部そのまま効く。
   JSがやるのは「自動送り」と「矢印ボタン」だけ。

   自動送りは auto で切る。既定は動かさない。
   勝手に動くと、節に目を移した時点で1枚目が過ぎていることがあり、
   「最初の1枚が見られない」状態になる。まず1枚目を見せて、
   その先は読む人が自分で送る。
   動かす場合も、実際に横へはみ出しているときだけ動かす。

   止める条件を多めに取っている。勝手に動き続けるUIは、
   読んでいる途中で切り替わると単純に邪魔なので。
     - マウスが乗っている
     - 中のリンクにフォーカスが当たっている
     - 指で触っている・自分でスクロールしている
     - OS側で「視差効果を減らす」が有効

   矢印の有効・無効は state ではなく DOM で切り替える。
   スクロールのたびに React を再レンダリングさせない。
   ============================================================ */

export function Carousel({
  children,
  /** 読み上げ用のまとまりの名前 */
  label,
  /** 自動で送るか。既定は送らない（1枚目を必ず見せる） */
  auto = false,
  /** 自動送りの間隔（ミリ秒）。auto のときだけ使う */
  autoMs = 5000,
}: {
  children: React.ReactNode;
  label: string;
  auto?: boolean;
  autoMs?: number;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const prevBtn = useRef<HTMLButtonElement>(null);
  const nextBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = scroller.current;
    // cleanup 時に ref.current が別物になっている可能性があるので、
    // ここで掴んだものを最後まで使う
    const prev = prevBtn.current;
    const next = nextBtn.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = () => {
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return el.clientWidth;
      // カード1枚ぶん＋隙間
      const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
      return first.getBoundingClientRect().width + gap;
    };
    const scrollable = () => el.scrollWidth > el.clientWidth + 8;

    const sync = () => {
      const atStart = el.scrollLeft <= 4;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
      // はみ出していないときは矢印ごと隠す
      const hide = !scrollable();
      for (const [btn, off] of [
        [prev, atStart],
        [next, atEnd],
      ] as const) {
        if (!btn) continue;
        btn.hidden = hide;
        btn.disabled = off;
        btn.style.opacity = off ? "0.3" : "1";
        btn.style.pointerEvents = off ? "none" : "auto";
      }
    };

    const go = (dir: 1 | -1) => {
      if (!scrollable()) return;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
      const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
      // 末尾まで行ったら先頭へ戻す
      if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior });
      else el.scrollBy({ left: dir * step(), behavior });
    };

    let paused = false;
    const timer = auto
      ? window.setInterval(() => {
          if (!paused && !reduce && !document.hidden) go(1);
        }, autoMs)
      : undefined;

    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };

    el.addEventListener("scroll", sync, { passive: true });
    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", resume);
    el.addEventListener("pointerdown", pause);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);
    window.addEventListener("resize", sync);

    const onPrev = () => {
      pause();
      go(-1);
    };
    const onNext = () => {
      pause();
      go(1);
    };
    prev?.addEventListener("click", onPrev);
    next?.addEventListener("click", onNext);

    sync();

    return () => {
      if (timer !== undefined) clearInterval(timer);
      el.removeEventListener("scroll", sync);
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", resume);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
      window.removeEventListener("resize", sync);
      prev?.removeEventListener("click", onPrev);
      next?.removeEventListener("click", onNext);
    };
  }, [auto, autoMs]);

  const btn =
    "grid h-11 w-11 place-items-center rounded-full border border-charcoal/30 text-charcoal transition-colors hover:border-deep-green hover:text-deep-green disabled:cursor-default";

  return (
    <div role="group" aria-roledescription="カルーセル" aria-label={label}>
      <div
        ref={scroller}
        /* relative は念のため。中に position:absolute の子が入ったとき、
           基準がこの枠になり、横スクロールの外へはみ出さない */
        className="relative flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-2 md:gap-8 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
        tabIndex={0}
      >
        {children}
      </div>

      {/* 送るのは読む人。矢印とスワイプの両方で動かせる */}
      <div className="mt-7 flex items-center gap-3">
        <button ref={prevBtn} type="button" className={btn} aria-label="前へ">
          <span aria-hidden>←</span>
        </button>
        <button ref={nextBtn} type="button" className={btn} aria-label="次へ">
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}

/** カルーセルの中に入れる1枚。幅の決め方をここに集約する */
export function CarouselItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex shrink-0 grow-0 basis-[86%] snap-start sm:basis-[58%] lg:basis-[calc((100%-4rem)/3)]">
      {children}
    </div>
  );
}
