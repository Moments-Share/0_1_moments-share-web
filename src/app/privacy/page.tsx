import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/ui/Nav";
import { company } from "@/lib/company";

/* ============================================================
   プライバシーポリシー。

   置いている理由は2つ。
   1. お問い合わせフォーム等で個人情報を受け取るので、
      利用目的などを公表しておく（個人情報保護法）。
   2. 社内のカレンダー同期に使う Google の OAuth アプリを
      「本番環境」にするには、Google がこのページのURLを求める。
      そのため「Google ユーザーデータの取り扱い」の節は消さないこと。
      消すと OAuth アプリの要件を満たさなくなる。

   書いてあることは、いまの実態に合わせてある。
   - 問い合わせの受け口は Formspree（lib/contact.ts）
   - 日程予約は TimeRex（lib/contact.ts の BOOKING_URL）
   - アクセス解析は、測定IDが空のあいだは動いていない（lib/analytics.ts）
   仕組みを変えたら、ここの記述も合わせて直すこと。

   住所は載せていない。サイトに本店所在地を出さない方針のため
   （lib/company.ts のコメント参照）。法律上は、求めに応じて遅滞なく
   回答できればよいので、その旨を「事業者情報」に書いている。
   ============================================================ */

/* 制定日・改定日。内容を変えたら「最終改定日」を更新する */
const ESTABLISHED = "2026年11月21日";

export const metadata: Metadata = {
  alternates: { canonical: "https://moments-share.com/privacy/" },
  title: "プライバシーポリシー｜Moments Share合同会社",
  description:
    "Moments Share合同会社における個人情報の取り扱いについて。取得する情報、利用目的、第三者提供、外部サービスの利用、Google ユーザーデータの取り扱い、お問い合わせ窓口を定めています。",
};

const h2Class =
  "mt-16 border-t border-border pt-10 text-[19px] font-bold leading-[1.5] text-navy-ink md:text-[21px]";
