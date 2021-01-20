import { AsyncRouter } from 'express-async-router';
import objectId from 'express-param-objectid';
import { authenticate } from '../../auth';
import * as controller from './signal.controller';

const router = new AsyncRouter();

router.param('id', objectId);

router.get('/', authenticate(), controller.index);
router.get('/archived', authenticate(), controller.archived);
router.get('/removed', authenticate(), controller.removed);
// router.get('/:id', authenticate(), controller.show);
router.post('/', authenticate(), controller.create);
router.post('/:id/share', authenticate(), controller.share);
router.put('/:id', authenticate(), controller.update);
router.put('/:id/archive', authenticate(), controller.archive);
router.put('/:id/unarchive', authenticate(), controller.unarchive);
router.put('/:id/remove', authenticate(), controller.remove);
router.put('/:id/restore', authenticate(), controller.restore);
router.delete('/:id', authenticate(), controller.deleteForever);
router.delete('/', authenticate(), controller.deleteAll);

export default router;
