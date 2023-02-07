// DEPENDENCIES
const bands = require('express').Router()
const db = require('../models')
const {Band} = db

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
            where: { band_id: req.params.id}
        })
        res.status(200).json(foundBand)  
    } catch (error) {
        res.status(500).json(error)
    }

})
// Update A Band
bands.put('/:id', async (req, res) =>{
    try {
        const updateBands= await Band.update(req.body, {
            where: {
                band_id:req.params.id
            }
        })
        res.status(200).json ({
            message: `Successfully update ${updatedBands} band(s)`
        })
    }
}
)

// EXPORT
module.eports = bands