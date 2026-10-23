import type { Metadata } from "next";
import { StepRail } from "@/components/ui/ServiceVisuals";
import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { SitePhoto, SitePhotoFill } from "@/components/ui/SitePhoto";

export const metadata: Metadata = {
  /* 正規URL。WordPressから移ってきているので、末尾スラッシュ違いや
     パラメータ付きのURLを別ページとして数えられないよう明示する */
  alternates: { canonical: "https://moments-share.com/service-bpo/" },
  title: "西尾市のBPO・業務委託（営業・事務・CS）｜Moments Share",
  description:
    "愛知県西尾市のBPO・業務委託サービス。採用して人を増やす前に、仕事を外に出すという選択肢があります。事務代行・SNS代行・CS代行を、必要な分だけ受託。まず仕事そのものを整理し、自動化できるものは減らしてから、外に出す範囲を決めます。",
  openGraph: {
    /* サイト名。layout で指定していても、ページ側で openGraph を
       書き直すと丸ごと差し替わって消えるので、各ページに書く */
    siteName: "Moments Share合同会社",
    title: "西尾市のBPO・業務委託（営業・事務・CS）｜Moments Share",
    description:
      "人手不足に、社外の力を。必要な仕事を、必要な分だけ支えます。採用する・外注する・自動化する、その前に、まず仕事そのものを整理します。",
    locale: "ja_JP",
    type: "website",
    url: "https://moments-share.com/service-bpo",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "西尾市のBPO・業務委託（営業・事務・CS）｜Moments Share",
    description: "人手不足に、社外の力を。必要な仕事を、必要な分だけ支えます。",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "BPO（業務プロセスアウトソーシング）",
  "description":
    "採用して人を増やす前に、仕事を外に出すという選択肢。事務代行・SNS代行・CS代行。人が必要な仕事だけを、必要な分だけ支えます。",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Moments Share合同会社",
    "url": "https://moments-share.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "本町5-2 3階",
      "addressLocality": "西尾市",
      "addressRegion": "愛知県",
      "addressCountry": "JP",
    },
  },
  "serviceType": "BPO・業務委託・アウトソーシング",
  "areaServed": { "@type": "Place", "name": "愛知県 西尾市" },
  "url": "https://moments-share.com/service-bpo",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://moments-share.com/" },
      { "@type": "ListItem", "position": 2, "name": "BPO", "item": "https://moments-share.com/service-bpo" },
    ],
  },
};

const painPoints = [
  "求人を出しても応募が来ない",
  "社員が事務作業に追われている",
  "1人採用するほどの仕事量ではない",
  "CSやSNSをやりたいが担当者がいない",
  "一時的に人手が必要",
  "何を外注できるかわからない",
];

/* お受けする仕事は、この3つだけにしている。

   以前は「営業支援（リスト作成・アポイント）」と「その他（外部に任せられる
   仕事を一緒に考えます）」も並べていたが、どちらも外した。

   営業支援＝営業代行は、成果が相手次第で、こちらで減らしようがない仕事。
   「人がやらなくてもいい仕事を減らす」という会社がやる仕事ではない。
   「その他」は、業務の範囲を決めておく意味を自分で打ち消していた。
   事務は放っておくと際限なく増えるので、受ける範囲は書いておく。

   この3つは /works の実績（CS・SNS運用・事務の3社）とも一致している。 */
const services = [
  { title: "事務代行", desc: "データ入力・請求処理・日程調整・書類整理など" },
  { title: "SNS代行", desc: "投稿企画・作成・運用など" },
  { title: "CS代行", desc: "顧客対応・フォロー・継続支援など" },
];

/* お受けしていない仕事。書いている会社は少ないので、書くと効く。
   断る理由が、そのまま自社の考え方の説明になっている */
const notServices = {
  title: "営業代行",
  reason:
    "成果が相手次第になる仕事は、お引き受けしていません。私たちが引き受けるのは、減らせる仕事です。",
};

