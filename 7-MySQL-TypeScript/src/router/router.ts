import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, response: Response) => {
    const query = `
        SELECT * FROM heroes
    `;

    MySQL.ejecutarQuery(query, (err: any, heroes: Object[]) => {
        if (err) {
            response.json({
                ok: false,
                mensaje: 'Ha ocurrido un error en la consulta.',
                error: err
            });            
        } else {
            response.json({
                ok: true,
                mensaje: "Consulta realizada correctamente.",
                heroes: heroes
            });            
        }
    });
});

router.get('/heroes/:id', (req: Request, response: Response) => {
    const id = req.params.id;

    const escapedId = MySQL.instance.cnn.escape(id);

    const query = `
        SELECT * FROM heroes
        WHERE id = ${escapedId}
    `;

    MySQL.ejecutarQuery(query, (err: any, heroe: Object[]) => {
        if (err) {
            response.json({
                ok: false,
                mensaje: 'Ha ocurrido un error en la consulta.',
                error: err
            });            
        } else {
            response.json({
                ok: true,
                mensaje: "Consulta realizada correctamente.",
                heroes: heroe
            });            
        }
    });
});

export default router;