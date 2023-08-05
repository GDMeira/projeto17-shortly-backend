import db from "../database/database.connection.js";

export function createShortUrl(url, shortUrl, userId) {
    return db.query(`
            INSERT INTO urls (url, short_url, user_id)
            VALUES ($1, $2, $3)
            ON CONFLICT (url) DO NOTHING
            RETURNING id;
            `, [url, shortUrl, userId]);
}

export function findShorturlById(id) {
    return db.query(`
        SELECT id, short_url AS "shortUrl", url, user_id AS "userId"
        FROM urls
        WHERE id = $1;
    `, [id]);
}

export function findUrlByShorturl(shortUrl) {
    return db.query(`
            SELECT url, id
            FROM urls
            WHERE short_url = $1;
        `, [shortUrl]);
}

export function incrementVisitCountById(id) {
    return db.query(`
        UPDATE urls
        SET visit_count = visit_count + 1
        WHERE id = $1;
    `, [id]);
}

export function deleteUrlById(id) {
    return db.query(`
            DELETE FROM urls
            WHERE id = $1;
        `, [id]);
}