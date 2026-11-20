import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/ui/Nav";
import { PhotoNeeded } from "@/components/ui/PhotoNeeded";
import { BookingLink } from "@/components/ui/BookingLink";
import { CaseCard, CasesNote } from "@/components/ui/CaseCard";
import { cases } from "@/data/cases";
import { PLAN_CONTACT_HREF } from "@/lib/plans";

export const metadata: Metadata = {
  alternates: { canonical: "https://moments-share.com/works/" },
  title: "実績・導入事例｜AI導入・業務自動化｜Moments Share",
  description:
    "中小企業のAI導入・業務自動化の実績。FAXのAI仕分け、台帳の統合、申込から請求案内までの自動化、月額伴走での並行開発など。お困りごと・やったこと・結果をご紹介します。",
  openGraph: {
    /* サイト名。layout で指定していても、ページ側で openGraph を
       書き直すと丸ごと差し替わって消えるので、各ページに書く */
    siteName: "Moments Share合同会社",
    title: "実績・導入事例｜AI導入・業務自動化｜Moments Share",
    description:
      "お困りごと → やったこと → 結果。中小企業のAI導入・業務自動化の実績をご紹介します。",
    locale: "ja_JP",
    type: "website",
    url: "https://moments-share.com/works/",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

/* 2026年11月に公開に戻した。
   10月に一度公開したあと「中身を整えてから」と noindex にしていたが、
   DX・AXの事例を src/data/cases.ts にまとめ直したので出す。

   以前ここにあった次のものは外した：
   ・「SNS投稿 30分 → 約6分（約80％削減）」などのHP掲載事例3件。
     実績集でも支援先と測った記録の紐付けが「要確認」のままで、
     実測と言える出典が見つからなかった。出典が確かめられたら cases.ts に足す。
   ・「事業 4 / 240」と、カテゴリ別の件数（AI研修 2社 など）。
     数えた範囲と時点が書かれておらず、事例の一覧と数が合わなかった。

   BPOの事例・お客様の声は、引き続き載せていない。
   どちらも架空の事例・コメントは作らないこと。 */

const projects = [
  {
    title: "西尾働き方図鑑",
    desc: "地元で働く人・企業の姿を伝え、就活する学生と地域企業をつなぐプロジェクト。",
    photo: "/photos/service-produce.png",
    alt: "西尾働き方図鑑の企画資料",
  },
  {
    title: "西尾筋肉祭り",
    desc: "地域の人が主役になって楽しむイベント。関わる人の輪を広げる場づくり。",
    /* 第1回（2026年5月17日・にししん文化会館）の実写。
       他の2つはまだ実写が無いのでサービスページの画像を使っている */
    photo: "/photos/18_region_event.jpg",
    alt: "西尾筋肉祭りの客席で、出場者と子どもたちがハイタッチしている様子",
  },
  {
    title: "AI活用研究会",
    desc: "地域の企業・個人がAI活用を学び合うコミュニティ。挑戦のきっかけをつくる。",
    photo: "/photos/service-bpo.png",
    alt: "AI活用研究会の企画資料",
  },
];

export default function WorksPage() {
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
          <div className="relative z-10 min-h-[58vh] md:min-h-[66vh] flex flex-col justify-end max-w-[1400px] mx-auto w-full px-6 md:px-10 pb-14 md:pb-20 pt-32">
            <div className="text-[13px] font-bold tracking-[0.14em] text-white/70">Works（実績）</div>
            <h1 className="mt-5 text-white font-semibold leading-[1.16] tracking-[-0.02em]"
                style={{ fontSize: "clamp(34px, 5vw, 68px)" }}>
              ひとつずつ、<br />形に。
            </h1>
            <p className="mt-8 max-w-xl text-[16px] md:text-[17px] leading-[2] text-white/80">
              中小企業のAI導入・業務自動化から、地域のプロジェクトまで。
              お客様や仲間と一緒につくってきた仕事をご紹介します。
            </p>
          </div>
        </section>

        {/* ===== DX・AXの事例 — お困りごと → やったこと → 結果 ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <p className="text-[12px] font-bold tracking-[0.18em] text-sage-ink">DX・AX CASES</p>
                <h2 className="mt-5 text-charcoal font-semibold leading-[1.35] tracking-[-0.01em]" style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}>
                  業務を、余白に変えた事例。
                </h2>
              </div>
              <p className="lg:col-span-7 lg:pt-10 max-w-[38em] text-[15px] md:text-[16px] leading-[2] text-charcoal/80">
                お客様の現場で動いている仕組みの一部です。
                どれも「どこに時間がかかっているか」を一緒に整理するところから始めました。
              </p>
            </div>

            <ul className="mt-12 grid grid-cols-1 gap-6 md:mt-16 lg:grid-cols-2">
              {cases.map((c) => (
                <li key={c.id}>
                  <CaseCard c={c} />
                </li>
              ))}
            </ul>
            <CasesNote />

            {/* 事例を読み終えた人への導線。年間プランへ渡す */}
            <div className="mt-14 flex flex-col gap-6 border-y border-charcoal/15 py-10 md:mt-20 md:flex-row md:items-center md:justify-between md:py-12">
              <div>
                <h2 className="font-semibold leading-[1.35] tracking-[-0.02em] text-charcoal" style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}>
                  1本つくって終わりにしない。毎月1本ずつ、1年かけて。
                </h2>
                <p className="mt-4 max-w-[36em] text-[15px] leading-[2] text-charcoal/75">
                  「AI導入伴走 年間プラン」では、毎月ひとつずつ自動化をつくり、効果をレポートでお渡しします。
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-start gap-4">
                <Link href="/annual-plan" className="btn btn-solid-green px-9 py-4">
                  年間プランを見る →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===== REGIONAL PROJECTS — 写真を主役に、同じ整列で静かに並べる ===== */}
        <section className="py-16 md:py-28 px-6 md:px-10">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <h2 className="text-charcoal font-semibold leading-[1.35] tracking-[-0.01em]" style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}>
                地域に、挑戦の<br className="hidden sm:block" />きっかけをつくった。
              </h2>
            </div>

            {/* 代表プロジェクト — 写真を大きく */}
            <article className="mt-12 md:mt-16">
              <div className="relative aspect-[16/9] w-full">
                <Image src={projects[0].photo} alt={projects[0].alt} fill sizes="(max-width:768px) 100vw, 90vw" className="object-cover" />
              </div>
              <div className="mt-6 max-w-2xl">
                <h3 className="text-charcoal font-semibold leading-[1.4] tracking-[-0.01em]" style={{ fontSize: "clamp(22px, 2.8vw, 34px)" }}>{projects[0].title}</h3>
                <p className="mt-3 text-[15px] md:text-[16px] leading-[2] text-charcoal/80">{projects[0].desc}</p>
              </div>
            </article>

            {/* 02・03 — 同じ体裁で静かに */}
            <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
              {projects.slice(1).map((p, i) => (
                <article key={p.title}>
                  {i === 0 ? (
                    <PhotoNeeded ratio="4/3" kind="MOMENTS" note="イベント当日・参加者が体を動かす様子（横）" />
                  ) : (
                    <div className="relative aspect-[4/3] w-full">
                      <Image src={p.photo} alt={p.alt} fill sizes="(max-width:768px) 100vw, 45vw" className="object-cover" />
                    </div>
                  )}
                  <h3 className="mt-5 text-charcoal font-semibold leading-[1.45] tracking-[-0.01em]" style={{ fontSize: "clamp(20px, 2.4vw, 28px)" }}>{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-[2] text-charcoal/80">{p.desc}</p>
                </article>
              ))}
            </div>

            <p className="mt-14 text-[15px] leading-[2] text-charcoal/80">
              ほかにも地域のプロジェクトに取り組んでいます。
              <Link href="/service-produce" className="ml-1 text-navy-ink border-b border-navy-ink/40 pb-0.5 font-bold hover:text-deep-green hover:border-deep-green transition-colors">地域プロデュースを見る →</Link>
            </p>
          </div>
        </section>

        {/* ===== CTA — Deep Green のバンド ===== */}
        <section id="contact" className="scroll-mt-20 py-20 md:py-28 px-6 md:px-10 bg-green-deep text-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <h2 className="lg:col-span-8 font-bold leading-[1.2] tracking-[-0.01em]" style={{ fontSize: "clamp(32px, 5vw, 68px)" }}>
                ご相談はこちらから
              </h2>
              <div className="lg:col-span-4 lg:pb-3">
                <p className="text-[15px] leading-[2] text-white/75">
                  「うちに合うかわからない」でも大丈夫です。まだ課題が整理できていなくても構いません。
                </p>
                <Link href={PLAN_CONTACT_HREF} className="mt-6 btn btn-ghost-on-green px-9 py-4">
                  無料で相談する →
                </Link>
                <p className="mt-5 text-[14px] leading-[1.9] text-white/70">
                  日程が決まっている方は <BookingLink variant="onGreen">予約ページから</BookingLink>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
