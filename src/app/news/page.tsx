import type { Metadata } from "next";
import { Nav } from "@/components/ui/Nav";
import { newsItems } from "@/data/news";
import { ExternalLink } from "@/components/ui/ExternalLink";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  /* 正規URL。WordPressから移ってきているので、末尾スラッシュ違いや
     パラメータ付きのURLを別ページとして数えられないよう明示する */
  alternates: { canonical: "https://moments-share.com/news/" },
  title: "ニュース・お知らせ｜Moments Share",
  description:
    "Moments Share合同会社のお知らせ・プロジェクト情報・サービスリリース。愛知県西尾市での取り組みや、新聞・ニュースへの掲載情報をお届けします。",
  openGraph: {
    /* サイト名。layout で指定していても、ページ側で openGraph を
       書き直すと丸ごと差し替わって消えるので、各ページに書く */
    siteName: "Moments Share合同会社",
    title: "ニュース・お知らせ｜Moments Share",
    description: "Moments Share合同会社のお知らせ・プロジェクト・サービス情報。",
    locale: "ja_JP",
    type: "website",
  },
};

/* 配列の順番に依存せず、常に新しい順で見せる */
const sorted = [...newsItems].sort((a, b) => b.date.localeCompare(a.date));

export default function NewsPage() {
  return (
    <>
      <Nav heroTone="dark" />
      <main id="main-content">
        {/* ===== HERO — 写真背景ヒーロー（TOPと同じトーン） ===== */}
        <section className="relative min-h-[58vh] md:min-h-[66vh] overflow-hidden bg-[#16281f]">
          <div className="absolute inset-0">
            <Image
              src="/photos/hero.png"
              alt="愛知県西尾の街並み"
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
          <div className="relative z-10 min-h-[58vh] md:min-h-[66vh] flex flex-col justify-end max-w-[1000px] mx-auto w-full px-8 md:px-20 pb-10 md:pb-14 pt-32">
            <div className="flex items-end justify-between gap-8">
              <div>
                <p className="text-[12px] font-bold tracking-[0.16em] text-white/70 mb-5">NEWS</p>
                <h1
                  className="font-bold text-white leading-[1.15] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(32px, 4.4vw, 56px)" }}
                >
                  ニュース
                </h1>
              </div>
              <div className="hidden sm:block shrink-0 pb-2 text-[13px] font-bold tracking-[0.08em] text-white/70">
                {newsItems.length} POSTS
              </div>
            </div>
          </div>
        </section>

        <div className="pt-12 md:pt-16 pb-section bg-ivory min-h-screen">
          <div className="max-w-[1000px] mx-auto px-8 md:px-20">
            <div>
              {sorted.map((item) => (
                <div
                  key={item.slug}
                  className="border-t border-charcoal/10 last:border-b"
                >
                  <div className="py-7 md:py-9 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-12">
                    <time className="text-[13px] font-bold tracking-[0.08em] text-charcoal/70 shrink-0 pt-[3px]">
                      {item.date.replace(/-/g, ".")}
                    </time>
                    <div className="flex flex-col gap-2">
                      {item.category && (
                        <span className="text-[11px] font-bold tracking-[0.16em] text-charcoal/70 uppercase">
                          {item.category}
                        </span>
                      )}
                      {/* タイトルを押すと、その1件の報告ページへ */}
                      <Link
                        href={`/news/${item.slug}`}
                        className="self-start text-[17px] font-medium leading-[1.7] tracking-[-0.01em] text-charcoal/85 transition-colors hover:text-deep-green md:text-[19px]"
                      >
                        {item.title}
                      </Link>
                      {item.href && (
                        <ExternalLink href={item.href} className="mt-1 self-start">
                          {item.source ?? "記事を読む"}
                        </ExternalLink>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <Link
                href="/"
                className="text-[12px] font-bold tracking-[0.08em] text-charcoal/70 hover:text-deep-green transition-colors"
              >
                ← ホームへ戻る
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
