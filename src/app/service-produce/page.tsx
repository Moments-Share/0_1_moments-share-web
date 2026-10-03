import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/ui/Nav";
import { SitePhoto, SitePhotoFill } from "@/components/ui/SitePhoto";
import type { SiteImageKey } from "@/lib/site-images";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Carousel, CarouselItem } from "@/components/ui/Carousel";
import { CycleDiagram } from "@/components/ui/CycleDiagram";
import { careerLab, kinnikuMatsuri, zukan } from "@/lib/community";

// 実在するプロジェクトのみ掲載する。架空の名称・事例は作成しない。
//
// カルーセルで横に並べるため、5件とも同じ項目を持たせている。
// image / href / media が無いものは、その部分だけ出ない。
const projects: {
  no: string;
  name: string;
  cat: string;
  desc: string;
  image?: SiteImageKey;
  href?: string;
  hrefLabel?: string;
  media?: { label: string; url: string }[];
  extra?: { label: string; href: string };
}[] = [
  {
    no: "01",
    name: "西尾働き方図鑑",
    cat: "キャリア教育",
    desc: "小学生から大学生までが世代を越えてチームを組み、地域企業を取材・体験して発信するキャリア教育プロジェクト。「こんな仕事があるんだ」という出会いが、地元で働く選択肢を広げる。",
    image: "regionProject",
    href: "/nishio-hatarakikata-zukan",
    hrefLabel: "西尾働き方図鑑について",
    media: zukan.media,
    extra: { label: "大学生PMを1名募集しています", href: "/student-internship#zukan-pm" },
  },
  {
    no: "02",
    name: "西尾筋肉祭り",
    cat: "イベント",
    desc: "「筋肉のパワーで西尾を盛り上げよう」を合言葉に、2026年5月に第1回を開催した地域活性化イベント。キッズ・U18から年代別クラスまで部門を設け、子どもから大人までが参加した。",
    image: "regionEvent",
    media: kinnikuMatsuri.media,
    extra: { label: "大学生PMを1名募集しています", href: "/student-internship#kinniku-pm" },
  },
  {
    no: "03",
    name: "西尾キャリアLab",
    cat: "コミュニティ",
    desc: "大学生が自分らしいキャリアを描くためのコミュニティ。地域の企業・社会人との出会いと、実践型インターンなどの行動の機会をつくる。",
    image: "regionEducation",
    href: "/nishio-career-lab",
    hrefLabel: "西尾キャリアLabについて",
    media: careerLab.media,
  },
  {
    no: "04",
    name: "AI活用研究会",
    cat: "コミュニティ",
    desc: "地域の企業・個人がAIを学び合うコミュニティ。現場で使える知識を共有し、挑戦のきっかけをつくる。",
  },
  {
    no: "05",
    name: "その他のプロジェクト",
    cat: "PROJECTS",
    desc: "地域の「やってみたい」から、新しいプロジェクトが今も生まれ続けています。",
    href: "/contact",
    hrefLabel: "次の挑戦を持ち込む",
  },
];

/* 準備中のプロジェクト。開設・開始が決まっていない段階のものを置く。
   具体的な内容（場所・料金・時期など）が固まるまでは書かない。
   固まったら projects へ移すか、専用ページへ昇格させる。 */
const upcoming = [
  {
    name: "コワーキングスペース",
    cat: "場づくり",
    desc: "西尾に、働く人が集まれる場所をつくる準備を進めています。詳細が決まり次第、このページでお知らせします。",
  },
];

// 地域推し活サイクル（知るへループする循環）
const cycle = ["知る", "好きになる", "応援する", "関わる", "挑戦する", "共創する", "次の挑戦へ"];

const howWeWork = [
  { step: "01", title: "人をつなぐ。", body: "課題を持つ人と、「やってみたい」を持つ人を引き合わせる。" },
  { step: "02", title: "場をつくる。", body: "出会いが生まれ、挑戦が動き出すきっかけと場をつくる。" },
  { step: "03", title: "カタチにする。", body: "アイデアで終わらせず、プロジェクトや事業として動かす。" },
  { step: "04", title: "次につなぐ。", body: "一つの挑戦を、次の誰かの挑戦へとつなげていく。" },
];

