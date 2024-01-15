/*
   Rutas Calendario / Evento
   host + /api/Events/
*/

const { Router } = require('express');
const _Router = Router();
const { JwtValidator } = require('../Middleware/TokenValidator');
const {
    getEvents,
    getEventsById,
    addEvent,
    editEvent,
    delEvent
} = require('../Controllers/Calendar');
const { check } = require('express-validator');
const { DateValidator } = require('../Helpers/DateValidator');
const FieldValidator = require('../Middleware/FieldValidator');



_Router.use(JwtValidator);

_Router.get('/', getEvents);
_Router.get('/:id', getEventsById);
_Router.post('/', 
[
    check('title', 'El titulo es requerido').not().isEmpty(),
    check('start', 'No es una fecha valida').custom(DateValidator),
    check('end', 'No es una fecha valida').custom(DateValidator),
    FieldValidator
],
addEvent);
_Router.put('/:id', 
[
    check('title', 'El titulo es requerido').not().isEmpty(),
    check('start', 'No es una fecha valida').custom(DateValidator),
    check('end', 'No es una fecha valida').custom(DateValidator),
    FieldValidator
],
editEvent);
_Router.delete('/:id', delEvent);

module.exports = _Router;