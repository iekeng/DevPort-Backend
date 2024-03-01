const PDFDocument = require('pdfkit');
const mongoose = require('mongoose');

// Import your Mongoose models
const User = require('./models/User'); 
const Education = require('./models/Education'); 
const Experience = require('./models/Experience'); 
const Skill = require('./models/Skill'); 

async function buildPDF (dataCallBack, endCallBack, userId) {
  const doc = new PDFDocument();

  try {
    // Fetch data from MongoDB using Mongoose
    const user = await User.findById(userId).lean().exec();
    const experience = await Experience.find({user: userId}).lean().exec();
    const education = await Education.find({user: userId}).lean().exec();
    const skill = await Skill.findOne({user: userId}).lean().exec();
  
    // Use fetched data in the PDF
    doc.on('data', dataCallBack);
    doc.on('end', endCallBack);

    doc.font('Times-Roman')

    doc
      .fontSize(16)
      .text(`${user.name}`, {
        align: 'center'
      });

    doc
      .fontSize(11)
      .text(`Email: ${user.email}`, {
        align: 'center'
      });

    doc
      .fontSize(11)
      .text(`Github: ${user.socials.github}`,{
        align: 'center'
      });

    doc.moveDown();

    doc
      .fontSize(14)
      .text('Personal Summary', {
        underline: true
      })
      .moveDown(0.3);

    doc
      .fontSize(12)
      .text(`${user.summary}`)
      .moveDown();
    
    const softSkillsText = skill.soft_skills ? skill.soft_skills.join(', ') : '';
    const techSkillsText = skill.technical_skills ? skill.technical_skills.join(', ') : '';

    doc
    .fontSize(14)
    .text('Soft Skills', {
      underline: true
    })
    .moveDown(0.3);
    doc
      .fontSize(12)
      .text(`${softSkillsText}`)
      .moveDown();

    doc
      .fontSize(14)
      .text('Technical Skills', {
        underline: true
      })
      .moveDown(0.3);
    doc
      .fontSize(12)
      .text(`${techSkillsText}`)
      .moveDown();

      doc
        .fontSize(14)
        .text('Education', {
          underline: true
        })
        .moveDown(0.3);

    education.forEach((item) => {
      doc.fontSize(12).text(`${item.course} (${item.degree}) - ${item.institution}`)
      doc.moveDown(0.2);
      doc.fontSize(10).text(`${item.startDate} - ${item.endDate}`)
      doc.moveDown();
    })

    doc
    .fontSize(14)
    .text('Experience', {
      underline: true
    })
    .moveDown(0.3);
    experience.forEach((item) => {
      doc.fontSize(12).text(`${item.position}, ${item.organisation}`)
      doc.moveDown(0.1);
      doc.fontSize(10).text(`${item.startDate} - ${item.endDate}`)
      doc.moveDown();
    })


    
    doc.end();
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
  }
}

module.exports = {
  buildPDF,
};
