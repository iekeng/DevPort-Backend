const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// exports.getUser = async (req, res) => {
//     try {
//         const userId = req.params.userId
//         const users = await User.find({_id: userId});
//         res.status(200).json(users);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
};