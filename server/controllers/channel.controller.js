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
  console.log(req.user);
  Channel.list({ limit, skip, id: req.user.id })
    .then(channels => res.json(channels))
    .catch(e => next(e));
}

function create(req, res, next) {
  console.log(req.user);
  const channel = new Channel({
    _creator: req.user.id,
  });

  channel.save()
    .then(savedChannel => res.json(savedChannel))
    .catch(e => next(e));
}

export default { load, list, create };
