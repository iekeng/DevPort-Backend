const Experience = require('../models/Experience')

exports.createExperience = async (req, res) => {
    try {
        const userId = req.params.userId;
        const experienceData = req.body;
        const experience = new Experience(experienceData);

        experience.user = userId;

        await experience.save();

        res.status(201).json(experience);

    } catch {
        res.status(500).json({error: 'An error occured while creating the work experience record'})
    }
};

exports.getExperienceById = async(req, res) => {
    try {
        const userId = req.params.param1;
        const experienceId = req.params.param2;
        const experience = await Experience.find({_id: experienceId, user: userId})
        res.status(200).json(experience);
    }catch {
        res.status(500).json({error: 'An error occured while retrieving work experience'})
    }
};

exports.getAllExperience = async(req, res) => {
    try{
        const userId = req.params.userId;

        const experience = await Experience.find({user: userId}).exec();

        res.status(200).json(experience);
    } catch {
        res.status(500).json({error: 'An error occured while retriving list of experiences'})
    }
};