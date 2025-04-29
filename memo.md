# 必要な型

| フィールド | 型          | 説明         |
| ---------- | ----------- | ------------ | ---------------- |
| id         | string      | モジュールID |
| items      | Item[]      | アイテム配列 |
| type       | 'jumbotron' | 'carousel'   | モジュールの種類 |

## Item型

| フィールド | 型      | 説明           |
| ---------- | ------- | -------------- |
| id         | string  | アイテムID     |
| episode    | Episode | エピソード情報 |
| series     | Series  | シリーズ情報   |

## Episode型

| フィールド   | 型      | 説明                         |
| ------------ | ------- | ---------------------------- |
| id           | string  | エピソードID                 |
| title        | string  | エピソードタイトル           |
| description  | string  | エピソード説明               |
| premium      | boolean | プレミアムコンテンツかどうか |
| thumbnailUrl | string  | サムネイル画像URL            |
| series       | Series  | 所属シリーズ情報             |

## Series型

| フィールド   | 型     | 説明              |
| ------------ | ------ | ----------------- |
| id           | string | シリーズID        |
| title        | string | シリーズタイトル  |
| thumbnailUrl | string | サムネイル画像URL |

## データの取得

Before
4156.5985ms | 1583.1253340000003ms

After
528.4502919999995ms

### エピソード
