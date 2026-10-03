import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/ui/Nav";
import { Reveal } from "@/components/ui/Reveal";
import { RevealChars } from "@/components/ui/RevealChars";
import { charStarts } from "@/lib/reveal-timing";

/* ============================================================
   About — 会社案内ではなく、思想に共感してもらうためのページ。

   読む → 考える → 少し自分と重ねる → 一緒に何かやってみたい
   という流れを、上から下へ一本の物語として通す。

   3つの言葉は役割を混ぜない：
     PURPOSE  すべてがつながる瞬間を、共創する。   なぜ在るのか
     BELIEF   一歩ずつ、できるまで続けるだけ。      どう構えるか
     VISION   「生きててよかった！」があふれる世界。 その先の世界

   冒頭のPURPOSEと最後のVISIONがつながる円環にしてある。
   「すべてがつながる瞬間」が何なのかを、最後まで読むと分かる。

   写真は実写だけを使い、足りないところは無理に埋めない。
   余白・タイポグラフィ・罫線で持たせる。カードを並べない。
   ============================================================ */

export const metadata: Metadata = {
  /* 正規URL。WordPressから移ってきているので、末尾スラッシュ違いや
     パラメータ付きのURLを別ページとして数えられないよう明示する */
  alternates: { canonical: "https://moments-share.com/about/" },
  title: "会社概要・存在意義｜Moments Share合同会社",
  description:
    "Moments Share合同会社の会社概要と存在意義。すべてがつながる瞬間を、共創する。愛知県西尾市を拠点に、DX/AX支援・BPO・地域プロデュースの3事業を展開しています。信念・行動指針・原点・会社情報をご紹介します。",
  openGraph: {
    title: "会社概要・存在意義｜Moments Share合同会社",
    description:
      "すべてがつながる瞬間を、共創する。「生きててよかった！」があふれる世界へ。Moments Shareの存在意義と歩み。愛知県西尾市発。",
    locale: "ja_JP",
    type: "website",
    url: "https://moments-share.com/about",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "会社概要・存在意義｜Moments Share合同会社",
    description:
      "すべてがつながる瞬間を、共創する。「生きててよかった！」があふれる世界へ。愛知県西尾市発。",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "会社概要・存在意義｜Moments Share合同会社",
  "description":
    "すべてがつながる瞬間を、共創する。「生きててよかった！」があふれる世界へ。Moments Shareの存在意義・信念・行動指針・事業・原点・会社概要。",
  "url": "https://moments-share.com/about",
  "publisher": {
    "@type": "Organization",
    "@id": "https://moments-share.com/#organization",
    "name": "Moments Share合同会社",
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://moments-share.com/" },
      { "@type": "ListItem", "position": 2, "name": "About", "item": "https://moments-share.com/about" },
    ],
  },
};

/* PURPOSE の本文。1行ずつ改行を保つ（詩として読ませる） */
const purposeLines = [
  "目指していたことが、カタチになった瞬間。",
  "つらかった経験も、大変だった時間も、",
  "振り返れば、すべてが伏線だったと思える。",
  "そんな人生のハイライトを、",
  "一人でも多くの人と共につくり続けていきます。",
];
const purposeStarts = charStarts(purposeLines, 14, 140);

/* BELIEF の本文。全体で1つの文だが、節ごとに間をあけて
   ゆっくり読ませる。tight は「前の行と間を詰める」印で、
   いまは使っていないが、続きの文を足すときに使える */
const beliefLines: { text: string; tight?: boolean }[] = [
  { text: "私たちは常に" },
  { text: "「なんのためにVisionを実現したいのか？」を問い直し、" },
  { text: "「次は、どうすればできるか？」と失敗と向き合いながら、" },
  { text: "一つずつ、この理念を体現していきます。" },
];

/* 3つの行動指針。個人の一歩 → 積み重ね → 共創、の順に並べる */
const coreValues = [
  {
    en: "Moment",
    title: "いま、できることをしよう。",
    body: "この瞬間に感謝する。いま、目の前の人にどう貢献できるかを考えて、行動する。",
  },
  {
    en: "Moments",
    title: "一歩ずつ、積み重ねよう。",
    body: "過去の失敗と向き合い、行動し、改善し続けよう。",
  },
  {
    en: "Moments Share",
    title: "「やりきってよかった！」を共創しよう！",
    body: "カタチになるまで、最後まで行動し続けよう。感動を分かち合おう！",
  },
];

