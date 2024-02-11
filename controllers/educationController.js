const Education = require('../models/Education');

exports.createEducation = async (req, res) => {
    try {
        const userId = req.params.userId;
        const educationData = req.body;
        const education = new Education(educationData);

        education.user = userId;

        await education.save();

        res.status(201).json(education);

    } catch {
        res.status(500).json({error: 'An error occured while creating the education record'})
    }
};

exports.getEducationById = async(req, res) => {
    try {
        const userId = req.params.param1;
        const educationId = req.params.param2;
        const education = await Education.find({_id: educationId, user: userId})
        res.status(200).json(education);
    }catch {
        res.status(500).json({error: 'An error occured while retrieving education'})
    }
};

exports.getAllEducation = async(req, res) => {
    try{
        const userId = req.params.userId;

        const education = await Education.find({user: userId}).exec();

        res.json(education)

        res.status(200).json({education});
    } catch {
        res.status(500).json({error: 'An error occured while retriving list of education'})
    }
};