const team = [
  { label: "専門人材", desc: "各領域の経験を持つプロフェッショナル" },
  { label: "副業人材", desc: "本業の知見を活かして関わる人" },
  { label: "子育て中の人", desc: "自分のペースで働きたい人" },
  { label: "地域で働く人", desc: "地元で仕事に関わりたい人" },
];

const process = [
  { step: "01", title: "相談", body: "いまの課題や困りごとをお聞きします。" },
  { step: "02", title: "業務整理", body: "何が本当に必要な仕事かを一緒に洗い出します。" },
  { step: "03", title: "業務設計", body: "任せられる形に、業務を組み立て直します。" },
  { step: "04", title: "チーム編成", body: "得意を持ち寄る最適なチームをつくります。" },
  { step: "05", title: "開始・改善", body: "実際に動かしながら、継続的に改善します。" },
];

export default function ServiceBPO() {
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
            <SitePhotoFill name="bpoPageHero" priority sizes="100vw" />
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
            <div className="text-[13px] font-bold tracking-[0.14em] text-white/70">BPO</div>
            <h1
              className="mt-5 text-white font-semibold leading-[1.18] tracking-[-0.02em]"
              style={{ fontSize: "clamp(34px, 5vw, 72px)" }}
            >
              人手不足に、<br />社外の力を。
            </h1>
            <p className="mt-8 max-w-xl text-[15px] md:text-[16px] leading-[2] text-white/80">
              採用して人を増やす前に、仕事を外に出すという選択肢があります。事務。SNS。カスタマーサクセス。必要な仕事を、必要な分だけ支えます。
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-block text-[14px] font-bold text-white/85 border-b border-white/40 pb-0.5 hover:text-white hover:border-white transition-colors"
            >
              外注できる業務を相談する →
            </Link>
          </div>
        </section>

        {/* ===== こんな企業に — 均等カードをやめ、番号付きの編集リストで ===== */}
        <section className="py-16 md:py-28 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <h2 className="text-charcoal font-semibold leading-[1.25] tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 3.2vw, 40px)" }}>
                こんな企業に。
              </h2>
            </div>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-16 border-t border-charcoal/10">
              {painPoints.map((p, i) => (
                <div key={p} className="flex items-baseline gap-6 py-6 border-b border-charcoal/10">
                  <span className="text-charcoal/30 font-medium tabular-nums text-[14px] shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] md:text-[17px] leading-[1.9] text-charcoal/85">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 重要メッセージ — ページの核。大きな緑のタイポと余白だけで見せる ===== */}
        <section className="py-24 md:py-40 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <h2
              className="text-charcoal font-semibold leading-[1.22] tracking-[-0.02em]"
              style={{ fontSize: "clamp(28px, 4vw, 54px)" }}
            >
              その仕事、本当に<br />採用が必要ですか？
            </h2>
            <div className="mt-14 max-w-2xl space-y-7 text-[16px] md:text-[18px] leading-[2.1] text-charcoal/85">
              <p>自動化できる仕事は、DXで減らす。人が必要な仕事だけ、BPOで支える。</p>
              <p className="text-charcoal font-semibold text-[20px] md:text-[24px] leading-[1.6] tracking-[-0.01em] pt-2">
                Moments Shareは、採用する・外注する・自動化する、その前に、まず仕事そのものを整理します。
              </p>
            </div>
          </div>
        </section>

        {/* ===== SERVICE — アイコンカードをやめ、2カラムの編集リストで ===== */}
        <section className="py-16 md:py-28 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <h2 className="text-charcoal font-semibold leading-[1.25] tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 3.2vw, 40px)" }}>
                支えられる仕事。
              </h2>
            </div>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-16 border-t border-charcoal/10">
              {services.map((s, i) => (
                <div key={s.title} className="flex items-baseline gap-6 py-8 border-b border-charcoal/10">
                  <span className="text-charcoal/30 font-medium tabular-nums text-[14px] shrink-0 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-charcoal font-semibold tracking-[-0.02em] leading-[1.3]" style={{ fontSize: "clamp(19px, 2vw, 22px)" }}>
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[14px] md:text-[15px] leading-[1.9] text-muted max-w-md">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* お受けしていない仕事。「何でもやります」と書く会社が多いので、
                書いてあるだけで目にとまる。断る理由が考え方の説明になる */}
            <div className="mt-12 border border-charcoal/15 bg-ivory p-6 md:mt-16 md:p-8">
              <p className="text-[12px] font-bold tracking-[0.16em] text-charcoal/55">
                お受けしていないこと
              </p>
              <p
                className="mt-3 text-charcoal font-semibold leading-[1.4] tracking-[-0.02em]"
                style={{ fontSize: "clamp(18px, 2vw, 24px)" }}
              >
                {notServices.title}
              </p>
              <p className="mt-3 max-w-[34em] text-[14px] leading-[1.95] text-charcoal/75 md:text-[15px]">
                {notServices.reason}
              </p>
            </div>
          </div>
        </section>

        {/* ===== DX × BPO — 強みを対比のステートメントに。緑のバンドで際立たせる ===== */}
        <section className="py-20 md:py-32 px-6 md:px-10 bg-green-deep text-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-9">
                <h2
                  className="font-semibold leading-[1.25] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(26px, 3.6vw, 48px)" }}
                >
                  自動化できる仕事は減らす。<br />
                  人が必要な仕事だけ支える。
                </h2>
              </div>
              <div className="lg:col-span-3 lg:pb-3">
                <p className="text-[15px] md:text-[16px] leading-[2] text-white/75 max-w-xs">
                  単に人を増やすのではなく、まず仕事を整理する。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TEAM — 「多様な人」を写真＋タイポで。均等アバターをやめる ===== */}
        <section className="py-16 md:py-28 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-5 order-1">
                <SitePhoto name="bpoRemote" ratio="4/3" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="lg:col-span-7 order-2">
                <h2 className="text-charcoal font-semibold leading-[1.25] tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 3.2vw, 40px)" }}>
                  多様な人と、一緒に支える。
                </h2>
                <p className="mt-6 max-w-lg text-[15px] md:text-[16px] leading-[2] text-charcoal/80">
                  それぞれの得意を組み合わせて、企業の業務を支えます。
                </p>
                <div className="mt-10 border-t border-charcoal/10">
                  {team.map((t) => (
                    <div key={t.label} className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 py-5 border-b border-charcoal/10">
                      <span className="text-charcoal font-semibold text-[16px] md:text-[18px] tracking-[-0.01em]">{t.label}</span>
                      <p className="text-[14px] md:text-[15px] leading-[1.9] text-muted">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PROCESS — 大きな数字の編集的な横並び ===== */}
        <section className="py-16 md:py-28 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <h2 className="text-charcoal font-semibold leading-[1.25] tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 3.2vw, 40px)" }}>
                進め方。
              </h2>
            </div>
            {/* 1本のレールに5つの番号を並べる。縦に5枚積むより
                「全部で5段階ある」ことが先に伝わる（/service-dx と同じ部品） */}
            <div className="mt-14 border-t border-charcoal/10 pt-12">
              <StepRail steps={process.map((p) => ({ num: p.step, title: p.title, desc: p.body }))} />
            </div>
          </div>
        </section>

        {/* ===== CONTACT — Deep Green のバンドで締める。ボタンはテラコッタ ===== */}
        <section id="contact" className="scroll-mt-20 py-20 md:py-28 px-6 md:px-10 bg-green-deep text-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <h2 className="lg:col-span-8 font-semibold leading-[1.15] tracking-[-0.02em]" style={{ fontSize: "clamp(28px, 3.6vw, 52px)" }}>
                どの仕事を外に出せるか、<br className="hidden sm:block" />一緒に整理します。
              </h2>
              <div className="lg:col-span-4 lg:pb-4">
                <p className="text-[15px] leading-[2] text-white/75">
                  採用するべきか、外注するべきか迷っている段階からご相談ください。
                </p>
                <Link
                  href="/contact"
                  className="mt-6 btn btn-ghost-on-green px-9 py-4"
                >
                  外注できる業務を相談する →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
