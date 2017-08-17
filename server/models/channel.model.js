import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import _ from 'lodash';
import APIError from '../helpers/APIError';

const ChannelSchema = new mongoose.Schema({
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

ChannelSchema.pre('save', function (next) {
  const channel = this;
  channel.updatedAt = Date.now();
  next();
});

ChannelSchema.statics = {
  get(id) {
    return this.findById(id)
      .exec()
      .then((channel) => {
        if (channel) {
          return channel;
        }
        const err = new APIError('No such channel exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  checkUser(userId, channelId) {
    return this.findById(channelId)
      .exec()
      .then((channel) => {
        if (channel) {
          if (channel._creator == userId || _.includes(channel.members, userId)) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      })
  },

  list({ skip = 0, limit = 50, id }) {
    return this.find()
      .or([{ _creator: id }, { members: id }])
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

export default mongoose.model('Channel', ChannelSchema);
