import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/ui/Nav";

/* ============================================================
   404ページ。

   ここまでは Next.js の初期ページ（英語で "404: This page could not
   be found."）がそのまま出ていた。日本語のサイトで、戻る導線も無い。

   いま Search Console が「Not found (404)」を報告している。
   旧WordPressのURLがGoogleにまだ残っていて、そこから人が来ている。
   その人たちを受け止める場所がこのページなので、
   「見つかりません」で終わらせず、行き先を出す。

   出す行き先は、旧サイトから来た人が探していそうなものに絞る。
   全ページを並べるとフッターの焼き直しになるだけなので、
   3つの事業とお知らせまで。
   ============================================================ */

export const metadata: Metadata = {
  title: "ページが見つかりません｜Moments Share合同会社",
  description:
    "お探しのページは、移動または削除された可能性があります。Moments Share合同会社のトップページ、各事業のご案内、お知らせからお探しください。",
  /* 検索結果に出す意味がないページなので、インデックスさせない。
     リンクはたどってよい（ここから本来のページへ渡したい） */
  robots: { index: false, follow: true },
};

const guides = [
  { label: "DX・AX支援", note: "業務効率化・AI導入", href: "/service-dx" },
  { label: "BPO", note: "営業・事務・CSの業務委託", href: "/service-bpo" },
  { label: "地域プロデュース", note: "地域の課題と挑戦をつなぐ", href: "/service-produce" },
  { label: "お知らせ", note: "最近の取り組み", href: "/news" },
];

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="px-6 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1400px]">
            <p className="text-[12px] font-bold tracking-[0.28em] text-charcoal/45">404</p>
            <h1
              className="mt-6 max-w-[16em] font-bold leading-[1.3] tracking-[-0.02em] text-charcoal"
              style={{ fontSize: "clamp(26px, 3.8vw, 50px)" }}
            >
              ページが見つかりません。
            </h1>
            <p className="mt-8 max-w-[32em] text-[15px] leading-[2.1] text-charcoal/80 md:text-[16px]">
              お探しのページは、移動または削除された可能性があります。
              2026年にサイトを作り直したため、以前のアドレスのままだと開けないことがあります。
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/" className="btn btn-solid-green px-9 py-4">
                トップへ戻る
              </Link>
              <Link
                href="/contact"
                className="inline-block self-center border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
              >
                お問い合わせ →
              </Link>
            </div>

            {/* 旧サイトから来た人が探していそうなものだけ。
                全ページを並べるとフッターの焼き直しになる */}
            <div className="mt-20 border-t border-charcoal/15 pt-10 md:mt-28">
              <p className="text-[12px] font-bold tracking-[0.18em] text-sage-ink">
                よく見られているページ
              </p>
              <ul className="mt-8 grid grid-cols-1 gap-px bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-4">
                {guides.map((g) => (
                  <li key={g.href} className="bg-background">
                    <Link
                      href={g.href}
                      className="group flex h-full flex-col p-6 transition-colors hover:bg-white md:p-7"
                    >
                      <span
                        className="font-semibold leading-[1.4] tracking-[-0.01em] text-charcoal"
                        style={{ fontSize: "clamp(16px, 1.6vw, 19px)" }}
                      >
                        {g.label}
                      </span>
                      <span className="mt-2 flex-1 text-[13px] leading-[1.9] text-charcoal/70">
                        {g.note}
                      </span>
                      <span className="mt-5 text-[13px] font-bold text-navy-ink transition-colors group-hover:text-deep-green">
                        見る →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
