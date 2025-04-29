import sharp from 'npm:sharp@0.34.1';
import path from 'node:path';
import fs from 'node:fs';

// 特定の拡張子を持つファイルを再帰的に検索する関数
function findImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findImageFiles(filePath, fileList); // 再帰的にサブディレクトリを検索
    } else {
      const ext = path.extname(filePath).toLowerCase();
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

async function resizeAndConvertToAvif(inputFile, outputFile, width) {
  try {
    // 出力ファイルのディレクトリが存在しない場合は作成
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    await sharp(inputFile).resize({ width: width }).toFormat('avif').toFile(outputFile);
    console.log(`変換完了: ${inputFile} -> ${outputFile}`);
  } catch (error) {
    console.error(`エラー (${inputFile}):`, error);
  }
}

// コマンドライン引数を取得
const inputDir = process.argv[2];
const outputDir = process.argv[3];
const widthArg = process.argv[4];

if (!inputDir || !outputDir || !widthArg) {
  console.error('使用法: node resize-to-avif.js <入力ディレクトリ> <出力ディレクトリ> <幅>');
  process.exit(1);
}

if (!fs.existsSync(inputDir) || !fs.statSync(inputDir).isDirectory()) {
  console.error(`エラー: 入力ディレクトリが見つからないか、ディレクトリではありません: ${inputDir}`);
  process.exit(1);
}

const width = parseInt(widthArg, 10);

if (isNaN(width) || width <= 0) {
  console.error('幅は正の整数である必要があります。');
  process.exit(1);
}

// 画像ファイルを検索
const imageFiles = findImageFiles(inputDir);

if (imageFiles.length === 0) {
  console.log('指定されたディレクトリ内に処理対象の画像ファイル (JPEG, PNG) が見つかりませんでした。');
  process.exit(0);
}

console.log(`${imageFiles.length} 個の画像ファイルを処理します...`);

// 各画像ファイルを処理
(async () => {
  for (const inputFile of imageFiles) {
    const relativePath = path.relative(inputDir, inputFile);
    const baseName = path.basename(relativePath, path.extname(relativePath));
    const outputSubDir = path.dirname(relativePath);
    const outputFile = path.join(outputDir, outputSubDir, `${baseName}.avif`);

    await resizeAndConvertToAvif(inputFile, outputFile, width);
  }
  console.log('全ての画像の処理が完了しました。');
})();
