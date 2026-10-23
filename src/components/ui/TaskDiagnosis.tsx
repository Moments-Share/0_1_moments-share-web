"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HOURLY_YEN,
  diagnose,
  headcountOptions,
  hoursOptions,
  recommendationCopy,
  taskOptions,
} from "@/lib/diagnosis";

/* ============================================================
   定型業務の診断。3問・30秒。

   固定の試算（年72万円）の代わりに置く。読む人の規模で数字が変わるので、
   月20万円の伴走と並べても矛盾しない。前提は lib/diagnosis.ts に分けてある。

   主役は「時間」。金額は小さく併記する。時間のほうが実感に近いし、
   金額は時給の置き方ひとつで変わる数字なので、大きく出すと疑われる。

   計算はブラウザの中だけで完結する。入力した内容はどこにも送らない。
   静的書き出しのままで動く。

   JSが動かない環境では、選択肢は出るが結果は出ない。
   そのときのために、下に「分からなくても相談できる」導線を常に置いてある。
   ============================================================ */

const pill =
  "cursor-pointer rounded-full border px-4 py-2.5 text-[13px] font-bold transition-colors md:text-[14px]";
const pillOff = "border-charcoal/20 bg-white text-charcoal/75 hover:border-charcoal/40";
const pillOn = "border-green-deep bg-green-deep text-white";

function Question({
  no,
  text,
  children,
}: {
  no: number;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-charcoal/15 pt-6">
      <legend className="sr-only">{text}</legend>
      <div className="flex items-baseline gap-3">
        <span aria-hidden className="text-[12px] font-bold tabular-nums text-sage-ink">
          Q{no}
        </span>
        <p className="text-[15px] font-semibold leading-[1.6] text-charcoal md:text-[16px]">{text}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2.5">{children}</div>
    </fieldset>
  );
}

export function TaskDiagnosis() {
  const [headcount, setHeadcount] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);

  const result = diagnose(headcount, hours, tasks);
  const rec = result ? recommendationCopy[result.recommendation] : null;

  const toggleTask = (id: string) =>
    setTasks((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="border border-charcoal/15 bg-white p-6 md:p-10">
      <p className="text-[12px] font-bold tracking-[0.18em] text-sage-ink">30秒でわかる</p>
      <h3
        className="mt-4 text-charcoal font-semibold leading-[1.3] tracking-[-0.02em]"
        style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}
      >
        いま、定型作業に<br className="sm:hidden" />どれだけ時間を使っていますか。
      </h3>

      <div className="mt-8 space-y-7">
        <Question no={1} text="事務や定型作業をしている方は、何人いますか？">
          {headcountOptions.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={headcount === o.id}
              onClick={() => setHeadcount(o.id)}
              className={`${pill} ${headcount === o.id ? pillOn : pillOff}`}
            >
              {o.label}
            </button>
          ))}
        </Question>

        <Question no={2} text="その方1人が、1日に定型作業へ使う時間は？">
          {hoursOptions.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={hours === o.id}
              onClick={() => setHours(o.id)}
              className={`${pill} ${hours === o.id ? pillOn : pillOff}`}
            >
              {o.label}
            </button>
          ))}
        </Question>

        <Question no={3} text="どの作業が多いですか？（いくつでも）">
          {taskOptions.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={tasks.includes(o.id)}
              onClick={() => toggleTask(o.id)}
              className={`${pill} ${tasks.includes(o.id) ? pillOn : pillOff}`}
            >
              {o.label}
            </button>
          ))}
        </Question>
      </div>

      {/* 結果。3問そろうまでは出さない。
          aria-live で、選び終わった時点で読み上げにも伝わるようにする */}
      <div aria-live="polite" className="mt-9 border-t-2 border-charcoal/15 pt-8">
        {!result || !rec ? (
          <p className="text-[14px] leading-[1.9] text-charcoal/55">
            3つ選ぶと、年間の時間が出ます。
          </p>
        ) : (
          <>
            <p className="text-[13px] font-bold tracking-[0.1em] text-charcoal/55">
              年間、これだけの時間が使われています
            </p>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-2 text-charcoal">
              <span
                className="font-semibold leading-[0.95] tracking-[-0.03em] tabular-nums"
                style={{ fontSize: "clamp(42px, 7vw, 76px)" }}
              >
                {result.hoursLo === result.hoursHi
                  ? result.hoursLo.toLocaleString()
                  : `${result.hoursLo.toLocaleString()}〜${result.hoursHi.toLocaleString()}`}
              </span>
              <span className="text-[18px] font-bold md:text-[22px]">時間</span>
            </p>
            {/* 金額は小さく。時給の置き方ひとつで変わる数字なので主役にしない */}
            <p className="mt-3 text-[14px] leading-[1.9] text-charcoal/70 md:text-[15px]">
              人件費に換算すると、年{" "}
              <strong className="font-semibold text-charcoal">
                {result.yenLo === result.yenHi
                  ? result.yenLo.toLocaleString()
                  : `${result.yenLo.toLocaleString()}〜${result.yenHi.toLocaleString()}`}
                万円
              </strong>{" "}
              相当（時給{HOURLY_YEN.toLocaleString()}円で計算）
            </p>

            <div className="mt-8 border-t border-charcoal/10 pt-7">
              <p className="text-charcoal font-semibold leading-[1.5] tracking-[-0.01em] md:text-[17px]">
                {rec.label}
              </p>
              <p className="mt-3 max-w-[34em] text-[14px] leading-[1.95] text-charcoal/75 md:text-[15px]">
                {rec.body}
              </p>
              <Link href={rec.href} className="btn btn-solid-green mt-6 px-8 py-3.5">
                {rec.cta} →
              </Link>
            </div>
          </>
        )}
      </div>

      {/* 前提を画面に出す。出さないと、どこから出た数字か分からない */}
      <p className="mt-8 text-[12px] leading-[1.9] text-charcoal/55">
        年240日で計算。ここで出るのは、いま使われている時間です。どこまで減らせるかは業務によって変わります。
        入力内容は送信されません。
      </p>
    </div>
  );
}
