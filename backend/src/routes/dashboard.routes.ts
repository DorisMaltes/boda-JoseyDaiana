import { Router } from 'express';
import { getDashboardGuests } from '../controllers/dashboard.controller';

export const dashboardRouter = Router();

dashboardRouter.get('/guests', getDashboardGuests);
