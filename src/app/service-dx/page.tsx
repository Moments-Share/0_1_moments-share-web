import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { BookingLink } from "@/components/ui/BookingLink";
import { DeckEmbed } from "@/components/ui/DeckEmbed";
import { PRICE_FROM, hasPrice, priceFactors, priceSteps } from "@/lib/pricing";
import { SitePhoto, SitePhotoFill } from "@/components/ui/SitePhoto";
import { dxCases } from "@/data/dx-cases";
import { dxResults } from "@/data/dx-results";
import { VIDEO_EMBED_URL, VIDEO_LEAD, VIDEO_TITLE, hasVideo } from "@/lib/video";

const problems = [
  "Excelやシステムへの転記が多い",
  "毎月同じ資料を手作業で作成している",
  "請求書作成・送付に時間がかかる",
  "社内情報がバラバラ",
  "ChatGPTを契約したが活用できていない",
  "DX担当者がいない",
  "何から改善すればいいかわからない",
];

const outcomes = [
  { title: "作業時間を減らす。", body: "毎月繰り返している手作業を自動化し、人にしかできない仕事へ時間を戻します。" },
  { title: "ミスを減らす。", body: "転記や集計を仕組み化することで、人的ミスの起きにくい流れに変えます。" },
  { title: "属人化を減らす。", body: "「あの人しかわからない」をなくし、誰が担当しても回る状態をつくります。" },
];

/* kind は、やり方は変えずに速くするものが DX、
   仕事の組み立てから変えるものが AX。
   「AXもやります」と名乗るだけでは何も伝わらないので、
   どれがAXなのかを一つずつ示す */
const menu = [
  { name: "AI活用支援", kind: "AX", desc: "現場で使えるAIの使いどころを整理し、定着まで伴走。" },
  { name: "AI研修", kind: "AX", desc: "チームがAIを使いこなすための実践研修。" },
  { name: "業務整理・DXコンサルティング", kind: "DX", desc: "どの作業を減らすべきか、優先順位から設計。" },
  { name: "AI・RPA・GASによる業務自動化", kind: "DX / AX", desc: "入力・転記・集計を自動処理に置き換え。" },
  { name: "Notionなどを使った情報整理", kind: "DX", desc: "散らばった社内情報を一元化。" },
  { name: "AIエージェント構築", kind: "AX", desc: "定型業務を任せられる仕組みをつくる。" },
];

/* §3 時間とコストの試算。試算であることは本文の注記で明示する */
const savings = [
  { value: "60", unit: "分", label: "1日の手作業" },
  { value: "20", unit: "時間", label: "月あたり（20日換算）" },
  { value: "240", unit: "時間", label: "年間で戻る時間" },
  { value: "72", unit: "万円", label: "年間の削減額（試算）" },
];

const steps = [
  { num: "01", title: "相談", desc: "いまの業務と困りごとをお聞きします。何から手をつけるか、一緒に考えます。" },
  { num: "02", title: "業務整理", desc: "業務を分解し、どこに時間がかかっているかを見える化します。" },
  { num: "03", title: "改善提案", desc: "本当に効果のあるところから、改善の優先順位と方法を提案します。" },
  { num: "04", title: "導入・開発", desc: "AI・RPA・GASなどで、現場が実際に使える形に構築します。" },
  { num: "05", title: "運用・改善", desc: "使いながら詰まりを解消し、改善を続けられる状態にします。" },
];

/* よくある質問。内容はこのページに既出の事実だけで構成している。
   FAQPage の構造化データにも同じ配列を使い、表示と機械可読を一致させる。 */
