import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import channelCtrl from '../controllers/channel.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(channelCtrl.list)

  .post(channelCtrl.create); // TODO add validation

router.route('/:channelId')
  .get(channelCtrl.get)

  .delete(channelCtrl.remove)

  .put(channelCtrl.update);

router.param('channelId', channelCtrl.load);

export default router;
