"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";

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
   切り替えは xl（1280px）。lg（1024px）だと、∞の右端のラベル
   （13em の固定幅）が画面からはみ出し、横スクロールが出る。
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

/* 事業の名前は、ここ（段階＝点）には置かない。
   事業は「ある状態」ではなく「次の状態へ移す力」なので、下の betweens で
   段階と段階のあいだ（弧）に置いている。
   両方に置くと、同じ名前が図の中に2回ずつ出て、どちらが本体か分からなくなる。
   地域プロデュースは循環そのものなので、図の下の一行で受ける。 */

/* 広い画面は「本物の円を2つ」で描いている（下のSVGを参照）。
   半径34・中心間44.2（=1.3R）。節点は各円の上・外・下の3点。

   以前は1本のレムニスケート（∞）で2つの輪を描いていたが、
   この図の意味は「挑戦の円」と「共創の円」が地域で交わることなので、
   円を2つ置くほうが、形と意味が一致する。
   狭い画面はいまもレムニスケート（下の VPATH）を使っている。 */

/* 狭い画面用の、縦向きの∞。
   横幅342pxに2つの円を横に並べると、輪の外にも内にもラベルが入らない。
   縦に積めば入るので、こちらはレムニスケートのまま。
   光の帯の dasharray / dashoffset はこの道のりに合わせてある。

   なぜ縦にするか：横のままだと、輪の外にラベルを出す余白が無い。
   390px画面で使える幅は342pxしかなく、段階名は最長8文字（約104px）。
   縦にすると輪の内側に入る。 */
const VPATH =
  "M50.0 128.0L52.7 127.9L55.4 127.8L58.0 127.5L60.6 127.1L63.2 126.7L65.6 126.1L67.9 125.4L70.1 124.7L72.2 123.9L74.2 123.0L76.0 122.0L77.7 121.0L79.3 120.0L80.6 118.8L81.9 117.7L83.0 116.5L83.9 115.4L84.7 114.2L85.3 112.9L85.8 111.7L86.2 110.5L86.4 109.3L86.5 108.1L86.5 106.9L86.4 105.7L86.2 104.5L85.9 103.3L85.5 102.2L85.0 101.1L84.5 100.0L83.8 98.9L83.1 97.8L82.3 96.8L81.5 95.8L80.6 94.8L79.7 93.8L78.7 92.9L77.7 91.9L76.7 91.0L75.6 90.1L74.5 89.3L73.3 88.4L72.1 87.6L70.9 86.8L69.7 85.9L68.5 85.1L67.2 84.4L65.9 83.6L64.7 82.8L63.4 82.1L62.1 81.4L60.7 80.6L59.4 79.9L58.1 79.2L56.7 78.5L55.4 77.8L54.1 77.1L52.7 76.4L51.4 75.7L50.0 75.0L48.6 74.3L47.3 73.6L45.9 72.9L44.6 72.2L43.3 71.5L41.9 70.8L40.6 70.1L39.3 69.4L37.9 68.6L36.6 67.9L35.3 67.2L34.1 66.4L32.8 65.6L31.5 64.9L30.3 64.1L29.1 63.2L27.9 62.4L26.7 61.6L25.5 60.7L24.4 59.9L23.3 59.0L22.3 58.1L21.3 57.1L20.3 56.2L19.4 55.2L18.5 54.2L17.7 53.2L16.9 52.2L16.2 51.1L15.6 50.0L15.0 48.9L14.5 47.8L14.1 46.7L13.8 45.5L13.6 44.3L13.5 43.1L13.5 41.9L13.6 40.7L13.8 39.5L14.2 38.3L14.7 37.1L15.3 35.8L16.1 34.6L17.0 33.5L18.1 32.3L19.4 31.2L20.7 30.0L22.3 29.0L24.0 28.0L25.8 27.0L27.8 26.1L29.9 25.3L32.1 24.6L34.4 23.9L36.8 23.3L39.4 22.9L42.0 22.5L44.6 22.2L47.3 22.1L50.0 22.0L52.7 22.1L55.4 22.2L58.0 22.5L60.6 22.9L63.2 23.3L65.6 23.9L67.9 24.6L70.1 25.3L72.2 26.1L74.2 27.0L76.0 28.0L77.7 29.0L79.3 30.0L80.6 31.2L81.9 32.3L83.0 33.5L83.9 34.6L84.7 35.8L85.3 37.1L85.8 38.3L86.2 39.5L86.4 40.7L86.5 41.9L86.5 43.1L86.4 44.3L86.2 45.5L85.9 46.7L85.5 47.8L85.0 48.9L84.5 50.0L83.8 51.1L83.1 52.2L82.3 53.2L81.5 54.2L80.6 55.2L79.7 56.2L78.7 57.1L77.7 58.1L76.7 59.0L75.6 59.9L74.5 60.7L73.3 61.6L72.1 62.4L70.9 63.2L69.7 64.1L68.5 64.9L67.2 65.6L65.9 66.4L64.7 67.2L63.4 67.9L62.1 68.6L60.7 69.4L59.4 70.1L58.1 70.8L56.7 71.5L55.4 72.2L54.1 72.9L52.7 73.6L51.4 74.3L50.0 75.0L48.6 75.7L47.3 76.4L45.9 77.1L44.6 77.8L43.3 78.5L41.9 79.2L40.6 79.9L39.3 80.6L37.9 81.4L36.6 82.1L35.3 82.8L34.1 83.6L32.8 84.4L31.5 85.1L30.3 85.9L29.1 86.8L27.9 87.6L26.7 88.4L25.5 89.3L24.4 90.1L23.3 91.0L22.3 91.9L21.3 92.9L20.3 93.8L19.4 94.8L18.5 95.8L17.7 96.8L16.9 97.8L16.2 98.9L15.6 100.0L15.0 101.1L14.5 102.2L14.1 103.3L13.8 104.5L13.6 105.7L13.5 106.9L13.5 108.1L13.6 109.3L13.8 110.5L14.2 111.7L14.7 112.9L15.3 114.2L16.1 115.4L17.0 116.5L18.1 117.7L19.4 118.8L20.7 120.0L22.3 121.0L24.0 122.0L25.8 123.0L27.8 123.9L29.9 124.7L32.1 125.4L34.4 126.1L36.8 126.7L39.4 127.1L42.0 127.5L44.6 127.8L47.3 127.9Z";

