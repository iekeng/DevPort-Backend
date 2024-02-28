const Education = require('../models/Education');

exports.createEducation = async (req, res) => {
    try {
        const userId = req.params.userId;
        const educationArray = req.body;
        
        for (const education of educationArray){
            const newEducation = new Education(education);
            newEducation.user = userId;

            await newEducation.save();
        }
        res.status(201).json({ message: 'Education records created successfully' });

    } catch {
        res.status(500).json({error: 'An error occured while creating the education record'})
    }
};

exports.deleteEducation = async (req, res) => {
    try {
        const educationId = req.params.educationId;
        await Education.findByIdAndDelete(educationId);
    
        res.status(200).json({ message: 'Education record deleted successfully' });
      } catch (error) {
        console.error('Error deleting education record:', error);
        res.status(500).json({ error: 'An error occurred while deleting the education record' });
      }
}

exports.updateEducation = async (req, res) => {
    const {userId, educationId} = req.params;
    const {institution, startDate, endDate, degree, location, course} = req.body;
    const education = {}

    try {
        educationToUpdate = await Education.findById(educationId);

        if (educationToUpdate.user === userId) {
            education.institution = institution || educationToUpdate.institution;
            education.startDate = startDate || educationToUpdate.startDate;
            education.endDate = endDate || educationToUpdate.endDate
            education.degree = degree || educationToUpdate.degree;
            education.location = location || educationToUpdate.location;
            education.course = course || educationToUpdate.course;
        }

        const updatedEducation = Experience.findByIdAndUpdate(educationId, education, {new: true})
        res.status(200).json(updatedEducation);

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

        res.status(200).json({education});
    } catch {
        res.status(500).json({error: 'An error occured while retriving list of education'})
    }
};