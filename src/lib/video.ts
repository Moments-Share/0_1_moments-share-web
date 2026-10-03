/* ============================================================
   紹介動画の埋め込み設定。

   URLが空のあいだは、動画の節そのものがページに出ない。
   押しても何も起きない枠を作らないため（資料の DeckEmbed と同じ扱い）。

   入れ方：
   ・YouTube  → https://www.youtube.com/embed/〈動画ID〉
   ・Vimeo    → https://player.vimeo.com/video/〈動画ID〉
   通常の視聴URL（watch?v=… や vimeo.com/…）ではなく、
   埋め込み用URLを入れること。watch?v= のままだと表示できない。
   ============================================================ */

/** 埋め込み用URL。空のあいだは動画の節を出さない */
export const VIDEO_EMBED_URL = "";

/** 動画の見出し。何の動画かが分かる短い文 */
export const VIDEO_TITLE = "";

/** 動画の下に置く一文。無くてもよい */
export const VIDEO_LEAD = "";

export const hasVideo = VIDEO_EMBED_URL.trim().length > 0;
