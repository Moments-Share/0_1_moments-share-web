/**
 * お問い合わせフォームの送信先。
 *
 * このサイトは静的書き出し（next.config.ts の output: "export"）のため、
 * サーバー側で受け取る仕組みを持てない。送信は外部サービス（Formspree）が受ける。
 *
 * 既定値をコードに持たせているのは、Vercel の環境変数を設定しなくても
 * デプロイした時点でフォームが動くようにするため。
 * 送信先を差し替えたくなったら、環境変数 NEXT_PUBLIC_CONTACT_ENDPOINT を
 * 設定すればそちらが優先される（Vercel → Settings → Environment Variables）。
 *
 * このURLはビルド時にJSへ埋め込まれ、閲覧者からも見える。Formspree は
 * それを前提にした設計なので問題はないが、APIキーや秘密情報は置かない。
 */

const DEFAULT_CONTACT_ENDPOINT = "https://formspree.io/f/meaqnpkj";

export const CONTACT_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim() || DEFAULT_CONTACT_ENDPOINT;

/** フォームが使えないときの代替連絡先 */
export const CONTACT_EMAIL = "branding@momentsshare.com";

/** 送信先が設定済みか。https のURLだけを有効とみなす */
export const isContactEndpointConfigured = /^https:\/\/\S+$/.test(CONTACT_ENDPOINT);

/**
 * 日程を決めて相談したい人向けの予約ページ（TimeRex）。
 *
 * フォームが「まだ課題が整理できていない人」の入口なのに対し、
 * こちらは「話す内容が決まっていて、早く話したい人」の入口。
 * 外部サイトなので、リンクは必ず別タブで開く（BookingLink を使う）。
 *
 * 予約サービスを乗り換えるときは、この1行を差し替えれば全ページに反映される。
 */
export const BOOKING_URL = "https://timerex.net/s/branding_9d12_9ec6/4c4ce0fc";

/* ------------------------------------------------------------
   問い合わせページで出す「安心材料」。

   フォームの前で相手が知りたいのは、料金・返信の早さ・
   電話番号の使われ方の3つ。これが書いていないと、
   必須項目を埋める前に離脱する。

   TODO: REPLY_WITHIN は御社の運用に合わせて直すこと。
         守れない約束を書くと、書かないより悪い。
         変えるときはこの1行だけを直せばページ全体に反映される。
------------------------------------------------------------ */

/* ここから下の2つは、いまサイトのどこからも使っていない。
   TOPのCTAと /contact/ に出していたが外した。
   約束として書ける内容が固まったら、また使うこと。 */

/** 初回相談が無料であること。DX支援ページのFAQと同じ内容 */
export const FIRST_CONSULT_FREE = "初回のご相談は無料です。";

/** 返信の目安 */
export const REPLY_WITHIN = "2営業日以内";

/** 電話番号を必須にしている理由。相手には必須で求めているので、用途を明示する */
export const TEL_PURPOSE = "お急ぎの場合のみ。折り返しのご連絡に使い、営業のご連絡はしません。";
