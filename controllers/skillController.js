const Skill = require('../models/Skill')

exports.createSkill = async (req, res) => {
    try {
        const {userId} = req.params;
        const skillData = req.body;
        const skill = new Skill(skillData);
        skill.user = userId;

        await skill.save();

        res.status(201).json(skill);

    } catch {
        res.status(500).json({error: 'An error occured while creating the work skill record'})
    }
};

exports.updateSkill = async (req, res) => {
    const {userId} = req.params;
    const {technical_skills, soft_skills} = req.body;
    const skill = {}
    try {
            const skillToBeUpdated = await Skill.findOne({user: userId}).exec();
            
            skill.technical_skills = technical_skills || skillToBeUpdated.technical_skills;
            skill.soft_skills = soft_skills || skillToBeUpdated.soft_skills;

            const updatedSkill = await Skill.findOneAndUpdate({ user: userId }, skill, { new: true });

            res.status(200).json(updatedSkill);

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'An error occured while creating the work skill record'})
    }
};

exports.getSkillById = async(req, res) => {
    try {
        const userId = req.params.param1;
        const skillId = req.params.param2;
        const skill = await Skill.find({_id: skillId, user: userId})
        res.status(200).json(skill);
    }catch {
        res.status(500).json({error: 'An error occured while retrieving work skill'})
    }
};

exports.getAllSkill = async(req, res) => {
    try{
        const userId = req.params.userId;

        const skill = await Skill.find({user: userId}).exec();

        res.status(200).json(skill);
    } catch {
        res.status(500).json({error: 'An error occured while retriving list of skills'})
    }
};