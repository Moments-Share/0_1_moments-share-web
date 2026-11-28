import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/ui/Nav";

export const metadata: Metadata = {
  title: "Works｜導入実績｜Moments Share",
  description:
    "Moments Shareがカタチにしてきた仕事。企業のDX・業務改善から地域プロジェクトまで、お客様や仲間と一緒につくってきた実績をご紹介します。",
  openGraph: {
    /* サイト名。layout で指定していても、ページ側で openGraph を
       書き直すと丸ごと差し替わって消えるので、各ページに書く */
    siteName: "Moments Share合同会社",
    title: "Works｜導入実績｜Moments Share",
    description:
      "企業のDX・業務改善から地域プロジェクトまで。Moments Shareがつくってきた仕事の実績。",
    type: "website",
    url: "https://moments-share.com/works",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  /* 中身は Coming Soon なので、検索結果には出さない。
     「準備中」のページを検索に出すと、読む人にもGoogleにも薄いページに見える。
     canonical も noindex のあいだは付けない。
     中身を入れて公開するときは robots を消し、canonical と
     sitemap.ts・llms.txt の1行を戻し、vercel.json の /projects を /works/ に、
     /service-dx の事例の下のリンクを /works に戻す。 */
  robots: { index: false, follow: false },
};

/* ナビ（「Works」）とフッターからは開けるが、中身はまだ Coming Soon。

   以前の下書き（数字・DX事例3件・地域プロジェクト3件）は
   コミット b7b9d90 の時点のこのファイルにある。中身を戻すときはそこから。
   そのときも次の2つは、実例・許諾済みのコメントが揃うまで出さないこと：
   ・「人が必要な仕事を、一緒に支えた事例。」（BPO事例）
   ・「実際に、どう変わったか。」（お客様の声）
   架空の事例・コメントは作らないこと。

   「ともに働くパートナー 5名」の行は載せない方針。戻さないこと。 */

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
            <div className="text-[13px] font-bold tracking-[0.14em] text-white/70">Works｜導入実績</div>
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

        {/* ===== COMING SOON ===== */}
        <section className="py-24 md:py-36 px-6 md:px-10 bg-white">
          <div className="mx-auto max-w-[1400px] text-center">
            <div className="text-charcoal font-semibold leading-none tracking-[0.04em]"
                 style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
              Coming Soon
            </div>
            <p className="mt-8 text-[15px] md:text-[16px] leading-[2] text-charcoal/70">
              導入実績は、ただいま準備中です。<br />
              公開まで、もうしばらくお待ちください。
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
