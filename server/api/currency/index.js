import { AsyncRouter } from 'express-async-router';
import objectId from 'express-param-objectid';
import { authenticate } from '../../auth';
import * as controller from './channel.controller';

const router = new AsyncRouter();

router.param('id', objectId);
router.get('/:pairName', controller.show);
router.get('/:pairName', controller.show);

export default router;
