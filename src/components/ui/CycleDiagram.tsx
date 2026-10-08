"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";

/* ============================================================
   「挑戦と共創が循環する地域へ」の6段階。

   出典は御社の構想図（VISION 2040）。図はHTMLとSVGで組み直している。
   画像のまま貼ると、文字が画像なので検索もAI検索も読めず、
   スマホでは潰れて判読できず、読み上げもできない。

   形は「円が2つ」。
   ・挑戦の円＝個人の「やってみたい」
   ・共創の円＝地域の「課題」
   ・重なったところ＝地域
   個人の「やってみたい」と地域の「課題」は別々にあるのではなく、
   地域で交わって互いに送り合っている。
   輪ひとつだと、この「交わり」が描けない。

   図が画面に入ると、挑戦 → 共創 の順に円が描かれ、通った段階の点が灯る。
   「循環します」と書く代わりに、描かれていくところを見せる。
   一周したら止まり、止まった状態がそのまま読める状態になる。

   広い画面は円を横に、狭い画面は縦に積む。形も向き（時計回り・反時計回り）も
   同じものなので、同じ図が置き方を変えているだけに見える。
   切り替えは xl（1280px）。lg（1024px）だと、円の外のラベルが
   画面からはみ出し、横スクロールが出る。
   狭い画面では、段階の中身は図の下のカードの列で読む。
   並べ方を変えているだけで、内容は重複させていない。

   variant:
     compact … TOPに置く短い版。段階の名前だけ
     full    … 地域プロデュースに置く版。説明と担うプロジェクトまで
   ============================================================ */

/** 節点のラベルを、点のどちら側に出すか */
type Side = "up" | "down" | "left" | "right";