/* 7つの判断基準。補足文を持っていないので、開閉させるものが無い。
   行動指針の <details> と並べるが、こちらは開閉しない一覧にする */
const stances = [
  { en: "Self Driven", ja: "自分ごとで動こう。" },
  { en: "Challenge", ja: "まず、やってみよう。" },
  { en: "Better Everyday", ja: "昨日より、少しずつ良くしよう。" },
  { en: "Legacy", ja: "100年後に、誇れる選択をしよう。" },
  { en: "Purpose", ja: "目的から、考えなおそう。" },
  { en: "Co-Create", ja: "互いを尊重し、共創しよう。" },
  { en: "Build Systems", ja: "仕組みを創ろう。" },
];

/* 3事業。サービスとしてではなく「担う役割」から書く */
const businesses = [
  {
    role: "余白をつくる",
    en: "DX / AX",
    name: "DX・AX支援",
    body: "人がやらなくてもいい仕事を減らし、挑戦するための余白をつくる。",
    href: "/service-dx",
  },
  {
    role: "人と仕事をつなぐ",
    en: "BPO",
    name: "BPO",
    body: "必要な仕事と多様な人の力をつなぎ、挑戦を続けられる体制をつくる。",
    href: "/service-bpo",
  },
  {
    role: "きっかけをつくる",
    en: "PRODUCE",
    name: "地域プロデュース",
    body: "人・企業・想いが出会い、新しい挑戦が生まれるきっかけをつくる。",
    href: "/service-produce",
  },
];

/* 3事業の先に起きること。最後は最初へ戻る */
const cycle = [
  "余白が生まれる",
  "人と仕事がつながる",
  "挑戦が生まれる",
  "新しい仕事・事業が生まれる",
  "実績ができる",
];

/* 循環の5点の位置（コンテナ幅・高さに対する%）。真上から時計回りに72度ずつ、
   楕円（横30% / 縦29%）に沿わせてある。縦を36%から詰めたのは、
   まるの半径（幅の13.5%）ぶんが箱の上下からはみ出していたため。

   left / top を直に書くと md未満（縦一列のとき）にも効いてしまい、
   項目がずれて横にはみ出す。md でだけ効かせたいので CSS変数に入れ、
   md:[left:var(--cx)] で取り出す */
const cycleSpots = [
  { "--cx": "50%", "--cy": "21%" },
  { "--cx": "78.5%", "--cy": "41%" },
  { "--cx": "67.6%", "--cy": "73.5%" },
  { "--cx": "32.4%", "--cy": "73.5%" },
  { "--cx": "21.5%", "--cy": "41%" },
];

/* 5つの円の色。ロゴマークの粒（ティール・ブルー・パープル・コーラル・
   オレンジ）をそのまま薄めて使う。太いグラデーションの輪は他社のロゴに
   寄ってしまうので使わない。ロゴと同じ「まるが集まる」形で見せる */
const bubbleTints = [
  "rgba(44,201,214,0.14)",
  "rgba(65,105,240,0.10)",
  "rgba(123,63,228,0.09)",
  "rgba(255,123,138,0.13)",
  "rgba(249,184,78,0.17)",
];

/* スマホで軌道の上に置く番号の色。上の円と同じ並び */
const bubbleInks = ["#1f9aa4", "#3457c4", "#6a35c0", "#d4566a", "#c98a2a"];

/* ロゴのまわりに散る小さな粒。位置と大きさと色。装飾なので md以上だけ */
const specks = [
  { "--cx": "50%", "--cy": "2.5%", "--d": "9px", "--c": "#f9b84e" },
  { "--cx": "90%", "--cy": "22%", "--d": "7px", "--c": "#4169f0" },
  { "--cx": "88%", "--cy": "62%", "--d": "11px", "--c": "#ff7b8a" },
  { "--cx": "50%", "--cy": "94%", "--d": "8px", "--c": "#7b3fe4" },
  { "--cx": "11%", "--cy": "63%", "--d": "10px", "--c": "#2cc9d6" },
  { "--cx": "9%", "--cy": "21%", "--d": "6px", "--c": "#f9b84e" },
];

