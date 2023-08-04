import { customAlphabet, urlAlphabet } from 'nanoid'
import db from '../database/database.connection.js';

export async function shorten(req, res) {
    const nanoid = customAlphabet(urlAlphabet, 10);
    const shortUrl = nanoid(8);
    const userId = res.locals.user_id;

    try {
        let id = await db.query(`
            INSERT INTO urls (url, short_url, user_id)
            VALUES ($1, $2, $3)
            ON CONFLICT (url) DO NOTHING
            RETURNING id;
            `, [req.body.url, shortUrl, userId]);
        if (!id) return res.status(409).send({message: 'url já cadastrada.'});

        id = id.rows[0].id;
        res.status(201).send({id, shortUrl});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

export async function getShorturlById(req, res) {
    const id = req.params.id;

    try {
        const info = await db.query(`
            SELECT u.id, u.short_url AS "shortUrl", u.url 
            FROM urls AS u
            WHERE id = $1;
        `, [id]);
        if (info.rowCount === 0) return res.status(404).send({message: 'url não cadastrada.'});

        await db.query(`
            UPDATE urls
            SET visit_count = visit_count + 1
            WHERE id = $1;
        `, [id]);

        res.send(info.rows[0]);
    } catch (error) {
        res.status(500).send({message: error.message});  
    }
}