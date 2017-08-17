import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const MessageSchema = new mongoose.Schema({
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  _channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',
    required: true,
  },
  msg: {
    type: String,
    required: true
  },
  reactions: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

MessageSchema.pre('save', function (next) {
  const channel = this;
  channel.updatedAt = Date.now();
  next();
});

MessageSchema.statics = {
  get(id) {
    return this.findById(id)
      .exec()
      .then((message) => {
        if (message) {
          return message;
        }
        const err = new APIError('No such channel exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  list(channelId) {
    return this.find()
      .where({ _channel: channelId })
      .sort({ createdAt: -1 })
      .exec();
  }
};

export default mongoose.model('Message', MessageSchema);
