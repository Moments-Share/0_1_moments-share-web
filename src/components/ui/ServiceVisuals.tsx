/* ============================================================
   サービスページの「図」。

   サービスページは文章が多く、スマホで /service-dx は15.4画面あった。
   原因は字数そのものより、同じ形（見出し＋本文）が14回続くことだった。
   読む量を減らさずに、見て分かる形に置き換えるための部品を置く。

   絵はすべてインラインSVG。画像ファイルを増やさない（読み込みが増えると
   本末転倒）。色は currentColor か既存のトークンだけを使い、
   線は細く、塗りはほぼ使わない。サイト全体のトーンに合わせる。
   ============================================================ */

/* ---------- 1. 仕事の型を表すピクトグラム ----------

   「01 データ入力・転記」のように番号と名前だけが並ぶと、
   どれも同じ見た目になり、目が滑る。
   絵を1つ添えるだけで、一覧の中から自分の仕事を探せるようになる。

   絵は輪郭線だけで描く。塗ると5つ並んだときに重く見える。 */

const GLYPHS: Record<string, React.ReactNode> = {
  /* データ入力・転記 — 表から表へ、同じものを移している */
  input: (
    <>
      <rect x="3" y="7" width="13" height="16" rx="1.5" />
      <path d="M3 12h13M9.5 12v11" />
      <rect x="25" y="17" width="13" height="16" rx="1.5" />
      <path d="M25 22h13M31.5 22v11" />
      <path d="M19 14.5h3.5M19 14.5l2-2M19 14.5l2 2" />
    </>
  ),
  /* データ収集・分析 — ばらばらの数字が1つのグラフに集まる */
  analyze: (
    <>
      <path d="M5 33V21M13 33V13M21 33V25M29 33V17" />
      <path d="M3 36h34" />
      <circle cx="5" cy="21" r="1.6" />
      <circle cx="13" cy="13" r="1.6" />
      <circle cx="21" cy="25" r="1.6" />
      <circle cx="29" cy="17" r="1.6" />
      <path d="M5 21l8-8 8 12 8-8" />
    </>
  ),
  /* 定型の顧客対応 — 同じ問いが何度も来る */
  reply: (
    <>
      <path d="M4 9h22a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H13l-6 5v-5H4a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2Z" />
      <path d="M32 17h4a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2v4l-5-4h-5" />
      <path d="M9 16h12M9 20h7" />
    </>
  ),
  /* コンテンツの生成・校正 — 書類と、直しのしるし */
  write: (
    <>
      <path d="M8 4h14l8 8v24a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M22 4v8h8" />
      <path d="M11 21h10M11 26h14M11 31h7" />
      <path d="M26 30l4-4 3 3-4 4h-3v-3Z" />
    </>
  ),
  /* 監視・検知・品質管理 — 見張って、見つける */
  watch: (
    <>
      <circle cx="17" cy="17" r="11" />
      <path d="M12 17.5l3.5 3.5L23 13.5" />
      <path d="M25.5 25.5L35 35" />
    </>
  ),
};

export const taskGlyphOrder = ["input", "analyze", "reply", "write", "watch"] as const;

