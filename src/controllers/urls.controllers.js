import { customAlphabet, urlAlphabet } from 'nanoid'
import db from '../database/database.connection.js';

export async function shorten(req, res) {
    const nanoid = customAlphabet(urlAlphabet, 10);
    const shortUrl = nanoid(8);

    try {
        let id = await db.query(`
            INSERT INTO urls (url, short_url, user_id)
            VALUES ($1, $2, $3)
            ON CONFLICT (url) DO NOTHING
            RETURNING id;
            `, [req.body.url, shortUrl, res.locals.userId]);
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
            SELECT id, short_url AS "shortUrl", url 
            FROM urls
            WHERE id = $1;
        `, [id]);
        if (info.rowCount === 0) return res.status(404).send({message: 'url não cadastrada.'});

        res.send(info.rows[0]);
    } catch (error) {
        res.status(500).send({message: error.message});  
    }
}

export async function redirect(req, res) {
    const shortUrl = req.params.shortUrl;

    try {
        const info = await db.query(`
            SELECT url, id
            FROM urls
            WHERE short_url = $1;
        `, [shortUrl]);
        if (info.rowCount === 0) return res.status(404).send({message: 'url não cadastrada.'});

        await db.query(`
            UPDATE urls
            SET visit_count = visit_count + 1
            WHERE id = $1;
        `, [info.rows[0].id]);

        res.redirect(info.rows[0].url);
    } catch (error) {
        res.status(500).send({message: error.message});  
    }
}

export async function deleteUrl(req, res) {
    const id = req.params.id;

    try {
        const info = await db.query(`
            SELECT id, user_id AS "userId"
            FROM urls
            WHERE id = $1;
        `, [id]);
        if (info.rowCount === 0) return res.status(404).send({message: 'url não cadastrada.'});
        if (info.rows[0].user_id !== Number(res.locals.userId)) return res.status(401).send({message: 'Acesso negado.'});

        await db.query(`
            DELETE FROM urls
            WHERE id = $1;
        `, [id]);

        res.sendStatus(204);
    } catch (error) {
        res.status(500).send({message: error.message});  
    }
}