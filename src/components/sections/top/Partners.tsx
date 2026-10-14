import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { roles } from "@/lib/recruit";

/* ============================================================
   PARTNERS — 外部パートナーの募集

   個人名・肩書き・人物写真は載せない。すでに多数在籍しているように
   見せないため、人物カードを並べる構成は取らない。
   雇用の募集ではなく、プロジェクト単位の共創相手を探す案内として置く。

   以前は「募集する分野」を6つ並べていたが、分野を読んでも
   次に何をすればいいか分からなかった。入口を2つに絞り、
   それぞれ押せるようにした。分野で分けるより、
   自分がどちらかを選ぶほうが早い。
   ============================================================ */

/** 募集中の件数は recruit.ts から数える。手で書くと実態とずれる */
const openRoles = roles.filter((r) => r.status === "募集中").length;

/* 見出しは名詞のまま残す。読む人はまず「自分がどちらか」を探すので、
   ここが行動の言葉だと自分ごとか判断できない。
   押す文言のほうを行動にする。「詳しく見る」では何も起きない気がする */
const paths = [
  {
    title: "大学生インターン",
    // 人数は出さない。すぐ上のKPIに「受入学生インターン 2名」があり、
    // 同じ画面に意味の違う「2名」が2つ並ぶと取り違えられる
    // （片方は受け入れた実績、片方はこれから募集する数）。
    // 募集している職種と人数は /student-internship に並んでいる
    badge: openRoles > 0 ? "募集中" : undefined,
    // 条件（週2〜3日など）はここに書かず、詳細ページに任せる。
    // カードは「やってみよう」と思わせるところまでが役目
    body: "有償の長期インターンをしてみよう！",
    href: "/student-internship",
    action: "インターンに参加する",
  },
  {
    title: "フリーランス・複業",
    // どんな人が居るかを職種で書く。個人名・肩書き・写真は出さない
    // （どなたが関わっているかは、こちらから公表しない約束）。
    // 職種を並べるだけで「自分と同じような人が居る」ことは伝わる。
    //
    // 「ママさん」ではなく「子育て中の方」にしてある。
    // 子育てをしながら働きたい父親も同じ層にいるので、
    // 性別を書くと片方が「自分向けではない」と受け取る。
    // /people/ の書き方（専門人材・副業・子育て中・学生…）とも揃う
    body: "エンジニア、デザイナー、子育て中の方など様々なメンバーと一緒に支援をしています。",
    href: "/contact",
    action: "フリーランスとして応募する",
  },
];

export function Partners() {
  return (
    <section className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* 左 — ラベル・見出し・本文 */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[11px] font-bold tracking-[0.28em] text-sage-ink">PARTNERS</p>
              <h2
                className="mt-6 font-bold leading-[1.35] tracking-[-0.02em] text-charcoal"
                style={{ fontSize: "clamp(26px, 3.4vw, 44px)" }}
              >
                一緒に、挑戦しませんか。
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              {/* 一文だけ。下に入口のカードが2枚あるので、
                  ここで働き方まで説明すると同じことを二度言うことになる */}
              <p className="mt-8 max-w-[26em] text-[16px] leading-[2] text-charcoal md:text-[18px]">
                弊社は、一緒に働ける仲間を募集しています。
              </p>
            </Reveal>
          </div>

          {/* 右 — 入口は2つだけ。押せる面にする */}
          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {paths.map((p) => (
                  <Link
                    key={p.title}
                    href={p.href}
                    className="group flex flex-col border border-charcoal/15 bg-white p-7 transition-colors hover:border-deep-green md:p-8"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className="text-charcoal font-semibold leading-[1.35] tracking-[-0.02em]"
                        style={{ fontSize: "clamp(20px, 2.1vw, 26px)" }}
                      >
                        {p.title}
                      </h3>
                      {p.badge && (
                        <span className="mt-1 shrink-0 bg-deep-green px-2.5 py-1 text-[11px] font-bold tracking-[0.06em] text-white">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-4 flex-1 text-[15px] leading-[1.95] text-charcoal/80">{p.body}</p>
                    <span className="mt-7 inline-block self-start border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors group-hover:border-deep-green group-hover:text-deep-green">
                      {p.action} →
                    </span>
                  </Link>
                ))}
              </div>

              <p className="mt-6 text-[14px] leading-[1.9] text-charcoal/75">
                どちらにも当てはまらない関わり方でも、
                <Link
                  href="/contact"
                  className="border-b border-navy-ink/40 font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
                >
                  まずはご相談ください
                </Link>
                。
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
