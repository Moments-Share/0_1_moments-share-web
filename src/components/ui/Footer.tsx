import Link from "next/link";
import Image from "next/image";
import { company, hasTel, telHref } from "@/lib/company";

/* フッターにあった「LATEST NEWS」の2件は外した。
   TOPには直近3件を出す NewsPreview があり、同じお知らせが
   1画面のうちに2回出ていた。しかもフッター側は見出しを押しても
   個別記事ではなく一覧に飛ぶ作りで、記事に行けない分だけ弱かった。
   お知らせへの導線は、下の「会社」列の News と、TOPの節で足りている。 */

const businessLinks = [
  { href: "/service-dx", label: "DX・AX支援" },
  { href: "/service-bpo", label: "BPO" },
  { href: "/service-produce", label: "地域プロデュース" },
  // /works は準備中のため一時的に非表示。公開時にこの行のコメントを外す
  // { href: "/works", label: "Works（実績）" },
  { href: "/nishio-hatarakikata-zukan", label: "西尾働き方図鑑" },
  { href: "/nishio-career-lab", label: "西尾キャリアLab" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/people", label: "People" },
  { href: "/news", label: "News" },
  { href: "/student-internship", label: "大学生インターン募集" },
  { href: "/contact", label: "お問い合わせ" },
];

const snsLinks = [
  { href: "https://x.com/momentsshare_", label: "X" },
  { href: "https://instagram.com/momentsshare", label: "Instagram" },
  { href: "https://note.com/momentsshare", label: "note" },
];

export function Footer() {
  // フッターは全ページ共通で明るいクローム(ivory地)。ロゴ(白背景前提)の舞台に合わせ、文字はネイビー/charcoal。
  return (
    <footer className="bg-ivory text-charcoal border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative block h-11 w-9 shrink-0">
                <Image src="/logo/logo-3-trim.png" alt="Moments Share ロゴ" fill sizes="36px" className="object-contain" />
              </span>
              <span className="text-[20px] font-black tracking-[0.03em] text-navy-ink">
                Moments Share
              </span>
            </div>
            <p className="mt-5 text-[15px] font-bold leading-heading text-navy-ink">
              地域に、挑戦と共創の循環を。
            </p>
            <dl className="mt-6 space-y-1.5 text-[13px] text-charcoal/70 leading-relaxed">
              <div className="flex gap-3"><dt className="w-16 shrink-0 text-charcoal/50">正式名称</dt><dd>{company.name}</dd></div>
              <div className="flex gap-3"><dt className="w-16 shrink-0 text-charcoal/50">代表者</dt><dd>{company.representative}</dd></div>
              {/* 出すのは「拠点」だけ。登記上の本店所在地は出していない。
                  2つ並べると、所在地のほうだけ伏せているように読めたため。
                  ここに「所在地」というラベルを付け直さないこと。
                  そう書くと、登記と違う住所を本店所在地として出すことになる */}
              <div className="flex gap-3"><dt className="w-16 shrink-0 text-charcoal/50">拠点</dt><dd>{company.base}</dd></div>
              <div className="flex gap-3"><dt className="w-16 shrink-0 text-charcoal/50">設立</dt><dd>{company.founded}</dd></div>
              <div className="flex gap-3"><dt className="w-16 shrink-0 text-charcoal/50">事業</dt><dd>{company.business}</dd></div>
              {/* 電話番号は company.tel が入ったときだけ出す。空欄の行を見せない */}
              {hasTel && (
                <div className="flex gap-3">
                  <dt className="w-16 shrink-0 text-charcoal/50">電話</dt>
                  <dd>
                    <a className="text-navy-ink font-bold underline underline-offset-2 hover:text-deep-green transition-colors" href={telHref}>{company.tel}</a>
                    {company.telNote && <span className="ml-2 text-charcoal/50">{company.telNote}</span>}
                  </dd>
                </div>
              )}
              <div className="flex gap-3"><dt className="w-16 shrink-0 text-charcoal/50">Email</dt><dd><a className="text-navy-ink font-bold underline underline-offset-2 hover:text-deep-green transition-colors" href={`mailto:${company.email}`}>{company.email}</a></dd></div>
            </dl>
          </div>

          {/* Business */}
          <nav aria-label="Business">
            <div className="text-[11px] font-bold tracking-widest-label text-navy-ink">BUSINESS</div>
            <ul className="mt-5 space-y-3 text-[14px] text-charcoal/80">
              {businessLinks.map(({ href, label }) => (
                <li key={href}><Link href={href} className="hover:text-deep-green transition-colors">{label}</Link></li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <div className="text-[11px] font-bold tracking-widest-label text-navy-ink">COMPANY</div>
            <ul className="mt-5 space-y-3 text-[14px] text-charcoal/80">
              {companyLinks.map(({ href, label }) => (
                <li key={href}><Link href={href} className="hover:text-deep-green transition-colors">{label}</Link></li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-[12px] text-charcoal/70">© 2025 Moments Share合同会社. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[13px] text-charcoal/80">
            {snsLinks.map(({ href, label }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-deep-green transition-colors">{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
