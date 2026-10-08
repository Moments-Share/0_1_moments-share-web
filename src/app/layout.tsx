import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/ui/Footer";

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moments-share.com"),
  title: "Moments Share合同会社 — 地域愛を地域発展の力に。",
  description:
    "愛知県西尾市発。DX×BPO×地域プロデュースで、やらなくていい仕事をなくし、地域に挑戦と共創の循環を生み出す会社です。",
  openGraph: {
    title: "Moments Share合同会社 — 地域愛を地域発展の力に。",
    description:
      "愛知県西尾市発。DX・BPO・地域プロデュースで、地域に挑戦と共創の循環を生み出す会社です。",
    locale: "ja_JP",
    type: "website",
    url: "https://moments-share.com",
    siteName: "Moments Share合同会社",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moments Share合同会社 — 地域愛を地域発展の力に。",
    description: "愛知県西尾市発。DX・BPO・地域プロデュースで、地域に挑戦と共創の循環を。",
    images: ["/og-image.jpg"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // ProfessionalService は LocalBusiness の下位型。地域の事業者として
      // 認識させるために付ける。Organization も併記して法人としても扱わせる
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://moments-share.com/#organization",
      "name": "Moments Share合同会社",
      "alternateName": "Moments Share",
      "url": "https://moments-share.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://moments-share.com/og-image.jpg",
      },
      "description": "愛知県西尾市の中小企業向けに、業務効率化・AI導入・DX/AX支援を伴走型で提供。請求書処理・データ転記・日報集計などの定型業務を自動化します。BPO・地域プロデュース事業も展開。",
      "foundingDate": "2025-11",
      "email": "branding@momentsshare.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "本町5-2 3階",
        "addressLocality": "西尾市",
        "addressRegion": "愛知県",
        "addressCountry": "JP",
      },
      "sameAs": [
        "https://x.com/momentsshare_",
        "https://instagram.com/momentsshare",
        "https://note.com/momentsshare",
      ],
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "愛知県西尾市" },
        { "@type": "AdministrativeArea", "name": "愛知県" },
      ],
      // 何に詳しい事業者かを明示する。AI検索が事業内容を理解する手がかりになる
      "knowsAbout": [
        "業務効率化",
        "DX（デジタルトランスフォーメーション）",
        "AX（AI活用による変革）",
        "AI導入支援",
        "業務自動化（RPA・GAS）",
        "BPO（業務代行）",
        "地域プロデュース",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://moments-share.com/#website",
      "url": "https://moments-share.com/",
      "name": "Moments Share合同会社｜西尾市の業務効率化・DX/AX支援",
      "publisher": {
        "@id": "https://moments-share.com/#organization",
      },
      "inLanguage": "ja-JP",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full scroll-smooth">
      <head>
        {/* 描画前に実行し、JSが動く環境だけ表示アニメーションを有効にする。
            この属性が付かない環境では、本文は最初から見えている。 */}
        <script
          dangerouslySetInnerHTML={{ __html: 'document.documentElement.dataset.js="1"' }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${notoSansJP.className} min-h-full antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-green-deep focus:text-white focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-bold focus:shadow-lg"
        >
          メインコンテンツへスキップ
        </a>
        {children}
        <Footer />
      </body>
    </html>
  );
}
