import Link from "next/link";
import type { CSSProperties } from "react";

/* ============================================================
   「挑戦と共創が循環する地域へ」の6段階。

   出典は御社の構想図（VISION 2040）。図はHTMLとSVGで組み直している。
   画像のまま貼ると、文字が画像なので検索もAI検索も読めず、
   スマホでは潰れて判読できず、読み上げもできない。

   形は∞（無限大）。輪をひとつ描くより、この形のほうが正確だった。
   ・右のループ＝挑戦（個人の「やってみたい」）
   ・左のループ＝共創（地域の「課題」）
   ・交わるところ＝地域
   個人の「やってみたい」と地域の「課題」は別々にあるのではなく、
   地域で交わって互いに送り合っている。
   輪ひとつだと、この「交わり」が描けない。

   光の帯が∞の上を一周し、通過した段階の点が灯る。
   「循環します」と書く代わりに、回っているところを見せる。
   動きはCSSだけ（JSも状態もなし）。

   狭い画面は∞に組めないので、縦一本の道に切り替える。
   同じ要素の並べ方を変えているだけで、内容は重複させていない。

   variant:
     compact … TOPに置く短い版。段階の名前だけ
     full    … 地域プロデュースに置く版。説明と担うプロジェクトまで
   ============================================================ */

/** 節点のラベルを、点のどちら側に出すか */
type Side = "up" | "down" | "left" | "right";

type Step = {
  no: string;
  /** ∞の道の上の位置（枠に対する%）。下の「道のりの計算」で出した値 */
  x: number;
  y: number;
  side: Side;
  title: string;
  body: string;
  /** その段階を担うプロジェクト。無いときは何も出さない */
  project?: string;
  href?: string;
  note?: string;
};

/* 道のりの計算（作り直すときのために残す）

   形はベルヌーイのレムニスケート。
     x = 75 + a·cos t / (1+sin²t)
     y = 50 + 1.95·a·sin t·cos t / (1+sin²t)      a = 53
   最初はベジェ4本で手描きしたが、中心で接線が縦になってしまい、
   「2つの円が並んでいる」ようにしか見えなかった。
   交点をきちんと通る式で描くと、一本の線が交差する形になる。
   240点の折れ線に落としてある（この大きさなら曲線と区別がつかない）。

   6つの節点は交点（位置25と75）を避け、1/6ずつの等間隔に置いた。
   道のりで等間隔なので、帯が届く時刻もそのまま2秒刻みになる。
   01〜03が左（挑戦）、04〜06が右（共創）。

   a や 1.95 を変えたら、節点のx・yと矢印を計算し直すこと。 */
