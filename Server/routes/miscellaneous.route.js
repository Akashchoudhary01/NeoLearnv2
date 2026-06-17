import {Router} from 'express';
import { authorizedRoles, isLoggedIn } from '../middleware/auth.middleware.js';
import { contactUs , userStats } from '../controllers/miscellaneous.controller.js';

const router = Router();

router.route('/contact-us').post(contactUs);

router
  .route('/admin/stats/users')
  .get(isLoggedIn, authorizedRoles("ADMIN" , "SUPER_ADMIN") , userStats);

export default router;