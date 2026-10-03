import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SitePhoto } from "@/components/ui/SitePhoto";
import type { SiteImageKey } from "@/lib/site-images";
import { Carousel, CarouselItem } from "@/components/ui/Carousel";
import { CycleDiagram } from "@/components/ui/CycleDiagram";

/* ============================================================
   OUR BUSINESS — 3つの事業

   以前は1事業ずつ縦に大きく積んでいたが、スクロール量が多く
   全体像がつかめないという指摘があったため、横並びのカードにした。

   DXが主力であることは、大きさではなく「色」で示す。
   01だけ濃いグリーンで塗り、02・03は白のカードにする。
   大きさで差をつけると、結局また縦に伸びてしまう。

   事業のあいだの循環は、以前は事業と事業のあいだに縦線で入れていた。
   これも縦に伸びる原因だったので、カードの下に一行でまとめている。

   並べ方は横スクロールのカルーセル。PCでは3枚とも収まる。
   スマホでは1枚ずつ送れるので、縦に3枚積まれずに済む。

   自動送りはしない。勝手に動くと、この節に目を移した時点で
   01「DX・AX支援」が過ぎていることがあり、
   主力の事業を見られないまま通り過ぎてしまう。
   まず1枚目を見せて、その先は読む人が自分で送る。
   ============================================================ */

type Business = {
  no: string;
  label: string;
  title: string;
  body: string;
  href: string;
  image: SiteImageKey;
  /** 主力。塗りのカードにする */
  primary?: boolean;
};

const businesses: Business[] = [
  {
    no: "01",
    label: "DX・AX支援",
    title: "忙しさを、余白へ。",
    body: "AI導入・システム開発・研修を通じて企業の業務改善に伴走し、新しいことに取り組める時間をつくります。",
    href: "/service-dx",
    image: "dxImage",
    primary: true,
  },
  {
    no: "02",
    label: "BPO",
    title: "人手不足に、社外の力を。",
    body: "営業・事務・CS等を受託し、社外パートナーとチームを組んで企業を支えます。",
    href: "/service-bpo",
    image: "bpoImage",
  },
  {
    no: "03",
    label: "地域プロデュース",
    title: "想いを、挑戦へ。",
    body: "個の「やりたい」と地域の「課題」をつなぎ、地域内外の人や企業とともに新しい仕事や事業をつくります。",
    href: "/service-produce",
    image: "regionImage",
  },
];

export function BusinessFlow() {
  return (
    <section id="business" className="scroll-mt-16 px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="text-[11px] font-bold tracking-[0.28em] text-charcoal/70">OUR BUSINESS</p>
          <h2
            className="mt-6 font-bold leading-[1.35] tracking-[-0.02em] text-charcoal"
            style={{ fontSize: "clamp(26px, 3.6vw, 46px)" }}
          >
            3つの事業で、
            <br className="hidden sm:block" />
            地域に循環をつくる。
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 md:mt-16">
          <Carousel label="3つの事業">
            {businesses.map((b) => {
              const dark = b.primary;
              return (
                <CarouselItem key={b.label}>
                <Link
                  href={b.href}
                  className={`group flex w-full flex-col transition-shadow hover:shadow-lg ${
                    dark ? "bg-green-deep text-white" : "bg-white border border-charcoal/12"
                  }`}
                >
                  <SitePhoto name={b.image} ratio="4/3" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />

                  <div className="flex flex-1 flex-col p-7 md:p-8">
                    <div className="flex items-baseline gap-3">
                      {/* 番号は目印。事業名より目立たせない */}
                      <span
                        className={`font-bold leading-none tabular-nums tracking-[-0.03em] ${
                          dark ? "text-white/60" : "text-sage-ink/75"
                        }`}
                        style={{ fontSize: "clamp(16px, 1.5vw, 19px)" }}
                      >
                        {b.no}
                      </span>
                      {/* 事業名。3枚を見比べる人が最初に探すのはここなのに
                          カードの中で一番小さい12pxだった。字間は大きい文字だと
                          間延びするので、広げていたぶんを詰める */}
                      <span
                        className={`font-bold tracking-[0.04em] ${dark ? "text-white" : "text-charcoal"}`}
                        style={{ fontSize: "clamp(17px, 1.8vw, 21px)" }}
                      >
                        {b.label}
                      </span>
                    </div>

                    <h3
                      className={`mt-4 font-bold leading-[1.35] tracking-[-0.02em] ${
                        dark ? "text-white" : "text-charcoal"
                      }`}
                      style={{ fontSize: "clamp(22px, 2.2vw, 28px)" }}
                    >
                      {b.title}
                    </h3>

                    <p
                      className={`mt-4 flex-1 text-[15px] leading-[1.95] ${
                        dark ? "text-white/85" : "text-charcoal/80"
                      }`}
                    >
                      {b.body}
                    </p>

                    {/* カード全体がリンクなので、ここは見た目だけ。二重リンクにしない */}
                    <span
                      className={`mt-7 inline-block self-start border-b pb-0.5 text-[14px] font-bold transition-colors ${
                        dark
                          ? "border-white/60 text-white group-hover:border-white"
                          : "border-navy-ink/40 text-navy-ink group-hover:border-deep-green group-hover:text-deep-green"
                      }`}
                    >
                      {b.label}を詳しく →
                    </span>
                  </div>
                </Link>
                </CarouselItem>
              );
            })}
          </Carousel>
          </div>
        </Reveal>

        {/* 循環。御社の構想図（VISION 2040）の6段階に差し替えた。
            TOPでは段階の名前だけを見せ、詳細は地域プロデュースへ渡す */}
        <Reveal delay={0.15}>
          <div className="mt-12 border-t border-charcoal/12 pt-10 md:mt-16">
            <CycleDiagram variant="compact" />
            <Link
              href="/service-produce"
              className="mt-7 inline-block border-b border-navy-ink/40 pb-0.5 text-[14px] font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green"
            >
              この循環をつくるのが、地域プロデュース事業 →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
