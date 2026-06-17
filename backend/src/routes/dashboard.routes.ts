//connects middleware and controller to the actual URL paths
import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import {
  getDashboardGuests,
  createGuest,
  updateGuest,
  deleteGuest,
} from '../controllers/dashboard.controller';

//usa el requireAuth del middleware 
export const dashboardRouter = Router();

//se pone antes de definir las definiciones de rutas, para que cada peticion al /dashboard/ tenga que ir por un chequeo de JWT primero
dashboardRouter.use(requireAuth);

dashboardRouter.get('/guests', getDashboardGuests);
dashboardRouter.post('/guests', createGuest);
dashboardRouter.patch('/guests/:id', updateGuest);
dashboardRouter.delete('/guests/:id', deleteGuest);
