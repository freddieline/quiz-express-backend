import { Router } from 'express';
import capitalsController from '../controllers/capitalsController';

const router = Router();

router.get('/', capitalsController.getAllCapitals);
 
export default router;