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

        res.json(education)

        res.status(200).json({education});
    } catch {
        res.status(500).json({error: 'An error occured while retriving list of education'})
    }
};