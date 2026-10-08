import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { SitePhoto } from "@/components/ui/SitePhoto";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { careerLab } from "@/lib/community";

/* ============================================================
   西尾キャリアLabのページ。

   内容の出典は御社から提供された引継ぎ資料。推測では書かない。
   資料のうち、対外に出すべきでないものは載せていない。
   - 「地域の人事部」との関係（構想段階・行政連携を含む）
   - 収益モデル（協賛・受託・インターン設計費など）
   - 運営体制や引継ぎに関する記述
   - 今後決める項目そのもの

   TODO: Mission / Vision / Value・正式なキャッチコピー・ロゴ・
         ブランドカラーが決まったら反映する。
   TODO: 参加条件（対象大学・エリア・学生メンバー制度）が決まるまで、
         「募集要項」は書かない。いまは相談の窓口までに留める。
   ============================================================ */

export const metadata: Metadata = {
  title: "西尾市の大学生インターン・キャリア｜西尾キャリアLab",
  description:
    "愛知県西尾市・三河地域の大学生のためのキャリアコミュニティ「西尾キャリアLab」。地域企業との出会い、キャリア交流会、企業訪問、実践型インターンを通じて、知らなかった仕事や生き方を知り、行動するきっかけをつくります。やりたいことが未定でも歓迎。",
  alternates: { canonical: "https://moments-share.com/nishio-career-lab/" },
  openGraph: {
    /* サイト名。layout で指定していても、ページ側で openGraph を
       書き直すと丸ごと差し替わって消えるので、各ページに書く */
    siteName: "Moments Share合同会社",
    title: "西尾市の大学生インターン・キャリア｜西尾キャリアLab",
    description:
      "興味は知識に比例する。好きは行動から生まれる。大学生が自分らしいキャリアを描くためのコミュニティです。",
    locale: "ja_JP",
    type: "website",
    url: "https://moments-share.com/nishio-career-lab/",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "西尾市の大学生インターン・キャリア｜西尾キャリアLab",
    description: "興味は知識に比例する。好きは行動から生まれる。",
    images: ["/og-image.jpg"],
  },
};

/* 提供する基本体験。引継ぎ資料 6. の STEP 1〜6 をそのまま */
const steps = [
  { n: "01", title: "知る", body: "企業・仕事・社会人・働き方・キャリアを知る。「こんな仕事があるんだ」「こんな生き方もあるんだ」という状態をつくる。" },
  { n: "02", title: "興味を持つ", body: "知ったものの中から、「この人と話してみたい」「この会社面白そう」という興味が生まれる。" },
  { n: "03", title: "出会う", body: "企業訪問、交流会、イベントを通じて実際に社会人と話す。企業と学生ではなく、一人の大学生と一人の社会人として出会える関係を大切にする。" },
  { n: "04", title: "やってみる", body: "インターン、企業プロジェクト、イベント運営、企業取材、商品企画など、興味を持ったことを実際にやってみる。" },
  { n: "05", title: "振り返る", body: "何が楽しかったか、何が得意だったか、何を大切にしたいか。経験を言葉にする。" },
  { n: "06", title: "自分のキャリアを描く", body: "経験を材料に、自分自身の次の選択を考える。そして、また新しい行動につなげる。" },
];

/* 活動候補。引継ぎ資料 7. より */
const activities = [
  { name: "キャリア交流会", desc: "大学生と若手社会人・経営者がフラットに話せる場。" },
  { name: "企業訪問", desc: "会社説明ではなく、どんな人がどんな想いで働いているのかを見る機会。" },
  { name: "社会人との座談会", desc: "経営者だけでなく、20代・30代社員、転職経験者、起業家、フリーランスなど多様なキャリアに触れる。" },
  { name: "実践型インターン", desc: "職場体験ではなく、企業のリアルな課題に学生が取り組む。" },
  { name: "地域・企業プロジェクト", desc: "商品企画、イベント、SNS、採用、新規事業などに学生が参加する。" },
  { name: "キャリア振り返り", desc: "活動して終わりにせず、その経験から何を感じたのかを言語化する。" },
];

/* メインターゲット。引継ぎ資料 5. より */
const audience = [
  "西尾出身で、市外の大学へ進学した学生",
  "西尾・三河地域の大学生",
  "地域に興味がある大学生",
  "就活について考え始めた大学生",
  "やりたいことが、まだ決まっていない大学生",
  "インターンやプロジェクトに挑戦したい大学生",
];

