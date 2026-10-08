import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { SitePhoto } from "@/components/ui/SitePhoto";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { zukan } from "@/lib/community";

/* ============================================================
   西尾働き方図鑑のハブページ。

   内容の出典は、プロジェクト本体のリポジトリ
   Moments-Share/nishio-hatarakikata-zukan（README / docs / recruitment）。
   推測では書かない。あちらの記述が更新されたら、ここも合わせる。

   このページの役目は「検索順位」ではなく、
   受け入れ企業と参加者を集める受け皿になること。
   記事の本体はInstagramとnoteに置いたまま連携する。

   TODO: 協賛金（recruitment/sponsor.md に記載あり）を対外公開するかは
         経営判断のため、金額はまだ載せていない。
   TODO: 年間KPI（参加者・協賛企業・記事・動画の目標値）も同様に未掲載。
   TODO: コーディネーター名は共創パートナーのため掲載しない方針。
   ============================================================ */

export const metadata: Metadata = {
  title: "西尾市のキャリア教育・職場体験｜西尾働き方図鑑",
  description:
    "愛知県西尾市のキャリア教育・職場体験プロジェクト「西尾働き方図鑑」。小中高大生が世代を越えてチームを組み、地域の企業を取材・体験し、記事と動画で発信します。地元にどんな仕事があるのかを知る機会をつくる取り組み。受け入れ企業と参加者を募集中。",
  alternates: { canonical: "https://moments-share.com/nishio-hatarakikata-zukan/" },
  openGraph: {
    /* サイト名。layout で指定していても、ページ側で openGraph を
       書き直すと丸ごと差し替わって消えるので、各ページに書く */
    siteName: "Moments Share合同会社",
    title: "西尾市のキャリア教育・職場体験｜西尾働き方図鑑",
    description:
      "小学生から大学生までが世代を越えてチームを組み、西尾市の企業を取材・体験して発信するキャリア教育プロジェクト。",
    locale: "ja_JP",
    type: "website",
    url: "https://moments-share.com/nishio-hatarakikata-zukan/",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "西尾市のキャリア教育・職場体験｜西尾働き方図鑑",
    description: "西尾に、こんな仕事があった。子どもたちが地域企業を取材して発信します。",
    images: ["/og-image.jpg"],
  },
};

/* プロジェクトの骨格。docs/concept.md・docs/annual-plan.md より */
const facts = [
  {
    label: "誰が",
    title: "小学生から大学生までが、ひとつのチームで。",
    body: "小学生・中学生・高校生・大学生がそれぞれ3名ずつ、計12名でチームを組みます。世代を越えて同じ企業を訪ねることが、この図鑑の特徴です。",
  },
  {
    label: "何を",
    title: "訪問して、取材して、体験する。",
    body: "企業を訪問し、働いている人に話を聞き、仕事を体験します。そこで見たことを、記事とショート動画にまとめます。",
  },
  {
    label: "どこへ",
    title: "発信して、地域に返す。",
    body: "つくった記事と動画はInstagramとnoteで発信し、最後に成果発表の場で地域に報告します。",
  },
];

/* 月次開催のフロー。docs/concept.md の記述そのまま */
const flow = ["募集", "共同研修", "企業訪問", "記事制作", "Instagram投稿", "ホームページ掲載", "成果発表"];

/* 受け入れ企業の像。docs/受け入れ企業の選定基準.md を対外向けの言葉にしたもの */
const wanted = [
  "若い世代を「一緒に育てる」気持ちのある企業",
  "新しいことに前向きな企業",
  "やりたいことはあるが、動ける人がいなくて進んでいない企業",
];

/* 受け入れ・協賛企業への提供。recruitment/sponsor.md より（金額は未掲載） */
const benefits = ["企業紹介記事", "Instagram掲載", "ホームページ掲載", "イベント参加", "採用ブランディング"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "西尾働き方図鑑",
  /* AI検索が読みや表記ゆれから名寄せできるようにする */
  "alternateName": ["にしおはたらきかたずかん", "西尾 働き方図鑑", "Nishio Hatarakikata Zukan"],
  "description":
    "小学生から大学生までが世代を越えてチームを組み、愛知県西尾市の企業を取材・体験して発信するキャリア教育プロジェクト。",
  "url": "https://moments-share.com/nishio-hatarakikata-zukan/",
  "inLanguage": "ja",
  "spatialCoverage": { "@type": "Place", "name": "愛知県 西尾市" },
  /* 記事の本体は外部媒体にある。どこで読めるかを検索側にも示す */
  "sameAs": zukan.media.map((m) => m.url),
  "mainEntity": {
    "@type": "EducationalOccupationalProgram",
    "name": "西尾働き方図鑑",
    "programType": "キャリア教育プログラム",
    "description":
      "小学生・中学生・高校生・大学生が世代を越えてチームを組み、地域企業を取材・体験し、記事と動画で発信する。",
    "provider": {
      "@type": "Organization",
      "name": "Moments Share合同会社",
      "url": "https://moments-share.com",
    },
    "audience": { "@type": "EducationalAudience", "educationalRole": "student" },
  },
  "isPartOf": {
    "@type": "WebPage",
    "name": "地域プロデュース",
    "url": "https://moments-share.com/service-produce/",
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://moments-share.com/" },
      { "@type": "ListItem", "position": 2, "name": "地域プロデュース", "item": "https://moments-share.com/service-produce/" },
      { "@type": "ListItem", "position": 3, "name": "西尾働き方図鑑", "item": "https://moments-share.com/nishio-hatarakikata-zukan/" },
    ],
  },
};

