import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { BookingLink } from "@/components/ui/BookingLink";
import { SitePhotoFill } from "@/components/ui/SitePhoto";
import { CaseCard, CasesNote } from "@/components/ui/CaseCard";
import { featuredCase } from "@/data/cases";
import {
  PLAN_CONTACT_HREF,
  TAX_NOTE,
  anyPriceShown,
  displayPrice,
  plans,
  training,
} from "@/lib/plans";

/* ============================================================
   AI導入伴走 年間プラン
   会社の主力の商品。このページの仕事は、無料相談の予約を増やすこと。

   金額の出し方は src/lib/plans.ts の SHOW_PRICES と各プランの showPrice で決まる。
   このページには金額を直接書かないこと（変えたときに書き漏れが出る）。

   流れ：なぜ年間か → 1年の進み方 → プラン → 入口のAI研修 → 伴走の例 → FAQ → 相談
   ============================================================ */

const TITLE = "AI導入伴走 年間プラン｜中小企業のAI活用を1年で定着｜Moments Share";
const DESCRIPTION =
  "AIを入れて終わりにしない、中小企業向けの年間伴走プラン。毎月の定例で業務を整理し、自動化を毎月1本ずつつくって、効果を毎月レポートします。入口は12時間のAI研修から。愛知県西尾市発、オンラインで全国に対応。初回のご相談は無料です。";

export const metadata: Metadata = {
  alternates: { canonical: "https://moments-share.com/annual-plan/" },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    siteName: "Moments Share合同会社",
    title: TITLE,
    description: "毎月1本ずつ自動化をつくり、効果を毎月レポート。AIが回る会社へ、1年かけて伴走します。",
    locale: "ja_JP",
    type: "website",
    url: "https://moments-share.com/annual-plan/",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "毎月1本ずつ自動化をつくり、効果を毎月レポート。AIが回る会社へ、1年かけて伴走します。",
    images: ["/og-image.jpg"],
  },
};

const reasons = [
  {
    title: "1本つくって、終わりにしない。",
    body: "自動化は、使いながら直して初めて定着します。毎月の定例で困りごとを拾い、次の1本につなげます。",
  },
  {
    title: "効果を、毎月数字で見る。",
    body: "何が減ったのかを毎月レポートでお渡しします。続けるかどうかを、感覚ではなく数字で判断できます。",
  },
  {
    title: "社内に、できる人を残す。",
    body: "仕組みだけを置いていくのではなく、使い方と考え方を社内に残します。伴走が終わっても改善が続く状態をめざします。",
  },
];

const timeline = [
  { when: "入口", title: "AI研修（12時間）", body: "社内でAIを使う土台をそろえ、減らしたい業務の候補を出します。" },
  { when: "1か月目", title: "業務の棚卸し", body: "どこに時間がかかっているかを分解し、1年でやる順番を決めます。" },
  { when: "毎月", title: "自動化を1本ずつ", body: "効果の大きいところから自動化をつくり、定例で使い心地を確かめて直します。" },
  { when: "毎月", title: "効果のレポート", body: "減った時間や件数をまとめてお渡しします。次の月の優先順位もここで見直します。" },
  { when: "12か月後", title: "改善が回る会社へ", body: "つくった仕組みと、社内で改善を続ける力が残ります。" },
];

