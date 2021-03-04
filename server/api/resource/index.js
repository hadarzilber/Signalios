import { AsyncRouter } from 'express-async-router';
import objectId from 'express-param-objectid';
import { authenticate } from '../../auth';
import * as controller from './resource.controller';

const router = new AsyncRouter();

router.param('id', objectId);

router.get('/', authenticate(), controller.index);

export default router;
