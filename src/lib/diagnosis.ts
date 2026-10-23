/* ============================================================
   定型業務の診断。計算の前提と選択肢だけを置く。
   画面は components/ui/TaskDiagnosis.tsx にある。

   なぜ固定の試算をやめたか：
   以前は「1日60分 × 月20日 ＝ 年240時間 ＝ 年72万円」と1つの数字を
   出していた。伴走が月20万円（年240万円）だと、読んだ人が電卓を叩いて
   「割に合わない」と判断してしまう。72万円という数字は1人・1時間の
   想定なので、2〜3人の会社には小さすぎた。
   読む人の規模で変わる数字にすれば、価格と矛盾しない。

   出すのは「使われている時間」であって「減らせる時間」ではない。
   削減率を掛けると約束になるので、掛けない。
   どれだけ減らせるかは業務を見ないと分からない。

   数字は必ず幅で出す。1点で出すと、それは約束になる。
   ============================================================ */

/** 人件費の換算に使う時給。仮置き。
 *  変えるとサイト上の金額表示がすべて変わる。
 *  注記にもこの値を出しているので、ここだけ直せばよい。 */
export const HOURLY_YEN = 3000;

/** 月の稼働日数 × 12。年間の作業日数 */
export const WORK_DAYS_PER_YEAR = 20 * 12;

/** Q1 定型作業をしている人数。lo/hi で幅を持たせる */
export const headcountOptions = [
  { id: "h1", label: "1人", lo: 1, hi: 1 },
  { id: "h2", label: "2〜3人", lo: 2, hi: 3 },
  { id: "h3", label: "4〜10人", lo: 4, hi: 10 },
  { id: "h4", label: "11人以上", lo: 11, hi: 20 },
] as const;

/** Q2 1人が1日に定型作業へ使う時間 */
export const hoursOptions = [
  { id: "t1", label: "30分くらい", lo: 0.5, hi: 0.5 },
  { id: "t2", label: "1時間くらい", lo: 1, hi: 1 },
  { id: "t3", label: "2時間くらい", lo: 2, hi: 2 },
  { id: "t4", label: "3時間以上", lo: 3, hi: 4 },
] as const;

/** Q3 どの型の作業が多いか。/service-dx の「5つの型」と同じ分け方。
 *  cs（定型の顧客対応）だけ、人が受けることが多いので分けて扱う */
export const taskOptions = [
  { id: "input", label: "入力・転記", lane: "dx" },
  { id: "analyze", label: "収集・分析", lane: "dx" },
  { id: "cs", label: "定型の顧客対応", lane: "bpo" },
  { id: "write", label: "資料作成", lane: "dx" },
  { id: "check", label: "確認・チェック", lane: "dx" },
] as const;

export type Recommendation = "dx" | "bpo" | "both";

export type DiagnosisResult = {
  hoursLo: number;
  hoursHi: number;
  yenLo: number;
  yenHi: number;
  recommendation: Recommendation;
};

export function diagnose(
  headcountId: string,
  hoursId: string,
  taskIds: string[],
): DiagnosisResult | null {
  const h = headcountOptions.find((o) => o.id === headcountId);
  const t = hoursOptions.find((o) => o.id === hoursId);
  if (!h || !t || taskIds.length === 0) return null;

  const hoursLo = Math.round(h.lo * t.lo * WORK_DAYS_PER_YEAR);
  const hoursHi = Math.round(h.hi * t.hi * WORK_DAYS_PER_YEAR);

  /* 万円単位。10万円未満は切り捨てずに四捨五入する。
     細かい桁を出すと、精度があるように見えてしまう */
  const toManYen = (hours: number) => Math.round((hours * HOURLY_YEN) / 10000);

  const lanes = new Set(
    taskIds.map((id) => taskOptions.find((o) => o.id === id)?.lane).filter(Boolean),
  );
  const recommendation: Recommendation =
    lanes.has("dx") && lanes.has("bpo") ? "both" : lanes.has("bpo") ? "bpo" : "dx";

  return {
    hoursLo,
    hoursHi,
    yenLo: toManYen(hoursLo),
    yenHi: toManYen(hoursHi),
    recommendation,
  };
}

/** 結果ごとの言い方。どちらを選ぶべきかまで出す。
 *  サービスが2つあって、どちらが自分向けか分からない、という問題を
 *  ここで解く */
export const recommendationCopy: Record<
  Recommendation,
  { label: string; body: string; href: string; cta: string }
> = {
  dx: {
    label: "自動化から始めるのが早そうです",
    body: "選ばれた作業は、人がやらなくても回る形にしやすいものです。まず仕組みをつくって、作業そのものを減らします。",
    href: "/contact",
    cta: "自動化について相談する",
  },
  bpo: {
    label: "人が受けたほうがいい作業です",
    body: "人の判断が要る作業なので、まず引き受けます。そのうえで、自動化できる部分から減らしていきます。",
    href: "/service-bpo",
    cta: "BPOのご案内を見る",
  },
  both: {
    label: "分けて考えると、どちらも減らせます",
    body: "自動化できる作業と、人が受けたほうがいい作業が混ざっています。まず業務を分解して、どちらで扱うかを仕分けるところから始めます。",
    href: "/contact",
    cta: "業務の整理から相談する",
  },
};
