import { AsyncRouter } from 'express-async-router';
import objectId from 'express-param-objectid';
import { authenticate } from '../../auth';
import * as controller from './user.controller';

const router = new AsyncRouter();

router.param('id', objectId);

router.get('/me', authenticate(), controller.me);
router.get('/email/:email', authenticate(), controller.getByMail);
router.get('/:username', authenticate(), controller.show);
router.put('/:id', authenticate(), controller.update);

export default router;
