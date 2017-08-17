import express from 'express';
import expressJwt from 'express-jwt';
import validate from 'express-validation';
import config from '../../config/config';
import paramValidation from '../../config/param-validation';
import channelCtrl from '../controllers/channel.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(channelCtrl.list)

  .post(channelCtrl.create); // TODO add validation

router.param('channelId', channelCtrl.load);

export default router;