const faqs = [
  {
    q: "対応エリアはどこまでですか？",
    a: "愛知県西尾市を拠点に、西尾市および愛知県内の企業を中心に支援しています。打ち合わせから納品までオンラインで完結するため、遠方からのご相談も承ります。",
  },
  {
    q: "どのくらいの期間がかかりますか？",
    a: "相談・業務整理・改善提案・導入開発・運用改善の5段階で、全体で約3週間が目安です。対象業務の範囲によって前後します。",
  },
  {
    q: "AIの知識がないと相談できませんか？",
    a: "必要ありません。「何をAI化すればいいかわからない」という段階からで大丈夫です。まず業務を分解して、どこに時間がかかっているかを見える化するところから始めます。",
  },
  {
    q: "どんな業務を減らせますか？",
    a: "毎日の入力・転記・集計・定型対応です。具体例として、請求書の作成と送付、Excelへの売上入力、日報の集計、同じ問い合わせへのメール返信、レポートや議事録の作成などがあります。",
  },
  {
    q: "導入したあとのサポートはありますか？",
    a: "納品後30日間の無料保証を設けています。使いながら詰まった箇所を解消し、改善を続けられる状態にするまで伴走します。",
  },
  {
    q: "相談に費用はかかりますか？",
    a: "初回のご相談は無料です。その後の費用は、対象となる業務の範囲によって異なります。",
  },
  {
    q: "DXとAXは何が違うのですか？",
    a: "DXは業務のデジタル化による変革、AXはAI活用による変革を指します。どちらも目的は同じで、人がやらなくてもいい仕事を減らし、人にしかできない仕事へ時間を戻すことです。手段が違うだけです。",
  },
];

export const metadata: Metadata = {
  title: "西尾市の業務効率化・AI導入・DX/AX支援｜Moments Share",
  description:
    "愛知県西尾市の中小企業向け、業務効率化・AI導入の伴走支援「Core Shift」。DX（業務のデジタル化）に加え、AX（AIを前提に仕事のやり方そのものを組み替える）まで支援します。入力・転記・集計を手放せば、1日60分の手作業が年間240時間になって戻ります。",
  openGraph: {
    title: "西尾市の業務効率化・AI導入・DX/AX支援｜Moments Share",
    description:
      "人がやらなくてもいい仕事を減らす。人の時間を、価値創造へ。入力・転記・集計をAIと自動化で手放す、伴走型のDX/AX支援。愛知県西尾市発。",
    locale: "ja_JP",
    type: "website",
    url: "https://moments-share.com/service-dx",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "西尾市の業務効率化・AI導入・DX/AX支援｜Moments Share",
    description: "愛知県西尾市の中小企業向け業務効率化・DX/AX支援。人がやらなくてもいい仕事を減らします。",
    images: ["/og-image.jpg"],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Core Shift（DX・AX支援）",
  "description":
    "人の時間を、価値創造へ。毎日の入力・転記・集計・定型対応など、人がやらなくていい仕事をAIと自動化で減らします。まず業務を整理し、本当に効果のあるところから改善する伴走型DX支援です。",
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
  "serviceType": ["DXコンサルティング", "AX（AI活用）支援", "業務自動化", "AI導入支援", "業務改善コンサルティング"],
  "areaServed": { "@type": "Place", "name": "愛知県 西尾市" },
  "url": "https://moments-share.com/service-dx",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://moments-share.com/" },
      { "@type": "ListItem", "position": 2, "name": "Core Shift（DX・AX支援）", "item": "https://moments-share.com/service-dx" },
    ],
  },
};

