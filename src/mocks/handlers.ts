import { HttpResponse, http } from 'msw';
import { me } from './data/me';

export const handlers = [
  http.get('/api/auth/me', () => {
    const result = HttpResponse.json(me);
    return HttpResponse.json(me);
  }),
];
