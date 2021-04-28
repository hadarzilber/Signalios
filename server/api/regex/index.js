import { AsyncRouter } from 'express-async-router';
import objectId from 'express-param-objectid';
import { authenticate } from '../../auth';
import * as controller from './regex.controller';

const router = new AsyncRouter();

router.param('id', objectId);

router.post('/', controller.addNew);

export default router;