/* 縦向きのときの、節点と事業の位置（枠に対する%）。
   上の輪が 01〜03（挑戦）、下の輪が 04〜06（共創）、交点はちょうど真ん中。
   side は、選ばれたときに名前を点のどちら側へ出すか（必ず輪の内側へ） */
const vspots = [
  { x: 22.29, y: 36.96, side: "r", t: 0 },
  { x: 19.64, y: 16.13, side: "r", t: 0.5 },
  { x: 50.0, y: 9.23, side: "d", t: 1 },
  { x: 80.36, y: 16.13, side: "l", t: 1.5 },
  { x: 76.66, y: 37.67, side: "l", t: 2 },
  { x: 22.29, y: 63.04, side: "r", t: 3 },
  { x: 50.0, y: 90.77, side: "u", t: 4 },
  { x: 76.66, y: 62.33, side: "l", t: 5 },
] as const;
/* t は、光の帯の先頭がその点に届く時刻（秒）。一周6秒。
   節点は道のりで1/6ずつ等間隔なので1秒刻み、
   事業は節点と節点の中点なので0.5秒ずれる。
   一周の秒数（globals.css の cycle-sweep）を変えたら、ここも割り直すこと。 */

/* 進む向き。上の矢印と同じものを -90度回しただけ */
const varrows = [
  { x: 34.66, y: 10.64, r: -11.7 },
  { x: 65.34, y: 10.64, r: 14.2 },
  { x: 20.74, y: 84.58, r: 32.8 },
  { x: 80.64, y: 83.73, r: -44.9 },
];

/* TODO: ②の名称が資料間でずれている。
         構想図では「地域ベンチャー留学」、大学生募集ページでは
         「ローカルベンチャー留学（2027年春予定）」。正式名称を要確認。
   TODO: ③コワーキングスペースの開設時期は、構想図には記載があるが
         サイトでは未定としているため、ここでは時期を書いていない。 */
