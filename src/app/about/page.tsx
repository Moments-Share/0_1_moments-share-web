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
    /* サイト名。layout で指定していても、ページ側で openGraph を
       書き直すと丸ごと差し替わって消えるので、各ページに書く */
    siteName: "Moments Share合同会社",
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

/* 3事業。Aboutでは「名前＋一行」まで。詳しい説明はTOPと各サービスページにある。
   見た目（番号・塗りのカード・並び）はTOPの事業紹介に合わせてある。
   同じ3つの話なので、ページが変わるたびに見え方が変わらないようにする */
const businesses = [
  {
    no: "01",
    name: "DX・AX支援",
    body: "人がやらなくてもいい仕事を減らし、挑戦するための余白をつくる。",
    href: "/service-dx",
  },
  {
    no: "02",
    name: "BPO",
    body: "必要な仕事と多様な人の力をつなぎ、挑戦を続けられる体制をつくる。",
    href: "/service-bpo",
  },
  {
    no: "03",
    name: "地域プロデュース",
    body: "人・企業・想いが出会い、新しい挑戦が生まれるきっかけをつくる。",
    href: "/service-produce",
  },
];

/* 上の3事業が生み出すもの。1つずつ次を呼んで、最後は最初へ戻る。
   TOPと地域プロデュースにある「挑戦の円・共創の円」とは別の図。
   あちらは地域の人から見た循環、こちらは3事業から見た循環なので、
   形も変えてある（あちらは円、こちらは横に進む流れ）。
   2つとも円で描くと、どちらが会社の考えなのか分からなくなる */
const cycle = [
  "余白が生まれる",
  "人と仕事がつながる",
  "挑戦が生まれる",
  "新しい仕事・事業が生まれる",
  "実績ができる",
];

/* 5段階の番号の地。下の bubbleInks を薄めたもの。
   以前はこの色で直径270pxの円を5つ置いていたが、大きすぎて
   「循環」ではなく「色の塊が5つ」に見えていたので、番号の地だけに使う */
const bubbleTints = [
  "rgba(44,201,214,0.14)",
  "rgba(65,105,240,0.10)",
  "rgba(123,63,228,0.09)",
  "rgba(255,123,138,0.13)",
  "rgba(249,184,78,0.17)",
];

/* 5段階の番号の色。ロゴの粒（ティール・ブルー・パープル・コーラル・
   オレンジ）をそのまま使う。小さく使うぶんにはサイトの土色と喧嘩しない */
const bubbleInks = ["#1f9aa4", "#3457c4", "#6a35c0", "#d4566a", "#c98a2a"];

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
/* ここはAboutなので、事業は「名前＋一行」まで。
   詳しい説明はTOPの事業紹介と各サービスページにある。

   以前は「役割（余白をつくる）／英字／事業名／説明／詳しく→」の5段だったが、
   役割と説明の末尾が同じことを言っていた（余白をつくる ↔ …余白をつくる。）。
   3枚とも同じ重複だったので、役割と英字を落とした。 */
