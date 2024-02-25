import { HttpResponse, http } from 'msw';
import { faker } from '@faker-js/faker';
import { ResponseUsers, User } from '../../types/user';
import { paginationObject } from '../../utils';
import { defaultStartPage, defaultPageSize, totalElements } from '../../constants';

/**
 * @description faker 라이브러리를 이용하여 100개의 데이터를 생성합니다.
 */
export const getUsers = http.get('/api/users', ({ request }) => {
  const users: User[] = [];
  const url = new URL(request.url);

  for (let i = 0; i < totalElements; i += 1) {
    const user: User = {
      id: i + 1,
      email: `user${i + 1}@wisebirds.ai`,
      name: `사용자${i + 1}`,
      last_login_at: faker.date.recent().toISOString(),
    };

    users.push(user);
  }

  const pageParams = url.searchParams.get('page');
  const page = pageParams ? parseInt(pageParams, 10) : defaultStartPage;
  const startIndex = page === 1 ? page - 1 : (page - 1) * defaultPageSize;

  const responseUsers: ResponseUsers = {
    content: users.slice(startIndex, startIndex + defaultPageSize),
    ...paginationObject(page),
  };

  return HttpResponse.json(responseUsers);
});

/**
 * @description 이메일 중복 체크 하는 로직은 생략 후, 임의로 result를 faker로 생성 후 리턴합니다.
 */
export const checkEmailDuplicate = http.get('/api/users/:email/exists', async ({ params }) => {
  return HttpResponse.json({ result: faker.datatype.boolean() });
});

/**
 * @description 사용자 생성하는 로직은 생략 후, 임의로 result를 faker로 생성 후 리턴합니다.
 */
export const createUser = http.post('/api/users', async ({ request }) => {
  return HttpResponse.json({ result: faker.datatype.boolean(), id: faker.number.int() });
});

/**
 * @description 사용자 수정하는 로직은 생략 후, result, id를 리턴합니다.
 */
export const editUser = http.patch('/api/users/:id', async ({ request, params }) => {
  return HttpResponse.json({ result: true, id: params.id });
});
