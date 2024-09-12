const express = require("express");
const sqlite3 = require("sqlite3").verbose(); // SQLiteライブラリを読み込む
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const dbPath = path.resolve(__dirname, "diving_app.db"); // SQLiteデータベースファイルのパス
const db = new sqlite3.Database(dbPath); // SQLiteデータベースに接続

// BodyParserを有効にする
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS設定
app.use(cors());

// プロフィール情報SELECT
app.get("/get", (req, res) => {
    const sqlSelect = "SELECT * FROM user WHERE id=1";
    db.all(sqlSelect, (error, rows) => {
        if (error) {
            console.error("Query Error:", error);
            res.status(500).send("Internal Server Error");
        } else {
            console.log("Query Results:", rows);
            res.send(rows);
        }
    });
});

// ログイン認証SELECT
app.get("/loginAuth", (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    console.log("Username:", username);
    console.log("Password:", password);

    const sqlSelect = "SELECT * FROM user WHERE username = ? AND password = ?";
    db.all(sqlSelect, [username, password], (error, rows) => {
        if (error) {
            console.error("Query Error:", error);
            res.status(500).send("Internal Server Error");
        } else {
            console.log("Query Results:", rows);
            res.send(rows);
        }
    });
});






// ログ情報ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

// ログ情報SELECT
app.get("/getLogInfo/:id", (req, res) => {
    const user_id = req.params.id;
    const sqlSelect = "SELECT * FROM LOG_INFO WHERE user_id = ?";
    db.all(sqlSelect, [user_id], (error, rows) => {
        if (error) {
            console.error("Query Error:", error);
            res.status(500).send("Internal Server Error");
        } else {
            console.log("Query Results:", rows);
            res.send(rows);
        }
    });
});

