import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { Hero } from "@/components/sections/Hero";
import { AboutIntro } from "@/components/sections/top/AboutIntro";
import { BusinessFlow } from "@/components/sections/top/BusinessFlow";
import { Kpi } from "@/components/sections/top/Kpi";
import { Partners } from "@/components/sections/top/Partners";
import { VisionNishio } from "@/components/sections/VisionNishio";
import { NewsPreview } from "@/components/sections/top/NewsPreview";

export const metadata: Metadata = {
  /* 正規URL。WordPressから移ってきているので、末尾スラッシュ違いや
     パラメータ付きのURLを別ページとして数えられないよう明示する */
  alternates: { canonical: "https://moments-share.com/" },
  title: "Moments Share合同会社｜西尾市の業務効率化・DX/AX支援",
  description:
    "愛知県西尾市の中小企業向けに、業務効率化・AI導入・DX/AX支援を伴走型で提供。請求書処理・データ転記・日報集計などの定型業務を自動化し、1日60分の手作業から年間240時間を取り戻します。BPO・地域プロデュースも。初回のご相談は無料です。",
  openGraph: {
    title: "Moments Share合同会社｜西尾市の業務効率化・DX/AX支援",
    description:
      "愛知県西尾市の中小企業向け。業務効率化・DX・AX（AI活用）を伴走支援。BPO・地域プロデュースも。",
    locale: "ja_JP",
    type: "website",
    url: "https://moments-share.com",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

/* ============================================================
   TOP
   地域のスケール感（HERO / VISION の風景）と、人の温度（ABOUT / PARTNERS の人物）を
   交互に置き、そのあいだに企業向けの事業（BUSINESS / KPI）を挟む。
   DXは主力のため、BUSINESS内で最も大きく扱い、専用のCTAをDX事業ページへ向ける。
   ============================================================ */

export default function Home() {
  return (
    <>
      <Nav heroTone="dark" />

      <main id="main-content">
        {/* 地域に、挑戦と共創の循環を。 — 確定コピー・確定素材。変更しない */}
        <Hero />

        {/* 起点は、いつも1人の挑戦者だ。 */}
        <AboutIntro />

        {/* 3つの事業で、地域に循環をつくる。 — DXを主役に、循環は細い線で示す */}
        <BusinessFlow />

        {/* ひとつずつ、形に。 */}
        <Kpi />

        {/* 共創パートナー */}
        <Partners />

        {/* 西尾から、240の事業を。 */}
        <VisionNishio />

        {/* お知らせ — 直近3件 */}
        <NewsPreview />

        {/* ===== CONTACT — Deep Green の面で締める。
             以前は388pxしかなく、前後が白とアイボリーだったため
             「取ってつけた帯」に見えていた。高さは上下の余白で取っている。

             以前はボタンの下に「初回無料」「2営業日以内に返信」を
             添えていたが、外した。約束として書ける内容が固まってから
             戻すこと（文言は lib/contact.ts に残してある）。 ===== */}
        <section id="contact" className="scroll-mt-16 bg-green-deep px-6 py-24 text-white md:px-10 md:py-36">
          <div className="mx-auto max-w-[1400px]">
            <p className="text-[11px] font-bold tracking-[0.28em] text-white/75">CONTACT</p>
            {/* 8:4 だと見出しの文字が左カラムを使い切らず、中央が空いて見えた。
                7:5 に詰めて、見出しの右端とボタンの距離を近づける */}
            <div className="mt-9 grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <h2
                  className="font-bold leading-[1.2] tracking-[-0.01em]"
                  style={{ fontSize: "clamp(32px, 5vw, 68px)" }}
                >
                  ご相談はこちらから
                </h2>
                <p className="mt-8 max-w-[30em] text-[16px] leading-[2] text-white/85 md:text-[17px]">
                  この作業、減らせないか。人が足りない。地域で何か始めたい。
                  まずはお気軽にご連絡ください。
                </p>
              </div>
              <div className="lg:col-span-5 lg:pb-2">
                <Link href="/contact" className="btn btn-ghost-on-green px-9 py-4">
                  お問い合わせをしてみる →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