export const metadata: Metadata = {
  title: "西尾市の地域プロデュース・地域活性化｜Moments Share",
  description:
    "愛知県西尾市の地域プロデュース事業。地域の課題と、人や企業の「やってみたい」をつなぎ、新しいプロジェクトや事業が生まれる場をつくります。西尾働き方図鑑・西尾筋肉祭り・AI活用研究会など、挑戦と共創が循環する地域へ。",
  openGraph: {
    title: "西尾市の地域プロデュース・地域活性化｜Moments Share",
    description: "想いを、挑戦へ。人・企業・地域をつなぎ、挑戦と共創の循環をつくります。",
    locale: "ja_JP",
    type: "website",
    url: "https://moments-share.com/service-produce",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "西尾市の地域プロデュース・地域活性化｜Moments Share",
    description: "想いを、挑戦へ。挑戦と共創の循環を、西尾から。",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "地域プロデュース",
  "description":
    "地域の課題と、人や企業の「やってみたい」をつなぎ、新しいプロジェクトや事業が生まれるきっかけと場をつくります。",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Moments Share合同会社",
    "url": "https://moments-share.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "西尾市",
      "addressRegion": "愛知県",
      "addressCountry": "JP",
    },
  },
  "serviceType": "地域プロデュース・コミュニティ運営・イベント企画",
  "areaServed": { "@type": "Place", "name": "愛知県 西尾市" },
  "url": "https://moments-share.com/service-produce",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://moments-share.com/" },
      { "@type": "ListItem", "position": 2, "name": "地域プロデュース", "item": "https://moments-share.com/service-produce" },
    ],
  },
};

