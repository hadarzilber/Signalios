import { AsyncRouter } from 'express-async-router';
import objectId from 'express-param-objectid';
import { authenticate } from '../../auth';
import * as controller from './channel.controller';

const router = new AsyncRouter();

router.param('id', objectId);

router.get('/', controller.index);
// router.get('/archived', authenticate(), controller.archived);
// router.get('/favorites', authenticate(), controller.getFavorites);
// router.get('/removed', authenticate(), controller.getRemoved);
// // router.get('/:id', authenticate(), controller.show);
// router.post('/', authenticate(), controller.create);
// router.post('/:id/share', authenticate(), controller.share);
// router.put('/:id', authenticate(), controller.update);
// router.put('/:id/archive', authenticate(), controller.archive);
// router.put('/:id/favorite', authenticate(), controller.favorite);
// router.put('/:id/unarchive', authenticate(), controller.unarchive);
// router.put('/:id/remove', authenticate(), controller.trash);
// router.put('/:id/restore', authenticate(), controller.trash);
// router.delete('/:id', authenticate(), controller.deleteForever);
// router.delete('/', authenticate(), controller.deleteAll);

export default router;
