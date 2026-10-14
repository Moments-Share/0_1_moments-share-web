import { Reveal } from "@/components/ui/Reveal";
import { CountUpStat } from "@/components/ui/CountUpStat";

/* ============================================================
   OUR KPI — カードにせず、数字と細い罫線だけで静かに見せる。
   数字は本文色で最も強く、単位だけセージに落として色数を抑える。
   実績の誇示ではなく、Visionに向けて積み上げている途中経過として置く。
   ============================================================ */

/* value は数値で持つ。CountUpStat が 0 から数え上げる。

   色はサイトの既存3色（濃緑・テラコッタ・セージ）を巡回させる。
   参考にしたサイトは項目ごとに違うパステルを当てていたが、
   このサイトは色数を絞る前提で組んであるので、既存の色で回す。
   accent は文字、underline は下線。同じ色を指す。 */
const indicators = [
  { value: 7, unit: "件", label: "DX・AX支援", accent: "text-deep-green", underline: "bg-deep-green" },
  { value: 3, unit: "社", label: "BPO支援", accent: "text-terracotta-ink", underline: "bg-terracotta-ink" },
  { value: 4, unit: "件", label: "地域プロジェクト", accent: "text-sage-ink", underline: "bg-sage-ink" },
  { value: 5, unit: "名", label: "共創パートナー", accent: "text-deep-green", underline: "bg-deep-green" },
  { value: 2, unit: "名", label: "受入学生インターン", accent: "text-terracotta-ink", underline: "bg-terracotta-ink" },
];

/* 1つずつ決まっていく見え方にするための間隔（ミリ秒） */
const STAGGER = 180;

export function Kpi() {
  return (
    <section className="bg-white px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="text-[11px] font-bold tracking-[0.28em] text-charcoal/70">OUR KPI</p>
          <h2
            className="mt-6 font-bold leading-[1.35] tracking-[-0.02em] text-charcoal"
            style={{ fontSize: "clamp(26px, 3.4vw, 44px)" }}
          >
            大切にしている指標
          </h2>
          <p className="mt-5 max-w-[32em] text-[15px] leading-[2] text-charcoal/70 md:text-[16px]">
            Visionの実現に向けて、ひとつずつ、形にしてきた実績です。
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {/* 狭い画面でも2つずつ横に並べる。
              1列だと5項目で縦に長くなり、指標を見比べられないまま
              スクロールで流れていってしまう。
              2列なら「DX・AX支援 7／BPO支援 3」が同時に目に入る。

              罫線は、1行目（1・2番目）だけ上を消し、
              右の列（偶数番目）に左の罫線を入れる。
              md以上は5列なので、上の罫線をすべて消して左だけにする。 */}
          <div className="mt-12 grid grid-cols-2 border-t border-charcoal/15 md:mt-16 md:grid-cols-5 md:border-b">
            {indicators.map((item, i) => {
              /* 項目数が奇数のとき、最後のひとつは2列にまたがらせる。
                 片側だけに残ると、上の罫線が半分で切れて描きかけに見える */
              const lastAlone = indicators.length % 2 === 1 && i === indicators.length - 1;
              return (
              <div
                key={item.label}
                className={`border-t border-charcoal/15 py-8 first:border-t-0 [&:nth-child(2)]:border-t-0 even:border-l even:pl-6 sm:even:pl-8 md:border-t-0 md:border-l md:px-7 md:py-10 md:first:border-l-0 md:first:pl-0 md:even:pl-7 ${
                  lastAlone ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                <CountUpStat
                  to={item.value}
                  unit={item.unit}
                  label={item.label}
                  delay={i * STAGGER}
                  accentClass={item.accent}
                  underlineClass={item.underline}
                />
              </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
