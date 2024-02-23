import { HttpResponse, http } from 'msw';

export const getMe = http.get('/api/auth/me', () => {
  const me = {
    id: 1,
    email: 'abc@abc.com',
    name: '홍길동',
    company: {
      id: 1,
      name: '와이즈버즈',
    },
  };

  return HttpResponse.json(me);
});