/* ブランドポジション。引継ぎ資料 10. より。何ではないかを先に言う */
const notThis = ["就活塾ではありません", "求人サービスではありません", "合同企業説明会でもありません"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "西尾キャリアLab",
  /* AI検索が読みや表記ゆれから名寄せできるようにする */
  "alternateName": ["西尾キャリアラボ", "にしおキャリアラボ", "Nishio Career Lab"],
  "description":
    "大学生が自分らしいキャリアを描くためのコミュニティ。愛知県西尾市・三河地域の企業や社会人との出会い、交流会、実践型インターンを通じて、知らなかった仕事や生き方を知り、行動するきっかけをつくる。",
  "url": "https://moments-share.com/nishio-career-lab/",
  "inLanguage": "ja",
  "mainEntity": {
    "@type": "EducationalOccupationalProgram",
    "name": "西尾キャリアLab",
    "programType": "キャリア教育コミュニティ",
    "description":
      "大学生が地域の企業・社会人と出会い、実践型インターンやプロジェクトを通じて自分のキャリアを考えるコミュニティ。",
    "provider": {
      "@type": "Organization",
      "name": "Moments Share合同会社",
      "url": "https://moments-share.com",
    },
    "audience": { "@type": "EducationalAudience", "educationalRole": "大学生" },
  },
  "sameAs": careerLab.media.map((m) => m.url),
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
      { "@type": "ListItem", "position": 3, "name": "西尾キャリアLab", "item": "https://moments-share.com/nishio-career-lab/" },
    ],
  },
};