const faqs = [
  {
    q: "研修だけでも申し込めますか？",
    a: training.note,
  },
  {
    q: "AIの知識がなくても大丈夫ですか？",
    a: "大丈夫です。最初のAI研修と1か月目の業務の棚卸しで、何をAIに任せられるかを一緒に整理するところから始めます。",
  },
  {
    q: "どのプランを選べばいいかわかりません。",
    a: "無料相談で、いまの業務と人数を伺ったうえでご提案します。多くの会社には、毎月1本ずつ進めるスタンダードから始めることをおすすめしています。",
  },
  {
    q: "遠方でも頼めますか？",
    a: "愛知県西尾市を拠点にしていますが、定例も開発もオンラインで進められるので、遠方の会社にも対応しています。",
  },
  {
    q: "相談に費用はかかりますか？",
    a: "初回のご相談は無料です。いまの業務を伺い、進め方とプランの目安をお伝えします。",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI導入伴走 年間プラン",
  serviceType: ["AI導入支援", "業務自動化", "AI研修", "DX伴走支援"],
  description: DESCRIPTION,
  provider: { "@id": "https://moments-share.com/#organization" },
  areaServed: [
    { "@type": "AdministrativeArea", name: "愛知県" },
    { "@type": "Country", name: "日本" },
  ],
  url: "https://moments-share.com/annual-plan/",
};

const h2Style = { fontSize: "clamp(24px, 3.2vw, 42px)" };

export default function AnnualPlanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Nav heroTone="dark" />
      <main id="main-content">
        {/* ===== HERO ===== */}
        <section className="relative min-h-[58vh] md:min-h-[66vh] overflow-hidden bg-[#16281f]">
          <div className="absolute inset-0">
            <SitePhotoFill name="dxPageHero" priority sizes="100vw" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, rgba(16,32,42,0.86) 0%, rgba(16,32,42,0.62) 45%, rgba(16,32,42,0.2) 75%, rgba(16,32,42,0) 100%)" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(16,32,42,0) 30%, rgba(16,32,42,0.35) 65%, rgba(16,32,42,0.75) 100%)" }}
            />
          </div>
          <div className="relative z-10 min-h-[58vh] md:min-h-[66vh] flex flex-col justify-end max-w-[1400px] mx-auto w-full px-6 md:px-10 pb-14 md:pb-20 pt-32">
            <div className="text-[13px] font-bold tracking-[0.14em] text-white/70">AI導入伴走 年間プラン</div>
            <h1 className="mt-5 text-white font-semibold leading-[1.2] tracking-[-0.02em]" style={{ fontSize: "clamp(32px, 5vw, 68px)" }}>
              1年かけて、<br />AIが回る会社へ。
            </h1>
            <p className="mt-7 max-w-xl text-[16px] md:text-[17px] leading-[2] text-white/85">
              毎月の定例で業務を整理し、自動化を毎月1本ずつ。効果は毎月レポートでお渡しします。
              AIを「入れた」で終わらせず、「使い続けられる」まで伴走します。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href={PLAN_CONTACT_HREF} className="btn btn-ghost-on-dark px-8 py-3.5 text-[15px]">
                無料で相談する →
              </Link>
              <BookingLink variant="onGreen" />
            </div>
          </div>
        </section>

        {/* ===== なぜ年間か ===== */}
        <section className="py-14 md:py-22 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <h2 className="text-charcoal font-semibold leading-[1.3] tracking-[-0.02em]" style={h2Style}>
                  なぜ、<br className="hidden sm:block" />1年なのか。
                </h2>
                <p className="mt-6 max-w-md text-[15px] md:text-[16px] leading-[2] text-charcoal/80">
                  AIの導入でつまずくのは、つくったあとです。使われなくなる前に直し、次の1本につなげる。そのための1年です。
                </p>
              </div>
              <ol className="lg:col-span-8 border-t border-charcoal/10">
                {reasons.map((r, i) => (
                  <li key={r.title} className="grid grid-cols-1 gap-2 border-b border-charcoal/10 py-6 md:grid-cols-12 md:gap-8 md:py-8">
                    <span className="md:col-span-1 font-medium tabular-nums text-charcoal/35" style={{ fontSize: "clamp(16px, 1.8vw, 22px)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="md:col-span-5 text-charcoal font-semibold leading-[1.4] tracking-[-0.02em]" style={{ fontSize: "clamp(18px, 2vw, 24px)" }}>
                      {r.title}
                    </h3>
                    <p className="md:col-span-6 text-[15px] leading-[1.95] text-charcoal/80">{r.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ===== 1年の進み方 ===== */}
        <section className="py-14 md:py-22 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="text-charcoal font-semibold leading-[1.3] tracking-[-0.02em]" style={h2Style}>
              1年の進み方。
            </h2>
            <ol className="mt-10 grid grid-cols-1 gap-px bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-5 md:mt-14">
              {timeline.map((t) => (
                <li key={t.title} className="bg-ivory p-6 md:p-7">
                  <p className="text-[12px] font-bold tracking-[0.12em] text-sage-ink">{t.when}</p>
                  <p className="mt-3 text-charcoal font-semibold leading-[1.4] tracking-[-0.02em]" style={{ fontSize: "clamp(17px, 1.7vw, 20px)" }}>
                    {t.title}
                  </p>
                  <p className="mt-3 text-[14px] leading-[1.9] text-charcoal/75">{t.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ===== プラン ===== */}
        <section id="plans" className="scroll-mt-20 py-14 md:py-22 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="text-charcoal font-semibold leading-[1.3] tracking-[-0.02em]" style={h2Style}>
              プラン。
            </h2>
            <p className="mt-6 max-w-[38em] text-[15px] md:text-[16px] leading-[2] text-charcoal/80">
              どのプランも12か月の伴走です。進め方の濃さで3つに分けています。
            </p>

            <ul className="mt-10 grid grid-cols-1 gap-6 md:mt-14 lg:grid-cols-3">
              {plans.map((p) => {
                const dark = p.recommended;
                return (
                  <li
                    key={p.id}
                    className={`flex flex-col p-7 md:p-8 ${dark ? "bg-green-deep text-white" : "border border-charcoal/15 bg-white"}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-bold tracking-[0.02em]" style={{ fontSize: "clamp(20px, 2vw, 24px)" }}>
                        {p.name}
                      </h3>
                      {dark && (
                        <span className="rounded-full bg-cream px-3 py-1 text-[11px] font-bold text-deep-green">
                          まずはここから
                        </span>
                      )}
                    </div>
                    <p className={`mt-3 text-[14px] leading-[1.85] ${dark ? "text-white/85" : "text-charcoal/75"}`}>
                      {p.forWhom}
                    </p>
                    <p
                      className={`mt-6 font-semibold leading-none tracking-[-0.02em] ${dark ? "text-white" : "text-charcoal"}`}
                      style={{ fontSize: "clamp(26px, 2.8vw, 36px)" }}
                    >
                      {displayPrice(p)}
                    </p>
                    <ul className={`mt-6 flex-1 border-t pt-5 ${dark ? "border-white/25" : "border-charcoal/12"}`}>
                      {p.items.map((it) => (
                        <li key={it} className={`flex gap-3 py-1.5 text-[15px] leading-[1.8] ${dark ? "text-white" : "text-charcoal/85"}`}>
                          <span aria-hidden className={dark ? "text-cream" : "text-sage-ink"}>✓</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
            {anyPriceShown && <p className="mt-5 text-[13px] leading-[1.8] text-charcoal/65">{TAX_NOTE}</p>}

            {/* 入口のAI研修 */}
            <div className="mt-12 grid grid-cols-1 gap-6 border border-charcoal/15 bg-ivory p-7 md:mt-16 md:grid-cols-12 md:gap-10 md:p-10">
              <div className="md:col-span-4">
                <p className="text-[12px] font-bold tracking-[0.14em] text-sage-ink">入口</p>
                <h3 className="mt-3 text-charcoal font-semibold leading-[1.35] tracking-[-0.02em]" style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}>
                  {training.name}（{training.hours}）
                </h3>
                <p className="mt-4 text-charcoal font-semibold leading-none tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 2.6vw, 32px)" }}>
                  {displayPrice(training)}
                </p>
              </div>
              <div className="md:col-span-8">
                <p className="text-[15px] md:text-[16px] leading-[2] text-charcoal/80">
                  社内でAIを使う土台をそろえる、実践の研修です。研修の中で「減らしたい業務」の候補を出し、年間プランの1か月目にそのままつなげます。
                </p>
                <p className="mt-4 text-[15px] md:text-[16px] leading-[2] font-semibold text-charcoal">{training.note}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 伴走の例 ===== */}
        {featuredCase && (
          <section className="py-14 md:py-22 px-6 md:px-10 bg-ivory">
            <div className="mx-auto max-w-[1400px]">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <h2 className="text-charcoal font-semibold leading-[1.3] tracking-[-0.02em]" style={h2Style}>
                    伴走の例。
                  </h2>
                  <p className="mt-6 max-w-md text-[15px] md:text-[16px] leading-[2] text-charcoal/80">
                    月額で伴走している会社の例です。定例と研修を続けながら、複数の仕組みを並行して開発しています。
                  </p>
                  <Link
                    href="/works"
                    className="mt-7 inline-block border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
                  >
                    ほかの実績を見る →
                  </Link>
                </div>
                <div className="lg:col-span-8">
                  <CaseCard c={featuredCase} />
                  <CasesNote />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===== FAQ ===== */}
        <section className="py-14 md:py-20 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="text-charcoal font-semibold leading-[1.2] tracking-[-0.02em]" style={h2Style}>
              よくあるご質問
            </h2>
            <div className="mt-10 md:mt-12 max-w-[52em] border-t border-charcoal/15">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-charcoal/15">
                  <summary
                    className="flex cursor-pointer list-none items-start gap-3 py-5 text-charcoal font-semibold leading-[1.6] tracking-[-0.01em] md:py-6"
                    style={{ fontSize: "clamp(16px, 1.9vw, 20px)" }}
                  >
                    <span aria-hidden className="shrink-0 text-sage-ink">Q.</span>
                    <span className="flex-1">{f.q}</span>
                    <span aria-hidden className="mt-1 shrink-0 text-[13px] font-bold text-charcoal/70 transition-transform group-open:rotate-45">
                      ＋
                    </span>
                  </summary>
                  <p className="flex gap-3 pb-6 text-[15px] leading-[2] text-charcoal/80 md:text-[16px]">
                    <span aria-hidden className="shrink-0 font-semibold text-charcoal/70">A.</span>
                    <span className="max-w-[38em]">{f.a}</span>
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section id="contact" className="scroll-mt-20 py-16 md:py-24 px-6 md:px-10 bg-green-deep text-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <h2 className="lg:col-span-7 font-semibold leading-[1.2] tracking-[-0.02em]" style={{ fontSize: "clamp(28px, 3.6vw, 52px)" }}>
                まずは30分、<br />いまの業務を聞かせてください。
              </h2>
              <div className="lg:col-span-5 lg:pb-3">
                <p className="text-[15px] leading-[2] text-white/80">
                  どの業務から減らせそうか、どのプランが合いそうかを、その場でお伝えします。初回のご相談は無料です。
                </p>
                <Link href={PLAN_CONTACT_HREF} className="mt-6 btn btn-ghost-on-green px-9 py-4">
                  無料で相談する →
                </Link>
                <p className="mt-5 text-[14px] leading-[1.9] text-white/70">
                  日程が決まっている方は <BookingLink variant="onGreen">予約ページから</BookingLink>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
