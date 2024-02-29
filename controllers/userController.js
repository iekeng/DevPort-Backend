const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.status(201).json(result);
} catch(err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const {userId} = req.params;
  const {name, email, summary, socials, phone, avatar_url, location} = req.body;
  const user = {};

  try {
    const userToBeUpdated = await User.findById(userId);
    if (!userToBeUpdated){
      res.status(404).json({error: 'User not found'});
    }
    user.name = name || userToBeUpdated.name;
    user.email = email || userToBeUpdated.email;
    user.summary = summary || userToBeUpdated.summary;
    user.socials = {
      twitter: socials && socials.twitter ? socials.twitter : userToBeUpdated.socials.twitter,
      linkedIn: socials && socials.linkedIn ? socials.linkedIn : userToBeUpdated.socials.linkedIn,   
      github: userToBeUpdated.socials.github  
     }
    user.phone = phone || userToBeUpdated.phone;
    user.avatar_url = avatar_url || userToBeUpdated.avatar_url;
    user.location = location || userToBeUpdated.location;
    user._id = userToBeUpdated._id;
    user.__v = userToBeUpdated.__v;

    const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });
    res.status(200).json(updatedUser);

} catch(err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.userId
  try {
    const user = await User.findOne({_id: userId});
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
      const { email } = req.query;
      const decodedMail = decodeURIComponent(email);
      
      const user = await User.findOne({ email: decodedMail })

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
};