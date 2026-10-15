import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/ui/Nav";
import { CONTACT_EMAIL } from "@/lib/contact";

/* ============================================================
   送信完了ページ。

   フォームは通常、JSで送信して画面内に「送信しました」を出すので、
   このページは2つの場合にだけ出る。

   1. JSが動かない環境
      その場合はブラウザがフォームを直接POSTし、
      Formspree が _next で指定したこのURLへ戻す。
   2. 送信完了を計測したいとき
      画面内で完結すると、解析ツールから見ると
      「問い合わせページを見ただけ」と区別がつかない。
      このURLが開かれた＝送信が終わった、という目印になる。

   文言は、フォーム内の完了メッセージと同じことを書く。
   どちらを見た人にも、次に何が起きるかが同じに伝わるようにする。
   片方だけ直すとズレるので、直すときは ContactForm.tsx も見ること。
   ============================================================ */

export const metadata: Metadata = {
  title: "送信ありがとうございます｜Moments Share合同会社",
  description:
    "お問い合わせを受け付けました。内容を確認のうえ、2〜3営業日以内にご返信します。",
  /* 検索結果に出す意味がないページなので、インデックスさせない。
     リンクはたどってよい */
  robots: { index: false, follow: true },
};

export default function ContactThanksPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="bg-ivory px-6 pb-24 pt-36 md:px-10 md:pb-36 md:pt-44">
          <div className="mx-auto max-w-[760px]">
            <p className="text-[11px] font-bold tracking-[0.24em] text-charcoal/55">THANK YOU</p>
            <h1
              className="mt-6 font-bold leading-[1.35] tracking-[-0.02em] text-charcoal"
              style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
            >
              送信しました。<br />ありがとうございます。
            </h1>
            <p className="mt-8 text-[15px] leading-[2] text-charcoal/80 md:text-[16px]">
              内容を確認のうえ、2〜3営業日以内にご返信します。
              <strong className="font-bold">自動返信メールは送信していません。</strong>
              そのままご返信をお待ちください。
              しばらく経っても届かない場合は、迷惑メールフォルダをご確認いただくか、
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="border-b border-navy-ink/40 pb-0.5 font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
              >
                {CONTACT_EMAIL}
              </a>
              まで直接ご連絡ください。
            </p>

            <div className="mt-14 flex flex-wrap gap-4">
              <Link href="/" className="btn btn-solid-green px-9 py-4">
                トップへ戻る
              </Link>
              <Link href="/news" className="btn btn-ghost-navy px-9 py-4">
                お知らせを見る
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
