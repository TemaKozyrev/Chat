import express from 'express';
import expressJwt from 'express-jwt';
import config from '../../config/config';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import channelRoutes from './channel.route';
import messageRoutes from './message.route';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/users', userRoutes);

router.use('/auth', authRoutes);

router.use('/channel',
  expressJwt({
    secret: config.jwtSecret
  }),
  channelRoutes);

router.use('/message',
  expressJwt({
    secret: config.jwtSecret
  }),
  messageRoutes);

export default router;