export default function ServiceProduce() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav heroTone="dark" />
      <main id="main-content">
        {/* ===== HERO — 写真背景ヒーロー（TOPと同じトーン） ===== */}
        <section className="relative min-h-[58vh] md:min-h-[66vh] overflow-hidden bg-[#16281f]">
          <div className="absolute inset-0">
            <SitePhotoFill name="regionPageHero" priority sizes="100vw" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, rgba(16,32,42,0.82) 0%, rgba(16,32,42,0.58) 40%, rgba(16,32,42,0.18) 72%, rgba(16,32,42,0) 100%)" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(16,32,42,0) 30%, rgba(16,32,42,0.35) 65%, rgba(16,32,42,0.75) 100%)" }}
            />
          </div>
          <div className="relative z-10 min-h-[58vh] md:min-h-[66vh] flex flex-col justify-end max-w-[1400px] mx-auto w-full px-6 md:px-10 pb-14 md:pb-20 pt-32">
            <div className="text-[13px] font-bold tracking-[0.14em] text-white/70">地域プロデュース</div>
            <h1
              className="mt-5 text-white font-semibold leading-[1.16] tracking-[-0.02em]"
              style={{ fontSize: "clamp(36px, 5.4vw, 80px)" }}
            >
              想いを、<br />挑戦へ。
            </h1>
            <p className="mt-8 max-w-xl text-[16px] md:text-[17px] leading-[2] text-white/80">
              地域の課題と、人や企業の「やってみたい」をつなぐ。人をつなぎ、仲間を集め、
              新しいプロジェクトや事業が生まれるきっかけと場をつくります。
            </p>
            <div className="mt-8 flex items-center gap-8 text-[14px] font-bold">
              <Link
                href="/contact"
                className="text-white/85 border-b border-white/40 pb-0.5 hover:text-white hover:border-white transition-colors"
              >
                一緒にプロジェクトをつくる
              </Link>
              <Link href="#projects" className="text-white/70 hover:text-white transition-colors">
                取り組みを見る →
              </Link>
            </div>
          </div>
        </section>

        {/* ===== OUR PHILOSOPHY — 大きなタイポ主体。余白に西尾の街の写真を小さく添える ===== */}
        <section className="py-16 md:py-28 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-3">
                <div className="text-charcoal/40 text-[12px] font-bold tracking-[0.16em] lg:sticky lg:top-24">
                  私たちの考え
                </div>
                <div className="hidden lg:block relative aspect-[3/4] mt-8 w-full">
                  <Image
                    src="/photos/hero.png"
                    alt="西尾の街並み"
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-9 lg:pl-8">
                <h2
                  className="text-charcoal font-semibold leading-[1.18] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
                >
                  地域愛を、<br />地域発展の力に。
                </h2>
                <div className="mt-10 max-w-2xl space-y-6 text-[16px] md:text-[18px] leading-[2.1] text-charcoal/85">
                  <p>
                    地域を良くするために、最初から大きなことをする必要はないと思っています。
                    好きなお店に行く。面白い人を誰かに紹介する。地域のイベントに参加する。「こんなことをやってみたい」と声にする。
                  </p>
                  <p>
                    そんな一人ひとりの小さな行動が、人をつなぎ、新しい挑戦を生み、やがて地域を動かす力になっていく。
                  </p>
                  <p className="text-charcoal font-semibold text-[19px] md:text-[24px] leading-[1.6] tracking-[-0.01em] pt-2">
                    私たちは、地域への「好き」を、行動へ変えていきます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PROJECTS — 均等カードをやめ、案件ごとに異なる誌面レイアウトで見せる ===== */}
        <section id="projects" className="scroll-mt-20 py-16 md:py-28 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <div className="text-charcoal/40 text-[12px] font-bold tracking-[0.16em]">PROJECTS</div>
              <h2
                className="mt-4 text-charcoal font-semibold leading-[1.25] tracking-[-0.02em]"
                style={{ fontSize: "clamp(26px, 3.4vw, 44px)" }}
              >
                挑戦を、カタチにする。
              </h2>
              <p className="mt-6 text-[16px] md:text-[18px] leading-[2] text-charcoal/80">
                人・企業・地域をつなぎながら、西尾で取り組んでいるプロジェクト。
                一つひとつが、次の挑戦者を呼ぶ入り口になる。
              </p>
            </div>

            {/* 横スクロールのカルーセル。以前は5件を縦に大きく積んでいて
                この節だけで3,370pxあった。5件あるのでPCでも自動送りが効く。
                カードの形は5件とも同じにする。1件ずつ違う組みにすると、
                横に並べたときに高さも視線の流れもそろわない */}
            <div className="mt-12 md:mt-16">
              <Carousel label="西尾で取り組んでいるプロジェクト">
                {projects.map((p) => (
                  <CarouselItem key={p.name}>
                    <article className="flex w-full flex-col border border-charcoal/12 bg-white">
                      {p.image ? (
                        <SitePhoto
                          name={p.image}
                          ratio="4/3"
                          sizes="(max-width: 640px) 86vw, (max-width: 1024px) 58vw, 33vw"
                        />
                      ) : (
                        // 写真が無いプロジェクトは、連番を大きく置いて面をつくる
                        <div
                          className="flex items-center justify-center bg-light"
                          style={{ aspectRatio: "4/3" }}
                        >
                          <span
                            aria-hidden
                            className="font-bold leading-none tabular-nums text-charcoal/15"
                            style={{ fontSize: "clamp(64px, 7vw, 104px)" }}
                          >
                            {p.no}
                          </span>
                        </div>
                      )}

                      <div className="flex flex-1 flex-col p-7 md:p-8">
                        <div className="flex items-baseline gap-3">
                          <span className="font-medium tabular-nums leading-none text-charcoal/65 text-[15px]">
                            {p.no}
                          </span>
                          <span className="text-[12px] font-bold tracking-[0.16em] text-sage-ink">
                            {p.cat}
                          </span>
                        </div>

                        <h3
                          className="mt-4 text-charcoal font-semibold leading-[1.3] tracking-[-0.02em]"
                          style={{ fontSize: "clamp(21px, 2.2vw, 28px)" }}
                        >
                          {p.name}
                        </h3>

                        <p className="mt-4 flex-1 text-[15px] leading-[1.95] text-charcoal/80">
                          {p.desc}
                        </p>

                        <div className="mt-7 flex flex-col items-start gap-3">
                          {p.href && (
                            <Link
                              href={p.href}
                              className="inline-block border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
                            >
                              {p.hrefLabel} →
                            </Link>
                          )}
                          {p.extra && (
                            <Link
                              href={p.extra.href}
                              className="inline-block border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
                            >
                              {p.extra.label} →
                            </Link>
                          )}
                          {p.media?.map((m) => (
                            <ExternalLink key={m.url} href={m.url}>
                              {m.label}
                            </ExternalLink>
                          ))}
                        </div>
                      </div>
                    </article>
                  </CarouselItem>
                ))}
              </Carousel>
            </div>
          </div>
        </section>

        {/* ===== 準備中 — 名前だけ先に置く。中身が空のページは作らない。
             コワーキングスペースの専用ページはまだ無いので、
             循環の図の「つながる」からはここへ飛んでくる ===== */}
        <section id="coworking" className="scroll-mt-20 py-14 md:py-20 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <div className="text-charcoal/45 text-[12px] font-bold tracking-[0.16em]">
              COMING SOON — 準備中のプロジェクト
            </div>
            <ul className="mt-8 max-w-[52em] border-t border-charcoal/15">
              {upcoming.map((u) => (
                <li key={u.name} className="border-b border-charcoal/15 py-7 md:py-8">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <h3
                      className="text-charcoal font-semibold leading-[1.3] tracking-[-0.02em]"
                      style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}
                    >
                      {u.name}
                    </h3>
                    <span className="rounded-sm border border-sage px-2 py-0.5 text-[11px] font-bold tracking-[0.08em] text-sage-ink">
                      {u.cat}・準備中
                    </span>
                  </div>
                  <p className="mt-4 max-w-[36em] text-[15px] md:text-[16px] leading-[2] text-charcoal/75">
                    {u.desc}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] leading-[1.9] text-charcoal/55">
              一緒に立ち上げたい方、関わってみたい方からのご連絡もお待ちしています。
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
            >
              プロジェクトについて相談する →
            </Link>
          </div>
        </section>

        {/* ===== 循環の全体像 — 構想図（VISION 2040）の6段階。
             上のプロジェクトが、どの段階を担っているのかを示す ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <div className="text-charcoal/70 text-[12px] font-bold tracking-[0.16em]">VISION 2040</div>
            <div className="mt-5">
              <CycleDiagram variant="ring" heading="挑戦と共創が、循環する地域へ。" />
            </div>
          </div>
        </section>

        {/* ===== 地域推し活 — 循環リング。緑×テラコッタ / アイボリー基調 ===== */}
        <section className="py-16 md:py-28 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <div className="text-charcoal/40 text-[12px] font-bold tracking-[0.16em]">地域推し活</div>
              <h2
                className="mt-4 text-charcoal font-semibold leading-[1.25] tracking-[-0.02em]"
                style={{ fontSize: "clamp(26px, 3.4vw, 42px)" }}
              >
                好きになることから、<br className="hidden sm:block" />地域は動きはじめる。
              </h2>
              <p className="mt-6 text-[16px] md:text-[18px] leading-[2] text-charcoal/80">
                「好き」から始まる関わりが、応援を生み、行動になり、やがて挑戦と共創へ。
                その循環が、また次の「好き」を連れてくる。
              </p>
            </div>

            {/* 循環 — 7つの言葉を一つの流れとして。円・pill・番号は使わない */}
            <div className="mt-14 md:mt-20 max-w-4xl">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-4 md:gap-x-4">
                {cycle.map((label, i) => (
                  <span key={label} className="flex items-center gap-x-3 md:gap-x-4">
                    <span
                      className="text-charcoal font-medium tracking-[-0.01em]"
                      style={{ fontSize: "clamp(18px, 2.4vw, 30px)" }}
                    >
                      {label}
                    </span>
                    {i < cycle.length - 1 && (
                      <span className="text-navy-ink/50 text-[15px] md:text-[18px]" aria-hidden="true">→</span>
                    )}
                  </span>
                ))}
              </p>
              <p className="mt-8 text-[14px] md:text-[15px] leading-[1.9] text-charcoal/60">
                ↻ 「次の挑戦へ」は、また「知る」へ戻っていく。この流れが、くり返し地域を動かしていきます。
              </p>
            </div>
          </div>
        </section>

        {/* ===== OUR GOAL — 大きなステートメント ===== */}
        <section className="py-16 md:py-28 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <h2
                  className="text-charcoal font-semibold leading-[1.25] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(26px, 3.2vw, 44px)" }}
                >
                  挑戦する人を、<br />一人ずつ増やす。
                </h2>
              </div>
              <div className="lg:col-span-7 lg:pt-3">
                <div className="max-w-2xl space-y-6 text-[16px] md:text-[18px] leading-[2.1] text-charcoal/85">
                  <p>
                    イベントを開催すること自体がゴールではありません。地域の中に「自分もやってみよう」と思う人が増えること。
                  </p>
                  <p>
                    一人の挑戦に仲間が集まり、新しい仕事や価値が生まれ、その姿が次の誰かを動かす。
                    そんな挑戦と共創の循環をつくります。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== MID-TERM GOAL — 数字の大きさより「なぜ240なのか」を伝える ===== */}
        <section className="py-16 md:py-28 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-baseline">
              <div className="md:col-span-5">
                <h2 className="text-charcoal font-semibold leading-[1.3] tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>
                  まずは、西尾から。
                </h2>
                <div className="mt-6 flex items-baseline gap-2 text-charcoal font-semibold tracking-[-0.02em]">
                  <span className="text-[15px] md:text-[16px] text-charcoal/70 font-medium">2040年までに、西尾に</span>
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-charcoal font-semibold leading-none tracking-[-0.03em]" style={{ fontSize: "clamp(52px, 7vw, 88px)" }}>240</span>
                  <span className="text-[18px] md:text-[22px] font-semibold text-charcoal">の事業を。</span>
                </div>
              </div>
              <div className="md:col-span-7 md:pl-6">
                <p className="max-w-xl text-[16px] md:text-[18px] leading-[2.1] text-charcoal/85">
                  数を追うことが目的ではありません。一つひとつの事業の裏には、挑戦した人がいます。
                  一人の「やってみたい」から挑戦が始まり、仲間が集まり、仕事や事業が生まれる。
                  その積み重ねが地域に根づいている状態を、西尾からつくります。
                </p>
                <p className="mt-6 text-[13px] text-muted">
                  ※ 240事業はVisionではなく、私たちが掲げる中期目標です。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== HOW WE WORK — 4ステップを大きな連番の編集ロウで（均等カードをやめる） ===== */}
        <section className="py-16 md:py-28 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <h2
                className="text-charcoal font-semibold leading-[1.25] tracking-[-0.02em]"
                style={{ fontSize: "clamp(24px, 3.2vw, 40px)" }}
              >
                私たちの進め方。
              </h2>
            </div>

            <div className="mt-14 md:mt-20 flex flex-col divide-y divide-charcoal/10">
              {howWeWork.map((h) => (
                <div
                  key={h.step}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 items-baseline py-8 md:py-10"
                >
                  <div className="md:col-span-3">
                    <span
                      className="text-charcoal/30 font-medium tabular-nums leading-none"
                      style={{ fontSize: "clamp(18px, 2vw, 28px)" }}
                    >
                      {h.step}
                    </span>
                  </div>
                  <h3
                    className="md:col-span-4 text-charcoal font-semibold tracking-[-0.02em] leading-[1.3]"
                    style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}
                  >
                    {h.title}
                  </h3>
                  <p className="md:col-span-5 text-[15px] md:text-[16px] leading-[2] text-charcoal/80">
                    {h.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA — Deep Green のバンド＋テラコッタボタンで締める ===== */}
        <section id="contact" className="scroll-mt-20 py-20 md:py-28 px-6 md:px-10 bg-green-deep text-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <h2
                className="lg:col-span-8 font-semibold leading-[1.18] tracking-[-0.02em]"
                style={{ fontSize: "clamp(28px, 3.8vw, 52px)" }}
              >
                地域に、<br />一緒に仕掛けませんか。
              </h2>
              <div className="lg:col-span-4 lg:pb-4">
                <p className="text-[15px] leading-[2] text-white/75">
                  「こんなことをやってみたい」から話しましょう。まだアイデアがふわっとしていても大丈夫です。
                </p>
                <Link
                  href="/contact"
                  className="mt-6 btn btn-ghost-on-green px-9 py-4"
                >
                  一緒にプロジェクトをつくる →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
