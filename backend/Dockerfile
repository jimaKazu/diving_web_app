# ベースイメージ
FROM node:16

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# npm キャッシュをクリア（オプション）
RUN npm cache clean --force

# 依存関係をインストール
RUN npm install

# ソースコードをコンテナにコピー
COPY . .

# 必要に応じて環境変数を設定
ENV PORT=3001

# ポート番号を指定
EXPOSE 3001

# diving_app.dbがあるディレクトリを永続化
VOLUME ["/app"]

# アプリケーションを起動
CMD ["node", "index.js"]