// ログ登録
app.post("/logAdd", (req, res) => {
    const {
        num_of_dives, dive_date, dive_spots, dive_style, purpose, dive_point_name,
        dive_start_time, dive_end_time, dive_time, maxi_depth, age_depth,
        tank_start_pressure, tank_end_pressure, water_temp_surface, water_temp_bottom,
        weather, wind, sea_level, around_the_tide, high_tide, low_tide, suit,
        suit_thickness, water_transparency, mood, weight, uncle, tank_type,
        tank_liter, remarks, buddy_sign, instructor_sign, img, user_id
    } = req.body;

    const sqlInsert = `INSERT INTO log_info
        (num_of_dives, dive_date, dive_spots, dive_style, purpose, dive_point_name, 
        dive_start_time, dive_end_time, dive_time, maxi_depth, age_depth, 
        tank_start_pressure, tank_end_pressure, water_temp_surface, water_temp_bottom, 
        weather, wind, sea_level, around_the_tide, high_tide, low_tide, suit, 
        suit_thickness, water_transparency, mood, weight, uncle, tank_type, 
        tank_liter, remarks, buddy_sign, instructor_sign, img, user_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(sqlInsert, [
        num_of_dives, dive_date, dive_spots, dive_style, purpose, dive_point_name,
        dive_start_time, dive_end_time, dive_time, maxi_depth, age_depth,
        tank_start_pressure, tank_end_pressure, water_temp_surface, water_temp_bottom,
        weather, wind, sea_level, around_the_tide, high_tide, low_tide, suit,
        suit_thickness, water_transparency, mood, weight, uncle, tank_type,
        tank_liter, remarks, buddy_sign, instructor_sign, img, user_id
    ], function(error) {
        if (error) {
            console.error("Query Error:", error);
            res.status(500).send("Internal Server Error");
        } else {
            console.log("Insert Results:", this.lastID); // 挿入された行のIDをログに出力
            res.send({ id: this.lastID });
        }
    });
});


// ログ更新
app.post("/logUpdate", (req, res) => {
    const {
        num_of_dives, dive_date, dive_spots, dive_style, purpose, dive_point_name,
        dive_start_time, dive_end_time, dive_time, maxi_depth, age_depth,
        tank_start_pressure, tank_end_pressure, water_temp_surface, water_temp_bottom,
        weather, wind, sea_level, around_the_tide, high_tide, low_tide, suit,
        suit_thickness, water_transparency, mood, weight, uncle, tank_type,
        tank_liter, remarks, buddy_sign, instructor_sign, img, user_id, log_id
    } = req.body;

    const sqlUpdate = `UPDATE log_info
        SET 
            num_of_dives = ?, 
            dive_date = ?, 
            dive_spots = ?, 
            dive_style = ?, 
            purpose = ?, 
            dive_point_name = ?, 
            dive_start_time = ?, 
            dive_end_time = ?, 
            dive_time = ?, 
            maxi_depth = ?, 
            age_depth = ?, 
            tank_start_pressure = ?, 
            tank_end_pressure = ?, 
            water_temp_surface = ?, 
            water_temp_bottom = ?, 
            weather = ?, 
            wind = ?, 
            sea_level = ?, 
            around_the_tide = ?, 
            high_tide = ?, 
            low_tide = ?, 
            suit = ?, 
            suit_thickness = ?, 
            water_transparency = ?, 
            mood = ?, 
            weight = ?, 
            uncle = ?, 
            tank_type = ?, 
            tank_liter = ?, 
            remarks = ?, 
            buddy_sign = ?, 
            instructor_sign = ?, 
            img = ? 
        WHERE 
            user_id = ? AND log_id = ?`;

    db.run(sqlUpdate, [
        num_of_dives, dive_date, dive_spots, dive_style, purpose, dive_point_name,
        dive_start_time, dive_end_time, dive_time, maxi_depth, age_depth,
        tank_start_pressure, tank_end_pressure, water_temp_surface, water_temp_bottom,
        weather, wind, sea_level, around_the_tide, high_tide, low_tide, suit,
        suit_thickness, water_transparency, mood, weight, uncle, tank_type,
        tank_liter, remarks, buddy_sign, instructor_sign, img, user_id, log_id
    ], function(error) {
        if (error) {
            console.error("Query Error:", error);
            res.status(500).send("Internal Server Error");
        } else {
            console.log("Update Results:", this.changes); // 更新された行数をログに出力
            res.send({ changes: this.changes });
        }
    });
});

// ログ削除
app.delete("/logDelete", (req, res) => {
    const { log_id, user_id } = req.body;

    console.log(log_id);
    console.log(user_id);

    if (!log_id || !user_id) {
        return res.status(400).send("log_id と user_id の両方が必要です");
    }

    const sqlDelete = `DELETE FROM log_info WHERE log_id = ? AND user_id = ?`;

    db.run(sqlDelete, [log_id, user_id], function(error) {
        if (error) {
            console.error("Query Error:", error);
            res.status(500).send("Internal Server Error");
        } else if (this.changes === 0) {
            // 変更がなかった場合（削除されなかった場合）
            res.status(404).send("指定されたレコードが見つかりません");
        } else {
            console.log("Delete Results:", this.changes); // 削除された行数をログに出力
            res.send({ message: "ログが削除されました" });
        }
    });
});


// アカウント情報ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー


// アカウントリストを取得する
app.get("/getAccountList", (req, res) => {
    const sqlSelect = "SELECT * FROM user";
    db.all(sqlSelect, (error, rows) => {
        if (error) {
            console.error("Query Error:", error);
            res.status(500).send("Internal Server Error");
        } else {
            console.log("Query Results:", rows);
            res.send(rows);
        }
    });
});


// アカウント登録
app.post("/accountInsert", (req, res) => {
    const {
        username, password, license, fullName, diveCnt, old, fromAddress,
        divingHistory, likeDivingSpots, likefish, selfIntroduction, img
    } = req.body;

    const sqlInsert = `INSERT INTO user
        (username, password, license, fullname, dive_cnt, old, fromAddress, 
        diving_history, like_diving_spots, like_fish, profile, img) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(sqlInsert, [
        username, password, license, fullName, diveCnt, old, fromAddress,
        divingHistory, likeDivingSpots, likefish, selfIntroduction, img
    ], function(error) {
        if (error) {
            console.error("Query Error:", error);
            res.status(500).send("Internal Server Error");
        } else {
            console.log("Insert Results:", this.lastID); // 挿入された行のIDをログに出力
            res.send({ id: this.lastID });
        }
    });
});

// アカウント情報の更新
app.post('/accountUpdate', (req, res) => {
    console.log('Received Request Body:', req.body);
    const {
        userid, username, password, license, fullName, diveCnt, old, fromAddress,
        divingHistory, likeDivingSpots, likefish, selfIntroduction, img
    } = req.body;

    const sqlUpdate = `UPDATE user SET
        username = ?,
        password = ?,
        license = ?,
        fullname = ?,
        dive_cnt = ?,
        old = ?,
        fromAddress = ?,
        diving_history = ?,
        like_diving_spots = ?,
        like_fish = ?,
        profile = ?,
        img = ?
        WHERE id = ?`;

    db.run(sqlUpdate, [
        username, password, license, fullName, diveCnt, old, fromAddress,
        divingHistory, likeDivingSpots, likefish, selfIntroduction, img, userid
    ], function(error) {
        if (error) {
            console.error('Update Error:', error);
            res.status(500).send('Internal Server Error');
        } else {
            if (this.changes > 0) {
                // 更新が成功した場合、成功を示すレスポンスを返す
                res.send({ message: 'User updated successfully' });
            } else {
                res.status(404).send('User not found');
            }
        }
    });
});

