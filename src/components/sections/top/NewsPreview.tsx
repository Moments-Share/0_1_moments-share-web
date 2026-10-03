import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SitePhoto } from "@/components/ui/SitePhoto";
import { newsFallbackImage, newsImages } from "@/lib/site-images";
import { newsItems } from "@/data/news";

/* ============================================================
   NEWS — 直近3件。実際のプロジェクト・研修・イベントの写真を添える。
   写真は site-images.ts の newsImages（slugをキー）で管理する。
   ============================================================ */

const latest = [...newsItems]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3);

export function NewsPreview() {
  return (
    <section className="bg-white px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold tracking-[0.28em] text-charcoal/40">NEWS</p>
              <h2
                className="mt-6 font-bold leading-[1.35] tracking-[-0.02em] text-charcoal"
                style={{ fontSize: "clamp(26px, 3.4vw, 44px)" }}
              >
                お知らせ
              </h2>
            </div>

            <Link
              href="/news"
              className="border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
            >
              お知らせをすべて見る →
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:mt-16 md:grid-cols-3">
            {/* カード全体を押せるようにする。写真と日付とタイトルが
                別々に押せると、どこを押せばいいのか迷う */}
            {latest.map((item) => (
              <Link key={item.slug} href={`/news/${item.slug}`} className="group block">
                <SitePhoto
                  image={newsImages[item.slug] ?? newsFallbackImage}
                  ratio="16/9"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="mt-5 flex items-center gap-4">
                  <time className="text-[13px] font-bold tracking-[0.08em] tabular-nums text-charcoal/50">
                    {item.date.replace(/-/g, ".")}
                  </time>
                  {item.category && (
                    <span className="text-[11px] font-bold tracking-[0.16em] text-charcoal/45">
                      {item.category}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-[17px] font-medium leading-[1.8] tracking-[-0.01em] text-charcoal/85 transition-colors group-hover:text-deep-green md:text-[18px]">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
