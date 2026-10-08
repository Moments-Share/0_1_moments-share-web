import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/ui/Nav";
import { ContactForm } from "@/components/ui/ContactForm";
import { BookingLink } from "@/components/ui/BookingLink";

export const metadata: Metadata = {
  /* 正規URL。WordPressから移ってきているので、末尾スラッシュ違いや
     パラメータ付きのURLを別ページとして数えられないよう明示する */
  alternates: { canonical: "https://moments-share.com/contact/" },
  title: "お問い合わせ・無料相談｜Moments Share",
  description:
    "愛知県西尾市のMoments Share合同会社へのご相談・お問い合わせ。この作業、減らせないか。人が足りない。地域で何か始めたい。まずはお気軽にお問い合わせください。初回のご相談は無料です。",
  openGraph: {
    /* サイト名。layout で指定していても、ページ側で openGraph を
       書き直すと丸ごと差し替わって消えるので、各ページに書く */
    siteName: "Moments Share合同会社",
    title: "お問い合わせ・無料相談｜Moments Share",
    description: "DX/AX・BPO・地域プロデュースのご相談。まずは30分、話してみませんか。",
    type: "website",
    url: "https://moments-share.com/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return (
    <>
      <Nav heroTone="dark" />
      <main id="main-content">
        {/* ===== HERO — 写真背景ヒーロー（TOPと同じトーン） ===== */}
        <section className="relative min-h-[58vh] md:min-h-[66vh] overflow-hidden bg-[#16281f]">
          <div className="absolute inset-0">
            <Image
              src="/photos/hero-nishio.jpg"
              alt="西尾市の川辺の風景"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
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
            <div className="text-[13px] font-bold tracking-[0.14em] text-white/70">お問い合わせ</div>
            <h1 className="mt-5 text-white font-semibold leading-[1.16] tracking-[-0.02em]"
                style={{ fontSize: "clamp(34px, 4.8vw, 64px)" }}>
              ご相談はこちらから
            </h1>
            {/* 冒頭は一行だけ。相談の例（この作業、減らせないか…）は
                フォームの直前に置いてある。ここで先に並べると、
                見出しを読んだ直後に3つの例を読まされることになる */}
            <p className="mt-8 max-w-md text-[16px] md:text-[17px] leading-[2] text-white/80">
              まずはお気軽にお問い合わせください。
            </p>
          </div>
        </section>

        {/* ===== フォーム — 本文セクション（レイアウト・コピー維持） ===== */}
        <section className="pt-16 md:pt-20 pb-20 md:pb-28 px-6 md:px-10">
          {/* フォーム — 重いカードをやめ、下線インプットの編集スタイル。
              広い画面でも左に余白だけが残らないよう、中央に置いて幅を抑える */}
          <div className="mx-auto max-w-[860px]">
            {/* 以前ここに「お電話番号について」の枠と、相談の例の一文を
                置いていたが、どちらも外した。

                電話番号の説明は、入力欄のすぐ下（ContactForm）に
                同じ文が出ている。読ませたいのは入力する瞬間なので、
                上に先出しすると同じことを2回言うことになる。 */}
            {/* 日程を押さえたい人はフォームを埋めずに済ませられるようにする */}
            <div className="mb-12 border-l-2 border-sage pl-5">
              <p className="text-[13px] font-bold tracking-[0.08em] text-charcoal/80">
                日程を決めて話したい方へ
              </p>
              <p className="mt-3 max-w-[32em] text-[13px] leading-[2] text-charcoal/65">
                空いている時間からお選びいただけます。下のフォームの入力は不要です。
              </p>
              <p className="mt-4">
                <BookingLink>予約ページを開く</BookingLink>
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
    </>
  );
}