type Step = {
  no: string;
  /** 広い画面の図での位置（枠に対する%）。2つの円の上・外・下の6点 */
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
   円を2つ置くほうが、形と意味が一致する。 */

/* 狭い画面も、同じ「円が2つ」で描く。縦に積むだけ。
   以前は狭い画面だけ1本のレムニスケート（∞）にしていたが、
   同じ図のはずなのに形が別で、サイトの中に似て非なる図が2つあるように
   見えていた。円を縦に積めば、横342pxでも輪の内側にラベルが入る。

   半径・中心間は広い画面と同じ（34 / 44.2＝1.3R）。
   円の上端が y=1、下端が y=113.2 なので、上下に6ずつ余白を取って
   viewBox は 0 -5 100 123.2。枠の比は 100 / 123.2。 */
const VR = 34;
/** 上の円（挑戦）の中心 */
const VCY1 = 35;
/** 下の円（共創）の中心。VCY1 + 1.3R */
const VCY2 = 79.2;
/** viewBox の y を、枠に対する % に直す */
const vy = (y: number) => ((y + 5) / 123.2) * 100;

/* 円を <circle> ではなく <path> で描いているのは、描き始めと向きを
   指定したいため。<circle> は必ず3時から時計回りに始まる。
     上の円 … 9時（01）から時計回りに 01 → 02 → 03
     下の円 … 9時（04）から反時計回りに 04 → 05 → 06
   この向きは広い画面の図を90度回したものと同じ（矢印もそれに合わせてある）。 */
const VTOP = `M${50 - VR} ${VCY1}A${VR} ${VR} 0 0 1 ${50 + VR} ${VCY1}A${VR} ${VR} 0 0 1 ${50 - VR} ${VCY1}`;
const VBOT = `M${50 - VR} ${VCY2}A${VR} ${VR} 0 0 0 ${50 + VR} ${VCY2}A${VR} ${VR} 0 0 0 ${50 - VR} ${VCY2}`;

/* 節点の位置（viewBox の座標）。各円の「外・横・横」の3点。
   side は、選ばれたときに名前を点のどちら側へ出すか（必ず輪の内側へ）。
   内側へ出すので、名前が枠の外へはみ出すことがない。 */
const vspots = [
  { x: 50 - VR, y: VCY1, side: "r" }, // 01 上の円の左
  { x: 50, y: VCY1 - VR, side: "d" }, // 02 上の円の上
  { x: 50 + VR, y: VCY1, side: "l" }, // 03 上の円の右
  { x: 50 - VR, y: VCY2, side: "r" }, // 04 下の円の左
  { x: 50, y: VCY2 + VR, side: "u" }, // 05 下の円の下
  { x: 50 + VR, y: VCY2, side: "l" }, // 06 下の円の右
] as const;

/* 進む向き。節点と節点の中点（円周上の45度のところ）に置く。
   動きを減らす設定の人には円が描かれる様子が見えないので、
   そのときに向きを示すものがこれしか残らない。 */
const vcos = VR * Math.SQRT1_2;
const varrows = [
  { x: 50 - vcos, y: VCY1 - vcos, r: -45, c: "var(--color-terracotta)" },
  { x: 50 + vcos, y: VCY1 - vcos, r: 45, c: "var(--color-terracotta)" },
  { x: 50 - vcos, y: VCY2 + vcos, r: 45, c: "var(--color-sage)" },
  { x: 50 + vcos, y: VCY2 + vcos, r: -45, c: "var(--color-sage)" },
];

/* 点が灯り、名前が出る時刻（秒）。円が描かれていく途中に等間隔で置く。
   上の円は 0.25〜1.75秒、下の円は 1.35〜2.85秒で描かれる（globals.css）。
   間隔0.5秒に対して名前が出ているのは0.48秒なので、2つ同時には出ない。 */
const vDelay = [0.35, 0.85, 1.35, 1.85, 2.35, 2.85];

/* TODO: ②の名称が資料間でずれている。
         構想図では「地域ベンチャー留学」、大学生募集ページでは
         「ローカルベンチャー留学（2027年春予定）」。正式名称を要確認。 */
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
    note: "2027年4月予定",
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

/** 送っているカード（flow）に対して、図のどの点を灯すか。
    事業のカードは図に点を持たない（図から事業名を外したので）。
    そのあいだは直前の段階を灯したままにする＝「01 と 02 のあいだの話」に見える */
const cardToMark = flow.map((f, k) => {
  if (f.kind === "step") return f.i;
  const prev = flow.slice(0, k).filter((x) => x.kind === "step").pop();
  return prev ? prev.i : 0;
});

/* 2つの円の名前。この図の一番の中身なので、広い画面でも狭い画面でも
   円の中に出す（置き方だけ変える）。
   en と note は広い画面の図で使う。狭い画面は ja だけにしている。 */
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
   style に transform を直に書くと、円に組まない狭い画面でも
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
        /* 地は不透明に。狭い画面のカードの地（白）に重ねるため */
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
      /* 地は不透明にしておく。色は deep-green 8% を
         ivory（#f8f5ef＝この図が乗る地）に焼き込んだ値 */
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
        /* 広い画面では6つとも円の上に並ぶので、送る・選ぶという考え方がない */
        if (wide.matches) return;
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!best) return;
        const i = cards.indexOf(best.target as HTMLElement);
        if (i >= 0) select(cardToMark[i] ?? 0);
      },
      { root: strip, threshold: [0.45, 0.7, 0.95] },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  /* 06「実績ができる」まで来てから、もう一度送ると 01 に戻る。
     「06のあとは01へ戻り、循環します」と文で書く代わりに、そうなるようにした。

     末尾に着いた状態で、さらに送る動きがあったときだけ戻す。
     一度目（末尾に着いただけ）では戻さない。読んでいる最中に飛ばされてしまう。

     判定は指を離したとき。触れているあいだに動かすと、iOSの端での
     ゴムのような戻りと引っ張り合って、動きが乱れる。
     トラックパッドの横スクロール（wheel）も同じように拾う。

     戻る様子はそのまま見せる。黙って先頭に入れ替えると、同じカードが
     出ているだけに見えて、一周したことがかえって伝わらない。 */
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const wide = window.matchMedia("(min-width: 1280px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    /** いま列の末尾（06）にいるか */
    const atEnd = () => strip.scrollWidth - strip.clientWidth - strip.scrollLeft <= 2;

    let raf = 0;
    const rewind = () => {
      if (raf || wide.matches) return;
      if (still.matches) {
        strip.scrollLeft = 0;
        return;
      }
      /* 動かしているあいだはスナップを切る。切らないと、1フレームごとに
         近くのカードへ吸い寄せられて、滑らかに戻らずカードを1枚ずつ
         飛び戻る動きになる（実測：2014→1748→1155→859→…）。
         戻り先の 0 はスナップ位置なので、戻してから元に戻せばよい */
      const from = strip.scrollLeft;
      const t0 = performance.now();
      strip.style.scrollSnapType = "none";
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 520);
        strip.scrollLeft = from * Math.pow(1 - p, 3);
        if (p < 1) {
          raf = requestAnimationFrame(tick);
          return;
        }
        raf = 0;
        strip.style.scrollSnapType = "";
      };
      raf = requestAnimationFrame(tick);
    };

    /* 指が触れはじめた時点で末尾にいたか。
       「末尾に着いた」のと「末尾からさらに送った」のを分けるために要る */
    let x0 = 0;
    let fromEnd = false;
    const onStart = (e: TouchEvent) => {
      x0 = e.touches[0]?.clientX ?? 0;
      fromEnd = atEnd();
    };
    const onEnd = (e: TouchEvent) => {
      if (!fromEnd || !atEnd()) return;
      /* 送る向き（次のカードへ）は、指が左へ動く。40pxはふつうの送りの下限 */
      if ((e.changedTouches[0]?.clientX ?? x0) - x0 < -40) rewind();
    };
    const onWheel = (e: WheelEvent) => {
      if (e.deltaX > 8 && atEnd()) rewind();
    };

    strip.addEventListener("touchstart", onStart, { passive: true });
    strip.addEventListener("touchend", onEnd, { passive: true });
    strip.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      strip.removeEventListener("touchstart", onStart);
      strip.removeEventListener("touchend", onEnd);
      strip.removeEventListener("wheel", onWheel);
      if (raf) cancelAnimationFrame(raf);
      strip.style.scrollSnapType = "";
    };
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
      {/* 見出しは図の外、上に置く。図の真ん中は2つの円が重なるところなので、
          長い文を置く場所がない（そこに入るのは「地域」の2文字だけ） */}
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

      {/* ===== 狭い画面の図：挑戦の円と共創の円を、縦に積む =====
          これ全体が飾り（aria-hidden）。読む中身は下のカードの列にあり、
          重複させていない。図は「2つの円が地域で重なっている」ことと、
          いまカードのどこを見ているかだけを示す。

          出すのは番号と、円の名前（挑戦・共創）だけ。
          6つの段階名を輪の中に常に出すと、01と03・04と06が同じ高さで
          ぶつかるので、名前は円が描かれるのに合わせて1つずつ出して消す。 */}
      <div
        ref={figRef}
        aria-hidden
        className={`relative mx-auto w-full max-w-[300px] xl:hidden ${heading ? "mt-8" : ""}`}
        style={{ aspectRatio: "100 / 123.2" }}
      >
        <svg viewBox="0 -5 100 123.2" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="vcycle-fill-t" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-terracotta)" stopOpacity="0.17" />
              <stop offset="100%" stopColor="var(--color-terracotta)" stopOpacity="0.07" />
            </radialGradient>
            <radialGradient id="vcycle-fill-c" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-sage)" stopOpacity="0.17" />
              <stop offset="100%" stopColor="var(--color-sage)" stopOpacity="0.07" />
            </radialGradient>
          </defs>

          {/* 面。掛け算で重ねると、重なったところだけ自然に濃くなる。
              「地域」は色を塗って作るのではなく、2つが重なった結果として出る */}
          <g style={{ mixBlendMode: "multiply" }}>
            <circle cx="50" cy={VCY1} r={VR} fill="url(#vcycle-fill-t)" />
            <circle cx="50" cy={VCY2} r={VR} fill="url(#vcycle-fill-c)" />
          </g>

          {/* 輪郭。画面に入ると、挑戦 → 共創 の順に描かれて止まる */}
          <path
            className="cycle-ring cycle-ring-a"
            d={VTOP}
            pathLength={100}
            fill="none"
            stroke="var(--color-terracotta)"
            strokeOpacity="0.8"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
          <path
            className="cycle-ring cycle-ring-b"
            d={VBOT}
            pathLength={100}
            fill="none"
            stroke="var(--color-sage)"
            strokeOpacity="0.8"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
        </svg>

        {/* 進む向き。歪ませたくないので円のSVGとは別に置く */}
        {varrows.map((a, i) => (
          <svg
            key={i}
            viewBox="0 0 10 10"
            width="11"
            height="11"
            className="absolute"
            style={{
              left: `${a.x}%`,
              top: `${vy(a.y)}%`,
              transform: `translate(-50%, -50%) rotate(${a.r}deg)`,
            }}
          >
            <polygon points="1,1 9,5 1,9" fill={a.c} fillOpacity="0.9" />
          </svg>
        ))}

        {/* 2つの円の名前。この図の中身はこの2語で決まるので、常に出しておく。
            位置は円の中の、点とも「地域」ともぶつからない高さ */}
        {groups.map((g, i) => (
          <p
            key={g.ja}
            className="absolute w-full -translate-x-1/2 -translate-y-1/2 text-center text-[15px] font-bold tracking-[0.08em] text-charcoal/75"
            style={{ left: "50%", top: `${vy(i === 0 ? 26 : 88.2)}%` }}
          >
            {g.ja}
          </p>
        ))}

        {/* 重なったところ＝2つの円が地域で交わるところ */}
        <span
          className="absolute left-1/2 flex h-[52px] w-[52px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background text-[16px] font-bold leading-none tracking-[0.06em] text-charcoal/85"
          style={{ top: `${vy((VCY1 + VCY2) / 2)}%` }}
        >
          地域
        </span>

        {/* 6つの点。円が描かれていくのに合わせて灯り、名前が一度だけ出る。
            横に送ると、いま見ているカードの点だけが大きく灯ったままになる */}
        {steps.map((st, k) => {
          const v = vspots[k];
          const tone =
            k < 3
              ? "border-terracotta/70 group-data-[on=true]:border-terracotta group-data-[on=true]:bg-terracotta"
              : "border-sage/70 group-data-[on=true]:border-sage group-data-[on=true]:bg-sage";
          return (
            <span
              key={st.no}
              data-mark
              data-on={k === 0}
              className="cycle-dot group absolute block -translate-x-1/2 -translate-y-1/2"
              style={
                {
                  left: `${v.x}%`,
                  top: `${vy(v.y)}%`,
                  "--cycle-delay": `${vDelay[k]}s`,
                } as CSSProperties
              }
            >
              <span
                className={`block h-[20px] w-[20px] rounded-full border-2 bg-white transition-all duration-300 group-data-[on=true]:h-[28px] group-data-[on=true]:w-[28px] ${tone}`}
              />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold leading-none tabular-nums text-charcoal/55 transition-colors duration-200 group-data-[on=true]:text-white">
                {st.no}
              </span>
              {/* 名前は輪の内側へ出す。外に出す余白が無いので、ここは固定 */}
              <span
                className={`cycle-name absolute whitespace-nowrap rounded-full bg-background/95 px-2.5 py-1 text-[13px] font-bold leading-none text-charcoal shadow-[0_1px_8px_rgba(0,0,0,0.06)] ${
                  v.side === "r"
                    ? "left-[20px] top-1/2 -translate-y-1/2"
                    : v.side === "l"
                      ? "right-[20px] top-1/2 -translate-y-1/2"
                      : v.side === "d"
                        ? "left-1/2 top-[22px] -translate-x-1/2"
                        : "bottom-[22px] left-1/2 -translate-x-1/2"
                }`}
              >
                {st.title}
              </span>
            </span>
          );
        })}
      </div>

      {/* 図を置く面。これが無いと、ページと同じ地に線と文字が散っているだけで、
          ひとつの「図」として認識されない。
          横の余白70pxは、円の外へ出るラベルが面の中に収まる幅 */}
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

        {/* 2つの円の名前と、重なるところ。この図の意味はこの3語で決まる */}
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
            広い画面 … 2つの円の上の座標へ飛ばす
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
            return (
              <li
                key={s.no}
                /* 位置は変数で渡し、xl でだけ使う。left/top を直に書くと、
                   円に組まない画面でも項目がその分ずれて階段状になる */
                className={`${common} relative xl:absolute xl:left-[var(--cx)] xl:top-[var(--cy)] xl:block xl:w-auto xl:border-0 xl:bg-transparent xl:p-0`}
                style={{ "--cx": `${s.x}%`, "--cy": `${s.y}%` } as CSSProperties}
              >
                {/* 点は円の上に置く。狭い画面では上の図の側に出しているので隠す */}
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
                  {/* 番号は、進む順を示すもの。順序は矢印・円の描かれ方・並びが
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
          この図がいちばん言いたいこと＝循環していることは、文でも書いておく。

          以前はここに「横に送ると…06のあとは01へ戻り…」と操作の説明を書いていた。
          会社の話ではなくUIの話だったうえ、内部の通し番号が文章に漏れていた。
          送れることはカードの見え方（次の1枚がのぞいている）が示すので、
          ここは意味だけを書く。
          詳しい版は、節の最後に別の一文があるので出さない。

          揃えは左。節の他の要素（見出し・カード・下のリンク）と同じ軸に乗せる。
          図だけが面の中で中央なので、キャプションまで中央にすると軸が2本になる */}
      {!detail && (
        <p className="mt-6 text-[13px] leading-[1.9] text-charcoal/70">
          挑戦が共創を生み、共創が次の挑戦を生む。
        </p>
      )}

      {detail && (
        <p className="mt-10 text-center text-[14px] leading-[1.9] text-charcoal/75 xl:mt-14">
          この循環をつくることが、地域プロデュース事業です。
        </p>
      )}
    </div>
  );
}