export default function ServiceDX() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav heroTone="dark" />
      <main id="main-content">
        {/* ===== HERO — 写真背景ヒーロー（TOPと同じトーン） ===== */}
        <section className="relative min-h-[58vh] md:min-h-[66vh] overflow-hidden bg-[#16281f]">
          <div className="absolute inset-0">
            <SitePhotoFill name="dxPageHero" priority sizes="100vw" />
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
            <div className="text-[13px] font-bold tracking-[0.14em] text-white/70">Core Shift｜西尾市の業務効率化・AI導入・DX支援</div>
            <h1 className="mt-5 text-white font-semibold leading-[1.16] tracking-[-0.02em]"
                style={{ fontSize: "clamp(36px, 5.2vw, 76px)" }}>
              人がやらなくてもいい<br />仕事を減らす
            </h1>
            <p className="mt-6 text-cream font-bold tracking-[0.02em]" style={{ fontSize: "clamp(17px, 2vw, 24px)" }}>
              人の時間を、価値創造へ。
            </p>
            <p className="mt-7 max-w-xl text-[16px] md:text-[17px] leading-[2] text-white/80">
              愛知県西尾市から、中小企業の業務効率化とAI導入を伴走支援。毎日の入力・転記・集計・定型対応を、AIと自動化で手放す。1日60分の手作業をなくすだけで、年間240時間があなたの会社に戻ります。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link
                href="/contact"
                className="inline-block text-[14px] font-bold text-white/85 border-b border-white/40 pb-0.5 hover:text-white hover:border-white transition-colors"
              >
                まずは無料でご相談 →
              </Link>
              {/* 話す内容が決まっている人向けの近道。フォームと同格に置く */}
              <BookingLink variant="onGreen" />
            </div>
          </div>
        </section>

        {/* ===== こんな課題 — 7項目を2カラムのテキストリストに ===== */}
        <section className="py-14 md:py-22 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-4">
                <h2 className="text-charcoal font-semibold leading-[1.25] tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}>
                  こんな課題は<br className="hidden sm:block" />ありませんか？
                </h2>
                <p className="mt-6 max-w-md text-[15px] md:text-[16px] leading-[2] text-charcoal/80">
                  一つでも当てはまるなら、減らせる仕事があるかもしれません。まずは業務の整理から始めます。
                </p>
              </div>
              <div className="lg:col-span-8">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 border-t border-charcoal/10">
                  {problems.map((p) => (
                    <li key={p} className="flex items-start gap-4 border-b border-charcoal/10 py-5">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-charcoal/25" />
                      <p className="text-[15px] md:text-[16px] leading-[1.8] text-charcoal">{p}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 何が変わる？ — 3つの成果を言明で ===== */}
        <section className="py-14 md:py-22 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <h2 className="text-charcoal font-semibold leading-[1.2] tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}>
                何が変わる？
              </h2>
              <p className="mt-6 max-w-[34em] text-[15px] md:text-[16px] leading-[2] text-charcoal/80">
                大切なのは、ツールを入れることではありません。「人がやらなくていい仕事（Non Human Task）」を減らし、時間を価値ある仕事へ戻すことです。これがDX（業務のデジタル化による変革）であり、AX（AI活用による変革）で目指すところです。
              </p>
            </div>

            {/* §3 削減規模の試算。カードにせず、罫線と数字だけで静かに見せる */}
            <div className="mt-10 md:mt-14">
              <div className="grid grid-cols-2 border-t border-charcoal/15 md:grid-cols-4 md:border-b">
                {savings.map((s) => (
                  <div
                    key={s.label}
                    className="border-t border-charcoal/15 py-7 even:border-l md:border-t-0 md:border-l md:px-7 md:py-9 md:first:border-l-0 md:first:pl-0"
                  >
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className="font-semibold leading-none tracking-[-0.03em] tabular-nums text-charcoal"
                        style={{ fontSize: "clamp(38px, 4.4vw, 60px)" }}
                      >
                        {s.value}
                      </span>
                      <span className="text-[14px] font-bold text-sage-ink">{s.unit}</span>
                    </div>
                    <div className="mt-3 text-[13px] leading-[1.8] text-charcoal/60">{s.label}</div>
                  </div>
                ))}
              </div>
              <p className="mt-5 max-w-[40em] text-[12px] leading-[1.9] text-charcoal/55">
                1日60分 × 月20日 ＝ 月20時間、年間240時間。削減額は時給3,000〜3,500円で試算しています。
                ※ 試算および一例です。業務内容によって結果は異なり、効果を保証するものではありません。
              </p>
            </div>

            <div className="mt-10 md:mt-14 flex flex-col divide-y divide-charcoal/10 border-t border-charcoal/10">
              {outcomes.map((o) => (
                <div key={o.title} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-10 items-baseline py-7 md:py-9">
                  <h3 className="md:col-span-6 text-charcoal font-semibold leading-[1.3] tracking-[-0.02em]" style={{ fontSize: "clamp(20px, 2.4vw, 32px)" }}>
                    {o.title}
                  </h3>
                  <p className="md:col-span-6 max-w-md text-[15px] md:text-[16px] leading-[2] text-charcoal/80">{o.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CASE — 実績。80％削減を主役に ===== */}
        <section className="py-14 md:py-22 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <h2 className="text-charcoal font-semibold leading-[1.2] tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}>
                業務を、余白に変えた事例。
              </h2>
            </div>

            {/* 実績の数字。dx-results.ts が空のあいだは行ごと出ない。
                数字だけ大きく、単位と説明は小さく。カードにはしない */}
            {dxResults.length > 0 && (
              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-9 border-t border-charcoal/15 pt-10 md:mt-14 md:grid-cols-4 md:gap-x-10">
                {dxResults.map((r) => (
                  <div key={r.label}>
                    <div className="flex items-end gap-1.5">
                      <span
                        className="font-semibold leading-[0.9] tracking-[-0.03em] text-charcoal"
                        style={{ fontSize: "clamp(34px, 4.4vw, 54px)" }}
                      >
                        {r.value}
                      </span>
                      <span className="pb-1 text-[15px] font-semibold text-sage-ink md:text-[17px]">
                        {r.unit}
                      </span>
                    </div>
                    <p className="mt-3 text-[13px] font-bold leading-[1.6] text-charcoal md:text-[14px]">
                      {r.label}
                    </p>
                    {r.note && (
                      <p className="mt-1.5 text-[12px] leading-[1.7] text-charcoal/55">{r.note}</p>
                    )}
                  </div>
                ))}
              </dl>
            )}

            {/* 主役：SNS自動化 約80％削減。数字は信頼を伝える情報として扱う */}
            <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-end">
              <div className="md:col-span-5">
                <div className="text-[13px] font-semibold tracking-[0.08em] text-charcoal/45 mb-4">SNS自動化</div>
                <div className="flex items-end gap-3">
                  <span className="text-charcoal font-semibold leading-[0.9] tracking-[-0.03em]" style={{ fontSize: "clamp(48px, 6vw, 72px)" }}>
                    約80
                  </span>
                  <span className="text-charcoal font-semibold pb-2" style={{ fontSize: "clamp(18px, 2.2vw, 26px)" }}>％削減</span>
                </div>
              </div>
              <div className="md:col-span-7 md:pb-4">
                <h3 className="text-charcoal font-semibold leading-[1.3] tracking-[-0.02em]" style={{ fontSize: "clamp(22px, 2.6vw, 34px)" }}>
                  投稿作業を、30分 → 約6分へ。
                </h3>
                <p className="mt-5 max-w-md text-[15px] md:text-[16px] leading-[2] text-charcoal/80">
                  投稿の企画から公開までの流れを自動化し、毎日の作業を大幅に削減。
                </p>
                <p className="mt-4 max-w-md text-[12px] leading-[1.9] text-charcoal/55">
                  ※ 特定業務での一例です。効果を保証するものではありません。
                </p>
              </div>
            </div>

            {/* 主役事例の現場写真。左揃え・横位置 */}
            <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-8">
                <SitePhoto name="dxWorkflow" sizes="(max-width: 768px) 100vw, 50vw" />
                <p className="mt-3 text-[12px] text-muted">毎日の投稿作業が、6分に。</p>
              </div>
            </div>

            {/* 請求書自動化。テキスト事例 */}
            <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-baseline border-t border-charcoal/10 pt-10 md:pt-12">
              <div className="md:col-span-4 text-[13px] font-semibold tracking-[0.08em] text-charcoal/45">請求書</div>
              <div className="md:col-span-8">
                <h3 className="text-charcoal font-semibold leading-[1.3] tracking-[-0.02em]" style={{ fontSize: "clamp(22px, 2.8vw, 36px)" }}>
                  請求書発行の自動化
                </h3>
                <div className="mt-3 text-charcoal font-semibold tracking-[-0.02em]" style={{ fontSize: "clamp(19px, 2.2vw, 27px)" }}>
                  手作業 → 自動化<span className="text-charcoal/60 text-[15px] font-medium ml-3 align-middle">発行・送付を仕組み化</span>
                </div>
                <p className="mt-5 max-w-md text-[15px] md:text-[16px] leading-[2] text-charcoal/80">
                  手作業だった請求書の作成・送付を自動化し、転記の手間を解消。
                </p>
              </div>
            </div>

            {/* 在庫管理 — 左揃えで統一 */}
            <div className="mt-10 md:mt-14 border-t border-charcoal/10 pt-10 md:pt-12">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-end">
                <div className="md:col-span-7">
                  <div className="text-[13px] font-semibold tracking-[0.08em] text-charcoal/45">在庫管理</div>
                  <h3 className="mt-5 text-charcoal font-semibold leading-[1.15] tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 3.4vw, 48px)" }}>
                    紙＋Excel →<br />一元管理
                  </h3>
                </div>
                <div className="md:col-span-5 md:pb-2">
                  <div className="text-charcoal font-semibold tracking-[-0.02em]" style={{ fontSize: "clamp(18px, 2vw, 24px)" }}>
                    在庫管理の一元化
                  </div>
                  <div className="mt-2 text-[13px] font-medium text-charcoal/50">二重管理を解消</div>
                  <p className="mt-4 max-w-md text-[15px] md:text-[16px] leading-[2] text-charcoal/80">
                    紙とExcelに分かれていた在庫情報を一元管理し、探す・照合する手間を削減。
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 md:mt-14">
              {/* /works が準備中のため、いまは問い合わせへ渡す。
                  実績ページを公開したら href="/works" と「実績をもっと見る →」に戻す */}
              <Link
                href="/contact"
                className="inline-block border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
              >
                他の事例について聞いてみる →
              </Link>
            </div>
          </div>
        </section>

        {/* ===== 動画 — lib/video.ts の URL が空のあいだは節ごと出ない。
             押しても何も起きない枠を作らないため（資料の DeckEmbed と同じ扱い） ===== */}
        {hasVideo && (
          <section className="px-6 py-14 md:px-10 md:py-22 bg-white">
            <div className="mx-auto max-w-[1400px]">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <h2
                    className="font-semibold leading-[1.2] tracking-[-0.02em] text-charcoal"
                    style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}
                  >
                    {VIDEO_TITLE || "動画で見る。"}
                  </h2>
                  {VIDEO_LEAD && (
                    <p className="mt-6 max-w-[30em] text-[15px] leading-[2] text-charcoal/75 md:text-[16px]">
                      {VIDEO_LEAD}
                    </p>
                  )}
                </div>
                <div className="lg:col-span-8">
                  {/* 16:9。loading="lazy" で、ここまで来るまで読み込まない */}
                  <div className="relative aspect-video w-full overflow-hidden border border-charcoal/15 bg-charcoal/[0.06]">
                    <iframe
                      src={VIDEO_EMBED_URL}
                      title={VIDEO_TITLE || "紹介動画"}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===== SERVICE — できること。6項目を番号付きリストに ===== */}
        <section className="py-14 md:py-22 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            {/* DXとAXの違い。言葉を名乗るだけでは伝わらないので、
                どこから考えるかの違いとして書く */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-4">
                <h2 className="text-charcoal font-semibold leading-[1.2] tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}>
                  DXと、AX。
                </h2>
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 gap-px bg-charcoal/10 sm:grid-cols-2">
                  <div className="bg-white p-7 md:p-8">
                    <p className="text-[12px] font-bold tracking-[0.18em] text-charcoal/60">DX</p>
                    <p className="mt-4 text-charcoal font-semibold leading-[1.4] tracking-[-0.02em]" style={{ fontSize: "clamp(18px, 1.9vw, 24px)" }}>
                      いまの仕事を、デジタルにする。
                    </p>
                    <p className="mt-4 text-[14px] md:text-[15px] leading-[1.95] text-charcoal/80">
                      紙をなくす。転記をなくす。集計を自動にする。
                      <strong className="font-semibold text-charcoal">やり方は変えずに、速くします。</strong>
                    </p>
                  </div>
                  <div className="bg-green-deep p-7 text-white md:p-8">
                    <p className="text-[12px] font-bold tracking-[0.18em] text-white/70">AX</p>
                    <p className="mt-4 font-semibold leading-[1.4] tracking-[-0.02em]" style={{ fontSize: "clamp(18px, 1.9vw, 24px)" }}>
                      仕事のやり方を、組み替える。
                    </p>
                    <p className="mt-4 text-[14px] md:text-[15px] leading-[1.95] text-white/85">
                      AIがある前提で考え直します。「この作業を速くするには」ではなく、
                      <strong className="font-semibold text-white">「この作業は、そもそも人がやる必要があるのか」</strong>
                      から始めます。
                    </p>
                  </div>
                </div>
                <p className="mt-7 max-w-[42em] text-[14px] md:text-[15px] leading-[1.95] text-charcoal/80">
                  目的は同じです。人がやらなくてもいい仕事を減らし、人にしかできない仕事へ時間を戻すこと。違うのは、どこから考えるかだけです。どちらが必要かは業務によって変わるので、まず業務を分解してから決めます。
                </p>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 md:mt-24">
              <div className="lg:col-span-4">
                <h2 className="text-charcoal font-semibold leading-[1.2] tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}>
                  できること。
                </h2>
                <p className="mt-5 max-w-[24em] text-[14px] leading-[1.9] text-charcoal/75">
                  どれがDXで、どれがAXかを付けてあります。
                </p>
              </div>
              <div className="lg:col-span-8">
                <ul className="border-t border-charcoal/10">
                  {menu.map((m, i) => (
                    <li key={m.name} className="flex items-baseline gap-6 border-b border-charcoal/10 py-6">
                      <span className="text-charcoal/30 font-medium tabular-nums leading-none w-10 shrink-0" style={{ fontSize: "clamp(18px, 2vw, 28px)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <p className="text-charcoal font-semibold leading-[1.3] tracking-[-0.02em]" style={{ fontSize: "clamp(18px, 2vw, 26px)" }}>
                            {m.name}
                          </p>
                          <span className="border border-charcoal/25 px-2 py-0.5 text-[11px] font-bold tracking-[0.08em] text-charcoal/70">
                            {m.kind}
                          </span>
                        </div>
                        <p className="mt-2 max-w-[30em] text-[14px] md:text-[15px] leading-[1.9] text-charcoal/70">
                          {m.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 事例 — 中身が入るまでは、セクションごと出さない。
                 「実績はこちら」と書いて空のページに送るほうが信用を落とす。
                 src/data/dx-cases.ts に1件足せば、ここに現れる ===== */}
        {dxCases.length > 0 && (
          <section className="py-14 md:py-22 px-6 md:px-10 bg-white">
            <div className="mx-auto max-w-[1400px]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-4">
                  <h2 className="text-charcoal font-semibold leading-[1.2] tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}>
                    実際に、こう変わりました。
                  </h2>
                </div>
                <div className="lg:col-span-8">
                  <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {dxCases.map((c) => (
                      <li key={`${c.client}-${c.title}`} className="border border-charcoal/12 p-7 md:p-8">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="border border-charcoal/25 px-2 py-0.5 text-[11px] font-bold tracking-[0.08em] text-charcoal/70">
                            {c.kind}
                          </span>
                          <span className="text-[13px] font-medium text-charcoal/70">{c.client}</span>
                        </div>
                        <p className="mt-4 text-charcoal font-semibold leading-[1.35] tracking-[-0.02em]" style={{ fontSize: "clamp(17px, 1.8vw, 21px)" }}>
                          {c.title}
                        </p>
                        <dl className="mt-5 border-t border-charcoal/10 pt-5 text-[14px] leading-[1.9]">
                          <div className="flex gap-4">
                            <dt className="w-16 shrink-0 font-bold text-charcoal/55">before</dt>
                            <dd className="text-charcoal/80">{c.before}</dd>
                          </div>
                          <div className="mt-2 flex gap-4">
                            <dt className="w-16 shrink-0 font-bold text-deep-green">after</dt>
                            <dd className="font-semibold text-charcoal">{c.after}</dd>
                          </div>
                        </dl>
                        {c.tools && (
                          <p className="mt-4 text-[13px] leading-[1.8] text-charcoal/70">使ったもの：{c.tools}</p>
                        )}
                        {c.note && (
                          <p className="mt-2 text-[12px] leading-[1.8] text-charcoal/60">{c.note}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===== 費用 — 金額が無いままだと「高いかもしれない」で離脱する。
                 額を出せないうちは、決まり方といつ分かるかを示す。
                 一番聞かれることなので、ページの中ほどに置く。
                 最後に置くと、そこまで読まれない ===== */}
        <section className="py-14 md:py-22 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              <div className="lg:col-span-5">
                <h2
                  className="text-charcoal font-semibold leading-[1.2] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}
                >
                  費用について。
                </h2>
                {hasPrice ? (
                  <p className="mt-7 flex items-baseline gap-2">
                    <span
                      className="font-semibold leading-none tracking-[-0.03em] text-charcoal"
                      style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}
                    >
                      {PRICE_FROM}
                    </span>
                    <span className="text-[16px] font-bold text-sage-ink">〜</span>
                  </p>
                ) : null}
                <p className="mt-7 max-w-[32em] text-[15px] md:text-[16px] leading-[2] text-charcoal/80">
                  決まった料金表はありません。減らせる仕事は会社ごとに違うので、
                  対象が決まってから金額をお出ししています。
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="text-charcoal/70 text-[12px] font-bold tracking-[0.16em]">費用が決まる3つのこと</div>
                <dl className="mt-5 border-t border-charcoal/15">
                  {priceFactors.map((f) => (
                    <div key={f.k} className="grid grid-cols-1 gap-1 border-b border-charcoal/15 py-5 sm:grid-cols-12 sm:gap-6">
                      <dt className="text-[14px] font-bold text-charcoal sm:col-span-4">{f.k}</dt>
                      <dd className="text-[15px] leading-[1.9] text-charcoal/80 sm:col-span-8">{f.v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-10 text-charcoal/70 text-[12px] font-bold tracking-[0.16em]">お見積りが出るまで</div>
                <ol className="mt-5 space-y-3">
                  {priceSteps.map((t, i) => (
                    <li key={t} className="flex gap-4 text-[15px] leading-[1.9] text-charcoal/85">
                      <span className="shrink-0 font-medium tabular-nums text-charcoal/65">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 途中のお問い合わせ導線 ==============================
             実測で、事例のリンク（スマホ y=4049）の次の導線が
             最後の節（y=9783）まで無く、6.8画面ぶん空いていた。
             費用を読み終えた直後がいちばん温度が高いので、
             進め方の手前に1つ置いて空白を半分に割る ================= */}
        <section className="px-6 py-12 md:px-10 md:py-16 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-col gap-6 border-y border-charcoal/15 py-10 md:flex-row md:items-center md:justify-between md:py-12">
              <div>
                <h2
                  className="font-semibold leading-[1.35] tracking-[-0.02em] text-charcoal"
                  style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}
                >
                  自社だとどうなるか、聞いてみませんか。
                </h2>
                <p className="mt-4 max-w-[34em] text-[15px] leading-[2] text-charcoal/75">
                  どの作業が減らせるかは、現場によって違います。
                  いまの困りごとを伺えれば、進め方と費用の目安をお伝えします。
                </p>
              </div>
              <Link href="/contact" className="btn btn-solid-green shrink-0 px-9 py-4">
                まずは無料でご相談 →
              </Link>
            </div>
          </div>
        </section>


        {/* ===== PROCESS — 進め方。01–05のステップ行 ===== */}
        <section className="py-14 md:py-22 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <h2 className="text-charcoal font-semibold leading-[1.2] tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}>
                進め方。
              </h2>
              {/* §6 着手前の不安を先に消す。距離・期間・保証の3点 */}
              <dl className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-3">
                <div className="border-t-2 border-sage pt-4">
                  <dt className="text-[12px] font-bold tracking-[0.1em] text-charcoal/50">ご対応</dt>
                  <dd className="mt-2 text-[15px] font-bold leading-[1.6] text-charcoal">オンラインで完結</dd>
                </div>
                <div className="border-t-2 border-sage pt-4">
                  <dt className="text-[12px] font-bold tracking-[0.1em] text-charcoal/50">期間</dt>
                  <dd className="mt-2 text-[15px] font-bold leading-[1.6] text-charcoal">全体で約3週間</dd>
                </div>
                <div className="border-t-2 border-sage pt-4">
                  <dt className="text-[12px] font-bold tracking-[0.1em] text-charcoal/50">保証</dt>
                  <dd className="mt-2 text-[15px] font-bold leading-[1.6] text-charcoal">納品後30日間の無料保証</dd>
                </div>
              </dl>
            </div>

            <div className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-9 md:gap-x-8 md:gap-y-12">
              {steps.map((s) => (
                <div key={s.num} className="border-t border-charcoal/10 pt-5">
                  <div className="text-charcoal/30 font-medium tabular-nums leading-none" style={{ fontSize: "clamp(18px, 2vw, 28px)" }}>
                    {s.num}
                  </div>
                  <h3 className="mt-4 text-charcoal font-semibold tracking-[-0.02em]" style={{ fontSize: "clamp(18px, 2vw, 24px)" }}>
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[14px] md:text-[15px] leading-[1.9] text-charcoal/80">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ===== GOAL — 言明 ===== */}
        <section className="py-14 md:py-24 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="max-w-5xl text-charcoal font-semibold leading-[1.3] tracking-[-0.02em]" style={{ fontSize: "clamp(26px, 3.6vw, 48px)" }}>
              AIを使える会社ではなく、<br className="hidden sm:block" />仕事を改善し続けられる会社へ。
            </h2>
            <p className="mt-8 max-w-[38em] text-[15px] md:text-[16px] leading-[2] text-charcoal/75">
              業務効率化は一度きりの作業ではありません。DX・AXの本質は、
              仕組みを入れることではなく、改善を続けられる状態をつくることです。
              愛知県西尾市を拠点に、導入して終わりにしない伴走支援を行っています。
            </p>
          </div>
        </section>

        {/* ===== FAQ — 検索から来た人の疑問をその場で解消する ===== */}
        <section className="py-14 md:py-20 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="text-charcoal font-semibold leading-[1.2] tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}>
              よくあるご質問
            </h2>
            {/* 7問を開いたまま並べると2画面ぶんになる。<details> で畳む。
                JSは使わない。答えはHTMLに残るので、検索・AI検索には従来どおり読まれる。
                構造化データ（faqJsonLd）も別に出しているので影響はない */}
            <div className="mt-10 md:mt-12 max-w-[52em] border-t border-charcoal/15">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-charcoal/15">
                  <summary className="flex cursor-pointer list-none items-start gap-3 py-5 text-charcoal font-semibold leading-[1.6] tracking-[-0.01em] md:py-6" style={{ fontSize: "clamp(16px, 1.9vw, 20px)" }}>
                    <span aria-hidden className="shrink-0 text-sage-ink">Q.</span>
                    <span className="flex-1">{f.q}</span>
                    {/* 開閉の向きを示す。装飾なので読み上げない */}
                    <span
                      aria-hidden
                      className="mt-1 shrink-0 text-[13px] font-bold text-charcoal/70 transition-transform group-open:rotate-45"
                    >
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

        {/* ===== DECK — サービス紹介資料。CTAの直前、詳しく知りたい人の受け皿 ===== */}
        <section className="py-14 md:py-20 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="text-charcoal font-semibold leading-[1.2] tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}>
              資料で詳しく。
            </h2>
            <DeckEmbed />
          </div>
        </section>

        {/* ===== CTA — 緑のバンド＋テラコッタボタン ===== */}
        <section id="contact" className="scroll-mt-20 py-16 md:py-24 px-6 md:px-10 bg-green-deep text-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <h2 className="lg:col-span-8 font-semibold leading-[1.15] tracking-[-0.02em]" style={{ fontSize: "clamp(28px, 3.6vw, 52px)" }}>
                ご相談はこちらから
              </h2>
              <div className="lg:col-span-4 lg:pb-4">
                <p className="text-[15px] leading-[2] text-white/75">
                  「何をAI化すればいいかわからない」という段階でも大丈夫です。
                </p>
                <Link href="/contact" className="mt-6 btn btn-ghost-on-green px-9 py-4">
                  まずは無料でご相談 →
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
