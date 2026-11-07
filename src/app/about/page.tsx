import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/ui/Nav";
import { Reveal } from "@/components/ui/Reveal";
import { RevealChars } from "@/components/ui/RevealChars";
import { charStarts } from "@/lib/reveal-timing";

/* ============================================================
   About — 会社案内ではなく、理念に共感してもらうためのページ。

   事業の説明はTOPと各サービスページにあるので、ここには置かない。
   （以前は3事業のカードと循環図を載せていたが、TOPと同じ内容だった）

   構成は4つだけ。上から下へ一本の話として読ませる：
     PURPOSE    すべてがつながる瞬間を、共創する。   なぜ在るのか
     BELIEF     一歩ずつ、できるまで続けるだけ。      どう動くか（行動指針・判断基準）
     4TH PLACE  「やってみたい」を、持ち込める場所。  どんな場所でありたいか
     VISION     「生きててよかった！」があふれる世界。 その先の世界

   冒頭のPURPOSEと最後のVISIONがつながる円環にしてある。
   同じことを2回言わないよう、「振り返ると伏線だった」はPURPOSEだけで言う。

   表記の約束：「つくる」は「創る」にそろえる。自社は「私たち」と書く（「弊社」は使わない）。
   ============================================================ */

export const metadata: Metadata = {
  /* 正規URL。WordPressから移ってきているので、末尾スラッシュ違いや
     パラメータ付きのURLを別ページとして数えられないよう明示する */
  alternates: { canonical: "https://moments-share.com/about/" },
  title: "会社概要・存在意義｜Moments Share合同会社",
  description:
    "Moments Share合同会社の存在意義。すべてがつながる瞬間を、共創する。愛知県西尾市を拠点に活動する私たちの理念・行動指針・判断基準・目指す世界をご紹介します。",
  openGraph: {
    /* サイト名。layout で指定していても、ページ側で openGraph を
       書き直すと丸ごと差し替わって消えるので、各ページに書く */
    siteName: "Moments Share合同会社",
    title: "会社概要・存在意義｜Moments Share合同会社",
    description:
      "すべてがつながる瞬間を、共創する。「生きててよかった！」があふれる世界へ。Moments Shareの存在意義。愛知県西尾市発。",
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
    "すべてがつながる瞬間を、共創する。「生きててよかった！」があふれる世界へ。Moments Shareの存在意義・信念・行動指針・判断基準・目指す世界。",
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
  "一人でも多くの人と共に創り続けていきます。",
];
const purposeStarts = charStarts(purposeLines, 14, 140);

/* 3つの行動指針。個人の一歩 → 積み重ね → 共創、の順に並べる。
   本文は1行ずつと短いので、開閉させずに全部見せる */
const coreValues = [
  {
    en: "Moment",
    title: "いま、できることをしよう。",
    body: "この瞬間に感謝し、目の前の人にどう貢献できるかを考えて動く。",
  },
  {
    en: "Moments",
    title: "一歩ずつ、積み重ねよう。",
    body: "失敗と向き合い、行動し、改善し続ける。",
  },
  {
    en: "Moments Share",
    title: "「やりきってよかった！」を共創しよう。",
    body: "カタチになるまでやりきり、その感動を分かち合う。",
  },
];

/* 7つの判断基準。社外にも見せるが、行動指針より一段控えめに、
   短い一覧として置く。英字は添えるだけにして、日本語を主に読ませる */
const stances = [
  { en: "Self Driven", ja: "自分ごとで動こう。" },
  { en: "Challenge", ja: "まず、やってみよう。" },
  { en: "Better Everyday", ja: "昨日より、少しずつ良くしよう。" },
  { en: "Legacy", ja: "100年後に、誇れる選択をしよう。" },
  { en: "Purpose", ja: "目的から、考えなおそう。" },
  { en: "Co-Create", ja: "互いを尊重し、共創しよう。" },
  { en: "Build Systems", ja: "仕組みを創ろう。" },
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

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav heroTone="dark" />
      <main id="main-content">
        {/* ===== 01 PURPOSE — 理念の起点。写真と余白だけで受ける ===== */}
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

        {/* ===== 02 BELIEF — 信じていることと、それを日々の行動にする指針・基準。
             以前は BELIEF と HOW WE ACT の2節に分けていたが、
             「信じていること → だからこう動く」は一続きの話なので1節にまとめた ===== */}
        <section className="bg-white py-24 md:py-36">
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
              {/* 1つの文なので1段落で置く。節ごとに段落を分けると文がとぎれて読める */}
              <p
                className="mt-10 max-w-[30em] leading-[2.1] text-charcoal/80 md:mt-12"
                style={{ fontSize: "clamp(16px, 1.7vw, 19px)" }}
              >
                「なんのために実現したいのか？」を問い直し、「次は、どうすればできるか？」と失敗に向き合いながら、一つずつカタチにしていきます。
              </p>
            </Reveal>

            {/* 行動指針（左）と判断基準（右）。
                行動指針が主、判断基準は短い一覧として従に置く */}
            <div className="mt-20 grid gap-16 md:mt-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
              <Reveal>
                <p className="text-[11px] font-bold tracking-[0.24em] text-charcoal/60">
                  3つの行動指針 — どう動くか
                </p>
                <ol className="mt-5 border-t border-charcoal/15">
                  {coreValues.map((v) => (
                    <li key={v.en} className="border-b border-charcoal/15 py-6">
                      <p className="text-[12px] font-bold tracking-[0.22em] text-terracotta-ink">
                        {v.en}
                      </p>
                      <p
                        className="mt-2 font-bold leading-[1.55] tracking-[-0.02em] text-charcoal"
                        style={{ fontSize: "clamp(17px, 1.8vw, 21px)" }}
                      >
                        {v.title}
                      </p>
                      <p className="mt-2 text-[15px] leading-[1.9] text-charcoal/75">{v.body}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="text-[11px] font-bold tracking-[0.24em] text-charcoal/60">
                  7つの判断基準 — どう選ぶか
                </p>
                <ol className="mt-5 border-t border-charcoal/15">
                  {stances.map((s) => (
                    <li
                      key={s.en}
                      className="flex items-baseline justify-between gap-4 border-b border-charcoal/10 py-3.5"
                    >
                      <span className="text-[15px] leading-[1.7] text-charcoal md:text-[16px]">{s.ja}</span>
                      <span className="shrink-0 text-[11px] font-bold tracking-[0.14em] text-sage-ink">
                        {s.en}
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===== 03 4TH PLACE — 会社そのものが、どんな存在でありたいか。
             白地の BELIEF と分けるため ivory にし、最後の VISION（深緑）へ落とす ===== */}
        <section className="bg-ivory py-24 md:py-36">
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
              <figure className="mt-14 md:mt-16">
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

            {/* 5つ。ここがこの節の中心。間は以前より詰めてある */}
            <Reveal delay={0.1}>
              <ul className="mt-14 space-y-4 md:mt-20 md:space-y-6">
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
            <Reveal delay={0.16}>
              <p className="mt-14 max-w-[34em] border-l-2 border-terracotta pl-6 text-[15px] leading-[2.2] text-charcoal/80 md:mt-20 md:pl-8 md:text-[17px]">
                家でも、職場でも、いつものコミュニティでもない。一人ひとりの「やってみたい」を持ち込み、誰かと共にカタチにしていける場所。私たちは、そんな場所を
                <strong className="font-bold text-charcoal">「4th Place — 自己実現の場」</strong>
                と呼んでいます。
              </p>
            </Reveal>
          </div>
        </section>

        {/* ===== 04 VISION — 冒頭のPURPOSEへ戻る。ページの円環を閉じる。
             「振り返ると伏線だった」はPURPOSEで言っているので、ここでは繰り返さない ===== */}
        <section className="bg-green-deep py-24 md:py-36 text-white">
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
              <ul className="mt-14 space-y-3 md:mt-16 md:space-y-4">
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
              <p className="mt-12 max-w-[32em] text-[15px] leading-[2.2] text-white/80 md:mt-16 md:text-[17px]">
                その積み重ねの先にある世界を、私たちは信じています。
              </p>
            </Reveal>
          </div>
        </section>

        {/* ===== CTA — 理念を読み終えた人の行き先。
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
                  私たちは、一緒に働ける仲間を募集しています。
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
