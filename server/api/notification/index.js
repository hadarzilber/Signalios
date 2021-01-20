import { AsyncRouter } from 'express-async-router';
import objectId from 'express-param-objectid';
import { authenticate } from '../../auth';
import * as controller from './notification.controller';

const router = new AsyncRouter();

router.param('id', objectId);

router.get('/', authenticate(), controller.index);
router.put('/', authenticate(), controller.view);

export default router;
