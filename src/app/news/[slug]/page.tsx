import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/ui/Nav";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { SitePhoto } from "@/components/ui/SitePhoto";
import { newsFallbackImage, newsImages } from "@/lib/site-images";
import { findNews, newsItems } from "@/data/news";

/* ============================================================
   お知らせ1件の詳細。/news/<slug>/

   data/news.ts に1件足すと、このページが自動でできる。
   ページのファイルを作る必要はない。

   output: "export" なので、出せるURLをビルド時に全部知っておく
   必要がある。それが generateStaticParams。
   ============================================================ */

export function generateStaticParams() {
  return newsItems.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = findNews(slug);
  if (!item) return {};
  const title = `${item.title}｜Moments Share`;
  return {
    title,
    description: item.lead,
    alternates: { canonical: `https://moments-share.com/news/${item.slug}/` },
    openGraph: {
    /* サイト名。layout で指定していても、ページ側で openGraph を
       書き直すと丸ごと差し替わって消えるので、各ページに書く */
    siteName: "Moments Share合同会社",
      title,
      description: item.lead,
      locale: "ja_JP",
      type: "article",
      url: `https://moments-share.com/news/${item.slug}/`,
      publishedTime: item.date,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findNews(slug);
  if (!item) notFound();

  /* 新しい順に並べたときの前後。読み終えた人の行き先をつくる */
  const sorted = [...newsItems].sort((a, b) => b.date.localeCompare(a.date));
  const i = sorted.findIndex((n) => n.slug === item.slug);
  const newer = sorted[i - 1];
  const older = sorted[i + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: item.lead,
    datePublished: item.date,
    inLanguage: "ja",
    mainEntityOfPage: `https://moments-share.com/news/${item.slug}/`,
    author: { "@type": "Organization", name: "Moments Share合同会社" },
    publisher: {
      "@type": "Organization",
      name: "Moments Share合同会社",
      url: "https://moments-share.com/",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main-content" className="bg-ivory">
        <article className="mx-auto max-w-[760px] px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
          {/* 来た道を先に出す。検索から直接来た人は、
              ここが「どのサイトの何のページか」を知る最初の手がかりになる */}
          <Link
            href="/news"
            className="text-[12px] font-bold tracking-[0.08em] text-charcoal/70 transition-colors hover:text-deep-green"
          >
            ← お知らせ一覧
          </Link>

          <div className="mt-8 flex items-center gap-4">
            <time
              dateTime={item.date}
              className="text-[13px] font-bold tabular-nums tracking-[0.08em] text-charcoal/60"
            >
              {item.date.replace(/-/g, ".")}
            </time>
            {item.category && (
              <span className="text-[11px] font-bold tracking-[0.16em] text-sage-ink">
                {item.category}
              </span>
            )}
          </div>

          <h1
            className="mt-4 font-bold leading-[1.5] tracking-[-0.02em] text-charcoal"
            style={{ fontSize: "clamp(24px, 3.2vw, 38px)" }}
          >
            {item.title}
          </h1>

          {/* 比率は画像側の申告に従う。ここで 16/9 に固定していたため、
              2:1 のセミナー告知バナーが左右で切れ、日付と社名が読めなかった。
              申告が無い画像だけ 16/9 にする */}
          <div className="mt-9">
            <SitePhoto
              image={newsImages[item.slug] ?? newsFallbackImage}
              ratio={(newsImages[item.slug] ?? newsFallbackImage).ratio ?? "16/9"}
              sizes="(max-width: 768px) 100vw, 760px"
            />
          </div>

          {/* 冒頭の1〜2文は本文より少し大きく。ここだけ読んでも要点が分かる */}
          <p className="mt-10 text-[17px] font-medium leading-[2] text-charcoal md:text-[19px]">
            {item.lead}
          </p>

          {item.body && (
            <div className="mt-7 space-y-6 text-[15px] leading-[2.1] text-charcoal/85 md:text-[16px]">
              {item.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          )}

          {item.href && (
            <p className="mt-9">
              <ExternalLink href={item.href}>{item.source ?? "記事を読む"}</ExternalLink>
            </p>
          )}

          {item.related && item.related.length > 0 && (
            <div className="mt-14 border-t border-charcoal/15 pt-8">
              <p className="text-[11px] font-bold tracking-[0.16em] text-charcoal/60">
                関連するページ
              </p>
              <ul className="mt-4 space-y-3">
                {item.related.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="inline-block border-b border-navy-ink/40 pb-0.5 text-[15px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
                    >
                      {r.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 前後のお知らせ。読み終えたところで行き止まりにしない */}
          {(newer || older) && (
            <nav className="mt-14 grid grid-cols-1 gap-5 border-t border-charcoal/15 pt-8 sm:grid-cols-2">
              {newer ? (
                <Link href={`/news/${newer.slug}`} className="group">
                  <span className="text-[11px] font-bold tracking-[0.16em] text-charcoal/60">
                    ← 新しいお知らせ
                  </span>
                  <span className="mt-2 block text-[15px] leading-[1.8] text-charcoal/85 transition-colors group-hover:text-deep-green">
                    {newer.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {older && (
                <Link href={`/news/${older.slug}`} className="group sm:text-right">
                  <span className="text-[11px] font-bold tracking-[0.16em] text-charcoal/60">
                    古いお知らせ →
                  </span>
                  <span className="mt-2 block text-[15px] leading-[1.8] text-charcoal/85 transition-colors group-hover:text-deep-green">
                    {older.title}
                  </span>
                </Link>
              )}
            </nav>
          )}
        </article>
      </main>
    </>
  );
}
