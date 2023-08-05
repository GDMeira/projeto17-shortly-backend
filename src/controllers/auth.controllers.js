import bcrypt from 'bcrypt';
import db from '../database/database.connection.js';
import { v4 as uuid } from 'uuid';
import { createSession, createUser, findUserByEmail, getAllUserData, getUserInfo } from '../repositories/auth.repositories.js';

export async function signup(req, res) {
    let { name, email, password } = req.body;
    password = bcrypt.hashSync(password, 10);

    try {
        const answer = await createUser(name, email, password);
        if (answer.rowCount === 0) return res.status(409).send({message: 'Email já cadastrado.'});

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

export async function signin(req, res) {
    const { email, password } = req.body;
    let user;

    try {
        user = await findUserByEmail(email);

        if (user.rowCount === 0) return res.status(401).send({message: 'Email não cadastrado.'});
    } catch (error) {
        res.status(500).send({message: error.message})
    }

    user = user.rows[0];
    if (!bcrypt.compareSync(password, user.password)) res.status(401).send({message: 'Senha incorreta.'});

    try {
        const token = uuid();
        await createSession(token, user.id);

        res.send({token});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

export async function userInfo(req, res) {
    try {
        const user = await getUserInfo(res.locals.userId);

        res.send(user.rows[0]);
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

export async function getRank(req, res) {
    try {
        const user = await getAllUserData()

        res.send(user.rows);
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}