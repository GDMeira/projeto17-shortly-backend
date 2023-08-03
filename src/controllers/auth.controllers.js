import bcrypt from 'bcrypt';
import db from '../database/database.connection.js';
import { v4 as uuid } from 'uuid';

export async function signup(req, res) {
    let { name, email, password } = req.body;
    password = bcrypt.hashSync(password, 10);

    try {
        await db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
        `, [name, email, password]);

        res.sendStatus(201);
    } catch (error) {
        switch (error.code) {
            case '23505':
                res.status(409).send({message: 'email já cadastrado'});
                break;
        
            default:
                res.status(500).send(error);
                break;
        }
    }
}

export async function signin(req, res) {
    const { email, password } = req.body;
    let user;

    try {
        user = await db.query(`
                SELECT users.email, users.password
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