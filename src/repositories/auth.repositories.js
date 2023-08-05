import db from "../database/database.connection.js";

export function createUser(name, email, password) {
    const answer = db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            ON CONFLICT (email) DO NOTHING
            RETURNING id;
        `, [name, email, password]);

    return answer
}

export function findUserByEmail(email) {
    const user = db.query(`
                SELECT users.email, users.password, users.id
                FROM users
                WHERE email = $1
            `, [email]);

    return user
}

export function createSession(token, userId) {
    return db.query(`
            INSERT INTO sessions
            (token, user_id) VALUES ($1, $2)
            ON CONFLICT (user_id) DO UPDATE
            SET token = $1, "createdAt" = NOW();
        `, [token, userId]);
}

export function getUserInfo(userId) {
    return db.query(`
        SELECT us.id, us.name, SUM(ur.visit_count) AS "visitCount",
        JSON_AGG(JSON_BUILD_OBJECT('id', ur.id,'shortUrl', ur.short_url, 'url', ur.url, 'visitCount',ur.visit_count)) AS "shortenedUrls"
        FROM users AS us
        LEFT JOIN urls as ur ON us.id = ur.user_id
        WHERE us.id = $1
        GROUP BY us.id;
    `, [userId]);
}

export function getAllUserData() {
    return db.query(`
        SELECT us.id, us.name, COUNT(ur.url) AS "linksCount", COALESCE(SUM(ur.visit_count), 0) AS "visitCount"
        FROM users AS us
        LEFT JOIN urls as ur ON us.id = ur.user_id
        GROUP BY us.id
        ORDER BY COALESCE(SUM(ur.visit_count), 0) DESC
        LIMIT 10;
        `);
}