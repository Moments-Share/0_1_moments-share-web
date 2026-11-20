import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { CaseCard, CasesNote } from "@/components/ui/CaseCard";
import { highlightCases } from "@/data/cases";
import { PLAN_CONTACT_HREF, displayPrice, plans } from "@/lib/plans";

/* ============================================================
   WORKS ＋ 年間プラン（トップ）

   事業の紹介のすぐ後に置く。「何をしてくれる会社か」が分かった次に
   出る問いは「本当にできるのか」と「いくらで、どう頼むのか」なので、
   実績 → 年間プラン → 相談 の順に一気に見せる。

   実績は src/data/cases.ts の先頭3件。空のときは節ごと出さない。
   金額は src/lib/plans.ts の設定に従う（ここに直接書かない）。
   ============================================================ */

export function CasesPreview() {
  const standard = plans.find((p) => p.id === "standard");
  return (
    <>
      {highlightCases.length > 0 && (
        <section id="works" className="scroll-mt-16 bg-white px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            <Reveal>
              <p className="text-[11px] font-bold tracking-[0.28em] text-charcoal/70">WORKS</p>
              <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <h2
                  className="font-bold leading-[1.35] tracking-[-0.02em] text-charcoal"
                  style={{ fontSize: "clamp(26px, 3.4vw, 44px)" }}
                >
                  現場で動いている、
                  <br className="hidden sm:block" />
                  AIと自動化の実績。
                </h2>
                <Link
                  href="/works"
                  className="inline-block self-start border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green md:self-auto"
                >
                  すべての実績を見る →
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-12 grid grid-cols-1 gap-6 md:mt-16 lg:grid-cols-3">
                {highlightCases.map((c) => (
                  <li key={c.id}>
                    <CaseCard c={c} variant="compact" />
                  </li>
                ))}
              </ul>
              <CasesNote />
            </Reveal>
          </div>
        </section>
      )}

      {/* 年間プラン。主力の商品なので、トップで名前と始め方まで出す */}
      <section id="annual-plan" className="scroll-mt-16 bg-ivory px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-6">
                <p className="text-[11px] font-bold tracking-[0.28em] text-charcoal/70">ANNUAL PLAN</p>
                <h2
                  className="mt-6 font-bold leading-[1.35] tracking-[-0.02em] text-charcoal"
                  style={{ fontSize: "clamp(26px, 3.4vw, 44px)" }}
                >
                  AI導入伴走 年間プラン
                </h2>
                <p className="mt-6 max-w-[34em] text-[15px] leading-[2] text-charcoal/80 md:text-[16px]">
                  毎月の定例で業務を整理し、自動化を毎月1本ずつつくって、効果を毎月レポートします。
                  12時間のAI研修から始められ、研修のあと年間プランをご契約いただいた場合は研修費を1か月目に充てます。
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Link href={PLAN_CONTACT_HREF} className="btn btn-solid-green px-8 py-3.5 text-[15px]">
                    無料で相談する →
                  </Link>
                  <Link
                    href="/annual-plan"
                    className="inline-block border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
                  >
                    プランの詳細を見る →
                  </Link>
                </div>
              </div>

              <ol className="lg:col-span-6 border-t border-charcoal/15">
                {plans.map((p) => (
                  <li key={p.id} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-charcoal/15 py-5">
                    <div className="min-w-0">
                      <p className="text-[17px] font-bold text-charcoal md:text-[19px]">{p.name}</p>
                      <p className="mt-1 text-[13px] leading-[1.8] text-charcoal/70 md:text-[14px]">{p.items.join("・")}</p>
                    </div>
                    <p className={`shrink-0 font-semibold tracking-[-0.01em] ${p === standard ? "text-deep-green" : "text-charcoal/80"}`} style={{ fontSize: "clamp(17px, 1.8vw, 22px)" }}>
                      {displayPrice(p)}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
