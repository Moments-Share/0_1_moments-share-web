import Script from "next/script";
import { GA_MEASUREMENT_ID, hasAnalytics } from "@/lib/analytics";

/* GA4の計測タグ。測定IDが空のあいだは何も出さない（lib/analytics.ts）。

   strategy="afterInteractive" で、本文の描画を待ってから読み込む。
   解析のために最初の表示を遅らせない。 */
export function Analytics() {
  if (!hasAnalytics) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
