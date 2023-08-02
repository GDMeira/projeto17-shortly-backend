import bcrypt from 'bcrypt';
import db from '../database/database.connection.js';

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