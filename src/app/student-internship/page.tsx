import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { SitePhoto } from "@/components/ui/SitePhoto";
import { roles, PAY, DAYS, HOURS, POSTED_AT } from "@/lib/recruit";

/* ============================================================
   大学生募集のページ。

   募集内容は src/lib/recruit.ts に置いている。ここは表示だけ。
   募集を止めるときは recruit.ts の status を直すか配列から外す。

   構造化データに JobPosting を入れている。Googleしごと検索に
   拾われる可能性があるため、報酬・勤務地・掲載日は
   ページの表示と必ず同じ値を使う（recruit.ts を唯一の出どころにする）。
   ============================================================ */

export const metadata: Metadata = {
  title: "西尾市の大学生・長期インターン募集｜Moments Share",
  description:
    "愛知県西尾市で、大学生の長期インターン（有償）を募集中。西尾働き方図鑑と西尾筋肉祭り、2つのプロジェクトのPMを各1名。時給1,200円、週2〜3日、1日1〜3時間。取材・動画制作・SNS運営・イベント運営・スポンサー交渉まで、実務を一気通貫で経験できます。",
  alternates: { canonical: "https://moments-share.com/student-internship/" },
  openGraph: {
    /* サイト名。layout で指定していても、ページ側で openGraph を
       書き直すと丸ごと差し替わって消えるので、各ページに書く */
    siteName: "Moments Share合同会社",
    title: "西尾市の大学生・長期インターン募集｜Moments Share",
    description:
      "西尾働き方図鑑と西尾筋肉祭り、2つのプロジェクトのPMを各1名募集。時給1,200円、週2〜3日。",
    locale: "ja_JP",
    type: "website",
    url: "https://moments-share.com/student-internship/",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "西尾市の大学生・長期インターン募集｜Moments Share",
    description: "こんなことを、お願いします。西尾のプロジェクトを動かすPMを募集中。",
    images: ["/og-image.jpg"],
  },
};

const ORG = {
  "@type": "Organization",
  "name": "Moments Share合同会社",
  "sameAs": "https://moments-share.com",
};

const PLACE = {
  "@type": "Place",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "本町5-2 3階",
    "addressLocality": "西尾市",
    "addressRegion": "愛知県",
    "addressCountry": "JP",
  },
};

/* 1件ごとに JobPosting を出す。値は recruit.ts と同じものだけを使う */
const jobsJsonLd = roles.map((r) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": `${r.project}｜${r.title}`,
  "description": `${r.lead} お願いすること：${r.tasks.join("、")}。`,
  "datePosted": POSTED_AT,
  "employmentType": ["INTERN", "PART_TIME"],
  "hiringOrganization": ORG,
  "jobLocation": PLACE,
  "totalJobOpenings": 1,
  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "JPY",
    "value": { "@type": "QuantitativeValue", "value": PAY.amount, "unitText": "HOUR" },
  },
  "directApply": true,
  "url": `https://moments-share.com/student-internship/#${r.id}`,
}));

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "西尾市の大学生インターン募集",
  "description":
    "愛知県西尾市で、大学生の長期インターン（有償）を募集。西尾働き方図鑑と西尾筋肉祭りのPMを各1名。",
  "url": "https://moments-share.com/student-internship/",
  "inLanguage": "ja",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://moments-share.com/" },
      { "@type": "ListItem", "position": 2, "name": "大学生インターン募集", "item": "https://moments-share.com/student-internship/" },
    ],
  },
};

