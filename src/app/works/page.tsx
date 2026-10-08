import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/ui/Nav";
import { PhotoNeeded } from "@/components/ui/PhotoNeeded";

export const metadata: Metadata = {
  title: "実績（Works）｜Moments Share",
  description:
    "Moments Shareがカタチにしてきた仕事。企業のDX・業務改善から地域プロジェクトまで、お客様や仲間と一緒につくってきた実績をご紹介します。",
  openGraph: {
    /* サイト名。layout で指定していても、ページ側で openGraph を
       書き直すと丸ごと差し替わって消えるので、各ページに書く */
    siteName: "Moments Share合同会社",
    title: "実績（Works）｜Moments Share",
    description:
      "企業のDX・業務改善から地域プロジェクトまで。Moments Shareがつくってきた仕事の実績。",
    type: "website",
    url: "https://moments-share.com/works",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  /* 内容が整うまで検索結果に出さない。URLは生きているので、
     すでにリンクを持っている人は開ける。
     公開するときは robots と sitemap.ts、Nav の1行を戻す。 */
  robots: { index: false, follow: false },
};

// 全社KPI（現在の事業数 / 2040年ゴール）
const kpi = { now: "4", goal: "240", label: "事業" };

// カテゴリ別の実績
const categories = [
  {
    name: "DX",
    items: ["AI導入支援 1社", "AI研修 2社", "システム開発 2件実施中", "効率化フロー 7件"],
  },
  {
    name: "BPO",
    items: ["業務代行支援 3社", "CS、SNS運用、事務"],
  },
  {
    name: "地域プロデュース",
    items: ["挑戦プロジェクト 4件"],
  },
  {
    name: "PARTNERS",
    items: ["ともに働くパートナー 5名"],
  },
];

const dxCases = [
  {
    tag: "DX",
    title: "SNS投稿の自動化",
    result: "30分 → 約6分",
    note: "作業時間 約80％削減",
    big: "80",
    bigUnit: "％削減",
    desc: "AIが企画し、X・Threadsへ自動投稿するフローを構築。毎日の投稿作業を大幅に削減。",
    photo: "/photos/service-dx.png",
    alt: "ホワイトボードでの業務整理",
  },
  {
    tag: "DX",
    title: "請求書発行の自動化",
    result: "手作業 → 自動化",
    note: "転記・送付をゼロに",
    desc: "フォーム入力から請求書の自動発行・メール送信までを一気通貫で自動化。",
    photo: "/photos/service-dx.png",
    alt: "自動化した請求書の記録",
  },
  {
    tag: "DX",
    title: "在庫管理の一元化",
    result: "紙＋Excel → 一元管理",
    note: "転記作業を削減",
    desc: "スマホ入力・クラウド管理・検索・アラートを実装し、Excel転記作業をなくした。",
    photo: "/photos/service-bpo.png",
    alt: "一元管理した在庫データの記録",
  },
];

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
    photo: "/photos/service-produce.png",
    alt: "地域イベントの様子",
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
        {/* ===== 準備中の告知。内容が整うまで最上部に出す =====
            公開するときは、このセクションと metadata.robots を消す */}
        <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-6 md:px-10 bg-green-deep text-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="text-white/75 text-[12px] font-bold tracking-[0.16em]">COMING SOON</div>
            <p
              className="mt-5 font-semibold leading-[1.15] tracking-[-0.02em]"
              style={{ fontSize: "clamp(40px, 7vw, 92px)" }}
            >
              準備中です。
            </p>
            <p className="mt-7 max-w-[34em] text-[16px] md:text-[18px] leading-[2] text-white/85">
              実績ページは現在まとめている途中です。以下の内容は暫定のもので、
              数字や事例は今後更新します。お急ぎの場合は、お問い合わせください。
            </p>
            <Link href="/contact" className="btn btn-ghost-on-green px-9 py-4 mt-9 inline-block">
              実績について問い合わせる →
            </Link>
          </div>
        </section>

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
              企業の業務改善から、地域のプロジェクトまで。
              お客様や仲間と一緒につくってきた仕事をご紹介します。
            </p>
          </div>
        </section>

        {/* ===== 数字 — 4つを同じ大きさ・同じ重みで ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="text-[12px] font-bold tracking-[0.16em] text-charcoal/45">数字で見る Moments Share</div>

            {/* 全社KPI — 事業 4 / 240 */}
            <div className="mt-10 flex items-baseline gap-2.5 border-t border-charcoal/10 pt-10">
              <span className="text-[15px] font-bold text-charcoal/70">{kpi.label}</span>
              <span className="text-charcoal font-semibold leading-none tracking-[-0.02em]" style={{ fontSize: "clamp(52px, 6.5vw, 84px)" }}>{kpi.now}</span>
              <span className="text-charcoal/40 font-semibold leading-none" style={{ fontSize: "clamp(24px, 3vw, 34px)" }}>/ {kpi.goal}</span>
            </div>

            {/* カテゴリ別 */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              {categories.map((c) => (
                <div key={c.name}>
                  <div className="text-[13px] font-bold tracking-[0.12em] text-charcoal">{c.name}</div>
                  <ul className="mt-3 space-y-2">
                    {c.items.map((it) => (
                      <li key={it} className="text-[14px] leading-[1.8] text-charcoal/75">{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== DX CASE — 代表事例を大きく、残りは静かなリストで ===== */}
        <section className="py-16 md:py-28 px-6 md:px-10">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <h2 className="text-charcoal font-semibold leading-[1.35] tracking-[-0.01em]" style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}>
                業務を、余白に変えた事例。
              </h2>
            </div>

            {/* 代表事例 — 写真を主役に、成果はテキストで添える */}
            <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-6">
                <PhotoNeeded ratio="4/3" kind="MOMENTS" note="SNS自動化の運用・作業画面と手元（横）" />
              </div>
              <div className="md:col-span-6">
                <div className="text-charcoal/45 text-[12px] font-semibold tracking-[0.08em]">{dxCases[0].tag}</div>
                <h3 className="mt-4 text-charcoal font-semibold leading-[1.4] tracking-[-0.01em]" style={{ fontSize: "clamp(22px, 2.8vw, 34px)" }}>{dxCases[0].title}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-charcoal font-semibold leading-none tracking-[-0.02em]" style={{ fontSize: "clamp(40px, 5.4vw, 64px)" }}>約{dxCases[0].big}</span>
                  <span className="text-charcoal font-semibold text-[17px] md:text-[20px] pb-1.5">{dxCases[0].bigUnit}</span>
                </div>
                <div className="mt-2 text-[15px] font-bold text-charcoal/80">{dxCases[0].result}</div>
                <p className="mt-4 max-w-md text-[15px] md:text-[16px] leading-[2] text-charcoal/80">{dxCases[0].desc}</p>
              </div>
            </div>

            {/* 残り2事例 — 静かな読み物リスト */}
            <div className="mt-14 md:mt-20 flex flex-col divide-y divide-charcoal/10 border-t border-charcoal/10">
              {dxCases.slice(1).map((c) => (
                <div key={c.title} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-baseline py-8 md:py-10">
                  <div className="md:col-span-3 text-charcoal/40 text-[12px] font-bold tracking-[0.14em]">{c.tag}</div>
                  <div className="md:col-span-4">
                    <h3 className="text-charcoal font-semibold leading-[1.45] tracking-[-0.01em]" style={{ fontSize: "clamp(19px, 2.2vw, 26px)" }}>{c.title}</h3>
                    <div className="mt-2 text-[15px] font-bold text-charcoal/80">{c.result}</div>
                    <div className="mt-1 text-[13px] text-charcoal/55">{c.note}</div>
                  </div>
                  <p className="md:col-span-5 text-[15px] leading-[2] text-charcoal/80">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BPO CASE — 実データ準備中（TODO） ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <div className="text-[12px] font-bold tracking-[0.14em] text-charcoal/45">BPO事例</div>
              </div>
              <div className="lg:col-span-8">
                <h2 className="text-charcoal font-semibold leading-[1.4] tracking-[-0.01em]" style={{ fontSize: "clamp(22px, 3vw, 38px)" }}>
                  人が必要な仕事を、<br className="hidden sm:block" />一緒に支えた事例。
                </h2>
                {/* TODO: 実在するBPO支援の具体事例（企業名は伏せて内容・成果）を追記する。架空の事例は掲載しない。 */}
                <p className="mt-8 max-w-2xl text-[15px] md:text-[16px] leading-[2] text-charcoal/80">
                  現在、掲載できる事例を整理中です。CS代行・SNS運用・事務代行などの支援実績を順次公開します。
                </p>
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

        {/* ===== VOICE — 実データ準備中（TODO） ===== */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <div className="text-[12px] font-bold tracking-[0.14em] text-charcoal/45">お客様の声</div>
              </div>
              <div className="lg:col-span-8">
                <h2 className="text-charcoal font-semibold leading-[1.4] tracking-[-0.01em]" style={{ fontSize: "clamp(22px, 3vw, 38px)" }}>
                  実際に、どう変わったか。
                </h2>
                {/* TODO: 実在するお客様の声（許諾済みのコメント・お名前/イニシャル）を掲載する。架空のコメントは作成しない。 */}
                <p className="mt-8 max-w-2xl text-[15px] md:text-[16px] leading-[2] text-charcoal/80">
                  掲載許諾をいただいたお客様の声を、準備でき次第ご紹介します。
                </p>
              </div>
            </div>
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
                <Link href="/contact" className="mt-6 btn btn-ghost-on-green px-9 py-4">
                  30分相談する →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
