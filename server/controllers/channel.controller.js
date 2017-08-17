import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Channel from '../models/channel.model';

function load(req, res, next, id) {
  Channel.get(id)
    .then((channel) => {
      req.channel = channel; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Channel.list({ limit, skip, id: req.user.id })
    .then(channels => res.json(channels))
    .catch(e => next(e));
}

function create(req, res, next) {
  const channel = new Channel({
    _creator: req.user.id,
    members: req.body.members ? req.body.members : []
  });

  channel.save()
    .then(savedChannel => res.json(savedChannel))
    .catch(e => next(e));
}

function get(req, res, next) {
  return res.json(req.channel);
}

function update(req, res, next) {
  const channel = req.channel;

  if (req.channel._creator == req.user.id) {
    channel._creator = req.body._creator;
    channel.members = req.body.members;
    channel.save()
      .then(savedChannel => res.json(savedChannel))
      .catch(e => next(e));
  } else {
    const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
    return next(err);
  }
}

function remove(req, res, next) {
  const channel = req.channel;
  if (channel._creator == req.user.id) {
    channel.remove()
      .then(deletedChannel => res.json(deletedChannel))
      .catch(e => next(e));
  } else {
    const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
    return next(err);
  }
}

export default { load, list, create, get, update, remove };