// アカウント削除する
app.post('/accountDelete', (req, res) => {
    console.log('Received Request Body:', req.body);
    const { userid } = req.body;

    // トランザクションの開始
    db.serialize(() => {
        // トランザクションを開始
        db.run("BEGIN TRANSACTION");

        // log_info テーブルから指定された user_id のログ情報を削除
        const sqlDeleteLogs = "DELETE FROM log_info WHERE user_id = ?";
        db.run(sqlDeleteLogs, [userid], function(logError) {
            if (logError) {
                console.error('Delete Logs Error:', logError);
                // エラーが発生した場合はトランザクションをロールバック
                db.run("ROLLBACK");
                res.status(500).send('Internal Server Error');
                return;
            }

            // user テーブルから指定されたユーザーを削除
            const sqlDeleteUser = "DELETE FROM user WHERE id = ?";
            db.run(sqlDeleteUser, [userid], function(userError) {
                if (userError) {
                    console.error('Delete User Error:', userError);
                    // エラーが発生した場合はトランザクションをロールバック
                    db.run("ROLLBACK");
                    res.status(500).send('Internal Server Error');
                } else {
                    // トランザクションをコミット
                    db.run("COMMIT", (commitError) => {
                        if (commitError) {
                            console.error('Commit Error:', commitError);
                            res.status(500).send('Internal Server Error');
                        } else {
                            if (this.changes > 0) {
                                // 削除が成功した場合、成功を示すレスポンスを返す
                                res.send({ message: 'User and associated logs deleted successfully' });
                            } else {
                                res.status(404).send('User not found');
                            }
                        }
                    });
                }
            });
        });
    });
});

// idからユーザを返す
app.get('/getUser', (req, res) => {
    const { id } = req.query;
    const sqlSelect = `SELECT * FROM user WHERE id = ?`;

    db.get(sqlSelect, [id], (error, row) => {
        if (error) {
            console.error('Select Error:', error);
            res.status(500).send('Internal Server Error');
        } else {
            if (row) {
                res.json(row);
            } else {
                res.status(404).send('User not found');
            }
        }
    });
});

// フレンド一覧を取得する
app.get("/getFriendList", (req, res) => {
    const loginUserId = parseInt(req.query.user_id, 10); // クエリパラメータから user_id を取得

    if (isNaN(loginUserId)) {
        return res.status(400).json({ error: 'Invalid or missing user_id' });
    }

    // データベースからフレンド関係を取得
    const sql = 'SELECT user.* FROM friends_relation inner join user on friends_relation.friend_id = user.id WHERE friends_relation.user_id = ?';
    
    db.all(sql, [loginUserId], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // 成功時にデータをレスポンスとして送信
        res.json(rows);
    });
});


// フレンド追加処理
app.post('/addFriendRelation', (req, res) => {
    const {login_user_id,friend_id } = req.body;

    if (typeof login_user_id !== 'number' || typeof friend_id !== 'number') {
        return res.status(400).send('Invalid input: user_id and friend_id must be numbers');
    }

    const sqlInsert = `INSERT INTO friends_relation (user_id, friend_id) VALUES (?, ?)`;

    db.run(sqlInsert, [login_user_id, friend_id], function (error) {
        if (error) {
            console.error('Insert Error:', error);
            res.status(500).send('Internal Server Error');
        } else {
            // データが正常に挿入された場合、成功を示すレスポンスを返す
            res.send({ message: 'Friend relation added successfully' });
        }
    });
});

// フレンド関係を取得するエンドポイント
app.get('/getFriendsRelation', (req, res) => {
    const userId = parseInt(req.query.user_id, 10); // クエリパラメータから user_id を取得

    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid or missing user_id' });
    }

    // データベースからフレンド関係を取得
    const sql = 'SELECT * FROM friends_relation WHERE user_id = ?';
    
    db.all(sql, [userId], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // 成功時にデータをレスポンスとして送信
        res.json(rows);
    });
});



// チャットリストを取得する
app.get('/getChatMessage', (req, res) => {
    const loginUserId = parseInt(req.query.loginUserId, 10); // クエリパラメータから loginUserId を取得
    const friendId = parseInt(req.query.friendId, 10); // クエリパラメータから friendId を取得

    if (isNaN(loginUserId) || isNaN(friendId)) {
        return res.status(400).json({ error: 'Invalid or missing loginUserId or friendId' });
    }

    // データベースからフレンド関係を取得
    const sql = `
        SELECT * FROM chat 
        WHERE (sender_id = ? AND receiver_id = ?) 
           OR (sender_id = ? AND receiver_id = ?)
    `;

    db.all(sql, [loginUserId, friendId, friendId, loginUserId], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // 成功時にデータをレスポンスとして送信
        res.json(rows);
    });
});

// チャットメッセージを登録する
app.post('/sendMessage', (req, res) => {
    const { sender_id, receiver_id, message,is_read } = req.body;

    // メッセージをデータベースに挿入
    const sql = `
        INSERT INTO chat (sender_id, receiver_id, message, sent_at,is_read)
        VALUES (?, ?, ?, datetime('now', 'localtime'), ?)
    `;

    db.run(sql, [sender_id, receiver_id, message,is_read], function(err) {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // 成功時にレスポンス
        res.json({ success: true, message: 'Message sent successfully', chatId: this.lastID });
    });
});

// サーバのポートを3001で立てる
app.listen(3001, function() {
    console.log("Example app listening on port 3001!");
});
