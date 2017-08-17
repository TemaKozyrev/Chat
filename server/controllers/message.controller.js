import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Message from '../models/message.model';
import Channel from '../models/channel.model';

function load(req, res, next, id) {
  Message.get(id)
    .then((message) => {
      req.message = message; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function list(req, res, next) {
  if (Channel.checkUser(req.user.id, req.body.channelId)) {
    Message.list(req.body.channelId)
      .then(messages => res.json(messages))
      .catch(e => next(e));
  } else {
    const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
    return next(err);
  }
}

function add(req, res, next) {
  if (Channel.checkUser(req.user.id, req.body.channelId)) {
    const message = new Message({
      _creator: req.user.id,
      _channel: req.body.channelId,
      msg: req.body.msg,
    });
    message.save()
      .then(addedMessage => res.json(addedMessage))
      .catch(e => next(e));
  } else {
    const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
    return next(err);
  }
}

function remove(req, res, next) {

}

function update(req, res, next) {

}

export default { load, list, add, remove, update };
