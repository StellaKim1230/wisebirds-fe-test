import { HttpResponse, http } from 'msw';
import { me } from '../data/me';

export const getMe = http.get('/api/auth/me', () => {
  return HttpResponse.json(me);
});
