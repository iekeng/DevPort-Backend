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
}

exports.updateExperience = async(req, res) => {
    const {userId, experienceId} = req.params;
    const {organisation, position, startDate, endDate, achievements, responsibilities, user} = req.body;

    // const experiences = await Experience.find({user: userId}).exec();
    
    // if (!experiences || experiences.length === 0) {
    //     return res.status(404).json({ message: 'User experiences not found' });
    //     }
    const experienceToUpdate = await Experience.findById(experienceId).exec();

    try {
        // for(const experience of experiences) {
            if(experience._id.toString() === experienceId){
                experience.organisation = organisation || experienceToUpdate.organisation;
                experience.position = position || experienceToUpdate.position;
                experience.startDate = startDate || experienceToUpdate.startDate;
                experience.endDate = endDate || experienceToUpdate.endDate;
                experience.achievements = achievements || experienceToUpdate.achievements;
                experience.responsibilities = responsibilities || experienceToUpdate.responsibilities;
                experience.user = user;
            // }
            await experience.save();
        };        
        res.status(200).json({message: 'Experience successfully updated.'})
    } catch (error){
        res.status(500).json({message: 'Error updating experience'})
    }
}