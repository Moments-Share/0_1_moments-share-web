"use client";

import { useState } from "react";
import { CONTACT_EMAIL, CONTACT_ENDPOINT, TEL_PURPOSE } from "@/lib/contact";
import { trackContactSubmit } from "@/lib/analytics";
import { company, hasTel, telHref } from "@/lib/company";

/* ============================================================
   お問い合わせフォーム
   送信先は Formspree（src/lib/contact.ts）。

   form に action / method を書いてあるので、JSが動かない環境でも
   通常のHTMLフォーム送信として届く。JSが動く場合は submit を横取りして
   その場で送信し、ページ遷移せずに完了メッセージへ切り替える。
   ============================================================ */

const categories = [
  "DX・AX支援（AI導入・業務自動化）",
  "BPO・業務代行",
  "地域プロデュース",
  "採用・複業・パートナー参加",
  "その他",
];

/* 色はコントラストを実測して決めている（背景 #f8f5ef に対して）。
   ラベル   charcoal/75 → 6.63:1  本文基準 4.5:1 を満たす
   下線     charcoal/50 → 3.09:1  UI部品の基準 3:1 を満たす
   以前の /55・/20 はいずれも基準を下回っていた。
   フォーカスは outline を消さない。下線の色だけで示すと、
   キーボード操作の人にどこにいるか伝わらないため。 */
const inputClass =
  "w-full bg-transparent border-b border-charcoal/50 px-1 py-3 text-[16px] text-charcoal placeholder:text-charcoal/50 focus:border-deep-green transition-colors disabled:opacity-50";

const labelClass = "flex items-center gap-2 text-[12px] font-bold tracking-[0.14em] text-charcoal/75 mb-3";

