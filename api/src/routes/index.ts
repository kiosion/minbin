import { API_ROUTE } from '$lib/consts';
import SaveRoute from '$routes/save';
import ViewRoute from '$routes/view';
import { ERR } from '$lib/response';
import type { Express, Request, Response } from 'express';

export const setupRoutes = (app: Express) => {
  app.get('/', (req: Request, res: Response) => {
    ERR(res, { message: "Cannot GET '/'", code: 400 });
  });

  app.post(`${API_ROUTE}/save`, SaveRoute.POST);
  app.options(`${API_ROUTE}/save`, SaveRoute.OPTIONS);

  app.get(`${API_ROUTE}/get/:id`, ViewRoute.GET);
  app.options(`${API_ROUTE}/get/:id`, ViewRoute.OPTIONS);
};