/* 4th Place が何を指すか。5つ並べて、最後だけ長くする */
const placeLines = [
  "想いを話せる。",
  "仲間と出会える。",
  "挑戦できる。",
  "失敗できる。",
  "そして、カタチになるまで続けられる。",
];

/* VISION。挑戦から「生きててよかった」までの道のり */
const visionSteps = ["挑戦した。", "失敗した。", "誰かと出会った。", "続けた。", "カタチになった。"];

/* 3事業のカード。三角形の各頂点に同じ組みで置く */
function BusinessCard({ b }: { b: (typeof businesses)[number] }) {
  return (
    <>
      <p
        className="font-bold leading-[1.4] tracking-[-0.02em] text-charcoal"
        style={{ fontSize: "clamp(20px, 2.2vw, 26px)" }}
      >
        {b.role}
      </p>
      <p className="mt-4 text-[11px] font-bold tracking-[0.22em] text-terracotta-ink">{b.en}</p>
      <p className="mt-2 text-[15px] font-bold text-charcoal md:text-[16px]">{b.name}</p>
      <p className="mt-4 text-[14px] leading-[2] text-charcoal/80 md:text-[15px]">{b.body}</p>
      <Link
        href={b.href}
        className="mt-6 inline-block border-b border-navy-ink/40 pb-0.5 text-[13px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
      >
        詳しく →
      </Link>
    </>
  );
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav heroTone="dark" />
      <main id="main-content">
        {/* ===== 01 PURPOSE — 思想の起点。写真と余白だけで受ける ===== */}
        <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-[#16281f]">
          <div className="absolute inset-0">
            <Image
              src="/photos/hero-nishio.jpg"
              alt="愛知県西尾市の川辺の風景"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(16,32,42,0.62) 0%, rgba(16,32,42,0.42) 42%, rgba(16,32,42,0.86) 100%)",
              }}
            />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 pt-40 md:px-10 md:pb-28">
            <p className="text-[12px] font-bold tracking-[0.28em] text-white/70">PURPOSE</p>
            <h1
              className="mt-7 max-w-[15em] font-bold leading-[1.28] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(34px, 6.4vw, 92px)" }}
            >
              すべてがつながる瞬間を、
              <br className="hidden sm:block" />
              共創する。
            </h1>

            {/* 本文だけ1文字ずつ現れる。ここはページの入口なので、
                読み手の速度に合わせて言葉が置かれていく形にする */}
            <div className="mt-12 max-w-[34em] space-y-2 text-[15px] leading-[2.2] text-white/85 md:mt-14 md:text-[17px]">
              {purposeLines.map((line, i) => (
                <RevealChars key={line} text={line} start={purposeStarts[i]} step={14} />
              ))}
            </div>
          </div>
        </section>

        {/* ===== 02 BELIEF — 白と余白。信じていることを静かに置く ===== */}
        <section className="bg-white py-28 md:py-44">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <Reveal>
              <p className="text-[12px] font-bold tracking-[0.28em] text-sage-ink">
                BELIEF — 私たちが信じていること
              </p>
              <h2
                className="mt-7 max-w-[13em] font-bold leading-[1.32] tracking-[-0.03em] text-charcoal"
                style={{ fontSize: "clamp(30px, 4.8vw, 66px)" }}
              >
                一歩ずつ、
                <br className="hidden sm:block" />
                できるまで続けるだけ。
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              {/* 左寄せのまま。中央寄せの長文はスマホで行頭が揃わず読みにくい */}
              <div
                className="mt-12 max-w-[34em] leading-[2.1] text-charcoal/80 md:mt-16"
                style={{ fontSize: "clamp(16px, 1.7vw, 19px)" }}
              >
                {beliefLines.map((line, i) => (
                  <p key={line.text} className={i === 0 ? "" : line.tight ? "mt-0" : "mt-7"}>
                    {line.text}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== 03 HOW WE ACT — 信念を、日々の行動へ落とす ===== */}
        <section className="bg-ivory py-24 md:py-36">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <Reveal>
              <p className="text-[12px] font-bold tracking-[0.28em] text-sage-ink">HOW WE ACT</p>
              <h2
                className="mt-7 max-w-[16em] font-bold leading-[1.35] tracking-[-0.02em] text-charcoal"
                style={{ fontSize: "clamp(26px, 3.8vw, 50px)" }}
              >
                想いだけで、終わらせないために。
              </h2>
              <p className="mt-8 max-w-[32em] text-[15px] leading-[2.1] text-charcoal/80 md:text-[16px]">
                私たちはBeliefを体現するため、日々の「3つの行動指針」と「7つの判断基準」を大切にしています。
              </p>
            </Reveal>


            {/* --- 指針 × 基準。縦に積むと2画面ぶんになるので、
                  横に並べて「かけ算」として見せる。

                  「×」は見出しと同じ行に置く。中央に置くと本文の真ん中に
                  浮いてしまい、2つの見出しが別々のものに見える。
                  そのため2段のグリッド（見出しの行／本文の行）にして、
                  スマホでは order で〈左見出し→左本文→×→右見出し→右本文〉に戻す。

                  行動指針は本文を持っているので <details> で畳む。
                  JSは使わない。本文はHTMLに残るので検索・AI検索には従来どおり読まれる --- */}
            <div
              className="mt-20 grid gap-y-10 md:mt-28
                         lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.05fr)]
                         lg:grid-rows-[auto_minmax(0,1fr)] lg:gap-y-10"
            >
              {/* 見出しの行・左 */}
              <div className="order-1 lg:col-start-1 lg:row-start-1 lg:pr-14">
                <Reveal>
                  <p className="text-[11px] font-bold tracking-[0.24em] text-charcoal/60">
                    3つの行動指針 — どう動くか
                  </p>
                  <h3
                    className="mt-5 font-semibold leading-[1.4] tracking-[-0.02em] text-charcoal"
                    style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}
                  >
                    日々の行動をつくる指針。
                  </h3>
                </Reveal>
              </div>

              {/* 見出しの行・中央の「×」。
                  lg では左右の見出しと同じ組み（ラベル行 + mt-5）を空で作り、
                  h3 と同じ高さに × が来るようにする。
                  スマホでは横罫にはさまれた区切りとして倒れる */}
              <div
                aria-hidden
                className="order-3 flex items-center justify-center gap-5
                           lg:order-none lg:col-start-2 lg:row-start-1 lg:block lg:px-1"
              >
                <span className="h-px flex-1 bg-charcoal/15 lg:hidden" />
                <span className="hidden text-[11px] font-bold leading-normal tracking-[0.24em] lg:block">
                  &nbsp;
                </span>
                <span
                  className="block font-light leading-[1.4] text-charcoal/40 lg:mt-5"
                  style={{ fontSize: "clamp(26px, 2.8vw, 36px)" }}
                >
                  ×
                </span>
                <span className="h-px flex-1 bg-charcoal/15 lg:hidden" />
              </div>

              {/* 見出しの行・右 */}
              <div className="order-4 lg:col-start-3 lg:row-start-1 lg:pl-14">
                <Reveal delay={0.06}>
                  <p className="text-[11px] font-bold tracking-[0.24em] text-charcoal/60">
                    7つの判断基準 — どう選ぶか
                  </p>
                  <h3
                    className="mt-5 font-semibold leading-[1.4] tracking-[-0.02em] text-charcoal"
                    style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}
                  >
                    日々の決断を支える基準。
                  </h3>
                </Reveal>
              </div>

              {/* 本文の行・左：3つの行動指針 */}
              <div className="order-2 lg:col-start-1 lg:row-start-2 lg:pr-14">
                <Reveal delay={0.1}>
                  <ol className="border-t border-charcoal/15">
                    {coreValues.map((v, i) => (
                      <li key={v.en}>
                        {/* 最初の1つだけ開いておく。3つとも閉じていると
                            開けることに気づかれない */}
                        <details className="group border-b border-charcoal/15" open={i === 0}>
                          <summary className="flex cursor-pointer list-none items-start gap-4 py-5">
                            {/* 英語を上、日本語を下。右の判断基準と同じ組み方にして、
                                「×」をはさんだ左右が同じリズムで読めるようにする */}
                            <span className="min-w-0 flex-1">
                              <span className="block text-[12px] font-bold tracking-[0.22em] text-terracotta-ink">
                                {v.en}
                              </span>
                              <span
                                className="mt-2 block font-bold leading-[1.55] tracking-[-0.02em] text-charcoal"
                                style={{ fontSize: "clamp(16px, 1.7vw, 20px)" }}
                              >
                                {v.title}
                              </span>
                            </span>
                            {/* 開閉の向きを示す。装飾なので読み上げない */}
                            <span
                              aria-hidden
                              className="mt-px shrink-0 text-[13px] font-bold text-charcoal/45 transition-transform group-open:rotate-45"
                            >
                              ＋
                            </span>
                          </summary>
                          <p className="max-w-[28em] pb-6 text-[15px] leading-[2] text-charcoal/80">
                            {v.body}
                          </p>
                        </details>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </div>

              {/* 本文の行・中央：2つの一覧を分ける縦罫。× の真下に立つ */}
              <div
                aria-hidden
                className="hidden lg:col-start-2 lg:row-start-2 lg:block lg:px-1"
              >
                <span className="mx-auto block h-full w-px bg-charcoal/15" />
              </div>

              {/* 本文の行・右：7つの判断基準。補足文を持っていないので開閉させない。
                  1列に7つ並べると縦に伸びるので2列に折る */}
              <div className="order-5 lg:col-start-3 lg:row-start-2 lg:pl-14">
                <Reveal delay={0.15}>
                  {/* 左の一覧と同じ位置から始まるよう、上罫と pt-5 を揃える */}
                  <ol className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-charcoal/15 pt-5 md:gap-x-8">
                    {stances.map((s) => (
                      <li key={s.en}>
                        <p className="text-[11px] font-bold tracking-[0.16em] text-sage-ink">
                          {s.en}
                        </p>
                        <p className="mt-1.5 text-[15px] leading-[1.7] text-charcoal md:text-[16px]">
                          {s.ja}
                        </p>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 04 WHAT WE DO — 思想を、地域で動く仕組みに変える ===== */}
        <section className="bg-white py-24 md:py-36">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <Reveal>
              <p className="text-[12px] font-bold tracking-[0.28em] text-sage-ink">WHAT WE DO</p>
              <h2
                className="mt-7 max-w-[14em] font-bold leading-[1.35] tracking-[-0.02em] text-charcoal"
                style={{ fontSize: "clamp(26px, 3.8vw, 50px)" }}
              >
                思想を、地域の仕組みに。
              </h2>
              <div className="mt-8 max-w-[32em] space-y-5 text-[15px] leading-[2.1] text-charcoal/80 md:text-[16px]">
                <p>想いがあっても、時間がない。人がいない。きっかけがない。挑戦を阻むものは、地域の中にたくさんあります。</p>
                <p>だから私たちは、3つの事業で地域に循環を創ります。</p>
              </div>
            </Reveal>

            {/* 3事業。循環はこの下のリングが受け持つので、ここは矢印を
                  付けず静かな3列で並べる。図を2つ重ねると、どちらも
                  「ぐるぐる回る絵」になって読み手の目が散る */}
            <Reveal delay={0.12}>
              <ol className="mt-16 grid grid-cols-1 gap-y-12 border-t border-charcoal/15 md:mt-20 md:grid-cols-3 md:gap-x-10 md:gap-y-0">
                {businesses.map((b, i) => (
                  <li
                    key={b.en}
                    className={`pt-9 md:px-8 md:first:pl-0 md:last:pr-0 ${
                      i > 0 ? "border-t border-charcoal/15 md:border-l md:border-t-0" : ""
                    }`}
                  >
                    <BusinessCard b={b} />
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* 3事業の先に起きること。

                  太いグラデーションの輪はやめ、ロゴマークと同じ
                  「まるが集まる」形にした。細い軌道の上に、ロゴの粒と
                  同じ色のやわらかい円を5つ置き、中心にロゴを据える。

                  スマホ：軌道＋番号だけを図で見せ、文字はその下に
                          同じ番号を振って並べる（円の中に日本語が入りきらない）。
                  md以上：円の中に文字を入れ、中心に文言も出す。

                  文章は1つしか持たない（重複して書かない）ので、
                  検索・AI検索にも読み上げにも同じ内容が1回だけ渡る */}
            <Reveal delay={0.18}>
              <div className="mt-24 md:mt-32">
                {/* md以上では同じ文をロゴの下に出すので、
                    こちらは目に見えないまま読み上げ用に残す */}
                <p className="text-[11px] font-bold tracking-[0.24em] text-charcoal/60 md:sr-only">
                  そして、挑戦の循環ができる
                </p>

                <div className="relative mt-9 md:mx-auto md:mt-0 md:aspect-[16/11] md:w-full md:max-w-[1000px]">
                  {/* 図の箱。スマホでは普通に流れ、md以上では親に重なる */}
                  <div className="relative mx-auto aspect-square w-full max-w-[290px] md:absolute md:inset-0 md:aspect-auto md:max-w-none">
                    {/* ロゴのまわりに散る小さな粒。ロゴマークの造形をそのまま借りる */}
                    {specks.map((sp, i) => (
                      <span
                        key={`speck-${i}`}
                        aria-hidden
                        className="pop-md hidden rounded-full md:absolute md:block md:h-[var(--d)] md:w-[var(--d)] md:-translate-x-1/2 md:-translate-y-1/2 md:bg-[var(--c)] md:opacity-70 md:[left:var(--cx)] md:[top:var(--cy)]"
                        style={{ ...sp, "--bi": 6 } as CSSProperties}
                      />
                    ))}

                    {/* スマホだけ、軌道の上に番号を置く。下の一覧と対応させる */}
                    {cycleSpots.map((sp, i) => (
                      <span
                        key={`no-${i}`}
                        aria-hidden
                        className="pop absolute flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[13px] font-bold tabular-nums [background:var(--tint)] [color:var(--ink)] [left:var(--cx)] [top:var(--cy)] md:hidden"
                        style={
                          {
                            ...sp,
                            "--ink": bubbleInks[i],
                            "--tint": bubbleTints[i],
                            "--bi": i + 1,
                          } as CSSProperties
                        }
                      >
                        {i + 1}
                      </span>
                    ))}

                    {/* 中心。ロゴマークを置き、md以上ではその下に文言も出す */}
                    <div
                      aria-hidden
                      /* まるが中心に寄っているので、ロゴと文言の背後に白を敷く。
                         セクションの地も白なので、円と重なった所だけが明るくなる */
                      className="pop absolute left-1/2 top-1/2 w-[13em] -translate-x-1/2 -translate-y-1/2 text-center md:w-[15em] md:rounded-full md:bg-white/85 md:px-6 md:py-8"
                      style={{ "--bi": 0 } as CSSProperties}
                    >
                      <span className="relative mx-auto block h-[54px] w-[54px] md:h-[84px] md:w-[84px]">
                        <Image
                          src="/logo/logo-3-trim.png"
                          alt=""
                          fill
                          sizes="84px"
                          className="object-contain"
                        />
                      </span>
                      <p className="mt-4 hidden text-[15px] font-bold leading-[1.9] tracking-[0.04em] text-charcoal/75 md:block">
                        そして、
                        <br />
                        挑戦の循環ができる
                      </p>
                    </div>
                  </div>

                  {/* 5つの節。スマホは図の下に番号付きで、
                      md以上は軌道の上のやわらかい円の中に */}
                  <ol className="mt-8 space-y-3.5 md:absolute md:inset-0 md:mt-0 md:space-y-0">
                    {cycle.map((c, i) => (
                      <li
                        key={c}
                        className="pop-md flex items-baseline gap-3 md:absolute md:aspect-square md:w-[27%] md:-translate-x-1/2 md:-translate-y-1/2 md:flex-col md:items-center md:justify-center md:gap-2 md:rounded-full md:p-8 md:[background:var(--tint)] md:[left:var(--cx)] md:[top:var(--cy)]"
                        style={
                          {
                            ...cycleSpots[i],
                            "--tint": bubbleTints[i],
                            "--ink": bubbleInks[i],
                            "--bi": i + 1,
                          } as CSSProperties
                        }
                      >
                        {/* 番号。軌道の線を引かないので、順番はこれで示す */}
                        <span
                          aria-hidden
                          className="w-4 shrink-0 text-[12px] font-bold tabular-nums [color:var(--ink)] md:w-auto"
                        >
                          {i + 1}
                        </span>
                        <p className="text-[15px] font-semibold leading-[1.8] text-charcoal md:text-center md:text-[14px] md:leading-[1.75]">
                          {c}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== 05 想い — 原点の語り。整理できしだい note に載せ、
             ここからリンクする。いま本文は持たないので枠だけ置く ===== */}
        <section className="bg-ivory py-24 md:py-36">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <Reveal>
              <h2
                className="font-bold leading-[1.35] tracking-[-0.02em] text-charcoal"
                style={{ fontSize: "clamp(26px, 3.8vw, 50px)" }}
              >
                想い
              </h2>
              <p className="mt-9 flex items-center gap-4 text-[11px] font-bold tracking-[0.24em] text-charcoal/45">
                <span aria-hidden className="h-px w-10 bg-charcoal/25" />
                COMING SOON
              </p>
              <p className="mt-6 max-w-[28em] text-[15px] leading-[2.1] text-charcoal/70 md:text-[16px]">
                なぜこの会社を始めたのか。整理ができしだい、noteで公開します。
              </p>
            </Reveal>
          </div>
        </section>

        {/* ===== 06 4TH PLACE — 会社そのものが、どんな存在でありたいか。

             ここには写真を置かない。実写は4枚しかなく、
             どれもこの節の中身と合わなかった。
             集合写真は「西尾筋肉祭り」の看板が見出しと competing し、
             ハイタッチの写真はポーズを取る人が主役になってしまう。
             合わない写真を置くくらいなら、余白で持たせる。

             白地にしてあるのは、このあとのVISIONが深緑の面だから。
             明るい面から濃い面へ落として、最後を山にする ===== */}
        <section className="bg-white py-28 md:py-44">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <Reveal>
              <p className="text-[12px] font-bold tracking-[0.28em] text-terracotta-ink">4TH PLACE</p>
              <h2
                className="mt-7 max-w-[13em] font-bold leading-[1.35] tracking-[-0.03em] text-charcoal"
                style={{ fontSize: "clamp(28px, 4.6vw, 62px)" }}
              >
                「やってみたい」を、
                <br />
                持ち込める場所でありたい。
              </h2>
            </Reveal>

            {/* 実写。人が集まっている場面をここに置く */}
            <Reveal delay={0.15}>
              <figure className="mt-16 md:mt-20">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  {/* キャプションで筋肉祭りだと明示しているので、
                      看板が写っていて問題ない。むしろ説明になる */}
                  <Image
                    src="/photos/31_kinniku_stage.jpg"
                    alt="西尾筋肉祭りのステージ上に並ぶ出場者・スタッフの集合写真"
                    fill
                    sizes="(max-width: 768px) 100vw, 1400px"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="mt-4 text-[12px] leading-[1.9] text-charcoal/60">
                  西尾筋肉祭り。誰か一人が始めなければ、この日は生まれていない。
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-12 max-w-[30em] text-[15px] leading-[2.2] text-charcoal/80 md:text-[17px]">
                一人では難しいことも、誰かと出会うことで、一歩を踏み出せることがある。
              </p>
            </Reveal>

            {/* 5つ。1行ずつ、間を空けて置く。ここがこの節の中心 */}
            <Reveal delay={0.16}>
              <ul className="mt-16 space-y-6 md:mt-24 md:space-y-9">
                {placeLines.map((line, i) => (
                  <li
                    key={line}
                    className={`font-bold leading-[1.45] tracking-[-0.02em] ${
                      i === placeLines.length - 1 ? "text-charcoal" : "text-charcoal/85"
                    }`}
                    style={{ fontSize: "clamp(21px, 3.2vw, 42px)" }}
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* 定義。この言葉はここで説明しておかないと伝わらない */}
            <Reveal delay={0.22}>
              <div className="mt-20 max-w-[34em] border-l-2 border-terracotta pl-6 md:mt-28 md:pl-8">
                <p className="text-[15px] leading-[2.2] text-charcoal/80 md:text-[17px]">
                  家でも、職場でも、いつものコミュニティでもない。自分の「やりたい」と向き合い、誰かと一緒に実現していく場所。
                </p>
                <p className="mt-6 text-[15px] leading-[2.2] text-charcoal/80 md:text-[17px]">
                  Moments Shareは、会社であると同時に、一人ひとりの「やってみたい」を持ち込み、誰かと共にカタチにしていける場所でありたい。私たちは、そんな場所を
                  <strong className="font-bold text-charcoal">「4th Place — 自己実現の場」</strong>
                  と呼んでいます。
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== 07 VISION — 冒頭のPURPOSEへ戻る。ページの円環を閉じる ===== */}
        <section className="bg-green-deep py-28 md:py-44 text-white">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <Reveal>
              <p className="text-[12px] font-bold tracking-[0.28em] text-white/70">VISION</p>
              <h2
                className="mt-7 max-w-[13em] font-bold leading-[1.3] tracking-[-0.03em]"
                style={{ fontSize: "clamp(32px, 5.4vw, 78px)" }}
              >
                「生きててよかった！」が
                <br className="hidden sm:block" />
                あふれる世界。
              </h2>
            </Reveal>

            {/* 挑戦から「生きててよかった」までの道のり。
                短い文を積むだけにして、説明しない */}
            <Reveal delay={0.12}>
              <ul className="mt-16 space-y-3 md:mt-20 md:space-y-4">
                {visionSteps.map((v) => (
                  <li
                    key={v}
                    className="leading-[1.6] tracking-[-0.01em] text-white/85"
                    style={{ fontSize: "clamp(17px, 2.2vw, 26px)" }}
                  >
                    {v}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-14 max-w-[32em] space-y-7 md:mt-20">
                <p className="text-[15px] leading-[2.2] text-white/80 md:text-[17px]">
                  そして振り返ったとき、
                </p>
                <p
                  className="font-bold leading-[1.5] tracking-[-0.02em] text-cream"
                  style={{ fontSize: "clamp(20px, 2.8vw, 34px)" }}
                >
                  「あの経験も、このためにあったのかもしれない。」
                </p>
                <p className="text-[15px] leading-[2.2] text-white/80 md:text-[17px]">
                  そう思える瞬間を、一人でも多くの人と。やってみたかったことに挑戦できた。仲間と一緒に、何かを生み出せた。自分の仕事が、誰かの役に立った。その積み重ねの先にある世界を、私たちは信じています。
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== CTA — 思想を読み終えた人の行き先。
               「相談したい人」と「一緒にやりたい人」で入口を分ける。
               どちらも行き先はお問い合わせ ===== */}
        <section id="contact" className="scroll-mt-20 bg-ivory py-20 md:py-28">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="grid grid-cols-1 gap-14 border-t border-charcoal/15 pt-14 lg:grid-cols-2 lg:gap-20">
              {/* ① 相談したい人 */}
              <Reveal>
                <p className="text-[12px] font-bold tracking-[0.28em] text-sage-ink">CONTACT</p>
                <h2
                  className="mt-6 font-bold leading-[1.35] tracking-[-0.02em] text-charcoal"
                  style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
                >
                  ご相談はこちらから
                </h2>
                <p className="mt-6 max-w-[26em] text-[15px] leading-[2.1] text-charcoal/80 md:text-[16px]">
                  この作業、減らせないか。人が足りない。地域で何か始めたい。
                  まずはお気軽にご連絡ください。
                </p>
                <Link href="/contact" className="btn btn-solid-green mt-8 px-9 py-4">
                  お問い合わせをしてみる →
                </Link>
              </Reveal>

              {/* ② 一緒にやりたい人。行き先は同じお問い合わせ */}
              <Reveal delay={0.1}>
                <p className="text-[12px] font-bold tracking-[0.28em] text-terracotta-ink">
                  PARTNERS
                </p>
                <h2
                  className="mt-6 font-bold leading-[1.35] tracking-[-0.02em] text-charcoal"
                  style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
                >
                  一緒に、挑戦しませんか。
                </h2>
                <p className="mt-6 max-w-[26em] text-[15px] leading-[2.1] text-charcoal/80 md:text-[16px]">
                  弊社は、一緒に働ける仲間を募集しています。
                </p>
                <Link href="/contact" className="btn btn-ghost-navy mt-8 px-9 py-4">
                  お問い合わせをしてみる →
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
