/**
 * サイトで使う写真の一元管理。
 *
 * 各枠に「どのファイルを置くか」を先に宣言しておく。ファイルが public/ にまだ無いあいだは、
 * 必要な写真の条件を表示するプレースホルダーが出る。**画像をアップロードしてビルドし直せば、
 * 設定を書き換えなくても自動でその写真に切り替わる**（判定は available-photos.generated.ts）。
 *
 * ファイル名は「コーポレートサイト用 画像素材一覧」の採番に合わせている。
 *   public/photos/01_hero_main.jpg … 30_night_nishio.jpg
 *   public/logo/logo_horizontal.png / logo_vertical.png / favicon.png
 *
 * 撮影・選定のルール:
 *   - 明るい自然光。カメラ目線より、仕事中・会話中・活動中の様子
 *   - DXは「PCを触っている人」だけでなく、実際のUI・業務フロー・成果数値を写す
 */

import { availablePhotos } from "./available-photos.generated";

export type SiteImage = {
  /** public/ からのパス。ファイルが実在しないあいだはプレースホルダーになる */
  src: string;
  /** 代替テキスト。差し替え時は実際に写っているものに合わせて更新する */
  alt: string;
  /** その枠に必要な写真の条件。プレースホルダーに表示される */
  spec: string;
  /** 標準の表示比率 */
  ratio: string;
  /** 置かれる背景の明暗。プレースホルダーの配色に使う */
  tone: "light" | "dark";
  /** src がまだ無いときに使う既存素材。これも無ければプレースホルダーになる */
  fallbackSrc?: string;
};

/**
 * 実際に表示するパスを返す。指定のファイルがまだ無ければ既存素材へ、
 * それも無ければ null（プレースホルダー表示）。
 */
export function resolveImageSrc(image: SiteImage): string | null {
  if (availablePhotos.includes(image.src)) return image.src;
  if (image.fallbackSrc && availablePhotos.includes(image.fallbackSrc)) return image.fallbackSrc;
  return null;
}

/** その枠に表示できる画像があるか */
export function isImageReady(image: SiteImage): boolean {
  return resolveImageSrc(image) !== null;
}

/** プレースホルダーに撮影条件のテキストを出すか。実写がすべて揃ったら false にできる */
export const SHOW_PHOTO_SPECS = true;

const img = (
  src: string,
  alt: string,
  spec: string,
  ratio: string,
  tone: "light" | "dark" = "light",
  fallbackSrc?: string,
): SiteImage => ({ src, alt, spec, ratio, tone, fallbackSrc });

/* ---------------------------------------------------------------
   TOPページ（01〜06）
   --------------------------------------------------------------- */
const top = {
  heroImage: img(
    "/photos/01_hero_main.jpg",
    "西尾の川と街並みを見渡す風景",
    "西尾の広い風景。晴天の引き。全面表示のため高解像度が必要。",
    "16/9",
    "dark",
    // 差し替えまでは、確定素材の西尾の川辺を出しておく
    "/photos/hero-nishio.jpg",
  ),
  aboutImage: img(
    "/photos/02_about_challenger.jpg",
    "夕暮れの高台で木材を削る人と、そこへ歩いてくる仲間たち",
    // 素材は16:9。左に主役、右に歩いてくる3人が写っている。
    // 4:3に切るとどちらかが欠けるため、元の比率のまま置く
    "考える・働く・挑戦する人のドキュメンタリー写真。横位置。自然光。",
    "16/9",
  ),
  dxImage: img(
    "/photos/03_business_dx.jpg",
    "業務データのグラフを画面で確認している様子",
    "実際の業務画面・フロー図・成果数値が写ったもの。横位置。",
    "16/9",
  ),
  bpoImage: img(
    "/photos/04_business_bpo.jpg",
    "問い合わせ対応をしている様子",
    "実際の作業風景。多様な担い手が分かるもの。横位置。",
    "4/3",
  ),
  regionImage: img(
    "/photos/05_business_region.jpg",
    "地域イベントに人が集まっている様子",
    "地域イベント・プロジェクトの現場。人が動いている瞬間。横位置。",
    "4/3",
  ),
  visionImage: img(
    "/photos/06_vision_nishio.jpg",
    "夕暮れの西尾の風景",
    "西尾の広い風景（夕景）。横位置。全面表示のため高解像度が必要。",
    "21/9",
    "dark",
    "/photos/hero-nishio.jpg",
  ),
};

/* ---------------------------------------------------------------
   DXページ（07〜10）
   --------------------------------------------------------------- */
const dx = {
  dxPageHero: img("/photos/07_dx_hero.jpg", "業務画面に向かう手元", "DXページのHERO。横位置。全面表示。", "16/9", "dark"),
  dxWorkflow: img("/photos/08_dx_workflow.jpg", "業務フローを図に整理している様子", "業務フロー・判断ロジックの整理。横位置。", "16/9"),
  dxAiSystem: img("/photos/09_dx_ai_system.jpg", "システム画面を確認している様子", "AI・システム活用の実際の画面。横位置。", "16/9"),
  dxMeeting: img("/photos/10_dx_meeting.jpg", "打ち合わせでヒアリングしている様子", "ヒアリング・伴走支援の場面。横位置。", "16/9"),
};

/* ---------------------------------------------------------------
   BPOページ（11〜14）
   --------------------------------------------------------------- */
const bpo = {
  bpoPageHero: img("/photos/11_bpo_hero.jpg", "対応中のオペレーター", "BPOページのHERO。横位置。全面表示。", "16/9", "dark"),
  bpoCs: img("/photos/12_bpo_cs.jpg", "カスタマーサポートの様子", "カスタマーサポートの実務風景。横位置。", "4/3"),
  bpoAdmin: img("/photos/13_bpo_admin.jpg", "事務作業の手元", "事務・バックオフィスの実務風景。横位置。", "4/3"),
  bpoRemote: img("/photos/14_bpo_remote.jpg", "自宅から働く様子", "リモートワークの実際の様子。横位置。", "4/3"),
};