export function TaskGlyph({ name, className = "" }: { name: string; className?: string }) {
  const g = GLYPHS[name];
  if (!g) return null;
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 40"
      className={`h-9 w-9 md:h-11 md:w-11 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {g}
    </svg>
  );
}

/* ---------- 2. ビフォー・アフターの棒 ----------

   「30分 → 約6分」と文字で書くより、長さの差を見せたほうが早い。
   棒の長さは実際の数値の比にしてある（6/30 = 20%）。
   見た目のために比率を変えない。誇張になる。

   数字そのものは文字でも出す。棒だけだと正確な値が伝わらないし、
   読み上げでは棒は読まれない。 */

export function BeforeAfterBar({
  beforeLabel,
  beforeValue,
  afterLabel,
  afterValue,
  unit,
  note,
}: {
  beforeLabel: string;
  beforeValue: number;
  afterLabel: string;
  afterValue: number;
  unit: string;
  note?: string;
}) {
  const ratio = Math.max(0.04, afterValue / beforeValue);
  return (
    <div>
      <div className="space-y-3.5">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[12px] font-bold tracking-[0.14em] text-charcoal/55">{beforeLabel}</span>
            <span className="text-charcoal/80">
              <span className="text-[22px] font-semibold tabular-nums tracking-[-0.02em] md:text-[26px]">
                {beforeValue}
              </span>
              <span className="ml-1 text-[13px] font-bold">{unit}</span>
            </span>
          </div>
          <div className="mt-2 h-3 w-full rounded-full bg-charcoal/15" />
        </div>
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[12px] font-bold tracking-[0.14em] text-sage-ink">{afterLabel}</span>
            <span className="text-charcoal">
              <span className="text-[30px] font-semibold tabular-nums tracking-[-0.03em] md:text-[38px]">
                {afterValue}
              </span>
              <span className="ml-1 text-[13px] font-bold">{unit}</span>
            </span>
          </div>
          <div className="mt-2 h-3 w-full rounded-full bg-charcoal/[0.06]">
            <div
              className="h-3 rounded-full bg-green-deep"
              style={{ width: `${ratio * 100}%` }}
            />
          </div>
        </div>
      </div>
      {note && <p className="mt-4 text-[12px] leading-[1.8] text-charcoal/55">{note}</p>}
    </div>
  );
}

/* ---------- 3. 進め方のレール ----------

   手順は「番号・名前・説明文」を縦に5つ積むと、それだけで1.3画面になる。
   横一本の線の上に番号を並べれば、全体が何段階あるのかが一目で分かる。

   スマホでは横に並べきれないので、縦の線に変える（横スクロールにはしない。
   手順は全部見えていないと「あと何段階あるのか」が分からない）。 */

export function StepRail({
  steps,
}: {
  steps: { num: string; title: string; desc: string }[];
}) {
  return (
    <ol className="relative md:grid md:grid-flow-col md:auto-cols-fr md:gap-0">
      {/* レールの線。スマホは縦、PCは横に1本通す */}
      <span
        aria-hidden
        className="absolute left-[15px] top-2 bottom-2 w-px bg-charcoal/15 md:left-0 md:right-0 md:top-[15px] md:bottom-auto md:h-px md:w-auto"
      />
      {steps.map((s) => (
        <li key={s.num} className="relative pl-12 pb-9 last:pb-0 md:px-4 md:pb-0 md:pl-0 md:first:pl-0">
          {/* 番号の丸。線の上に乗せるので地の色で塗って線を隠す */}
          <span
            className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/20 bg-ivory text-[12px] font-bold tabular-nums text-sage-ink md:relative md:left-auto md:top-auto"
            aria-hidden
          >
            {s.num}
          </span>
          <h3
            className="mt-0 text-charcoal font-semibold leading-[1.4] tracking-[-0.02em] md:mt-5"
            style={{ fontSize: "clamp(17px, 1.8vw, 21px)" }}
          >
            <span className="sr-only">手順{s.num}：</span>
            {s.title}
          </h3>
          <p className="mt-2.5 text-[14px] leading-[1.9] text-charcoal/75 md:pr-4">{s.desc}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------- 4. DXとAXの関係図 ----------

   「やり方は変えずに速くする」のがDX、「やり方から組み替える」のがAX。
   この違いは、同じ仕事の流れを3段に並べれば一度で分かる。
   文章で3回言い換えるより短い。

   SVGではなく、ふつうの要素で組んである。中に日本語が入るので、
   文字の折り返しと読み上げが効く形にしておきたい。 */

function FlowBox({ children, tone }: { children: React.ReactNode; tone: "faint" | "plain" | "green" }) {
  const cls =
    tone === "green"
      ? "border-green-deep/70 bg-green-deep text-white"
      : tone === "plain"
        ? "border-charcoal/25 bg-white text-charcoal/80"
        : "border-charcoal/15 bg-transparent text-charcoal/45";
  return (
    <span
      className={`flex min-w-0 flex-1 items-center justify-center rounded-[3px] border px-1.5 py-2.5 text-center text-[11px] font-bold leading-[1.4] md:text-[12px] ${cls}`}
    >
      {children}
    </span>
  );
}

function Arrow() {
  return (
    <span aria-hidden className="shrink-0 px-1 text-[11px] text-charcoal/30">
      ›
    </span>
  );
}

export function DxAxDiagram() {
  return (
    <div className="max-w-[460px]">
      {/* 読み上げには、図の意味を1文で渡す。枠の並びは読み上げない */}
      <p className="sr-only">
        いまの仕事は、集める・転記する・つくる・確認するの4工程。DXはこの4工程を変えずに速くします。
        AXは工程そのものを組み替え、人がやるのは確認だけになります。
      </p>
      <div aria-hidden className="space-y-5">
        <div>
          <div className="text-[11px] font-bold tracking-[0.14em] text-charcoal/45">いまの仕事</div>
          <div className="mt-2 flex items-stretch">
            <FlowBox tone="faint">集める</FlowBox>
            <Arrow />
            <FlowBox tone="faint">転記</FlowBox>
            <Arrow />
            <FlowBox tone="faint">つくる</FlowBox>
            <Arrow />
            <FlowBox tone="faint">確認</FlowBox>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-bold tracking-[0.14em] text-charcoal/60">
            DX — 同じ並びのまま、速く
          </div>
          <div className="mt-2 flex items-stretch">
            <FlowBox tone="plain">集める</FlowBox>
            <Arrow />
            <FlowBox tone="plain">転記</FlowBox>
            <Arrow />
            <FlowBox tone="plain">つくる</FlowBox>
            <Arrow />
            <FlowBox tone="plain">確認</FlowBox>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-bold tracking-[0.14em] text-sage-ink">
            AX — 工程そのものを減らす
          </div>
          <div className="mt-2 flex items-stretch">
            <FlowBox tone="green">まとめて自動</FlowBox>
            <Arrow />
            <FlowBox tone="plain">確認</FlowBox>
            {/* 減った分は空けておく。空白そのものが「減った」を表す */}
            <span aria-hidden className="flex-1" />
            <span aria-hidden className="flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
