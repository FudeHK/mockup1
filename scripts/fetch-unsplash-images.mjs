// Unsplash から LP 用の画像を一度だけ取得し、public/images に保存するスクリプト。
// 実行例: UNSPLASH_ACCESS_KEY=xxxx node scripts/fetch-unsplash-images.mjs
// サイト側は実行時に Unsplash API を呼び出さず、保存済みのローカル画像のみを参照する。

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!ACCESS_KEY) {
  console.error(
    "UNSPLASH_ACCESS_KEY が設定されていません。環境変数として一時的に渡して実行してください。"
  );
  process.exit(1);
}

const OUT_DIR = path.join(process.cwd(), "public", "images");

const targets = [
  {
    file: "hero-kyoto-machiya.jpg",
    query: "cozy coffee shop interior daytime wood",
    orientation: "landscape",
  },
  {
    file: "menu-coffee.jpg",
    query: "latte art coffee cup",
    orientation: "squarish",
  },
  {
    file: "menu-croissant.jpg",
    query: "croissant pastry bakery",
    orientation: "squarish",
  },
  {
    file: "menu-cake.jpg",
    query: "fruit shortcake dessert",
    orientation: "squarish",
  },
  {
    file: "menu-lunch-plate.jpg",
    query: "vegetable salad bowl",
    orientation: "squarish",
  },
  {
    file: "menu-pudding.jpg",
    query: "creme caramel flan dessert",
    orientation: "squarish",
  },
  {
    file: "menu-wine.jpg",
    query: "red wine glass bottle table",
    orientation: "squarish",
  },
];

const only = process.argv
  .find((arg) => arg.startsWith("--only="))
  ?.slice("--only=".length)
  .split(",");

async function searchPhoto(query, orientation) {
  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "1");
  url.searchParams.set("orientation", orientation);

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });

  if (!res.ok) {
    throw new Error(
      `Unsplash search failed for "${query}": ${res.status} ${await res.text()}`
    );
  }

  const data = await res.json();
  const photo = data.results?.[0];
  if (!photo) {
    throw new Error(`"${query}" に該当する画像が見つかりませんでした。`);
  }
  return photo;
}

async function downloadImage(photo, destPath) {
  const imageUrl = `${photo.urls.raw}&w=1600&q=80&fm=jpg&fit=crop`;
  const res = await fetch(imageUrl);
  if (!res.ok) {
    throw new Error(`画像のダウンロードに失敗しました: ${res.status}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buffer);
}

async function pingDownloadLocation(photo) {
  try {
    await fetch(photo.links.download_location, {
      headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
    });
  } catch {
    // Unsplash API ガイドライン準拠のダウンロード計測用。失敗しても致命的ではないため無視する。
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const credits = [];
  const list = only ? targets.filter((t) => only.includes(t.file)) : targets;

  for (const target of list) {
    console.log(`Fetching "${target.query}" -> ${target.file}`);
    const photo = await searchPhoto(target.query, target.orientation);
    const destPath = path.join(OUT_DIR, target.file);
    await downloadImage(photo, destPath);
    await pingDownloadLocation(photo);
    credits.push(
      `- ${target.file}: Photo by ${photo.user.name} (${photo.user.links.html}) on Unsplash (${photo.links.html})`
    );
  }

  await writeFile(
    path.join(OUT_DIR, "CREDITS.md"),
    `# 画像クレジット\n\nUnsplash API から取得した画像の出典一覧です。\n\n${credits.join("\n")}\n`
  );

  console.log("完了しました。");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