const steps: Step[] = [
  {
    no: "01",
    x: 64.73,
    y: 9.52,
    side: "up",
    title: "地域を知る",
    body: "働く人・企業・生き方に出会う。",
    project: "西尾働き方図鑑",
    href: "/nishio-hatarakikata-zukan",
  },
  {
    no: "02",
    x: 87.4,
    y: 50.0,
    side: "right",
    title: "挑戦してみる",
    body: "インターンや地域プロジェクトに参加する。",
    project: "地域ベンチャー留学",
  },
  {
    no: "03",
    x: 64.73,
    y: 90.48,
    side: "down",
    title: "つながる",
    body: "若者・企業・学校・行政がつながる。",
    project: "コワーキングスペース",
    note: "準備中",
    /* 専用ページはまだ無い。地域プロデュースの「場づくり」の項へ飛ばす。
       開設が決まってページを作ったら、ここを差し替える */
    href: "/service-produce#coworking",
  },
  {
    no: "04",
    x: 35.27,
    y: 9.52,
    side: "up",
    title: "人と企業が変わる",
    body: "採用・育成・DX・組織が変わる。",
  },
  {
    no: "05",
    x: 12.6,
    y: 50.0,
    side: "left",
    title: "ともに生み出す",
    body: "新しい仕事・プロジェクト・事業をつくる。",
    project: "共創プロジェクト",
  },
  {
    no: "06",
    x: 35.27,
    y: 90.48,
    side: "down",
    title: "実績ができる",
    body: "成果が次の挑戦者を呼び込む。",
    project: "地域に循環",
  },
];

/* 段階と段階の「あいだ」に置く事業。
   事業は、ある状態（点）ではなく、次の状態へ移す力（弧）なので、
   点に貼らずに弧の上へ置く。
     01 地域を知る →〈DX・AX支援〉→ 02 挑戦してみる
       挑戦するには、まず余白がいる。その余白をつくる
     02 挑戦してみる →〈BPO〉→ 03 つながる
       社外パートナーとチームを組んでつなぐ

   x・y は PATH の道のりの中点（1/12 ずつずらした位置）を
   実際に測って出した値。PATH を変えたら計算し直すこと。 */
const betweens = [
  {
    after: 0,
    label: "DX・AX支援",
    href: "/service-dx",
    x: 78.10,
    y: 19.08,
    why: "挑戦するには、まず余白がいる。その余白をつくる。",
  },
  {
    after: 1,
    label: "BPO",
    href: "/service-bpo",
    x: 78.10,
    y: 80.92,
    why: "社外パートナーとチームを組んで、人と企業をつなぐ。",
  },
];

/* 狭い画面では、段階と事業をひと並びのカードにして横へ送る。
   図は番号だけを出し、名前は選ばれたものだけを大きく出す。
   6つの名前を輪の中に常に出すと、01と03（同じ高さ）がぶつかる。
   1つずつ出せば、ぶつかりようがない。 */
const flow: ({ kind: "step"; i: number } | { kind: "biz"; i: number })[] = [
  { kind: "step", i: 0 },
  { kind: "biz", i: 0 },
  { kind: "step", i: 1 },
  { kind: "biz", i: 1 },
  { kind: "step", i: 2 },
  { kind: "step", i: 3 },
  { kind: "step", i: 4 },
  { kind: "step", i: 5 },
];

/* 2つの輪。広い画面では∞の左右の輪の中に名前が出るが、
   狭い画面では∞が組めず、6段階が縦一列になってしまう。
   そのとき「挑戦の輪」と「共創の輪」という、この図の一番の中身が
   跡形もなく消えるので、狭い画面では2つのまとまりに割って見出しを付ける。

   内容は増やしていない。広い画面で輪の中に出しているものと同じ語を、
   並べ方だけ変えて出している。 */
const groups = [
  {
    en: "CHALLENGE",
    ja: "挑戦",
    note: "個人の「やってみたい」",
    tone: "text-terracotta-ink",
    from: 0,
    to: 3,
  },
  {
    en: "CO-CREATION",
    ja: "共創",
    note: "地域の「課題」",
    tone: "text-sage-ink",
    from: 3,
    to: 6,
  },
];

