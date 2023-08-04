import bcrypt from 'bcrypt';
import db from '../database/database.connection.js';
import { v4 as uuid } from 'uuid';

export async function signup(req, res) {
    let { name, email, password } = req.body;
    password = bcrypt.hashSync(password, 10);

    try {
        const answer = await db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            ON CONFLICT (email) DO NOTHING
            RETURNING id;
        `, [name, email, password]);
        if (!answer) return res.status(409).send({message: 'Email já cadastrado.'});

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

export async function signin(req, res) {
    const { email, password } = req.body;
    let user;

    try {
        user = await db.query(`
                SELECT users.email, users.password, users.id
                FROM users
                WHERE email = $1
            `, [email]);

        if (user.rowCount === 0) return res.status(401).send({message: 'Email não cadastrado.'});
    } catch (error) {
        res.status(500).send({message: error.message})
    }

    user = user.rows[0];
    if (!bcrypt.compareSync(password, user.password)) res.status(401).send({message: 'Senha incorreta.'});

    try {
        const token = uuid();
        await db.query(`
            INSERT INTO sessions
            (token, user_id) VALUES ($1, $2)
            ON CONFLICT (user_id) DO UPDATE
            SET token = $1, "createdAt" = NOW();
        `, [token, user.id]);

        res.send({token});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

export async function userInfo(req, res) {
    try {
        const user = await db.query(`
                SELECT us.id, us.name, SUM(ur.visit_count) AS "visitCount",
                JSON_AGG('id', ur.id,'shortUrl', ur.short_url, 'url', ur.url, 'visitCount',ur.visit_count) AS "shortenedUrls"
                FROM users AS us
                LEFT JOIN urls as ur ON us.id = ur.user_id
                WHERE us.id = $1
            `, [res.locals.userId]);
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}