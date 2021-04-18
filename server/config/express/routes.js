import { join } from 'path';
import createError from 'http-errors';
import userRoute from '../../api/user';
import signalRoute from '../../api/signal';
import notificationRoute from '../../api/notification';
import authRoute from '../../api/auth';
import regexRoute from '../../api/regex'
import channelRoute from '../../api/channel';

export default app => {
  app.use('/api/users', userRoute);
  app.use('/api/signals', signalRoute);
  app.use('/api/notifications', notificationRoute);
  app.use('/api/regex', regexRoute);
  app.use('/auth', authRoute);
  app.use('/api/channel', channelRoute);

  // All undefined api routes should return a 404
  app.route('/:url(api|auth)/*').get((req, res, next) => {
    next(createError(404));
  });

  app
    .route('/*')
    .get((req, res) => res.sendFile(join(__dirname, '..', '..', '..', 'client', 'index.html')));
};
