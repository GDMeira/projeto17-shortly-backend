import { customAlphabet, urlAlphabet } from 'nanoid'
import db from '../database/database.connection.js';
import { createShortUrl, deleteUrlById, findShorturlById, findUrlByShorturl, incrementVisitCountById } from '../repositories/urls.repositories.js';

export async function shorten(req, res) {
    const nanoid = customAlphabet(urlAlphabet, 10);
    const shortUrl = nanoid(8);

    try {
        let id = await createShortUrl(req.body.url, shortUrl, res.locals.userId);
        
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
        const info = await findShorturlById(id);
        if (info.rowCount === 0) return res.status(404).send({message: 'url não cadastrada.'});

        delete info.rows[0].userId
        res.send(info.rows[0]);
    } catch (error) {
        res.status(500).send({message: error.message});  
    }
}

export async function redirect(req, res) {
    const shortUrl = req.params.shortUrl;

    try {
        const info = await findUrlByShorturl(shortUrl);
        if (info.rowCount === 0) return res.status(404).send({message: 'url não cadastrada.'});

        await incrementVisitCountById(info.rows[0].id);

        res.redirect(info.rows[0].url);
    } catch (error) {
        res.status(500).send({message: error.message});  
    }
}

export async function deleteUrl(req, res) {
    const id = req.params.id;

    try {
        const info = await findShorturlById(id);
        if (info.rowCount === 0) return res.status(404).send({message: 'url não cadastrada.'});
        if (info.rows[0].userId !== res.locals.userId) return res.status(401).send({message: 'Acesso negado.'});

        await deleteUrlById(id);

        res.sendStatus(204);
    } catch (error) {
        res.status(500).send({message: error.message});  
    }
}