export default function StudentInternship() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([pageJsonLd, ...jobsJsonLd]) }}
      />
      <Nav />
      <main id="main-content">
        {/* ===== HERO ===== */}
        <section className="pt-28 md:pt-36 pb-14 md:pb-20 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <div className="text-charcoal/70 text-[12px] font-bold tracking-[0.16em]">
              大学生インターン募集｜西尾市・三河
            </div>
            <h1
              className="mt-5 max-w-[16em] text-charcoal font-semibold leading-[1.2] tracking-[-0.02em]"
              style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
            >
              こんなことを、<br />お願いします。
            </h1>
            <p className="mt-8 max-w-[34em] text-[16px] md:text-[18px] leading-[2] text-charcoal/80">
              西尾で動いているプロジェクトを、一緒に動かしてくれる大学生を募集しています。
              手伝いではなく、PMとして任せます。企画から実行まで、自分で決めて自分で動かす仕事です。
            </p>
            {/* 条件は先に出す。ここが合わないと読み進める意味がないから */}
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-charcoal/15 pt-6">
              {[
                { k: "報酬", v: PAY.label },
                { k: "頻度", v: DAYS },
                { k: "時間", v: HOURS },
                { k: "募集", v: "2プロジェクト・各1名" },
              ].map(({ k, v }) => (
                <div key={k}>
                  <dt className="text-charcoal/70 text-[12px] font-bold tracking-[0.12em]">{k}</dt>
                  <dd className="mt-1 text-charcoal font-semibold text-[17px] md:text-[19px]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ===== 募集2件 ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-col gap-20 md:gap-28">
              {roles.map((r, i) => (
                <article key={r.id} id={r.id} className={i > 0 ? "border-t border-charcoal/15 pt-16 md:pt-24" : ""}>
                  {/* 見出し */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-deep-green px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] text-white">
                      {r.status}
                    </span>
                    <span className="text-charcoal/70 text-[12px] font-bold tracking-[0.12em]">{r.category}</span>
                  </div>
                  <h2
                    className="mt-5 text-charcoal font-semibold leading-[1.25] tracking-[-0.02em]"
                    style={{ fontSize: "clamp(24px, 3.2vw, 40px)" }}
                  >
                    {r.project}｜{r.title}
                  </h2>
                  <p className="mt-5 max-w-[30em] text-sage-ink font-semibold leading-[1.6] text-[17px] md:text-[21px]">
                    {r.catch}
                  </p>
                  <p className="mt-5 max-w-[36em] text-[15px] md:text-[16px] leading-[2] text-charcoal/80">
                    {r.lead}
                  </p>

                  <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                    {/* お願いすること — このページの主役 */}
                    <div className="lg:col-span-7">
                      <h3 className="text-charcoal/70 text-[12px] font-bold tracking-[0.16em]">
                        こんなことを、お願いします
                      </h3>
                      <ol className="mt-6 border-t border-charcoal/15">
                        {r.tasks.map((t, n) => (
                          <li key={t} className="flex gap-5 border-b border-charcoal/15 py-5">
                            <span className="text-charcoal/65 font-medium tabular-nums leading-[1.7] text-[14px] shrink-0">
                              {String(n + 1).padStart(2, "0")}
                            </span>
                            <span className="text-[15px] md:text-[16px] leading-[1.7] text-charcoal/85">{t}</span>
                          </li>
                        ))}
                      </ol>
                      {r.note && (
                        <p className="mt-5 text-[14px] leading-[1.9] text-charcoal/70">{r.note}</p>
                      )}
                    </div>

                    {/* こんな人に / 得られること */}
                    <div className="lg:col-span-5 space-y-10">
                      <div>
                        <h3 className="text-charcoal/70 text-[12px] font-bold tracking-[0.16em]">こんな人に</h3>
                        <ul className="mt-5 space-y-3">
                          {r.fit.map((f) => (
                            <li key={f} className="flex gap-3 text-[15px] leading-[1.9] text-charcoal/80">
                              <span className="text-sage-ink shrink-0" aria-hidden="true">—</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-ivory p-7 md:p-8">
                        <h3 className="text-charcoal/70 text-[12px] font-bold tracking-[0.16em]">得られること</h3>
                        <ul className="mt-5 space-y-4">
                          {r.gains.map((g) => (
                            <li key={g} className="text-[15px] leading-[1.9] text-charcoal/85">{g}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <Link href="/contact" className="btn btn-ghost-navy px-9 py-4">
                      この募集に応募する →
                    </Link>
                    {r.href && (
                      <Link
                        href={r.href}
                        className="inline-block border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
                      >
                        {r.project}について →
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 応募 ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-green-deep text-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              <div className="lg:col-span-7">
                <div className="text-white/75 text-[12px] font-bold tracking-[0.16em]">APPLY</div>
                <h2
                  className="mt-4 font-semibold leading-[1.25] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(26px, 3.4vw, 44px)" }}
                >
                  まずは、話してみませんか。
                </h2>
                <p className="mt-6 max-w-[32em] text-[16px] md:text-[17px] leading-[2] text-white/85">
                  お問い合わせフォームから、ご相談の種類で「採用・複業・パートナー参加」を選び、
                  応募したい募集名をご記入ください。履歴書は要りません。
                </p>
                <p className="mt-5 max-w-[32em] text-[14px] leading-[1.9] text-white/75">
                  ※ 応募いただいた方に、順次ご連絡します。
                </p>
                <Link href="/contact" className="btn btn-ghost-on-green px-9 py-4 mt-10 inline-block">
                  応募・相談する →
                </Link>
              </div>
              <div className="lg:col-span-5">
                <SitePhoto name="regionEducation" ratio="4/3" sizes="(max-width: 1024px) 100vw, 40vw" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== 関連 ===== */}
        <section className="py-14 md:py-20 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <p className="max-w-[34em] text-[15px] leading-[2] text-charcoal/75">
              この募集は、大学生のキャリアコミュニティ「西尾キャリアLab」が大切にしている
              「知って、会って、やってみる」を、実際の仕事としてやってみる機会でもあります。
            </p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
              <Link
                href="/nishio-career-lab"
                className="inline-block border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
              >
                西尾キャリアLabを見る →
              </Link>
              <Link
                href="/service-produce"
                className="inline-block border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
              >
                地域プロデュースの取り組みを見る →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
