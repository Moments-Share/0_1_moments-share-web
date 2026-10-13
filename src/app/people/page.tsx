import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/ui/Nav";
import { crew } from "@/data/crew";

export const metadata: Metadata = {
  /* 正規URL。WordPressから移ってきているので、末尾スラッシュ違いや
     パラメータ付きのURLを別ページとして数えられないよう明示する */
  alternates: { canonical: "https://moments-share.com/people/" },
  title: "メンバー・Crew紹介｜Moments Share",
  description:
    "Moments Shareには、社員のほかに、案件ごとに力を貸してくれる人がいます。専門人材・副業・子育て中・学生など、それぞれの事情に合う形で関わっています。愛知県西尾市発。",
  openGraph: {
    /* サイト名。layout で指定していても、ページ側で openGraph を
       書き直すと丸ごと差し替わって消えるので、各ページに書く */
    siteName: "Moments Share合同会社",
    title: "メンバー・Crew紹介｜Moments Share",
    description:
      "雇う・雇われるではない、もうひとつの関わり方。Moments Shareに関わってくれている人たちを紹介します。",
    type: "website",
    url: "https://moments-share.com/people",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

/* 呼び方を「Fellow」から「Crew」に変えた。

   ロゴは船なので、Crew なら「同じ船に乗る人」で絵と言葉が一致する。
   Fellow は説明しないと意味が伝わらず、説明しようとすると
   「Fellowとは」という定義の節と、人格の条件の列挙になっていた。
   独自の呼称を定義して資格要件を並べる形は、入会案内と同じ構造になる。

   そこで「Fellowとは」の節ごと外した。Crew は説明がいらない。
   情報は減らない。下の ways（関わり方）が、同じことを
   「どういう人か」ではなく「どういう状況の人か」で具体的に書いている。
   人格ではなく、仕組みの話をする。 */

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
                一緒に働く、<br />仲間たち。
              </h1>
              {/* 見出しは短い名詞句にする。下に「Crewを、紹介します。」の
                  見出しがあるので、ここで「紹介します」と言うと二度になる。
                  「Crewとは」の説明も置かない。仲間＝Crew は読めば分かるし、
                  説明を足すと外したはずの定義の節に戻ってしまう */}
              <p className="mt-8 max-w-lg text-[16px] md:text-[17px] leading-[2] text-white/80">
                社員だけでなく、社外の人と組んで仕事をつくっています。
              </p>
            </div>
          </div>
        </section>

        {/* ===== 1. 関わり方 — Crewの多様な関わり方 ===== */}
        <section className="py-16 md:py-28 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
              <div className="lg:col-span-4">
                <div className="text-[12px] font-bold tracking-[0.16em] text-charcoal/70">Crewの関わり方</div>
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

        {/* ===== 2. Crew紹介 — 横並びのカードで一覧する ===== */}
        <section className="py-16 md:py-28 px-6 md:px-10 bg-ivory">
          <div className="mx-auto max-w-[1400px]">
            <div className="text-[12px] font-bold tracking-[0.16em] text-charcoal/70">Crew紹介</div>
            <h2 className="mt-4 text-charcoal font-semibold leading-[1.35] tracking-[-0.01em]" style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}>
              Crewを、紹介します。
            </h2>

            {/* Crew一覧 — 横並びのカード。
                以前は1人ずつ縦に大きく積んでいたが、スクロール量が多いという
                指摘があったのでカードにした。人数が増えても縦に伸びにくい。
                内容は src/data/crew.ts の実在情報のみ。
                未確認の項目（肩書き・得意なこと等）は undefined にしておけば
                カードに出ない。空欄も「準備中」も表示しない。 */}
            <div id="crew-list" className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 items-start">
              {crew.map((f) => (
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

            {/* これから加わるCrew — 実在情報が揃うまで名前・肩書きは載せない。架空の人物は作成しない。 */}
            <div className="mt-20 md:mt-28 border-t border-charcoal/10 pt-14 md:pt-20">
              <div className="max-w-2xl">
                <div className="text-[12px] font-bold tracking-[0.16em] text-charcoal/70">これから</div>
                <h3 className="mt-4 text-charcoal font-semibold leading-[1.4] tracking-[-0.01em]" style={{ fontSize: "clamp(23px, 3vw, 38px)" }}>
                  紹介は、これから増えます。
                </h3>
                <p className="mt-6 text-[15px] leading-[2] text-charcoal/70">
                  専門人材、副業、子育て中、学生。いろいろな人が関わってくれています。
                  本人の了解が取れた順に、ここで紹介していきます。
                </p>
                {/* TODO: 実在するCrewを、写真／名前／得意なこと／担当／関わる理由の5項目で追記する。
                         架空の人物は作成しない。掲載は本人の了解を取ってから。
                         人数（現在5名）はサイトには出さない方針。数を書くと
                         「増えていない」ことが先に伝わるので、載せるのは紹介できる人だけ。 */}
              </div>
            </div>
          </div>
        </section>

        {/* ===== 3. Crewになる — 参加CTA。Deep Green のバンド ===== */}
        <section id="contact" className="scroll-mt-20 py-20 md:py-28 px-6 md:px-10 bg-green-deep text-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <div className="text-white/60 text-[12px] font-bold tracking-[0.16em]">Crewになる</div>
                <h2 className="mt-4 font-semibold leading-[1.2] tracking-[-0.01em]" style={{ fontSize: "clamp(30px, 4.4vw, 60px)" }}>
                  おもしろそうだと<br />思ったら。
                </h2>
              </div>
              <div className="lg:col-span-4 lg:pb-3">
                <p className="text-[15px] leading-[2] text-white/75">
                  働き方も場所も問いません。専門でも、副業でも、学生でも。
                </p>
                {/* 「話を聞いてみる」から変更。お問い合わせフォームの種別に
                    「採用・複業・パートナー参加」があるので、押したあとに
                    応募として受けられる。入口の言葉と受け皿が食い違わない */}
                <Link href="/contact" className="mt-6 btn btn-ghost-on-green px-9 py-4">
                  応募してみる →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
