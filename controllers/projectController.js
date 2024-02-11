const Project = require('../models/Project')

exports.createProject = async (req, res) => {
    try {
        const userId = req.params.userId;
        const projectData = req.body;
        const project = new Project(projectData);

        project.user = userId;

        await project.save();

        res.status(201).json(project);

    } catch {
        res.status(500).json({error: 'An error occured while creating the work project record'})
    }
};

exports.getProjectById = async(req, res) => {
    try {
        const userId = req.params.param1;
        const projectId = req.params.param2;
        const project = await Project.find({_id: projectId, user: userId})
        res.status(200).json(project);
    }catch {
        res.status(500).json({error: 'An error occured while retrieving project'})
    }
};

exports.getAllProject = async(req, res) => {
    try{
        const userId = req.params.userId;

        const project = await Project.find({user: userId}).exec();

        res.status(200).json(project);
    } catch {
        res.status(500).json({error: 'An error occured while retriving list of projects'})
    }
};