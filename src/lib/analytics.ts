/* ============================================================
   アクセス解析（Google Analytics 4）。

   いまサイトには解析タグが1つも入っていないので、
   「どのページから問い合わせに至ったか」が分からない。
   SEOやAIO、広告の判断がすべて勘になる。

   GA_MEASUREMENT_ID に測定ID（G- で始まる文字列）を入れた時点で、
   全ページに計測タグが入る。空のあいだは何も読み込まない。
   タグを入れない状態を既定にしてあるのは、IDが分からないまま
   それらしいIDを書くと、他人の計測先にデータを送ってしまうため。

   測定IDの出どころ:
     analytics.google.com → 管理 → データストリーム → ウェブ
     「G-XXXXXXXXXX」が測定ID。「UA-」で始まるものは旧版で使えない。

   TODO: 測定IDが分かったら GA_MEASUREMENT_ID を埋める。
   TODO: 問い合わせ完了をコンバージョンとして数えるには、
         送信後のサンクスページ（/contact/thanks/）が要る。
         Formspree の _next にそのURLを渡す。いまは送信後に
         ページ遷移しないので、完了を数える手がかりがない。
   ============================================================ */

/** GA4の測定ID。空文字のあいだは計測タグを入れない */
export const GA_MEASUREMENT_ID = "";

export const hasAnalytics = /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID.trim());

/** 問い合わせ送信をGA4に送る。測定IDが空のあいだは何も起きない。

    フォームはJSで送信して画面内に完了を出すので、ページの移動が起きない。
    そのままだと解析ツールから見て「問い合わせページを見ただけ」と
    区別がつかないので、送信できたときにこの1件を送る。
    JSが動かない環境では /contact/thanks/ に移動するので、
    そちらはページビューとして数えられる。 */
export function trackContactSubmit() {
  if (!hasAnalytics) return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", "generate_lead", { form: "contact" });
}
