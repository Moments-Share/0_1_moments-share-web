/* ============================================================
   AI導入伴走 年間プラン。/annual-plan/ とトップの節で使う。

   ■ 金額の出し方（代表が決めること）
   SHOW_PRICES を false にすると、サイトのどこにも金額が出なくなり、
   すべて「ご相談ください」になる。
   true のときは、各プランの showPrice が true のものだけ金額が出る。
   既定は「スタンダード 月15万円〜」と「AI研修 19.8万円」だけを出し、
   グロース・パートナーは「ご相談」にしている。

   金額を変えるときは price の文字列だけを直せば全ページに反映される。
   ただし public/llms.txt（AI検索向けの説明文）は手書きなので、
   金額を隠す・変えるときはそちらの「主力の商品」の行も直すこと。
   TAX_NOTE は税込・税別の表記。資料（AI研修 198,000円・税別）に合わせて
   税別としている。月額も税別でよいか要確認。
   ============================================================ */

/** false で金額をすべて隠す */
export const SHOW_PRICES = true;

/** 金額の注記。SHOW_PRICES が true で、金額が1つでも出るときだけ表示 */
export const TAX_NOTE = "金額は税別です。契約期間は12か月です。";

/** 金額を出さないときの文言 */
export const PRICE_ON_REQUEST = "ご相談ください";

export type Plan = {
  id: "standard" | "growth" | "partner";
  name: string;
  /** 誰に向くか。1行 */
  forWhom: string;
  /** 金額。単位まで含めて書く */
  price: string;
  /** この金額をサイトに出すか（SHOW_PRICES が true のときだけ効く） */
  showPrice: boolean;
  /** 含まれるもの */
  items: string[];
  /** 主に勧めるプラン。枠を濃くする */
  recommended?: boolean;
};

export const plans: Plan[] = [
  {
    id: "standard",
    name: "スタンダード",
    forWhom: "まず1年、毎月ひとつずつ手作業を減らしていきたい会社に。",
    price: "月15万円〜",
    showPrice: true,
    items: ["月1回の定例ミーティング", "自動化を毎月1本つくる", "効果を毎月レポートでお渡し"],
    recommended: true,
  },
  {
    id: "growth",
    name: "グロース",
    forWhom: "AIを使う人を社内に育て、改善の速度を上げたい会社に。",
    price: "月30万円",
    showPrice: false,
    items: ["隔週の定例ミーティング", "自動化を毎月2〜3本つくる", "社内のAI推進担当を育成"],
  },
  {
    id: "partner",
    name: "パートナー",
    forWhom: "AI活用を経営の打ち手として進めたい会社に。",
    price: "月50万円〜",
    showPrice: false,
    items: ["CAIO（AI責任者）の役割を代行", "毎週の定例と経営会議への参加", "必要な開発もプランの中で対応"],
  },
];

/** 入口のAI研修 */
export const training = {
  name: "AI研修",
  hours: "12時間",
  price: "19.8万円",
  showPrice: true,
  note: "研修だけのお申し込みもできます。研修のあと年間プランをご契約いただいた場合は、研修費を1か月目の費用に充てます。",
};

/** 実際に表示する金額。隠すときは PRICE_ON_REQUEST を返す */
export function displayPrice(p: { price: string; showPrice: boolean }) {
  return SHOW_PRICES && p.showPrice ? p.price : PRICE_ON_REQUEST;
}

/** 金額が1つでもサイトに出ているか（注記を出すかの判定） */
export const anyPriceShown =
  SHOW_PRICES && (training.showPrice || plans.some((p) => p.showPrice));

/** 年間プランの相談として問い合わせフォームを開くURL */
export const PLAN_CONTACT_HREF = "/contact/?topic=annual-plan";
