①npm init -y
　　package.jsonを作成する -yは自動入力
②npm install express
    expressをインストール


Mysql ----

①mysqlに接続
　mysql -u root -p

②データベース作成
　CREATE DATABASE diving_db

③データベース選択
　use diving_db

④テーブル作成
create table user(
id int,
username varchar(255)
);


create table user(
id int,
username varchar(255),
password char(50),
fullname varchar(255),
license varchar(255),
dive_cnt int,
profile varchar(500),
old int,
fromAddress varchar(255),
diving_history int,
like_diving_spots varchar(255),
like_fish varchar(255)
);


INSERT INTO user(id,username,password,fullname,license,dive_cnt,profile,old,fromAddress,diving_history,like_diving_spots,like_fish,img)
VALUES(1,"jima_Kazu","password","飯島和輝","AOW",13,"こんにちわ、よろしく",23,"山梨県",1,"赤沢(東伊豆)","カクレクマノミ","");

INSERT INTO user(id,username,password,fullname,license,dive_cnt,profile,old,fromAddress,diving_history,like_diving_spots,like_fish)
VALUES(1,"jima_Kazu","password","aaa","AOW",13,"aaaa",23,"aa",1,"aaa","bbb");

blob:http://localhost:3000/e7659e15-ce29-422c-a7a1-8c1289a14193
blob:http://localhost:3000/dc5978b6-3d24-4b5e-9719-08c1337d5edc



    