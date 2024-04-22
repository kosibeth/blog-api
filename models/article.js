import mongoose from 'mongoose';

const AVERAGE_WORDS_PER_MIN = 200;

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  state: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  read_count: {
    type: Number,
    default: 0
  },
  reading_time: {
    type: Number, // in minutes
    required: false
  },
  tags: [String],
  body: {
    type: String,
    required: true
  }
}, { timestamps: true });

articleSchema.pre('save', function(next) {
  const text = this.body;
  const wordCount = text.split(/\s+/).length;

  const readingTime = Math.ceil(wordCount / AVERAGE_WORDS_PER_MIN);

  this.reading_time = readingTime;
  next();
});

articleSchema.pre(['find', 'findOne'], function(next) {
  this.populate({ path: 'author', select: 'first_name last_name'});
  next();
});

articleSchema.post(['findOneAndUpdate'], async function(doc, next) {
  if (doc) {
      await doc.populate({ path: 'author', select: 'first_name last_name' })
  }
  next();
});


export default mongoose.model('Article', articleSchema);