const PATH =
  "M22.0 50.0L22.1 52.7L22.2 55.4L22.5 58.0L22.9 60.6L23.3 63.2L23.9 65.6L24.6 67.9L25.3 70.1L26.1 72.2L27.0 74.2L28.0 76.0L29.0 77.7L30.0 79.3L31.2 80.6L32.3 81.9L33.5 83.0L34.6 83.9L35.8 84.7L37.1 85.3L38.3 85.8L39.5 86.2L40.7 86.4L41.9 86.5L43.1 86.5L44.3 86.4L45.5 86.2L46.7 85.9L47.8 85.5L48.9 85.0L50.0 84.5L51.1 83.8L52.2 83.1L53.2 82.3L54.2 81.5L55.2 80.6L56.2 79.7L57.1 78.7L58.1 77.7L59.0 76.7L59.9 75.6L60.7 74.5L61.6 73.3L62.4 72.1L63.2 70.9L64.1 69.7L64.9 68.5L65.6 67.2L66.4 65.9L67.2 64.7L67.9 63.4L68.6 62.1L69.4 60.7L70.1 59.4L70.8 58.1L71.5 56.7L72.2 55.4L72.9 54.1L73.6 52.7L74.3 51.4L75.0 50.0L75.7 48.6L76.4 47.3L77.1 45.9L77.8 44.6L78.5 43.3L79.2 41.9L79.9 40.6L80.6 39.3L81.4 37.9L82.1 36.6L82.8 35.3L83.6 34.1L84.4 32.8L85.1 31.5L85.9 30.3L86.8 29.1L87.6 27.9L88.4 26.7L89.3 25.5L90.1 24.4L91.0 23.3L91.9 22.3L92.9 21.3L93.8 20.3L94.8 19.4L95.8 18.5L96.8 17.7L97.8 16.9L98.9 16.2L100.0 15.6L101.1 15.0L102.2 14.5L103.3 14.1L104.5 13.8L105.7 13.6L106.9 13.5L108.1 13.5L109.3 13.6L110.5 13.8L111.7 14.2L112.9 14.7L114.2 15.3L115.4 16.1L116.5 17.0L117.7 18.1L118.8 19.4L120.0 20.7L121.0 22.3L122.0 24.0L123.0 25.8L123.9 27.8L124.7 29.9L125.4 32.1L126.1 34.4L126.7 36.8L127.1 39.4L127.5 42.0L127.8 44.6L127.9 47.3L128.0 50.0L127.9 52.7L127.8 55.4L127.5 58.0L127.1 60.6L126.7 63.2L126.1 65.6L125.4 67.9L124.7 70.1L123.9 72.2L123.0 74.2L122.0 76.0L121.0 77.7L120.0 79.3L118.8 80.6L117.7 81.9L116.5 83.0L115.4 83.9L114.2 84.7L112.9 85.3L111.7 85.8L110.5 86.2L109.3 86.4L108.1 86.5L106.9 86.5L105.7 86.4L104.5 86.2L103.3 85.9L102.2 85.5L101.1 85.0L100.0 84.5L98.9 83.8L97.8 83.1L96.8 82.3L95.8 81.5L94.8 80.6L93.8 79.7L92.9 78.7L91.9 77.7L91.0 76.7L90.1 75.6L89.3 74.5L88.4 73.3L87.6 72.1L86.8 70.9L85.9 69.7L85.1 68.5L84.4 67.2L83.6 65.9L82.8 64.7L82.1 63.4L81.4 62.1L80.6 60.7L79.9 59.4L79.2 58.1L78.5 56.7L77.8 55.4L77.1 54.1L76.4 52.7L75.7 51.4L75.0 50.0L74.3 48.6L73.6 47.3L72.9 45.9L72.2 44.6L71.5 43.3L70.8 41.9L70.1 40.6L69.4 39.3L68.6 37.9L67.9 36.6L67.2 35.3L66.4 34.1L65.6 32.8L64.9 31.5L64.1 30.3L63.2 29.1L62.4 27.9L61.6 26.7L60.7 25.5L59.9 24.4L59.0 23.3L58.1 22.3L57.1 21.3L56.2 20.3L55.2 19.4L54.2 18.5L53.2 17.7L52.2 16.9L51.1 16.2L50.0 15.6L48.9 15.0L47.8 14.5L46.7 14.1L45.5 13.8L44.3 13.6L43.1 13.5L41.9 13.5L40.7 13.6L39.5 13.8L38.3 14.2L37.1 14.7L35.8 15.3L34.6 16.1L33.5 17.0L32.3 18.1L31.2 19.4L30.0 20.7L29.0 22.3L28.0 24.0L27.0 25.8L26.1 27.8L25.3 29.9L24.6 32.1L23.9 34.4L23.3 36.8L22.9 39.4L22.5 42.0L22.2 44.6L22.1 47.3Z";

/* TODO: ②の名称が資料間でずれている。
         構想図では「地域ベンチャー留学」、大学生募集ページでは
         「ローカルベンチャー留学（2027年春予定）」。正式名称を要確認。
   TODO: ③コワーキングスペースの開設時期は、構想図には記載があるが
         サイトでは未定としているため、ここでは時期を書いていない。 */
