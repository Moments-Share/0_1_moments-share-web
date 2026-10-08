import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/ui/Footer";

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

/**
 * Google Search Console の所有権確認トークン。
 *
 * DNS（TXTレコード）での確認がうまくいかないときの代わりになる。
 * Search Console で「URLプレフィックス」プロパティを作り、確認方法に
 * 「HTMLタグ」を選ぶと、こういう文字列が出る：
 *   <meta name="google-site-verification" content="abc123..." />
 * その content の中身だけを、ここの "" の中に貼る。
 *
 * 空のあいだはタグ自体が出ない（間違ったトークンを出すより安全）。
 * 貼ってデプロイしたあと、Search Console の「確認」を押せば通る。
 * 一度確認が通ったあとも、タグは消さずに残しておくこと。
 * 消すと所有権が外れる。
 */
const GOOGLE_SITE_VERIFICATION = "r4e3NFaOppjZsPYt71lJ-qkzv0q6M0zeemU56CLPqlU";

export const metadata: Metadata = {
  metadataBase: new URL("https://moments-share.com"),
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
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
      /* ここはページのタイトルではなく「サイトの名前」。
         Google は検索結果のURLの上に出す「サイト名」を、まずこの値から取る。
         タイトル（会社名＋説明）を入れると、Google 側で切り詰められる */
      "name": "Moments Share合同会社",
      "alternateName": ["Moments Share", "モーメンツシェア"],
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