const pClass = "mt-5 text-[15px] leading-[2] text-charcoal/80";
const listClass = "mt-5 list-disc space-y-2 pl-6 text-[15px] leading-[1.9] text-charcoal/80";
const linkClass =
  "border-b border-navy-ink/40 pb-0.5 font-bold text-navy-ink transition-colors hover:border-deep-green hover:text-deep-green";

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="bg-ivory px-6 pb-24 pt-36 md:px-10 md:pb-36 md:pt-44">
          <article className="mx-auto max-w-[760px]">
            <p className="text-[11px] font-bold tracking-[0.24em] text-charcoal/55">PRIVACY POLICY</p>
            <h1
              className="mt-6 font-bold leading-[1.35] tracking-[-0.02em] text-charcoal"
              style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
            >
              プライバシーポリシー
            </h1>
            <p className={pClass}>
              {company.name}（以下「当社」）は、お客様・お取引先・地域の皆さまからお預かりする個人情報を、
              個人情報の保護に関する法律その他の関係法令に従い、以下の方針に基づいて適切に取り扱います。
            </p>

            <h2 className={h2Class}>1. 取得する情報</h2>
            <p className={pClass}>当社は、主に次の場面で個人情報を取得します。</p>
            <ul className={listClass}>
              <li>お問い合わせフォーム：お名前、会社名・屋号、メールアドレス、お電話番号、ご相談の種類と内容</li>
              <li>日程予約・面談：お名前、連絡先、ご予約の日時と内容</li>
              <li>業務のご依頼・お取引：ご担当者さまのお名前、連絡先、ご依頼内容に必要な情報</li>
              <li>セミナー・イベント・インターン等へのお申し込み：お名前、連絡先、お申し込み内容</li>
            </ul>

            <h2 className={h2Class}>2. 利用目的</h2>
            <ul className={listClass}>
              <li>お問い合わせ・ご相談への回答、ご連絡のため</li>
              <li>ご依頼いただいた業務の提供、契約の履行、請求のため</li>
              <li>面談・打ち合わせ等の日程調整のため</li>
              <li>セミナー・イベント等のご案内、運営のため</li>
              <li>サービスの改善、新しいサービスの検討のため（個人を特定しない形で利用します）</li>
            </ul>
            <p className={pClass}>上記の目的の範囲を超えて利用する場合は、あらかじめご本人の同意をいただきます。</p>

            <h2 className={h2Class}>3. 第三者への提供</h2>
            <p className={pClass}>
              当社は、次の場合を除き、ご本人の同意なく個人情報を第三者に提供しません。
            </p>
            <ul className={listClass}>
              <li>法令に基づく場合</li>
              <li>人の生命・身体・財産の保護のために必要で、ご本人の同意を得ることが難しい場合</li>
              <li>利用目的の達成に必要な範囲で、業務の一部を外部に委託する場合（委託先は適切に監督します）</li>
            </ul>

            <h2 className={h2Class}>4. 外部サービスの利用</h2>
            <p className={pClass}>
              当社のウェブサイトでは、次の外部サービスを利用しています。
              各サービスにおける情報の取り扱いは、それぞれの事業者の方針に従います。
            </p>
            <ul className={listClass}>
              <li>お問い合わせフォームの受信：Formspree</li>
              <li>日程予約：TimeRex</li>
              <li>
                アクセス解析：Google アナリティクスを利用する場合があります。
                Cookie を使って、個人を特定しない形で閲覧状況を集計します。
                Cookie はブラウザの設定で無効にできます。
              </li>
            </ul>

            <h2 className={h2Class}>5. Google ユーザーデータの取り扱い</h2>
            <p className={pClass}>
              当社は、社内の業務効率化のため、Google のサービスと連携する社内向けのアプリケーション
              （カレンダーの予定を当社の業務用アカウント間で同期するもの）を運用しています。
              このアプリケーションが Google アカウントへのアクセスを求めるのは、当社の業務に携わる者が
              自らの意思で許可した場合に限ります。
            </p>
            <ul className={listClass}>
              <li>
                アクセスする情報：許可されたアカウントの Google カレンダーの予定（日時・タイトル・場所・説明・参加者）
              </li>
              <li>
                利用目的：当社の業務用アカウント間で予定を同期し、予定の重複や見落としを防ぐことにのみ利用します
              </li>
              <li>
                保存場所：同期先の Google カレンダー内にのみ保存し、当社が別のサーバーやデータベースに保存・蓄積することはありません
              </li>
              <li>
                第三者への提供：法令に基づく場合を除き、第三者に提供・販売しません。広告への利用や、AI・機械学習モデルの学習への利用も行いません
              </li>
              <li>
                アクセスの取り消し：Google アカウントの設定（
                <a
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  サードパーティのアクセス
                </a>
                ）から、いつでも取り消せます
              </li>
            </ul>
            <p className={pClass}>
              Google API から受け取った情報の利用および他のアプリケーションへの転送は、
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Google API サービスのユーザーデータに関するポリシー
              </a>
              （限定使用の要件を含む）に従います。
            </p>

            <h2 className={h2Class}>6. 安全管理</h2>
            <p className={pClass}>
              当社は、個人情報の漏えい・滅失・毀損を防ぐため、アクセスできる者を必要な範囲に限り、
              利用するサービスのアカウントを適切に管理するなど、必要かつ適切な安全管理措置を講じます。
            </p>

            <h2 className={h2Class}>7. 開示・訂正・利用停止等のご請求</h2>
            <p className={pClass}>
              ご本人から、保有する個人情報の利用目的の通知、開示、訂正・追加・削除、利用の停止・消去、
              第三者提供の停止のご請求があった場合は、ご本人であることを確認したうえで、法令に従い遅滞なく対応します。
              下記の窓口までご連絡ください。
            </p>

            <h2 className={h2Class}>8. 事業者情報・お問い合わせ窓口</h2>
            <dl className="mt-5 space-y-2 text-[15px] leading-[1.9] text-charcoal/80">
              <div className="flex gap-4"><dt className="w-20 shrink-0 text-charcoal/55">事業者名</dt><dd>{company.name}</dd></div>
              <div className="flex gap-4"><dt className="w-20 shrink-0 text-charcoal/55">代表者</dt><dd>{company.representative}</dd></div>
              <div className="flex gap-4">
                <dt className="w-20 shrink-0 text-charcoal/55">連絡先</dt>
                <dd>
                  <a href={`mailto:${company.email}`} className={linkClass}>{company.email}</a>
                </dd>
              </div>
            </dl>
            <p className={pClass}>
              当社の住所は、ご請求いただければ遅滞なくお知らせします。
              <Link href="/contact" className={linkClass}>お問い合わせフォーム</Link>
              からもご連絡いただけます。
            </p>

            <h2 className={h2Class}>9. 本ポリシーの変更</h2>
            <p className={pClass}>
              当社は、法令の改正や業務の変更に応じて、本ポリシーを変更することがあります。
              変更後の内容は、このページに掲載した時点から効力を生じます。
            </p>

            <p className="mt-16 text-[13px] text-charcoal/55">制定日：{ESTABLISHED}</p>
          </article>
        </section>
      </main>
    </>
  );
}