const steps: Step[] = [
  {
    no: "01",
    x: 61.3,
    y: 22.29,
    side: "up",
    title: "地域を知る",
    body: "働く人・企業・生き方に出会う。",
    project: "西尾働き方図鑑",
    href: "/nishio-hatarakikata-zukan",
  },
  {
    no: "02",
    x: 85.33,
    y: 50.0,
    side: "right",
    title: "挑戦してみる",
    body: "インターンや地域プロジェクトに参加する。",
    project: "地域ベンチャー留学",
  },
  {
    no: "03",
    x: 60.69,
    y: 76.66,
    side: "down",
    title: "つながる",
    body: "若者・企業・学校・行政がつながる。",
    project: "コワーキングスペース",
    note: "準備中",
  },
  {
    no: "04",
    x: 38.7,
    y: 22.29,
    side: "up",
    title: "人と企業が変わる",
    body: "採用・育成・DX・組織が変わる。",
  },
  {
    no: "05",
    x: 14.67,
    y: 50.0,
    side: "left",
    title: "ともに生み出す",
    body: "新しい仕事・プロジェクト・事業をつくる。",
    project: "共創プロジェクト",
  },
  {
    no: "06",
    x: 39.31,
    y: 76.66,
    side: "down",
    title: "次の挑戦へ",
    body: "成果が次の挑戦者を呼び込む。",
    project: "地域に循環",
  },
];

/* 進む向きを示す矢印。動きを減らす設定の人には帯が出ないので、
   そのときに向きが分かるものがなくなってしまう。
   位置と角度は、上の PATH の接線から取っている。 */
const arrows = [
  { x: 79.97, y: 20.74, r: 57.2 },
  { x: 79.23, y: 80.64, r: 134.9 },
  { x: 20.03, y: 20.74, r: 122.8 },
  { x: 20.77, y: 80.64, r: 45.1 },
];

/* ラベルを点のどちら側に出すか。

   ずらし方は変数で渡し、lg でだけ効かせる。
   style に transform を直に書くと、∞に組まない狭い画面でも
   ラベルがその分ずれて、画面の外へ飛び出してしまう。 */
const sideVars: Record<Side, CSSProperties> = {
  up: { "--lt": "translate(-50%, -100%)", "--lo": "-14px 0 0 0" },
  down: { "--lt": "translate(-50%, 0)", "--lo": "14px 0 0 0" },
  left: { "--lt": "translate(-100%, -50%)", "--lo": "0 0 0 -14px" },
  right: { "--lt": "translate(0, -50%)", "--lo": "0 0 0 14px" },
} as Record<Side, CSSProperties>;

/** 段階を担うプロジェクト。リンクがあれば辿れるようにする */
function ProjectTag({ step }: { step: Step }) {
  if (!step.project) return null;
  if (step.href) {
    return (
      <Link
        href={step.href}
        className="inline-block border-b border-navy-ink/40 pb-0.5 text-[12px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
      >
        {step.project} →
      </Link>
    );
  }
  return (
    <span className="inline-block border border-charcoal/20 px-2 py-0.5 text-[11px] font-bold text-charcoal/75">
      {step.project}
      {step.note && <span className="ml-1 text-charcoal/60">／{step.note}</span>}
    </span>
  );
}

/** 灯る点。∞でも縦の道でも同じものを使う */
function Dot({ index }: { index: number }) {
  /* 帯の先頭がこの点に届く時刻。6点を道のりで等間隔に置いたので2秒刻み */
  const delay = { "--cycle-delay": `${index * 2}s` } as CSSProperties;
  return (
    <span aria-hidden className="relative block h-[15px] w-[15px] shrink-0">
      <span className="absolute inset-0 rounded-full border-2 border-sage-ink bg-background" />
      <span className="cycle-fill absolute inset-[3px] rounded-full bg-deep-green" style={delay} />
      <span
        className="cycle-pulse absolute -inset-[7px] rounded-full border border-deep-green/60"
        style={delay}
      />
    </span>
  );
}

