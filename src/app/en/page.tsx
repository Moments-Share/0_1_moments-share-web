import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/ui/Nav";
import { company } from "@/lib/company";

/* ============================================================
   English page.

   サイトは日本語で、お客様も愛知県の中小企業なので、全ページを
   英語にしても使われない。ここは1枚で足りる内容に絞ってある。

   想定している読み手は4通り。1枚で全部に答えられる範囲にしている。
     ・取引の前に会社を確かめたい人（対外的な信用）
     ・西尾市で働いている外国の人（BPO・インターンの働き手）
     ・海外の取引先・パートナー
     ・留学生、海外からのインターン

   日本語の直訳にはしていない。日本語版のコピーは日本の読み手に
   向けて書いてあり、そのまま訳すと意味が薄くなる。
   ここでは、日本を知らない人が知りたい順に書き直してある
   （どこの、誰が、何をしている会社か → 何を頼めるか → 連絡先）。

   会社情報は lib/company.ts を参照している。日本語版と同じ出どころなので、
   引っ越しても設立年を直しても、両方同時に変わる。

   注意：html の lang は "ja" のまま（app/layout.tsx が1つしかないため）。
   このページ内は <div lang="en"> で囲って英語だと伝えている。
   hreflang と og:locale も en にしてある。
   html ごと切り替えるには、ルートレイアウトを言語ごとに分ける
   作り替えが要る。英語ページが増えるときに一緒にやる。
   ============================================================ */

const SITE = "https://moments-share.com";

