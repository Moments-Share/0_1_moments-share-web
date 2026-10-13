import type { MetadataRoute } from "next";
import { newsItems } from "@/data/news";

/**
 * output: "export" では、このルートハンドラを静的として扱うことを
 * 明示しないとビルドが失敗する（Next.js 16）。
 */
export const dynamic = "force-static";

/**
 * 検索エンジン向けのページ一覧。
 * ページを増やしたらここにも足す。足し忘れると検索結果に出にくくなる。
 *
 * priority は「サイト内での相対的な重要度」。絶対的な評価ではないので、
 * 導線として重いページから順に下げている。
 */

const BASE = "https://moments-share.com";

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/service-dx", priority: 0.9, changeFrequency: "monthly" },
  { path: "/service-bpo", priority: 0.8, changeFrequency: "monthly" },
  { path: "/service-produce", priority: 0.8, changeFrequency: "monthly" },
  // 西尾働き方図鑑。外部媒体（Instagram / note）の入口ページ
  { path: "/nishio-hatarakikata-zukan", priority: 0.6, changeFrequency: "monthly" },
  // 西尾キャリアLab。大学生向けコミュニティ
  { path: "/nishio-career-lab", priority: 0.6, changeFrequency: "monthly" },
  // 大学生インターン募集。募集の増減があるので更新頻度は高めにしておく
  { path: "/student-internship", priority: 0.7, changeFrequency: "weekly" },
  // /works は非公開（src/app/works/page.tsx で noindex）。公開するとき戻す
  { path: "/people", priority: 0.6, changeFrequency: "monthly" },
  { path: "/news", priority: 0.6, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = routes.map(({ path, priority, changeFrequency }) => ({
    // next.config.ts が trailingSlash: true のため、実際のURLと形を揃える
    url: path === "/" ? `${BASE}/` : `${BASE}${path}/`,
    lastModified,
    changeFrequency,
    priority,
  }));

  /* お知らせの1件ずつ。data/news.ts に足せば自動で載るので、
     ここに手で書き足す必要はない。
     lastModified はその記事の日付。出来事の日を渡すほうが正確 */
  const news = newsItems.map((n) => ({
    url: `${BASE}/news/${n.slug}/`,
    lastModified: new Date(n.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...pages, ...news];
}