export function CycleDiagram({
  variant = "full",
  heading,
}: {
  variant?: "full" | "compact" | "ring";
  /** 図の上に出す見出し。渡さなければ見出しは出さない。
      ページごとに言いたいことが違うので、文言は呼び出し側に置いている */
  heading?: string;
}) {
  const compact = variant === "compact";
  /* 説明と担うプロジェクトまで出すか。TOPは名前だけにして短くする。
     "ring" は以前の呼び名。地域プロデュース側の呼び出しを壊さないために残す */
  const detail = !compact;

  return (
    <div className={compact ? "mt-8" : "mt-10 md:mt-14"}>
      {/* 見出しは図の外、上に置く。∞の真ん中は交点なので、
          長い文を置く場所がない（そこに入るのは2文字だけ） */}
      {heading && (
        <div className="text-center">
          <h3
            className="text-charcoal font-semibold leading-[1.3] tracking-[-0.02em]"
            style={{ fontSize: compact ? "clamp(20px, 2.4vw, 30px)" : "clamp(22px, 2.8vw, 34px)" }}
          >
            {heading}
          </h3>
        </div>
      )}

      <div
        className={`relative mx-auto w-full max-w-[980px] lg:aspect-[3/2] ${
          heading ? "mt-8 lg:mt-10" : ""
        }`}
      >
        {/* ∞の道。飾りなので読み上げない */}
        <svg
          aria-hidden
          viewBox="0 0 150 100"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        >
          <defs>
            {/* 左は挑戦（terracotta）、右は共創（sage）。
                ブランドの色の決めごとをそのまま使っている
                （terracotta＝挑戦・行動、sage＝地域・共創）。
                交点で色が入れ替わるので、変わり目を交点に合わせた */}
            <linearGradient id="cycle-stroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-sage)" />
              <stop offset="50%" stopColor="var(--color-sage)" stopOpacity="0.55" />
              <stop offset="50%" stopColor="var(--color-terracotta)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--color-terracotta)" />
            </linearGradient>
            <radialGradient id="cycle-glow-l" cx="37%" cy="50%" r="26%">
              <stop offset="0%" stopColor="var(--color-sage)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--color-sage)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="cycle-glow-r" cx="63%" cy="50%" r="26%">
              <stop offset="0%" stopColor="var(--color-terracotta)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--color-terracotta)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 2つのループの中を淡く染める。どちらの領域かが一目で分かる */}
          <g style={{ mixBlendMode: "multiply" }}>
            <rect width="150" height="100" fill="url(#cycle-glow-l)" />
            <rect width="150" height="100" fill="url(#cycle-glow-r)" />
          </g>

          {/* 道そのもの */}
          <path
            d={PATH}
            fill="none"
            stroke="url(#cycle-stroke)"
            strokeOpacity="0.5"
            strokeWidth="0.5"
            strokeDasharray="1.1 1.1"
          />

          {/* 一周する光の帯。pathLength で長さを100に正規化しているので、
              画面幅が変わっても dasharray を書き直さなくてよい */}
          <path
            className="cycle-sweep"
            d={PATH}
            pathLength={100}
            fill="none"
            stroke="var(--color-deep-green)"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeDasharray="13 87"
            strokeDashoffset={-20.33}
          />
        </svg>

        {/* 進む向き。歪ませたくないので道のSVGとは別に置く */}
        {arrows.map((a, i) => (
          <svg
            key={i}
            aria-hidden
            viewBox="0 0 10 10"
            width="12"
            height="12"
            className="absolute hidden lg:block"
            style={{
              left: `${a.x}%`,
              top: `${a.y}%`,
              transform: `translate(-50%, -50%) rotate(${a.r}deg)`,
            }}
          >
            <polygon points="1,1 9,5 1,9" fill="var(--color-sage-ink)" fillOpacity="0.75" />
          </svg>
        ))}

        {/* 2つのループの名前と、交わるところ。∞の意味はこの3語で決まる */}
        <div
          aria-hidden
          className="absolute hidden lg:block"
          style={{ left: "69%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <p className="text-center text-[10px] font-bold tracking-[0.22em] text-terracotta-ink">
            CHALLENGE
          </p>
          <p className="mt-1.5 text-center text-[22px] font-bold tracking-[0.04em] text-charcoal">
            挑戦
          </p>
          <p className="mt-1 text-center text-[11px] leading-[1.7] text-charcoal/75">
            個人の「やってみたい」
          </p>
        </div>
        <div
          aria-hidden
          className="absolute hidden lg:block"
          style={{ left: "31%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <p className="text-center text-[10px] font-bold tracking-[0.22em] text-sage-ink">
            CO-CREATION
          </p>
          <p className="mt-1.5 text-center text-[22px] font-bold tracking-[0.04em] text-charcoal">
            共創
          </p>
          <p className="mt-1 text-center text-[11px] leading-[1.7] text-charcoal/75">
            地域の「課題」
          </p>
        </div>
        <div
          aria-hidden
          className="absolute hidden lg:block"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <span className="block rounded-full bg-background px-2.5 py-2 text-center text-[13px] font-bold leading-none tracking-[0.06em] text-charcoal">
            地域
          </span>
        </div>

        {/* 6段階。広い画面では∞の道の上へ、狭い画面では縦一本の道になる。
            同じ要素の並べ方を変えているだけで、内容は重複させていない */}
        <ol
          className={`grid grid-cols-1 lg:static lg:block ${
            detail ? "gap-7 sm:grid-cols-2 lg:gap-0" : "gap-5 lg:gap-0"
          }`}
        >
          {steps.map((s, i) => (
            <li
              key={s.no}
              /* 位置は変数で渡し、lg でだけ使う。left/top を直に書くと、
                 ∞にならない画面でも relative の項目がその分ずれて階段状になる */
              className={`relative lg:absolute lg:left-[var(--cx)] lg:top-[var(--cy)] lg:block ${
                detail ? "" : "flex items-center gap-3"
              }`}
              style={{ "--cx": `${s.x}%`, "--cy": `${s.y}%` } as CSSProperties}
            >
              {/* 点は道の上に置く。ラベルはその外側へ逃がす。
                  ラベルの余白は max-lg: で「狭い画面だけ」に効かせる。
                  lg:mt-0 のように打ち消しを書くと、ずらし幅を入れている
                  margin の一括指定と競合して、点と番号が重なる */}
              <span className="lg:absolute lg:left-0 lg:top-0 lg:-translate-x-1/2 lg:-translate-y-1/2">
                <Dot index={i} />
              </span>

              {/* 狭い画面の道。点の下端から次の点の上端まで。
                  行の高さが揃っているので 100% + 行間 - 点 で届く */}
              {i < steps.length - 1 && !detail && (
                <span
                  aria-hidden
                  className="absolute left-[7px] top-[calc(50%+7px)] h-[calc(100%+6px)] w-px bg-charcoal/20 lg:hidden"
                />
              )}

              <div
                className={`lg:absolute lg:left-0 lg:top-0 lg:w-[13em] lg:[margin:var(--lo)] lg:[transform:var(--lt)] ${
                  s.side === "left" ? "lg:text-right" : s.side === "right" ? "" : "lg:text-center"
                } ${detail ? "max-lg:mt-2" : "flex items-baseline gap-2 lg:block"}`}
                style={sideVars[s.side]}
              >
                <span className="block text-[12px] font-medium leading-none tabular-nums text-charcoal/65">
                  {s.no}
                </span>
                <h4
                  className={`text-charcoal font-semibold leading-[1.4] lg:mt-1.5 ${
                    detail ? "mt-1.5 text-[16px] md:text-[17px]" : "text-[14px] md:text-[15px]"
                  }`}
                >
                  {s.title}
                </h4>
                {detail && (
                  <>
                    <p className="mt-1.5 text-[12px] leading-[1.75] text-charcoal/80">{s.body}</p>
                    {s.project && (
                      <div className="mt-2.5">
                        <ProjectTag step={s} />
                      </div>
                    )}
                  </>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* 狭い画面の戻り。縦の道には∞を描く余白がないので、
          点の列に合わせた小さな印で「01へ戻る」ことを示す */}
      {!detail && (
        <p className="mt-4 flex items-center gap-3 text-[12px] text-charcoal/70 lg:hidden">
          <span
            aria-hidden
            className="block w-[15px] shrink-0 text-center text-[13px] leading-none text-sage-ink"
          >
            &#8635;
          </span>
          01「地域を知る」へ戻る
        </p>
      )}

      {detail && (
        <p className="mt-10 text-center text-[14px] leading-[1.9] text-charcoal/75 lg:mt-14">
          この循環をつくることが、地域プロデュース事業です。
        </p>
      )}
    </div>
  );
}
