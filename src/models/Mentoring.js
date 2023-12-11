const { Schema, model } = require('mongoose');

const MentoringSchema = new Schema({
  mentoringClass: { 
    type: String,
    required: true 
  },
  mentoringTopic: { 
    type: String, 
    required: true 
  },
  mentoringAvailability: { 
    type: String, 
    required: true 
},
  mentoringDescription: { 
    type: String, 
    required: true 
  },
  mentoringUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = model('Mentoring', MentoringSchema);