export default function Zukan() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main-content">
        {/* ===== HERO ===== */}
        <section className="pt-28 md:pt-36 pb-14 md:pb-20 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <div className="text-charcoal/70 text-[12px] font-bold tracking-[0.16em]">
              西尾働き方図鑑｜西尾市のキャリア教育・職場体験
            </div>
            <h1
              className="mt-5 max-w-[16em] text-charcoal font-semibold leading-[1.2] tracking-[-0.02em]"
              style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
            >
              西尾に、<br />こんな仕事があった。
            </h1>
            <p className="mt-8 max-w-[34em] text-[16px] md:text-[18px] leading-[2] text-charcoal/80">
              西尾働き方図鑑は、小学生から大学生までが世代を越えてチームを組み、
              西尾市の企業を取材・体験して発信するキャリア教育プロジェクトです。
              子どもたちの未来の選択肢を広げることを目的にしています。
            </p>
          </div>
        </section>

        {/* ===== なぜやるのか — 地域課題。docs/受け入れ企業の選定基準.md より ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <div className="text-charcoal/70 text-[12px] font-bold tracking-[0.16em]">WHY</div>
                <h2
                  className="mt-4 text-charcoal font-semibold leading-[1.25] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(26px, 3.2vw, 42px)" }}
                >
                  知らない仕事は、<br />選べない。
                </h2>
              </div>
              <div className="lg:col-span-7 lg:pt-3">
                <div className="max-w-2xl space-y-6 text-[16px] md:text-[18px] leading-[2.1] text-charcoal/85">
                  <p>
                    西尾市には製造業を中心に多くの企業があります。その一方で、若者は就職の段階で市外へ出ていきます。
                  </p>
                  <p>
                    理由のひとつは、地元にどんな仕事があるのかを知る機会がないことです。
                    知らない会社は、はじめから選択肢に入りません。
                  </p>
                  <p>
                    だから、子どもたちが自分の足で企業を訪ね、自分の言葉で伝える場をつくっています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== どうやるのか ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
              <div className="md:col-span-5">
                <SitePhoto name="regionEducation" ratio="4/3" sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
              <div className="md:col-span-7">
                <ul className="border-t border-charcoal/15">
                  {facts.map((f) => (
                    <li key={f.label} className="border-b border-charcoal/15 py-7 md:py-9">
                      <div className="text-sage-ink text-[12px] font-bold tracking-[0.16em]">{f.label}</div>
                      <h2
                        className="mt-3 text-charcoal font-semibold leading-[1.35] tracking-[-0.02em]"
                        style={{ fontSize: "clamp(19px, 2.2vw, 26px)" }}
                      >
                        {f.title}
                      </h2>
                      <p className="mt-3 max-w-[36em] text-[15px] md:text-[16px] leading-[2] text-charcoal/75">
                        {f.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 開催の流れ。矢印でつないだ一本の流れとして見せる */}
            <div className="mt-14 md:mt-20">
              <div className="text-charcoal/70 text-[12px] font-bold tracking-[0.16em]">開催の流れ（月1回）</div>
              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3 md:gap-x-4">
                {flow.map((label, i) => (
                  <span key={label} className="flex items-center gap-x-3 md:gap-x-4">
                    <span
                      className="text-charcoal font-medium tracking-[-0.01em]"
                      style={{ fontSize: "clamp(15px, 1.7vw, 21px)" }}
                    >
                      {label}
                    </span>
                    {i < flow.length - 1 && (
                      <span className="text-sage-ink text-[14px] md:text-[16px]" aria-hidden="true">→</span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </section>

        {/* ===== 外部媒体への導線 ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-green-deep text-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="text-white/75 text-[12px] font-bold tracking-[0.16em]">READ</div>
            <h2
              className="mt-4 max-w-[18em] font-semibold leading-[1.25] tracking-[-0.02em]"
              style={{ fontSize: "clamp(26px, 3.4vw, 44px)" }}
            >
              記事は、Instagramとnoteで。
            </h2>
            <p className="mt-6 max-w-[34em] text-[16px] md:text-[17px] leading-[2] text-white/80">
              子どもたちがつくった記事と動画は、外部の媒体で公開しています。
              更新はそちらで行っているので、最新のものはこちらからご覧ください。
            </p>
            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-8">
              {zukan.media.map((m) => (
                <ExternalLink key={m.url} href={m.url} variant="onGreen">
                  {m.label}
                </ExternalLink>
              ))}
            </div>
            {zukan.entriesCount > 0 && (
              <p className="mt-10 text-[13px] leading-[1.9] text-white/75">
                現在の掲載は{zukan.entriesCount}社です。これから少しずつ増やしていきます。
              </p>
            )}
          </div>
        </section>

        {/* ===== 企業の方へ — このページの主目的 ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <div className="text-charcoal/70 text-[12px] font-bold tracking-[0.16em]">FOR COMPANIES</div>
              <h2
                className="mt-4 text-charcoal font-semibold leading-[1.25] tracking-[-0.02em]"
                style={{ fontSize: "clamp(26px, 3.4vw, 42px)" }}
              >
                取材を受け入れて<br className="hidden sm:block" />くださる企業を探しています。
              </h2>
              <p className="mt-6 text-[16px] md:text-[18px] leading-[2] text-charcoal/80">
                業種も規模も問いません。「うちには語ることがない」と思っている会社ほど、
                子どもたちには新鮮に映ります。
              </p>
            </div>

            <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 border-t border-charcoal/15 pt-10">
              <div>
                <h3 className="text-charcoal font-semibold text-[17px] md:text-[19px]">こんな企業に来てほしい</h3>
                <ul className="mt-5 space-y-4">
                  {wanted.map((w) => (
                    <li key={w} className="flex gap-3 text-[15px] leading-[1.9] text-charcoal/80">
                      <span className="text-sage-ink shrink-0" aria-hidden="true">—</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-charcoal font-semibold text-[17px] md:text-[19px]">受け入れ企業にお渡しするもの</h3>
                <ul className="mt-5 space-y-4">
                  {benefits.map((b) => (
                    <li key={b} className="flex gap-3 text-[15px] leading-[1.9] text-charcoal/80">
                      <span className="text-sage-ink shrink-0" aria-hidden="true">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link href="/contact" className="btn btn-ghost-navy px-9 py-4 mt-12 inline-block">
              取材の受け入れについて相談する →
            </Link>
          </div>
        </section>

        {/* ===== 参加したい方へ ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <div className="text-charcoal/70 text-[12px] font-bold tracking-[0.16em]">FOR PARTICIPANTS</div>
              <h2
                className="mt-4 text-charcoal font-semibold leading-[1.25] tracking-[-0.02em]"
                style={{ fontSize: "clamp(26px, 3.4vw, 42px)" }}
              >
                参加する人も、<br className="hidden sm:block" />支える人も募集しています。
              </h2>
              <p className="mt-6 text-[16px] md:text-[18px] leading-[2] text-charcoal/80">
                取材する側として参加したい小学生・中学生・高校生・大学生と、
                受付・進行・撮影・制作を支えてくださる運営ボランティアを募集しています。
                保護者の方からのお問い合わせも歓迎です。
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-block border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
              >
                参加について問い合わせる →
              </Link>
            </div>
          </div>
        </section>

        {/* ===== 大学生募集への導線。詳細は /student-internship/ に集約する ===== */}
        <section className="py-14 md:py-18 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="border-t border-charcoal/15 pt-10">
              <div className="text-charcoal/70 text-[12px] font-bold tracking-[0.16em]">RECRUIT</div>
              <h2
                className="mt-4 max-w-[20em] text-charcoal font-semibold leading-[1.3] tracking-[-0.02em]"
                style={{ fontSize: "clamp(22px, 2.8vw, 34px)" }}
              >
                この図鑑を動かす大学生PMを、1名募集しています。
              </h2>
              <p className="mt-5 max-w-[34em] text-[15px] leading-[2] text-charcoal/75">
                企画から取材・撮影・発信まで、一気通貫で任せます。有償の長期インターンです。
              </p>
              <Link href="/student-internship#zukan-pm" className="btn btn-ghost-navy px-9 py-4 mt-8 inline-block">
                募集の詳細を見る →
              </Link>
            </div>
          </div>
        </section>

        {/* ===== 将来像 ＋ 地域プロデュースへ戻す ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <h2
              className="max-w-[20em] text-charcoal font-semibold leading-[1.3] tracking-[-0.02em]"
              style={{ fontSize: "clamp(22px, 2.8vw, 34px)" }}
            >
              西尾働き方図鑑を、<br className="hidden sm:block" />西尾市の地域キャリア教育インフラへ。
            </h2>
            <p className="mt-8 max-w-[34em] text-[15px] leading-[2] text-charcoal/75">
              西尾働き方図鑑は、Moments Shareの地域プロデュース事業のプロジェクトのひとつです。
              大学生向けのコミュニティ「西尾キャリアLab」とは別事業ですが、
              「知る」から「行動する」までをつなぐ関係にあります。
            </p>
            <Link
              href="/nishio-career-lab"
              className="mt-6 inline-block border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
            >
              西尾キャリアLabを見る →
            </Link>
            <Link
              href="/service-produce"
              className="mt-6 inline-block border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
            >
              地域プロデュースの取り組みを見る →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
