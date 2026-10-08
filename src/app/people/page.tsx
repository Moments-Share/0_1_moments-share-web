import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/ui/Nav";
import { fellows } from "@/data/fellows";

export const metadata: Metadata = {
  /* 正規URL。WordPressから移ってきているので、末尾スラッシュ違いや
     パラメータ付きのURLを別ページとして数えられないよう明示する */
  alternates: { canonical: "https://moments-share.com/people/" },
  title: "メンバー・Fellow紹介｜Moments Share",
  description:
    "Moments Shareでは、ともに歩む一人ひとりを「Fellow」と呼びます。自分の人生を主体的に生きながら、志が重なるとき、ともに挑戦し、ともに未来を創る人。専門人材・副業・子育て中・学生・地域の人など、多様な関わり方があります。愛知県西尾市発。",
  openGraph: {
    /* サイト名。layout で指定していても、ページ側で openGraph を
       書き直すと丸ごと差し替わって消えるので、各ページに書く */
    siteName: "Moments Share合同会社",
    title: "メンバー・Fellow紹介｜Moments Share",
    description:
      "自分の人生を主体的に生きながら、志が重なるとき、ともに挑戦し、ともに未来を創る人。Moments Shareの「Fellow」という関わり方。",
    type: "website",
    url: "https://moments-share.com/people",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

// Fellowの定義を分解した「こんな人」（定義文に忠実な言い換え）
const fellowTraits = [
  "自分の人生を、主体的に生きている。",
  "心の中に、志ややってみたいことがある。",
  "志が重なったら、立場を超えて手を組める。",
  "ともに挑戦し、未来を創ることを楽しめる。",
];

const ways = [
  { title: "専門性を活かして企業を支える", desc: "得意分野のスキルで、企業の業務やプロジェクトに関わる。" },
  { title: "副業でプロジェクトに参加する", desc: "本業を持ちながら、関心のあるプロジェクトに参加する。" },
  { title: "子育てをしながら働く", desc: "生活に合わせた時間で、無理なく仕事に関わる。" },
  { title: "学生として地域に関わる", desc: "学びながら、地域のプロジェクトに実践者として加わる。" },
  { title: "自分でプロジェクトを始める", desc: "「やってみたい」を持ち込み、挑戦者として動き出す。" },
];

export default function PeoplePage() {
  return (
    <>
      <Nav heroTone="dark" />
      <main id="main-content">
        {/* ===== HERO — 写真背景ヒーロー（TOPと同じトーン） ===== */}
        <section className="relative min-h-[58vh] md:min-h-[66vh] overflow-hidden bg-[#16281f]">
          <div className="absolute inset-0">
            <Image
              src="/photos/service-produce.png"
              alt="西尾の地域活動に集う人々"
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
            <div className="max-w-2xl">
              <div className="text-[13px] font-bold tracking-[0.14em] text-white/70">People</div>
              <h1 className="mt-5 text-white font-semibold leading-[1.16] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(34px, 5vw, 68px)" }}>
                ともに未来を創る、<br />仲間たち。
              </h1>
              <p className="mt-8 max-w-lg text-[16px] md:text-[17px] leading-[2] text-white/80">
                Moments Shareは、社員だけで仕事をする会社ではありません。
                ここに関わる一人ひとりを、私たちは「Fellow（フェロー）」と呼んでいます。
              </p>
            </div>
          </div>
        </section>

        {/* ===== 1. Fellowとは — 定義を静かに、大きく読ませる ===== */}
        <section className="py-16 md:py-28 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1000px]">
            <div className="text-[12px] font-bold tracking-[0.16em] text-charcoal/70">FELLOW — Fellowとは</div>
            <p className="mt-6 text-charcoal font-semibold leading-[1.55] tracking-[-0.01em]"
               style={{ fontSize: "clamp(23px, 3.4vw, 44px)" }}>
              自分の人生を主体的に生きながら、<br className="hidden sm:block" />
              志が重なるとき、ともに挑戦し、<br className="hidden sm:block" />
              ともに未来を創る人。
            </p>
            <p className="mt-8 max-w-2xl text-[16px] md:text-[17px] leading-[2] text-charcoal/80">
              Moments Shareでは、ともに歩む一人ひとりを「Fellow（フェロー）」と呼んでいます。
              雇う・雇われるの関係ではなく、それぞれが自分の人生を生きながら、
              志が重なったときに手を組む——そんな関係を大切にしています。
            </p>
          </div>
        </section>

        {/* ===== 2. こんな人 — 定義を分解。カードにせず一覧で ===== */}
        <section className="py-16 md:py-28 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
              <div className="lg:col-span-4">
                <div className="text-[12px] font-bold tracking-[0.16em] text-charcoal/70">こんな人</div>
                <h2 className="mt-4 text-charcoal font-semibold leading-[1.35] tracking-[-0.01em]" style={{ fontSize: "clamp(26px, 3.4vw, 42px)" }}>
                  Fellowは、<br />こんな人。
                </h2>
              </div>
              <div className="lg:col-span-8">
                <ul className="divide-y divide-charcoal/10 border-t border-charcoal/10">
                  {fellowTraits.map((t) => (
                    <li key={t} className="py-6 md:py-8">
                      <p className="text-charcoal font-medium leading-[1.5] tracking-[-0.01em]" style={{ fontSize: "clamp(19px, 2.4vw, 28px)" }}>
                        {t}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 3. 関わり方 — Fellowの多様な関わり方 ===== */}
        <section className="py-16 md:py-28 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
              <div className="lg:col-span-4">
                <div className="text-[12px] font-bold tracking-[0.16em] text-charcoal/70">Fellowの関わり方</div>
                <h2 className="mt-4 text-charcoal font-semibold leading-[1.35] tracking-[-0.01em]" style={{ fontSize: "clamp(26px, 3.4vw, 42px)" }}>
                  関わり方は、<br />ひとつじゃない。
                </h2>
                <p className="mt-6 max-w-md text-[15px] leading-[2] text-charcoal/70">
                  専門人材、副業、子育て中、学生、地域の人。それぞれの持ち場から、無理のない形で関わっています。
                </p>
              </div>
              <div className="lg:col-span-8">
                <ul className="divide-y divide-charcoal/10 border-t border-charcoal/10">
                  {ways.map((w) => (
                    <li key={w.title} className="py-7 md:py-9">
                      <h3 className="text-charcoal font-semibold leading-[1.5] tracking-[-0.01em]" style={{ fontSize: "clamp(18px, 2.2vw, 25px)" }}>{w.title}</h3>
                      <p className="mt-2 max-w-xl text-[15px] leading-[2] text-charcoal/80">{w.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 4. Fellow紹介 — 横並びのカードで一覧する ===== */}
        <section className="py-16 md:py-28 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <div className="text-[12px] font-bold tracking-[0.16em] text-charcoal/70">Fellow紹介</div>
            <h2 className="mt-4 text-charcoal font-semibold leading-[1.35] tracking-[-0.01em]" style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}>
              Fellowを、紹介します。
            </h2>

            {/* Fellow一覧 — 横並びのカード。
                以前は1人ずつ縦に大きく積んでいたが、スクロール量が多いという
                指摘があったのでカードにした。人数が増えても縦に伸びにくい。
                内容は src/data/fellows.ts の実在情報のみ。
                未確認の項目（肩書き・得意なこと等）は undefined にしておけば
                カードに出ない。空欄も「準備中」も表示しない。 */}
            <div id="fellow-list" className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 items-start">
              {fellows.map((f) => (
                <article
                  key={f.name}
                  className="flex flex-col bg-white border border-charcoal/12"
                >
                  {f.photo ? (
                    <div className="relative w-full overflow-hidden bg-light" style={{ aspectRatio: "4/5" }}>
                      <Image
                        src={f.photo}
                        alt={f.photoAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    /* 写真が届くまでの枠。無地の灰色だと「空箱」に見えるので、
                       姓の一文字を薄く置いて意図のある面に見せる。装飾なので読み上げない */
                    <div
                      className="flex w-full items-center justify-center bg-light"
                      style={{ aspectRatio: "4/5" }}
                    >
                      <span
                        aria-hidden
                        className="font-bold leading-none text-charcoal/15"
                        style={{ fontSize: "clamp(72px, 7vw, 120px)" }}
                      >
                        {f.name.slice(0, 1)}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col p-7 md:p-8">
                    {f.role && (
                      <div className="text-[12px] font-bold tracking-[0.14em] text-charcoal/70">{f.role}</div>
                    )}
                    <div className="mt-3 flex items-baseline gap-3 flex-wrap">
                      <span
                        className="text-charcoal font-bold leading-[1.25] tracking-[-0.01em]"
                        style={{ fontSize: "clamp(24px, 2.4vw, 32px)" }}
                      >
                        {f.name}
                      </span>
                      {f.nameEn && (
                        <span className="text-[12px] font-bold text-muted tracking-[0.14em]">{f.nameEn}</span>
                      )}
                    </div>
                    {f.caption && (
                      <p className="mt-3 text-[13px] leading-[1.8] text-charcoal/75">{f.caption}</p>
                    )}

                    {(f.strengths || f.duty || f.why) && (
                      <dl className="mt-6 divide-y divide-charcoal/10 border-t border-charcoal/10">
                        {[
                          { k: "得意なこと", v: f.strengths },
                          { k: "担当していること", v: f.duty },
                          { k: "なぜMoments Shareに関わっているか", v: f.why },
                        ]
                          .filter((x) => x.v)
                          .map(({ k, v }) => (
                            <div key={k} className="py-4">
                              <dt className="text-[11px] font-bold tracking-[0.12em] text-charcoal/70">{k}</dt>
                              <dd className="mt-1.5 text-[14px] leading-[1.9] text-charcoal/85">{v}</dd>
                            </div>
                          ))}
                      </dl>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* これから加わるFellow — 活動中の場面で。実在情報が揃うまで名前・肩書きは載せない。架空の人物は作成しない。 */}
            <div className="mt-20 md:mt-28 border-t border-charcoal/10 pt-14 md:pt-20">
              <div className="max-w-2xl">
                <div className="text-[12px] font-bold tracking-[0.16em] text-charcoal/70">これから</div>
                <h3 className="mt-4 text-charcoal font-semibold leading-[1.4] tracking-[-0.01em]" style={{ fontSize: "clamp(23px, 3vw, 38px)" }}>
                  これから、Fellowが増えていく。
                </h3>
                <p className="mt-6 text-[15px] leading-[2] text-charcoal/70">
                  専門人材、副業、子育て中、学生——。それぞれの持ち場から関わるFellowを、順次紹介していきます。
                </p>
                {/* TODO: 実在するFellowを、写真／名前／得意なこと／担当／関わる理由の5項目で追記する。架空の人物は作成しない。 */}
                <p className="mt-6 text-[13px] tracking-[0.04em] text-muted">※ 他のFellowは準備中。掲載は本人の実在情報のみ。</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 5. Fellowになる — 参加CTA。Deep Green のバンド ===== */}
        <section id="contact" className="scroll-mt-20 py-20 md:py-28 px-6 md:px-10 bg-green-deep text-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <div className="text-white/60 text-[12px] font-bold tracking-[0.16em]">Fellowになる</div>
                <h2 className="mt-4 font-semibold leading-[1.2] tracking-[-0.01em]" style={{ fontSize: "clamp(30px, 4.4vw, 60px)" }}>
                  志が重なったら、<br />ともに。
                </h2>
              </div>
              <div className="lg:col-span-4 lg:pb-3">
                <p className="text-[15px] leading-[2] text-white/75">
                  働き方も場所も問いません。専門でも、副業でも、学生でも。まずは気軽に話すところから。
                </p>
                <Link href="/contact" className="mt-6 btn btn-ghost-on-green px-9 py-4">
                  Fellowとして関わる →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
