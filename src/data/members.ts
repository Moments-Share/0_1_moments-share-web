/* ============================================================
   メンバー（Moments Shareに関わっている人）の紹介。

   呼び方は Fellow → Crew → メンバー と変えてきた。
   Fellow も Crew も、説明しないと意味が伝わらない独自の呼称で、
   説明しようとすると「〜とは」という定義の節が要る。
   しかもこの一覧の1枚目は代表社員なので、「社員ではない人」を
   指す言葉を見出しに使うと、中身とズレる。
   メンバーなら、社員も社外の人も同じ1枚に並べられる。

   本人の実在情報だけを載せる。架空の人物・経歴は作成しない。
   未確認の項目は undefined のままにする。undefined の項目は
   カードに出ない（空欄も「準備中」も表示しない）ので、
   分かったぶんから足していけばよい。

   並び順＝表示順。代表を先頭に置いている。
   ============================================================ */

export type Member = {
  name: string;
  /** ローマ字表記。読みが確認できるまで入れない */
  nameEn?: string;
  /** 肩書き・役割 */
  role?: string;
  /** public/ からのパス。無ければプレースホルダーが出る */
  photo?: string;
  photoAlt: string;
  /** 写真に添える一行 */
  caption?: string;
  strengths?: string;
  duty?: string;
  why?: string;
};

export const members: Member[] = [
  {
    name: "中根 隆",
    nameEn: "RYU NAKANE",
    role: "代表社員 / Founder",
    photo: "/photos/33_founder_portrait.jpg",
    photoAlt: "山頂で片手を上げて笑う代表・中根 隆",
    /* caption（写真に添える一行）は置かない。「西尾から、挑戦と共創の
       循環をつくる。」と書いていたが、下の why がほぼ同じ文で、
       同じカードの中で二度同じことを言っていた。
       why のほうが具体的なので、そちらを残す */
    strengths: "業務整理・DX設計、AI／RPA／ノーコードによる自動化、地域コミュニティづくり。",
    duty: "DX・AX支援／BPO／地域プロデュースの3事業の推進。",
    why: "「挑戦できる場所を、つくる側に回ろう」。西尾から、挑戦と共創が循環する地域の仕組みをつくるため。",
  },
  {
    /* TODO: 以下は本人に確認してから入れる。
       - nameEn（ローマ字。読みを取り違えたくないので推測しない）
       - role（肩書き）
       - strengths / duty / why
       いまは名前と写真だけを出している。 */
    name: "谷本 章太朗",
    photo: "/photos/32_fellow_tanimoto.jpg",
    photoAlt: "谷本章太朗のポートレート",
  },
];
