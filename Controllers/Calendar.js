

const {response, request} = require('express');
const evento = require('../Models/Event');


const getEvents= async(req, resp = response) => {

    const events =  await evento.find();

    resp.status(200).json({ 
        ok: true,
        events
    })
}

const getEventsById = async(req = request, resp = response) => {

    const _Evento = await evento.findById(req.params.id);
    if (!_Evento){
        resp.status(404).json({
            ok:false,
            msg: 'No existe evento con este ID'
        });
    }

    resp.status(200).json({ 
        ok: true,
        events: _Evento
    })
}

const addEvent = async(req, resp = response) => {

    const _Evento = new evento(req.body);
    try {
        _Evento.user = req.id;
        console.log(req.uid);
        const eventSaved = await _Evento.save();

        resp.status(200).json({
            ok: true,
            msg: 'Evento guardado exitosamente',
            event: eventSaved
        })

    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg: 'Error Guardando nuevo evengto, comuniquese con el administrador',
           
        })
    }
}

const editEvent = async(req, resp = response) => {

    const _IdEvento = req.params.id;
    const _Evento = await evento.findById( _IdEvento );

    if(!_Evento){
        return resp.status(404).json({
            ok:false,
            msg: 'No existe evento'
        });
    }

    if(_Evento.user.toString() !== req.id){
        return resp.status(404).json({
            ok:false,
            msg: 'No tiene permiso para actualizar este evento'
        });
    }

    try {
        const _NewEvent = {...req.body}
        _NewEvent.user = req.id
        const EventUpdated = await evento.findByIdAndUpdate(_IdEvento, _NewEvent, {new: true} )   
        
        resp.status(200).json({
            ok: true,
            event: EventUpdated
        })
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        })
    }
}

const delEvent = async(req, resp = response)  => {
    const _IdEvento = req.params.id;
    const _Evento = await evento.findById( _IdEvento );

    if(!_Evento){
        return resp.status(404).json({
            ok:false,
            msg: 'No existe evento'
        });
    }

    if(_Evento.user.toString() !== req.id){
        return resp.status(404).json({
            ok:false,
            msg: 'No tiene permiso para eliminar este evento'
        });
    }

    try {
       await evento.findByIdAndDelete(_IdEvento)   
        
        resp.status(200).json({
            ok: true,
            msg: 'Evento eliminado existosamente'
        })
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        })
    }
}

module.exports = {
    getEvents,
    getEventsById,
    addEvent,
    editEvent,
    delEvent
}