/* 進む向きを示す矢印。動きを減らす設定の人には帯が出ないので、
   そのときに向きが分かるものがなくなってしまう。
   位置と角度は、上の PATH の接線から取っている。 */
const arrows = [
  { x: 80.76, y: 21.38, r: 45, c: "var(--color-terracotta)" },
  { x: 80.76, y: 78.62, r: 135, c: "var(--color-terracotta)" },
  { x: 19.24, y: 21.38, r: 135, c: "var(--color-sage)" },
  { x: 19.24, y: 78.62, r: 45, c: "var(--color-sage)" },
];

/* ラベルを点のどちら側に出すか。

   ずらし方は変数で渡し、xl でだけ効かせる。
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
        /* 地は不透明に。∞の道が 01 のタグの位置を通るため */
        className="inline-block bg-background px-1.5 pb-0.5 text-[12px] font-bold text-navy-ink underline decoration-navy-ink/40 underline-offset-4 transition-colors hover:text-deep-green hover:decoration-deep-green"
      >
        {step.project}
        {step.note && <span className="ml-1 font-medium text-charcoal/60">（{step.note}）</span>} →
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

/** その段階を担う事業。プロジェクトのタグより一段強く見せる。
    事業はサービスページへ辿らせたいので、必ずリンクにする */
function BizTag({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      /* 地は不透明にしておく。04のタグの位置を∞の道が通るので、
         半透明だと線が文字を横切って読めなくなる。
         色は deep-green 8% を ivory（#f8f5ef＝この図が乗る地）に焼き込んだ値 */
      className="inline-block border border-deep-green/40 bg-[#e8e9e2] px-2 py-0.5 text-[11px] font-bold text-deep-green transition-colors hover:border-deep-green hover:bg-[#dde2d8]"
    >
      {label} →
    </Link>
  );
}

/** 円の上の点。円が描かれていくのに合わせて、一度だけ現れる。
    挑戦の円は 0.25〜1.75秒、共創の円は 1.35〜2.85秒で描かれるので、
    その途中に等間隔で置く（円の向きを変えたら、ここも合わせ直すこと） */
const dotDelay = [0.55, 0.95, 1.35, 1.65, 2.05, 2.45];