/* 必須・任意は記号（*）ではなく文字で示す。* は意味が伝わらない人がいる */
function Req() {
  return (
    <span className="rounded-sm bg-deep-green px-1.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-white">
      必須
    </span>
  );
}
function Opt() {
  return (
    <span className="rounded-sm border border-charcoal/30 px-1.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-charcoal/60">
      任意
    </span>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

const mailLink = (
  <a
    href={`mailto:${CONTACT_EMAIL}`}
    className="text-navy-ink border-b border-navy-ink/40 pb-0.5 font-bold hover:text-deep-green hover:border-deep-green transition-colors"
  >
    {CONTACT_EMAIL}
  </a>
);

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState("");

  const disabled = status === "submitting";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setStatus("submitting");
    setErrorDetail("");

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        throw new Error(`送信先から ${res.status} が返りました`);
      }

      form.reset();
      setStatus("success");
      trackContactSubmit();
    } catch (err) {
      setErrorDetail(err instanceof Error ? err.message : "原因を特定できませんでした");
      setStatus("error");
    }
  }

  // 送信完了。フォームは畳み、次にどうなるかだけを伝える
  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="border-t border-sage/40 pt-10">
        <p className="text-[22px] font-bold leading-[1.6] tracking-[-0.01em] text-charcoal md:text-[26px]">
          送信しました。ありがとうございます。
        </p>
        <p className="mt-6 max-w-[32em] text-[15px] leading-[2] text-charcoal/75">
          内容を確認のうえ、2〜3営業日以内にご返信します。
          <strong className="font-bold">自動返信メールは送信していません。</strong>
          そのままご返信をお待ちください。
          しばらく経っても届かない場合は、迷惑メールフォルダをご確認いただくか、{mailLink} まで直接ご連絡ください。
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-[14px] font-bold text-charcoal/60 underline underline-offset-4 transition-colors hover:text-deep-green"
        >
          続けてもう1件送る
        </button>
      </div>
    );
  }

  return (
    <form
      action={CONTACT_ENDPOINT}
      method="POST"
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-10"
    >
      {/* 自動投稿よけ。人間には見えず、埋まっていれば送信サービス側で弾かれる */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <input type="hidden" name="_subject" value="【Webお問い合わせ】Moments Share" />
      {/* JSが動かない環境では、ブラウザがこのフォームを直接POSTする。
          そのとき送信サービス側の既定ページに飛ばされると、
          英語の画面が出て「送れたのか」が分からない。
          自前の完了ページに戻す。JSが動く環境ではこの値は使われない */}
      <input type="hidden" name="_next" value="https://moments-share.com/contact/thanks/" />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            お名前 <Req />
          </label>
          <input
            id="name"
            name="お名前"
            type="text"
            required
            autoComplete="name"
            disabled={disabled}
            placeholder="山田 太郎"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            会社名・屋号 <Opt />
          </label>
          <input
            id="company"
            name="会社名・屋号"
            type="text"
            autoComplete="organization"
            disabled={disabled}
            placeholder="株式会社◯◯"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            メールアドレス <Req />
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={disabled}
            placeholder="example@company.com"
            className={inputClass}
          />
        </div>
        <div>
          {/* 必須から任意にした。応募や相談の最初の一歩で電話番号を
              必須にすると、そこで止まる人が出る。連絡はメールでも取れる */}
          <label htmlFor="tel" className={labelClass}>
            お電話番号 <Opt />
          </label>
          {/* inputMode="tel" でスマホに数字キーパッドを出す。
              type="tel" だけだと機種によって通常キーボードが出る */}
          <input
            id="tel"
            name="お電話番号"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            disabled={disabled}
            placeholder="09012345678"
            className={inputClass}
          />
          {/* 任意でも、何に使うのかはその場で伝える */}
          <p className="mt-2 text-[12px] leading-[1.8] text-charcoal/70">{TEL_PURPOSE}</p>
        </div>
      </div>

      {/* 上2段は2列。ここは1項目だけなので、幅を左列に揃えて
          プルダウンだけが不自然に横長にならないようにする */}
      <div className="md:max-w-[calc(50%-1.25rem)]">
        <label htmlFor="category" className={labelClass}>
          ご相談の種類 <Req />
        </label>
        <select
          id="category"
          name="ご相談の種類"
          required
          defaultValue=""
          disabled={disabled}
          className={`${inputClass} bg-transparent`}
        >
          <option value="" disabled>
            選択してください
          </option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          ご相談内容 <Req />
        </label>
        <textarea
          id="message"
          name="ご相談内容"
          required
          rows={6}
          disabled={disabled}
          placeholder="お困りごとや、やってみたいことを、わかる範囲でお書きください。"
          className={`${inputClass} resize-y leading-[2]`}
        />
      </div>

      {status === "error" && (
        <div role="alert" className="border-l-2 border-region pl-5">
          <p className="text-[13px] font-bold text-charcoal/80">送信できませんでした</p>
          <p className="mt-2 max-w-[32em] text-[13px] leading-[2] text-charcoal/65">
            通信状況をご確認のうえ、もう一度お試しください。
            繰り返し失敗する場合は {mailLink} までご連絡ください。
            <span className="mt-1 block text-charcoal/45">（{errorDetail}）</span>
          </p>
        </div>
      )}

      <div className="flex flex-col items-start gap-6 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={disabled}
          className="btn btn-ghost-navy px-10 py-4 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "submitting" ? "送信中…" : "この内容で送信する →"}
        </button>
        <p className="text-[13px] leading-[1.9] text-muted">
          お急ぎの方はこちらからも受け付けています：
          <br className="hidden sm:block" />
          {hasTel && (
            <>
              <a
                href={telHref}
                className="text-navy-ink border-b border-navy-ink/40 pb-0.5 font-bold hover:text-deep-green hover:border-deep-green transition-colors"
              >
                {company.tel}
              </a>
              <span className="mx-2 text-charcoal/40">/</span>
            </>
          )}
          {mailLink}
        </p>
      </div>
    </form>
  );
}