function BusinessCard({ b, primary }: { b: (typeof businesses)[number]; primary?: boolean }) {
  return (
    <Link
      href={b.href}
      /* カード全体をリンクにする。TOPの事業紹介と同じ扱い。
         節の地が白なので、01は深緑の塗り、02・03はアイボリーの地に枠。
         （TOPは地がアイボリーなので白いカード。地と逆の色を使う） */
      className={`group flex h-full flex-col rounded-[18px] p-7 transition-shadow hover:shadow-lg md:p-8 ${
        primary ? "bg-green-deep text-white" : "border border-charcoal/12 bg-background"
      }`}
    >
      <span
        className={`text-[13px] font-bold leading-none tabular-nums tracking-[-0.03em] ${
          primary ? "text-white/60" : "text-sage-ink/75"
        }`}
      >
        {b.no}
      </span>
      <p
        className={`mt-4 font-bold leading-[1.45] tracking-[-0.01em] ${
          primary ? "text-white" : "text-charcoal"
        }`}
        style={{ fontSize: "clamp(18px, 1.8vw, 22px)" }}
      >
        {b.name}
      </p>
      {/* flex-1 で、3枚の「詳しく →」の高さをそろえる */}
      <p
        className={`mt-3 flex-1 text-[14px] leading-[1.95] md:text-[15px] ${
          primary ? "text-white/85" : "text-charcoal/80"
        }`}
      >
        {b.body}
      </p>
      {/* カード全体がリンクなので、ここは見た目だけ。二重リンクにしない */}
      <span
        className={`mt-6 inline-block self-start border-b pb-0.5 text-[13px] font-bold transition-colors ${
          primary
            ? "border-white/60 text-white group-hover:border-white"
            : "border-navy-ink/40 text-navy-ink group-hover:border-deep-green group-hover:text-deep-green"
        }`}
      >
        詳しく →
      </span>
    </Link>
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

            {/* 3事業。TOPの事業紹介と同じパネルで並べる。
                  以前は区切り線だけの3列だったが、面が無いので
                  「3つある」ことがひと目で分からなかった */}
            <Reveal delay={0.12}>
              <ol className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
                {businesses.map((b, i) => (
                  <li key={b.name}>
                    <BusinessCard b={b} primary={i === 0} />
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* 上の3事業が生み出すもの。

                  以前は直径270pxのやわらかい円を5つ、楕円の軌道に置いていた。
                  ただ、軌道の線も矢印も無いので「循環」には見えず、色の塊が
                  5つ散っているだけになっていた。中心のロゴと文言も円に埋もれ、
                  いちばん言いたい「挑戦の循環ができる」が一番読みにくかった。
                  縦に1000px以上使っていたわりに、伝わる量が少ない。

                  横に進む流れに変え、最後に最初へ戻る線を引いた。
                  TOPと地域プロデュースの「挑戦の円・共創の円」は円のままなので、
                  形で見分けがつく（あちらは地域の循環、こちらは事業が生むもの）。

                  ロゴの粒の色は、番号の小さな丸に残してある。 */}
            <Reveal delay={0.18}>
              <div className="mt-20 md:mt-28">
                <p className="text-[11px] font-bold tracking-[0.24em] text-charcoal/55 md:text-center">
                  AND THEN
                </p>
                <h3
                  className="mt-5 font-bold leading-[1.45] tracking-[-0.015em] text-charcoal md:text-center"
                  style={{ fontSize: "clamp(20px, 2.4vw, 28px)" }}
                >
                  そして、挑戦の循環ができる。
                </h3>

                <div className="relative mx-auto mt-12 max-w-[940px] md:mt-16">
                  {/* 5つの点をつなぐ横線。点の中心（上から11px）に合わせる。
                      両端は端の点の位置（1/10 と 9/10）で止める */}
                  <span
                    aria-hidden
                    className="absolute left-[10%] right-[10%] top-[11px] hidden h-px bg-charcoal/15 md:block"
                  />

                  <ol className="relative grid grid-cols-1 gap-7 md:grid-cols-5 md:gap-0">
                    {cycle.map((c, i) => (
                      <li
                        key={c}
                        className="pop relative flex items-start gap-4 md:flex-col md:items-center md:gap-0 md:px-3"
                        style={{ "--bi": i + 1 } as CSSProperties}
                      >
                        {/* 狭い画面で点と点をつなぐ縦線。最後の点には引かない */}
                        {i < cycle.length - 1 && (
                          <span
                            aria-hidden
                            className="absolute -bottom-7 left-[11px] top-[26px] w-px bg-charcoal/15 md:hidden"
                          />
                        )}
                        <span
                          aria-hidden
                          className="relative flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold tabular-nums [background:var(--tint)] [color:var(--ink)]"
                          style={
                            { "--tint": bubbleTints[i], "--ink": bubbleInks[i] } as CSSProperties
                          }
                        >
                          {i + 1}
                        </span>
                        <p /* 「新しい仕事・事業が生まれる」だけ2行になる。balance で
                             行の長さをそろえ、最後の行に「れる」だけ残さない */
                          className="text-[15px] font-semibold leading-[1.75] text-charcoal md:mt-4 md:text-balance md:text-center md:text-[14px]">
                          {c}
                        </p>
                      </li>
                    ))}
                  </ol>

                  {/* 最後から最初へ戻る線。両端は端の点に合わせて 10% 内側。
                      枠だけだと入力欄に見えるので、左端に上向きの矢印を置いて
                      「5 から 1 へ戻っている」ことを示す */}
                  <div aria-hidden className="relative mx-[10%] mt-7 hidden h-9 md:block">
                    <span className="absolute inset-0 rounded-b-[18px] border-x border-b border-charcoal/18" />
                    <svg
                      viewBox="0 0 10 10"
                      width="9"
                      height="9"
                      className="absolute -top-[5px] left-0 -translate-x-1/2"
                    >
                      <polygon points="5,0 10,9 0,9" fill="currentColor" className="text-charcoal/35" />
                    </svg>
                  </div>
                  <p className="mt-7 text-[13px] leading-[1.9] text-charcoal/65 md:mt-5 md:text-center md:text-[13.5px]">
                    <span aria-hidden className="mr-2 md:hidden">
                      ↻
                    </span>
                    実績が、次の挑戦を呼ぶ。だから、循環する。
                  </p>
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
