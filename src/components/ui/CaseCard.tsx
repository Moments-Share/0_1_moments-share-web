import type { CaseStudy } from "@/data/cases";

/* ============================================================
   実績1件。お困りごと → やったこと → 結果 の順に並べる。

   variant:
     full    … /works/ 用。やったこと・結果を全部出す
     compact … トップ・サービスページ用。お困りごとと結果の1行目だけ

   数字は basis が「見込み」のとき、必ず「見込み」の札を付ける。
   実績と見込みを同じ見た目にしないため。
   ============================================================ */

function Figure({ f }: { f: NonNullable<CaseStudy["figures"]>[number] }) {
  const estimate = f.basis === "見込み";
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span
          className="font-semibold leading-[1.1] tracking-[-0.02em] text-charcoal"
          style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}
        >
          {f.value}
        </span>
        {estimate && (
          <span className="border border-terracotta-ink/60 px-1.5 py-0.5 text-[11px] font-bold text-terracotta-ink">
            見込み
          </span>
        )}
      </div>
      <p className="mt-1.5 text-[13px] leading-[1.7] text-charcoal/70">{f.label}</p>
    </div>
  );
}

export function CaseCard({ c, variant = "full" }: { c: CaseStudy; variant?: "full" | "compact" }) {
  const compact = variant === "compact";
  return (
    <article
      id={compact ? undefined : c.id}
      className="flex h-full scroll-mt-24 flex-col border border-charcoal/12 bg-white p-6 md:p-8"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="border border-charcoal/25 px-2 py-0.5 text-[11px] font-bold tracking-[0.08em] text-charcoal/70">
          {c.kind}
        </span>
        <span className="text-[13px] font-bold text-charcoal/80">{c.client}</span>
        <span className="text-[12px] text-charcoal/60">
          {c.period}・{c.status}
        </span>
      </div>

      <h3
        className="mt-4 font-semibold leading-[1.45] tracking-[-0.02em] text-charcoal"
        style={{ fontSize: compact ? "clamp(18px, 1.8vw, 21px)" : "clamp(19px, 2vw, 24px)" }}
      >
        {c.title}
      </h3>

      <dl className="mt-5 flex-1 border-t border-charcoal/10 text-[14px] leading-[1.9] md:text-[15px]">
        <div className="pt-4">
          <dt className="text-[12px] font-bold tracking-[0.1em] text-charcoal/55">お困りごと</dt>
          <dd className="mt-1 text-charcoal/80">{c.problem}</dd>
        </div>

        {!compact && (
          <div className="pt-4">
            <dt className="text-[12px] font-bold tracking-[0.1em] text-charcoal/55">やったこと</dt>
            <dd className="mt-1">
              <ul className="space-y-1.5">
                {c.actions.map((a) => (
                  <li key={a} className="flex gap-2.5 text-charcoal/80">
                    <span aria-hidden className="mt-[0.8em] h-1 w-1 shrink-0 rounded-full bg-charcoal/40" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}

        <div className="pt-4">
          <dt className="text-[12px] font-bold tracking-[0.1em] text-deep-green">結果</dt>
          <dd className="mt-1">
            <ul className="space-y-1.5">
              {(compact ? c.results.slice(0, 1) : c.results).map((r) => (
                <li key={r} className="flex gap-2.5 font-semibold text-charcoal">
                  <span aria-hidden className="mt-[0.8em] h-1 w-1 shrink-0 rounded-full bg-deep-green" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      {c.figures && c.figures.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-5 border-t border-charcoal/10 pt-5 sm:grid-cols-2">
          {c.figures.map((f) => (
            <Figure key={f.label} f={f} />
          ))}
        </div>
      )}

      {!compact && c.tools && (
        <p className="mt-5 text-[13px] leading-[1.8] text-charcoal/65">使ったもの：{c.tools}</p>
      )}
    </article>
  );
}

/** 事例の注記。どの一覧の下にも同じ文を置く */
export function CasesNote() {
  return (
    <p className="mt-6 max-w-[48em] text-[12px] leading-[1.9] text-charcoal/60">
      ※ 支援先が特定されないよう、業種などの表記にとどめています。数字は作業の結果として確かめたものだけを載せ、
      「見込み」とあるものは導入時の想定です。効果を保証するものではありません。
    </p>
  );
}