/* ---------------------------------------------------------------
   地域プロデュースページ（15〜18）
   --------------------------------------------------------------- */
const region = {
  regionPageHero: img("/photos/15_region_hero.jpg", "地域の催しに集まる人々", "地域プロデュースページのHERO。横位置。全面表示。", "16/9", "dark"),
  regionEducation: img("/photos/16_region_education.jpg", "学生と社会人が話している様子", "教育・キャリアの場面。横位置。", "4/3"),
  regionProject: img("/photos/17_region_project.jpg", "現場でプロジェクトを進める様子", "プロジェクトの現場。横位置。", "4/3"),
  /* 第1回西尾筋肉祭り（2026年5月17日・にししん文化会館）の実写に差し替え済み */
  regionEvent: img("/photos/18_region_event.jpg", "西尾筋肉祭りの客席で、出場者と子どもたちがハイタッチしている様子", "イベント当日の様子。横位置。", "16/9"),
  regionEventStage: img("/photos/31_kinniku_stage.jpg", "西尾筋肉祭りのステージ上に並ぶ出場者・スタッフの集合写真", "イベント当日の集合写真。横位置。", "16/9"),
  /* セミナーの告知バナー。写真ではなく文字の入った画像なので、
     切れると読めなくなる。元の比率（約2:1）のまま出す */
  seminarSaiyoAx: img("/photos/40_seminar_saiyo_ax.jpg", "無料オンラインセミナー「採用マーケAX — AIで、採用の「伝え方」を変える。」の告知バナー。2026年9月29日（火）15:00〜16:00 オンライン開催、Moments Share と Dear To の共催", "セミナーの告知バナー。文字が入っているので切り抜かない。", "2/1"),
  workshopAiAgent: img("/photos/41_workshop_ai_agent.jpg", "ワークショップ「AIエージェントを創ろう！ 2時間で、自分専用のAIエージェントを1体構築ワークショップ」の告知バナー。2026年5月31日（日）14:00〜16:00、名古屋市中村区名駅のプロコワで開催", "ワークショップの告知バナー。文字が入っているので切り抜かない。", "920/450"),
};

/* ---------------------------------------------------------------
   共創パートナー（19〜21）／ NEWS（22）
   --------------------------------------------------------------- */
const people = {
  partnersScene: img("/photos/19_partners_scene.jpg", "パートナーと共に作業している様子", "共創パートナーのイメージ。横位置。", "16/9"),
  teamHand: img("/photos/20_team_hand.jpg", "手を重ねるチーム", "共創・仲間のイメージ。横位置。", "16/9"),
  partnerPlaceholder: img("/photos/21_partner_placeholder.jpg", "人物写真の準備中", "本人の実写に差し替えるまでの代替。縦位置。", "4/5"),
  newsThumbnail: img("/photos/22_news_thumbnail.jpg", "新芽と光", "NEWSの既定サムネイル。横位置。", "4/3"),
};

/* ---------------------------------------------------------------
   背景・装飾（23〜30）
   --------------------------------------------------------------- */
const decor = {
  leafSunlight: img("/photos/23_leaf_sunlight.jpg", "木漏れ日の葉", "背景・装飾：リーフ。", "4/3"),
  skyCloud: img("/photos/24_sky_cloud.jpg", "青空と雲", "背景・装飾：空・雲。", "16/9"),
  riverPath: img("/photos/25_river_path.jpg", "矢作川沿いの道", "背景・装飾：矢作川・自然。", "16/9"),
  workspaceDetail: img("/photos/26_workspace_detail.jpg", "ノートとペンのある机", "背景・装飾：ワークシーン。", "4/3"),
  nishioTown: img("/photos/27_nishio_town.jpg", "西尾の街並み", "背景・装飾：西尾の街並み。", "16/9"),
  growthPlant: img("/photos/28_growth_plant.jpg", "土から伸びる新芽", "背景・装飾：成長・挑戦。", "4/3"),
  woodLight: img("/photos/29_wood_light.jpg", "窓から差し込む光", "背景・装飾：余白・光。", "4/3"),
  nightNishio: img("/photos/30_night_nishio.jpg", "夜の西尾の風景", "背景・装飾：西尾の夜景。必要に応じて使用。", "16/9", "dark"),
};

export const siteImages = { ...top, ...dx, ...bpo, ...region, ...people, ...decor };

export type SiteImageKey = keyof typeof siteImages;

/* ---------------------------------------------------------------
   NEWS の記事ごとの写真。news.ts の slug をキーにする
   --------------------------------------------------------------- */
export const newsFallbackImage: SiteImage = siteImages.newsThumbnail;

export const newsImages: Record<string, SiteImage> = {
  founding: siteImages.nishioTown,
  "workstyle-zukan": siteImages.regionEducation,
  "core-shift-launch": siteImages.dxImage,
  "kinniku-matsuri-1st": siteImages.regionEvent,
  "kinniku-matsuri-press": siteImages.regionEventStage,
  "saiyo-marke-ax-seminar": siteImages.seminarSaiyoAx,
  "ai-agent-workshop": siteImages.workshopAiAgent,
};

/* ---------------------------------------------------------------
   ロゴ
   --------------------------------------------------------------- */
export const logos = {
  horizontal: "/logo/logo_horizontal.png",
  vertical: "/logo/logo_vertical.png",
  favicon: "/logo/favicon.png",
  /** 差し替えが済むまで使う現行ロゴ */
  currentMark: "/logo/logo-3.png",
};
