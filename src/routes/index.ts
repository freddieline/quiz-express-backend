import { Router } from 'express';
import capitalsRoutes from './capitalsRoutes';

const router = Router();

// All user-related routes will be prefixed with `/api/users`
router.use('/capitals', capitalsRoutes);

export default router;