export const metadata: Metadata = {
  title: "Moments Share LLC | Business automation and BPO in Nishio, Aichi",
  description:
    "Moments Share LLC is a small company in Nishio City, Aichi, Japan. We help local small and mid-sized companies cut the work that does not need a human, take on the work that does, and start new projects in the region.",
  alternates: {
    canonical: `${SITE}/en/`,
    /* 日本語版と英語版が対になっていることを検索エンジンに伝える。
       日本語トップ側にも同じ組を書いてあり、両方向から張っている */
    languages: {
      ja: `${SITE}/`,
      en: `${SITE}/en/`,
      "x-default": `${SITE}/`,
    },
  },
  openGraph: {
    siteName: "Moments Share LLC",
    title: "Moments Share LLC | Nishio, Aichi, Japan",
    description:
      "A small company in Nishio City, Aichi. Business automation (DX/AX), back-office support (BPO), and regional projects.",
    locale: "en_US",
    type: "website",
    url: `${SITE}/en/`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const businesses = [
  {
    name: "Automation & AI (DX / AX)",
    body: "We find the tasks in your company that no longer need a person — data entry, copying numbers between systems, monthly reports, routine replies — and rebuild them so they run without one. We stay on through the change, not just the setup.",
  },
  {
    name: "Back-office support (BPO)",
    body: "For the work that does need a person, we take it on: general administration, social media, and customer support. Then we keep looking for parts we can automate, so the workload goes down over time.",
  },
  {
    name: "Regional projects",
    body: "We start and run projects in Nishio — events, career programmes for students, and local media — so that people who want to try something here have somewhere to begin.",
  },
];

/* 会社概要。日本語版のフッターと同じ項目に揃えている。
   登記上の本店所在地は日本語版と同じく出していない（lib/company.ts の説明を参照） */
const profile: { k: string; v: string }[] = [
  { k: "Legal name", v: "Moments Share LLC（Moments Share合同会社）" },
  { k: "Founded", v: "November 2025" },
  { k: "Representative", v: "Ryu Nakane（中根 隆）" },
  { k: "Based in", v: "3F, 5-2 Honmachi, Nishio City, Aichi, Japan" },
  { k: "Business", v: "Automation & AI support / Back-office support / Regional projects" },
  { k: "Contact", v: company.email },
];

export default function EnglishPage() {
  return (
    <>
      <Nav heroTone="dark" lang="en" />
      <main id="main-content" lang="en">
        {/* ===== HERO ===== */}
        <section className="relative min-h-[56vh] overflow-hidden bg-[#16281f] md:min-h-[64vh]">
          <div className="absolute inset-0">
            <Image
              src="/photos/service-produce.png"
              alt="People at a community event in Nishio, Aichi"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(16,32,42,0.84) 0%, rgba(16,32,42,0.6) 42%, rgba(16,32,42,0.2) 74%, rgba(16,32,42,0) 100%)",
              }}
            />
          </div>
          <div className="relative z-10 mx-auto flex min-h-[56vh] w-full max-w-[1400px] flex-col justify-end px-6 pb-14 pt-32 md:min-h-[64vh] md:px-10 md:pb-20">
            <div className="max-w-2xl">
              <p className="text-[13px] font-bold tracking-[0.14em] text-white/70">
                Nishio, Aichi, Japan
              </p>
              <h1
                className="mt-5 font-semibold leading-[1.16] tracking-[-0.02em] text-white"
                style={{ fontSize: "clamp(32px, 4.6vw, 62px)" }}
              >
                Less of the work<br />nobody needs to do.
              </h1>
              <p className="mt-8 max-w-lg text-[16px] leading-[1.95] text-white/80 md:text-[17px]">
                We are a small company in Nishio City, Aichi. We help local businesses
                hand off routine work — to software where that works, and to people where
                it doesn&apos;t.
              </p>
            </div>
          </div>
        </section>

        {/* ===== WHAT WE DO ===== */}
        <section className="bg-white px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1400px]">
            <h2
              className="font-semibold leading-[1.25] tracking-[-0.02em] text-charcoal"
              style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}
            >
              What we do.
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-px bg-charcoal/10 md:mt-14 md:grid-cols-3">
              {businesses.map((b, i) => (
                <li key={b.name} className="bg-white p-6 md:p-8">
                  <span className="text-[14px] font-medium tabular-nums text-charcoal/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="mt-4 font-semibold leading-[1.35] tracking-[-0.02em] text-charcoal"
                    style={{ fontSize: "clamp(18px, 1.9vw, 23px)" }}
                  >
                    {b.name}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.85] text-charcoal/80 md:text-[15px]">
                    {b.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== WHO WE WORK WITH ===== */}
        <section className="bg-ivory px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <h2
                  className="font-semibold leading-[1.25] tracking-[-0.02em] text-charcoal"
                  style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}
                >
                  Who we work with.
                </h2>
              </div>
              <div className="lg:col-span-7">
                <ul className="space-y-5 text-[15px] leading-[1.95] text-charcoal/80 md:text-[16px]">
                  <li>
                    <strong className="font-semibold text-charcoal">
                      Small and mid-sized companies in Aichi.
                    </strong>{" "}
                    Most of our clients have between 5 and 100 staff and no one in-house
                    who owns technology. Meetings are usually online, so distance is not a
                    problem.
                  </li>
                  <li>
                    <strong className="font-semibold text-charcoal">
                      People looking for work that fits their life.
                    </strong>{" "}
                    The people we work with include specialists, people with a second job,
                    parents, and students. We agree the hours around the person, not the
                    other way round.
                  </li>
                  <li>
                    <strong className="font-semibold text-charcoal">
                      Students and interns.
                    </strong>{" "}
                    We run paid long-term internships in Nishio where students lead a real
                    project rather than assist with one.
                  </li>
                </ul>
                <p className="mt-8 text-[14px] leading-[1.9] text-charcoal/65">
                  We work in Japanese day to day. If you would prefer to talk in English,
                  say so when you write and we will arrange it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== COMPANY ===== */}
        <section className="bg-white px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1400px]">
            <h2
              className="font-semibold leading-[1.25] tracking-[-0.02em] text-charcoal"
              style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}
            >
              Company.
            </h2>
            <dl className="mt-10 max-w-[760px] border-t border-charcoal/15 md:mt-12">
              {profile.map((r) => (
                <div
                  key={r.k}
                  className="grid grid-cols-1 gap-1 border-b border-charcoal/15 py-5 sm:grid-cols-12 sm:gap-6"
                >
                  <dt className="text-[13px] font-bold tracking-[0.06em] text-charcoal/60 sm:col-span-4">
                    {r.k}
                  </dt>
                  <dd className="text-[15px] leading-[1.9] text-charcoal/85 sm:col-span-8">
                    {r.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section className="bg-green-deep px-6 py-20 text-white md:px-10 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="text-[12px] font-bold tracking-[0.16em] text-white/60">
                  Contact
                </p>
                <h2
                  className="mt-4 font-semibold leading-[1.2] tracking-[-0.01em]"
                  style={{ fontSize: "clamp(28px, 4vw, 54px)" }}
                >
                  Tell us what you<br />would like to hand off.
                </h2>
              </div>
              <div className="lg:col-span-4 lg:pb-3">
                <p className="text-[15px] leading-[1.95] text-white/75">
                  The enquiry form is in Japanese, but you are welcome to write in English.
                  You can also email us directly.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
                  <Link href="/contact" className="btn btn-ghost-on-green px-8 py-3.5">
                    Enquiry form →
                  </Link>
                  <a
                    href={`mailto:${company.email}`}
                    className="border-b border-white/40 pb-0.5 text-[14px] font-bold text-white transition-colors hover:border-white"
                  >
                    {company.email}
                  </a>
                </div>
              </div>
            </div>

            <p className="mt-14 border-t border-white/20 pt-8 text-[14px] leading-[1.9] text-white/70">
              The rest of this site is in Japanese.{" "}
              <Link
                href="/"
                hrefLang="ja"
                className="border-b border-white/40 pb-0.5 font-bold text-white transition-colors hover:border-white"
              >
                日本語のページへ →
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
