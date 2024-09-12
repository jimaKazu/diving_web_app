# FROM public.ecr.aws/docker/library/node:18.13.0-alpine

# COPY . /app
# WORKDIR /app

# RUN npm ci

# CMD ["npm", "start"]

# ベースイメージとしてNode.jsを指定
FROM node:16

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package.json package-lock.json* ./

# npm キャッシュをクリア（オプション）
RUN npm cache clean --force

# 依存関係をインストール
RUN npm install

# アプリケーションコードをコピー
COPY . .

RUN npm cache clean --force

# ビルドを実行
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN npm run build

# コンテナのポートを指定（Reactアプリのデフォルトポートは3000だが、カスタムポートを指定した場合はそれを使用）
EXPOSE 8080

# アプリケーションの起動コマンド
CMD ["npm", "start"]