function Dot({ index }: { index: number }) {
  const ring = index < 3 ? "border-terracotta" : "border-sage";
  return (
    <span
      aria-hidden
      className="cycle-dot relative block h-[13px] w-[13px] shrink-0"
      style={{ "--cycle-delay": `${dotDelay[index] ?? 0}s` } as CSSProperties}
    >
      <span className={`absolute inset-0 rounded-full border-2 bg-white ${ring}`} />
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

  const figRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLOListElement>(null);

  /* 狭い画面で、カードを横に送るたびに、図のどの点にいるかを合わせる。
     位置の計算は IntersectionObserver に任せる（スクロール位置の自前計算をしない）。
     印は飾りなので、React を再描画せず data 属性だけ書き換える。

     JSが動かなくてもカードは全部DOMにあり、横に送れる。
     そのときは01が選ばれたままになるだけで、読める内容は変わらない。 */
  useEffect(() => {
    const strip = stripRef.current;
    const fig = figRef.current;
    if (!strip || !fig) return;

    const wide = window.matchMedia("(min-width: 1280px)");
    const cards = Array.from(strip.children) as HTMLElement[];
    const marks = Array.from(fig.querySelectorAll<HTMLElement>("[data-mark]"));
    if (!cards.length || !marks.length) return;

    const select = (i: number) => {
      marks.forEach((m, k) => {
        m.dataset.on = String(k === i);
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        /* 広い画面では∞の上に並ぶので、送る・選ぶという考え方がない */
        if (wide.matches) return;
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!best) return;
        const i = cards.indexOf(best.target as HTMLElement);
        if (i >= 0) select(i);
      },
      { root: strip, threshold: [0.45, 0.7, 0.95] },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  /* 図が画面に入ったときに一度だけ回す。
     回り続けるものは「ウィジェット」に見え、読ませたい文章とずっと競合する。
     一周したら止まり、止まった状態がそのまま読める状態になる。

     Reveal は TOP にしか掛かっていないので、図が自分で見張る。
     一度動かしたら観察をやめる（戻ってくるたびに回り直さない）。 */
  useEffect(() => {
    const figs = [figRef.current, stripRef.current?.closest("[data-cycle]")].filter(
      Boolean,
    ) as HTMLElement[];
    if (!figs.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.run = "1";
          io.unobserve(e.target);
        }
      },
      { threshold: 0.25 },
    );
    figs.forEach((f) => io.observe(f));
    return () => io.disconnect();
  }, []);

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

      {/* ===== 狭い画面の図：縦向きの∞ =====
          これ全体が飾り。読む中身は下のカードの列にあり、重複させていない。
          番号だけを出し、名前は選ばれたものだけを大きく出す。 */}
      <div
        ref={figRef}
        aria-hidden
        className={`relative mx-auto w-full max-w-[380px] xl:hidden ${heading ? "mt-8" : ""}`}
        style={{ aspectRatio: "100 / 130" }}
      >
        {/* 道は y=22〜128 にしか無いので、上下10ずつだけ残して切る */}
        <svg viewBox="0 10 100 130" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="vcycle-glow-t" cx="50%" cy="25%" r="33%">
              <stop offset="0%" stopColor="var(--color-terracotta)" stopOpacity="0.17" />
              <stop offset="60%" stopColor="var(--color-terracotta)" stopOpacity="0.11" />
              <stop offset="100%" stopColor="var(--color-terracotta)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="vcycle-glow-b" cx="50%" cy="75%" r="33%">
              <stop offset="0%" stopColor="var(--color-sage)" stopOpacity="0.17" />
              <stop offset="60%" stopColor="var(--color-sage)" stopOpacity="0.11" />
              <stop offset="100%" stopColor="var(--color-sage)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="vcycle-stroke" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-terracotta)" />
              <stop offset="50%" stopColor="var(--color-terracotta)" stopOpacity="0.55" />
              <stop offset="50%" stopColor="var(--color-sage)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--color-sage)" />
            </linearGradient>
          </defs>
          <g style={{ mixBlendMode: "multiply" }}>
            <rect y="10" width="100" height="130" fill="url(#vcycle-glow-t)" />
            <rect y="10" width="100" height="130" fill="url(#vcycle-glow-b)" />
          </g>
          <path
            d={VPATH}
            fill="none"
            stroke="url(#vcycle-stroke)"
            strokeOpacity="0.55"
            strokeWidth="0.55"
          />
          <path
            className="cycle-sweep"
            d={VPATH}
            pathLength={100}
            fill="none"
            stroke="var(--color-deep-green)"
            /* 下地（0.55）の2倍以上あると、光ではなく「別の太い線」に見える。
               見えるだけの差をつけて、それ以上は太くしない */
            strokeWidth="0.9"
            strokeOpacity="0.9"
            strokeLinecap="round"
            strokeDasharray="13 87"
            strokeDashoffset={-20.33}
          />
        </svg>

        {varrows.map((a, i) => (
          <svg
            key={i}
            viewBox="0 0 10 10"
            width="11"
            height="11"
            className="absolute"
            style={{
              left: `${a.x}%`,
              top: `${a.y}%`,
              transform: `translate(-50%, -50%) rotate(${a.r}deg)`,
            }}
          >
            <polygon points="1,1 9,5 1,9" fill="var(--color-sage-ink)" fillOpacity="0.75" />
          </svg>
        ))}

        {/* 交点＝2つの輪が地域で交わるところ */}
        <span className="absolute left-1/2 top-1/2 flex h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background text-[19px] font-bold leading-none tracking-[0.06em] text-charcoal">
          地域
        </span>

        {/* 8つの印。選ばれたものだけ大きくなり、名前が出る */}
        {flow.map((f, k) => {
          const v = vspots[k];
          const name = f.kind === "step" ? steps[f.i].title : betweens[f.i].label;
          const num = f.kind === "step" ? steps[f.i].no : null;
          return (
            <span
              key={k}
              data-mark
              data-on={k === 0}
              className="group absolute block -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${v.x}%`, top: `${v.y}%` }}
            >
              <span
                className={`block rounded-full border transition-all duration-300 ${
                  f.kind === "step"
                    ? "h-[22px] w-[22px] border-sage-ink/70 bg-background group-data-[on=true]:h-[30px] group-data-[on=true]:w-[30px] group-data-[on=true]:border-deep-green group-data-[on=true]:bg-deep-green"
                    : "h-[11px] w-[11px] border-deep-green/50 bg-background group-data-[on=true]:h-[18px] group-data-[on=true]:w-[18px] group-data-[on=true]:border-deep-green group-data-[on=true]:bg-deep-green"
                }`}
              />
              {num && (
                <span
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold leading-none tabular-nums text-charcoal/60 transition-colors duration-200 group-data-[on=true]:text-white"
                >
                  {num}
                </span>
              )}
              {/* 名前は、帯が通ったときに出て消える。常には出さない。
                  6つ同時に出すと、01と03（同じ高さ）がぶつかる */}
              <span
                className={`cycle-name absolute whitespace-nowrap rounded-full bg-background/95 px-2.5 py-1 text-[13px] font-bold leading-none text-charcoal shadow-[0_1px_8px_rgba(0,0,0,0.06)] ${
                  v.side === "r"
                    ? "left-[22px] top-1/2 -translate-y-1/2"
                    : v.side === "l"
                      ? "right-[22px] top-1/2 -translate-y-1/2"
                      : v.side === "d"
                        ? "left-1/2 top-[24px] -translate-x-1/2"
                        : "bottom-[24px] left-1/2 -translate-x-1/2"
                }`}
                style={{ "--cycle-delay": `${v.t}s` } as CSSProperties}
              >
                {name}
              </span>
            </span>
          );
        })}
      </div>

      {/* 図を置く面。これが無いと、ページと同じ地に線と文字が散っているだけで、
          ひとつの「図」として認識されない。
          横の余白180pxは、∞の外へ出るラベル（13em）が面の中に収まる幅 */}
      <div
        className={`xl:mx-auto xl:max-w-[960px] xl:rounded-[32px] xl:border xl:border-charcoal/[0.08] xl:bg-white xl:px-[70px] xl:py-16 ${
          heading ? "mt-8 xl:mt-10" : ""
        }`}
      >
      <div
        data-cycle
        className="relative mx-auto w-full max-w-[820px] xl:aspect-[150/84]"
      >
        {/* 挑戦の円と共創の円。重なったところが「地域」。
            これがこの図の意味なので、1本の線で2つの輪を描くのではなく、
            本物の円を2つ置いている。
            半径34・中心間44.2（＝1.3R）はベン図として見慣れた重なり具合。 */}
        <svg
          aria-hidden
          viewBox="0 8 150 84"
          className="pointer-events-none absolute inset-0 hidden h-full w-full xl:block"
        >
          <defs>
            <radialGradient id="cycle-fill-c" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-sage)" stopOpacity="0.17" />
              <stop offset="100%" stopColor="var(--color-sage)" stopOpacity="0.07" />
            </radialGradient>
            <radialGradient id="cycle-fill-t" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-terracotta)" stopOpacity="0.17" />
              <stop offset="100%" stopColor="var(--color-terracotta)" stopOpacity="0.07" />
            </radialGradient>
          </defs>

          {/* 面。掛け算で重ねると、重なったところだけ自然に濃くなる。
              「地域」は色を塗って作るのではなく、2つが重なった結果として出る */}
          <g style={{ mixBlendMode: "multiply" }}>
            <circle cx="52.9" cy="50" r="34" fill="url(#cycle-fill-c)" />
            <circle cx="97.1" cy="50" r="34" fill="url(#cycle-fill-t)" />
          </g>

          {/* 輪郭。画面に入ると、挑戦 → 共創 の順に描かれて止まる。
              rotate(-90) は、描き始めを3時ではなく12時（01と04の位置）にするため */}
          <circle
            className="cycle-ring cycle-ring-a"
            cx="97.1"
            cy="50"
            r="34"
            pathLength={100}
            transform="rotate(-90 97.1 50)"
            fill="none"
            stroke="var(--color-terracotta)"
            strokeOpacity="0.8"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
          <circle
            className="cycle-ring cycle-ring-b"
            cx="52.9"
            cy="50"
            r="34"
            pathLength={100}
            transform="rotate(-90 52.9 50)"
            fill="none"
            stroke="var(--color-sage)"
            strokeOpacity="0.8"
            strokeWidth="0.7"
            strokeLinecap="round"
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
            className="absolute hidden xl:block"
            style={{
              left: `${a.x}%`,
              top: `${a.y}%`,
              transform: `translate(-50%, -50%) rotate(${a.r}deg)`,
            }}
          >
            <polygon points="1,1 9,5 1,9" fill={a.c} fillOpacity="0.9" />
          </svg>
        ))}

        {/* 2つのループの名前と、交わるところ。∞の意味はこの3語で決まる */}
        <div
          aria-hidden
          className="absolute hidden xl:block"
          style={{ left: "68.73%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <p className="text-center text-[16px] font-bold tracking-[0.04em] text-charcoal/80">
            挑戦
          </p>
          <p className="mt-1 text-center text-[11px] leading-[1.7] text-charcoal/60">
            個人の「やってみたい」
          </p>
        </div>
        <div
          aria-hidden
          className="absolute hidden xl:block"
          style={{ left: "31.27%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <p className="text-center text-[16px] font-bold tracking-[0.04em] text-charcoal/80">
            共創
          </p>
          <p className="mt-1 text-center text-[11px] leading-[1.7] text-charcoal/60">
            地域の「課題」
          </p>
        </div>
        <div
          aria-hidden
          className="absolute hidden xl:block"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          {/* 交点は、この図でいちばん言いたい場所（2つの輪が地域で交わる）。
              13pxだと図のなかで最小の文字になり、意味と大きさが逆だった。
              円は交点の広がりより小さいので、線が交わる形は円の外で見える */}
          <span className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-white text-center text-[19px] font-bold leading-none tracking-[0.06em] text-charcoal/85">
            地域
          </span>
        </div>

        {/* 段階と事業のひと並び。
            広い画面 … ∞の道の上の座標へ飛ばす
            狭い画面 … 横に送るカードの列になる。図のどの点にいるかは上の図が示す
            並べ方を変えているだけで、内容はひとつしか持っていない */}
        <ol
          ref={stripRef}
          className={`xl:static xl:block ${
            detail
              ? "max-xl:flex max-xl:snap-x max-xl:snap-mandatory max-xl:gap-4 max-xl:overflow-x-auto max-xl:pb-2 max-xl:[scrollbar-width:none]"
              : "max-xl:mt-7 max-xl:flex max-xl:snap-x max-xl:snap-mandatory max-xl:gap-4 max-xl:overflow-x-auto max-xl:pb-2 max-xl:[scrollbar-width:none]"
          }`}
        >
          {flow.map((f) => {
            const common =
              "max-xl:w-[82%] max-xl:shrink-0 max-xl:snap-center max-xl:rounded-[14px] max-xl:border max-xl:border-charcoal/12 max-xl:bg-white/70 max-xl:p-5";

            /* 段階と段階のあいだに挟まる事業 */
            if (f.kind === "biz") {
              const b = betweens[f.i];
              return (
                <li
                  key={`b-${b.label}`}
                  /* 事業のタグは図には出さない。
                     DX・BPO は図の外（事業カード・各サービスページ）にあり、
                     図の中に入れると段階名とぶつかって、どちらも読めなくなる */
                  className={`${common} relative xl:hidden`}
                  style={{ "--cx": `${b.x}%`, "--cy": `${b.y}%` } as CSSProperties}
                >
                  <p className="text-[10px] font-bold tracking-[0.22em] text-deep-green xl:hidden">
                    BUSINESS
                  </p>
                  <p className="mt-2 text-[17px] font-semibold leading-[1.4] text-charcoal xl:hidden">
                    {b.label}
                  </p>
                  <p className="mt-2 text-[13px] leading-[1.9] text-charcoal/75 xl:hidden">
                    {b.why}
                  </p>
                  <div className="mt-4 xl:mt-0">
                    <BizTag label={b.label} href={b.href} />
                  </div>
                </li>
              );
            }

            const s = steps[f.i];
            const i = f.i;
            const g = groups.find((x) => i >= x.from && i < x.to)!;
            return (
              <li
                key={s.no}
                /* 位置は変数で渡し、xl でだけ使う。left/top を直に書くと、
                   ∞にならない画面でも項目がその分ずれて階段状になる */
                className={`${common} relative xl:absolute xl:left-[var(--cx)] xl:top-[var(--cy)] xl:block xl:w-auto xl:border-0 xl:bg-transparent xl:p-0`}
                style={{ "--cx": `${s.x}%`, "--cy": `${s.y}%` } as CSSProperties}
              >
                {/* どちらの輪の段階か。広い画面では輪の中に書いてあるので出さない */}
                <p className={`text-[10px] font-bold tracking-[0.22em] xl:hidden ${g.tone}`}>
                  {g.en} ／ {g.ja}
                </p>

                {/* 点は∞の道の上に置く。狭い画面では上の図の側に出しているので隠す */}
                <span className="hidden xl:absolute xl:left-0 xl:top-0 xl:block xl:-translate-x-1/2 xl:-translate-y-1/2">
                  <Dot index={i} />
                </span>

                <div
                  style={sideVars[s.side]}
                  /* 幅は内容ぶん。ただし説明文が長いので上限をかけて折り返す。
                     上下の点（01と04、03と06）の間隔は枠の23.1％しかないので、
                     箱がそれより広いと必ずぶつかる。上限160pxはその内側 */
                  className={`xl:absolute xl:left-0 xl:top-0 xl:w-max xl:max-w-[160px] xl:[margin:var(--lo)] xl:[transform:var(--lt)] ${
                    s.side === "left"
                      ? "xl:text-right"
                      : s.side === "right"
                        ? ""
                        : "xl:text-center"
                  }`}
                >
                  {/* 番号は、進む順を示すもの。順序は矢印・光の帯・輪の並びが
                      すでに示しているので、広い画面では出さない（同じ情報の3回目）。
                      狭い画面はカードの通し番号として要るので残す */}
                  <span className="mt-2 block text-[12px] font-medium leading-none tabular-nums text-charcoal/65 xl:hidden">
                    {s.no}
                  </span>
                  <h4 className="mt-2 text-[17px] font-semibold leading-[1.4] text-charcoal xl:mt-0 xl:whitespace-nowrap xl:text-[18px] xl:leading-[1.35]">
                    {s.title}
                  </h4>
                  {/* 説明は、狭い画面ではカードに余白があるので必ず出す。
                      広い画面の短い版（TOP）だけ落とす */}
                  {/* 箱に上限幅をかけて折り返すようにしたので、
                      説明を常に出してもぶつからない。消したり出したりしない */}
                  <p
                    className={`mt-2 text-[13px] leading-[1.9] text-charcoal/80 xl:mt-1.5 xl:text-[12px] xl:leading-[1.7] ${
                      detail ? "" : "xl:hidden"
                    }`}
                  >
                    {s.body}
                  </p>
                  {s.project && (
                    <div
                      /* プロジェクトのタグも図には出さない（理由は事業タグと同じ）。
                         行き先は、図の下の導線と各ページにある */
                      className="mt-4 xl:hidden"
                    >
                      <ProjectTag step={s} />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      </div>

      {/* 図は飾りなので、読み上げも検索も読めない。
          「循環している」ことだけは文でも書いておく */}
      <p className="mt-5 text-[12px] leading-[1.9] text-charcoal/65 xl:hidden">
        横に送ると、上の図のどこの話かが分かります。06のあとは01へ戻り、循環します。
      </p>

      {detail && (
        <p className="mt-10 text-center text-[14px] leading-[1.9] text-charcoal/75 xl:mt-14">
          この循環をつくることが、地域プロデュース事業です。
        </p>
      )}
    </div>
  );
}
