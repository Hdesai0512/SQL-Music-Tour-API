// DEPENDENCIES
const bands = require('express').Router()
const db = require('../models')
const {Band, MeetGreet, Event, SetTime} = db

//FIND ALL BANDS
bands.get('/', async (req,res) =>{
    try {
        const foundBands = await Band.findAll()
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }

})

// Find A SPECIFIC BAND
bands.get('/:id', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { name: req.params.name},
            include: [
            {
                model: MeetGreet, 
                as: "meet_greets",
                include: {
                    model: Event, 
                    as: "event",
                    where: {name: {[Op.like]: `%${req.query.event ? req.query.event : ''}%`} }
                }
            },
            {
                model:SetTime,
                as:"set_times",
                include: {
                    model: Event, 
                    as:"event",
                    where: {name: {[Op.like]: `%${req.query.event ? req.query.event : ''}%`} }
                }
            }
         ]
        })
        res.status(200).json(foundBand)  
    } catch (error) {
        res.status(500).json(error)
    }

})
// Update A Band
bands.put('/:id', async (req, res) =>{
    try {
        const updateBands = await Band.update(req.body, {
            where: {
                band_id:req.params.id
            }
        })
        res.status(200).json ({
            message: `Successfully update ${updatedBands} band(s)`
            })
    } catch (err){
        res.status(500).json(err)
    }
}
)

// EXPORT
module.exports = bands