export default function CareerLab() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main-content">
        {/* ===== HERO — 合言葉を主役に。ブランドの核なので言い換えない ===== */}
        <section className="pt-28 md:pt-36 pb-14 md:pb-20 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <div className="text-charcoal/70 text-[12px] font-bold tracking-[0.16em]">
              西尾キャリアLab｜西尾市・三河の大学生インターン＆キャリア
            </div>
            <h1
              className="mt-5 max-w-[17em] text-charcoal font-semibold leading-[1.22] tracking-[-0.02em]"
              style={{ fontSize: "clamp(28px, 4.4vw, 58px)" }}
            >
              興味は知識に比例する。<br />好きは行動から生まれる。
            </h1>
            <p className="mt-8 max-w-[34em] text-[16px] md:text-[18px] leading-[2] text-charcoal/80">
              西尾キャリアLabは、大学生が自分らしいキャリアを描くためのコミュニティです。
              西尾・三河の企業や社会人との出会い、交流、実践型インターンを通じて、
              知らなかった仕事や生き方を知り、実際に行動するきっかけをつくります。
            </p>
          </div>
        </section>

        {/* ===== スタンス — 何ではないかを先に言う。誤解されやすい領域だから ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <div className="text-charcoal/70 text-[12px] font-bold tracking-[0.16em]">STANCE</div>
                <h2
                  className="mt-4 text-charcoal font-semibold leading-[1.25] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(26px, 3.2vw, 42px)" }}
                >
                  ゴールは、<br />西尾に就職することでは<br className="hidden sm:block" />ありません。
                </h2>
                <ul className="mt-8 space-y-3">
                  {notThis.map((n) => (
                    <li key={n} className="flex gap-3 text-[15px] leading-[1.9] text-charcoal/75">
                      <span className="text-sage-ink shrink-0" aria-hidden="true">—</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-7 lg:pt-3">
                <div className="max-w-2xl space-y-6 text-[16px] md:text-[18px] leading-[2.1] text-charcoal/85">
                  <p>
                    西尾で就職する。名古屋や東京へ出る。海外へ行く。起業する。フリーランスになる。
                    一度地域を離れて、将来戻ってくる。どの選択肢もあり得ます。
                  </p>
                  <p>
                    大切なのは、<strong className="font-semibold">「知らないまま選択する」のではなく、「知ったうえで自分で選択できる」</strong>状態をつくることです。
                  </p>
                  <p>
                    その結果として「西尾にもこんな会社があったんだ」「こんな面白い大人がいるんだ」という選択肢が増えることに、価値があると考えています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 6ステップ ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <div className="text-charcoal/70 text-[12px] font-bold tracking-[0.16em]">EXPERIENCE</div>
            <h2
              className="mt-4 max-w-[18em] text-charcoal font-semibold leading-[1.25] tracking-[-0.02em]"
              style={{ fontSize: "clamp(26px, 3.4vw, 42px)" }}
            >
              知って、会って、やってみる。
            </h2>
            <ol className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 border-t border-charcoal/15 pt-10">
              {steps.map((s) => (
                <li key={s.n}>
                  <div className="text-charcoal/65 font-medium tabular-nums leading-none text-[20px]">{s.n}</div>
                  <h3 className="mt-4 text-charcoal font-semibold leading-[1.4] text-[18px] md:text-[20px]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[2] text-charcoal/75">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-[14px] leading-[1.9] text-charcoal/70">
              ↻ 「自分のキャリアを描く」は、また「知る」へ戻っていきます。
            </p>
          </div>
        </section>

        {/* ===== 活動 ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
              <div className="md:col-span-5">
                <div className="text-charcoal/70 text-[12px] font-bold tracking-[0.16em]">ACTIVITIES</div>
                <h2
                  className="mt-4 text-charcoal font-semibold leading-[1.25] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(24px, 3vw, 38px)" }}
                >
                  やっていること。
                </h2>
                <div className="mt-8">
                  <SitePhoto name="regionEducation" ratio="4/3" sizes="(max-width: 768px) 100vw, 40vw" />
                </div>
              </div>
              <div className="md:col-span-7">
                <ul className="border-t border-charcoal/15">
                  {activities.map((a) => (
                    <li key={a.name} className="border-b border-charcoal/15 py-6 md:py-7">
                      <h3 className="text-charcoal font-semibold leading-[1.4] text-[17px] md:text-[19px]">
                        {a.name}
                      </h3>
                      <p className="mt-2 max-w-[36em] text-[15px] leading-[1.95] text-charcoal/75">{a.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== こんな大学生に ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-green-deep text-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="text-white/75 text-[12px] font-bold tracking-[0.16em]">FOR STUDENTS</div>
            <h2
              className="mt-4 max-w-[18em] font-semibold leading-[1.25] tracking-[-0.02em]"
              style={{ fontSize: "clamp(26px, 3.4vw, 44px)" }}
            >
              やりたいことが<br className="hidden sm:block" />決まっていなくて、いい。
            </h2>
            <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-4xl">
              {audience.map((a) => (
                <li key={a} className="flex gap-3 text-[15px] md:text-[16px] leading-[1.95] text-white/85">
                  <span className="text-white/75 shrink-0" aria-hidden="true">—</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-[34em] text-[15px] leading-[2] text-white/80">
              西尾出身でなくても構いません。大学と会社のあいだで、キャリアを探索できる第三の場所を目指しています。
            </p>
            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
              <Link href="/contact" className="btn btn-ghost-on-green px-9 py-4">
                参加について問い合わせる →
              </Link>
              <Link
                href="/student-internship"
                className="inline-block border-b border-white/40 pb-0.5 text-[14px] font-bold text-white/85 transition-colors hover:border-white hover:text-white"
              >
                有償の長期インターン募集を見る →
              </Link>
              {careerLab.media.map((m) => (
                <ExternalLink key={m.url} href={m.url} variant="onGreen">
                  {m.label}
                </ExternalLink>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 企業の方へ。制度が未確定なので、相談の窓口までに留める ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <div className="text-charcoal/70 text-[12px] font-bold tracking-[0.16em]">FOR COMPANIES</div>
              <h2
                className="mt-4 text-charcoal font-semibold leading-[1.25] tracking-[-0.02em]"
                style={{ fontSize: "clamp(26px, 3.4vw, 42px)" }}
              >
                学生と、フラットに<br className="hidden sm:block" />話してくださる方へ。
              </h2>
              <p className="mt-6 text-[16px] md:text-[18px] leading-[2] text-charcoal/80">
                交流会で話す、企業訪問を受け入れる、実践型インターンで課題を任せる、
                プロジェクトに学生を巻き込む。関わり方はさまざまです。
                学生を労働力としてではなく「一緒に育てる」つもりで関わってくださる企業・社会人の方をお待ちしています。
              </p>
              <p className="mt-6 max-w-[36em] text-[14px] leading-[1.9] text-charcoal/70">
                参加条件やインターンの受け入れ制度は現在設計中です。まずはご相談ください。
              </p>
              <Link href="/contact" className="btn btn-ghost-navy px-9 py-4 mt-10 inline-block">
                企業・社会人として関わる →
              </Link>
            </div>
          </div>
        </section>

        {/* ===== 図鑑との違い。混同されやすいので明示する ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <h2
              className="text-charcoal font-semibold leading-[1.3] tracking-[-0.02em]"
              style={{ fontSize: "clamp(22px, 2.8vw, 34px)" }}
            >
              「西尾働き方図鑑」との違い。
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 max-w-4xl">
              <div className="border-t border-charcoal/15 pt-6">
                <h3 className="text-charcoal font-semibold text-[17px] md:text-[19px]">西尾キャリアLab</h3>
                <p className="mt-3 text-[15px] leading-[2] text-charcoal/75">
                  主に大学生が対象。出会い・交流・実践を通じて、自分のキャリアを描くコミュニティです。
                </p>
              </div>
              <div className="border-t border-charcoal/15 pt-6">
                <h3 className="text-charcoal font-semibold text-[17px] md:text-[19px]">西尾働き方図鑑</h3>
                <p className="mt-3 text-[15px] leading-[2] text-charcoal/75">
                  地域で働く人・企業・仕事を「知る」ための入口。小中高生まで対象を広げたプロジェクトです。
                </p>
                <Link
                  href="/nishio-hatarakikata-zukan"
                  className="mt-5 inline-block border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
                >
                  西尾働き方図鑑を見る →
                </Link>
              </div>
            </div>
            <p className="mt-10 max-w-[34em] text-[15px] leading-[2] text-charcoal/75">
              二つは連携しますが、同じ事業ではありません。どちらも、Moments Shareの地域プロデュース事業の取り組みです。
            </p>
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
