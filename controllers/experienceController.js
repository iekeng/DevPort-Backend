const Experience = require('../models/Experience')

exports.createExperience = async (req, res) => {
    const {userId} = req.params;
    const experience = req.body;
    try {
        const newExperience = new Experience(experience);
        newExperience.user = userId;
        await newExperience.save();
        res.status(201).json({ message: 'Work experiences created successfully' });
    } catch {
        res.status(500).json({error: 'An error occured while creating the work experience record'})
    }
};

exports.getExperienceById = async(req, res) => {
    try {
        const {userId, experienceId} = req.params;
        const experience = await Experience.find({_id: experienceId, user: userId})
        res.status(200).json(experience);
    }catch {
        res.status(500).json({error: 'An error occured while retrieving work experience'})
    }
};

exports.getAllExperience = async(req, res) => {
    try{
        const {userId} = req.params;

        const experience = await Experience.find({user: userId}).exec();

        res.status(200).json(experience);
    } catch {
        res.status(500).json({error: 'An error occured while retriving list of experiences'})
    }
}

exports.updateExperience = async(req, res) => {
    const {userId, experienceId} = req.params;
    const {organisation, position, startDate, endDate, achievements, responsibilities} = req.body;
    const experience = {};
    

    try {
            const experienceToUpdate = await Experience.findById(experienceId).exec();

            experience.organisation = organisation || experienceToUpdate.organisation;
            experience.position = position || experienceToUpdate.position;
            experience.startDate = startDate || experienceToUpdate.startDate;
            experience.endDate = endDate || experienceToUpdate.endDate;
            experience.achievements = achievements || experienceToUpdate.achievements;
            experience.responsibilities = responsibilities || experienceToUpdate.responsibilities;
            experience.user = userId;
            experience._id = experienceToUpdate._id;
            experience.__v = experienceToUpdate.__v;
             
            const updatedExperience = await Experience.findByIdAndUpdate(experienceId, experience, { new: true });
            res.status(200).json(updatedExperience)

        }  catch (error){
        res.status(500).json({message: 'Error updating experience'})
    }
}

exports.deleteExperience = async (req, res) => {
    try {
        const experienceId = req.params.experienceId;
        await Education.findByIdAndDelete(experienceId);
    
        res.status(200).json({ message: 'Experience record deleted successfully' });
      } catch (error) {
        console.error('Error deleting experience record:', error);
        res.status(500).json({ error: 'An error occurred while deleting the experience record' });
      }
}