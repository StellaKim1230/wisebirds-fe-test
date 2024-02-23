import { fa, faker } from '@faker-js/faker';
import { HttpResponse, http } from 'msw';
import { defaultPage, defaultSize } from '../../constants';
import { ResponseUsers, User } from '../../types/user';

/**
 * @description 페이지네이션을 하기 위해 100개의 더미 데이터를 생성합니다.
 */

const TotalElements = 100;

export const getUsers = http.get('/api/users', ({ request }) => {
  const users: User[] = [];
  const url = new URL(request.url);

  for (let i = 0; i < TotalElements; i += 1) {
    const user: User = {
      id: i + 1,
      email: `user${i + 1}@wisebirds.ai`,
      name: `사용자${i + 1}`,
      last_login_at: faker.date.recent().toISOString(),
    };

    users.push(user);
  }

  const pageParams = url.searchParams.get('page');
  const page = pageParams ? parseInt(pageParams, 10) : defaultPage;
  const startIndex = page === 1 ? page - 1 : (page - 1) * defaultSize;

  const responseUsers: ResponseUsers = {
    content: users.slice(startIndex, startIndex + defaultSize),
    total_elements: TotalElements,
    total_pages: Math.ceil(TotalElements / defaultSize),
    last: false,
    number: 0,
    size: defaultSize,
    sort: {},
    number_of_elements: defaultSize,
    first: true,
    empty: false,
  };

  return HttpResponse.json(responseUsers);
});

export const checkEmailDuplicate = http.get('/api/users/:email/exists', async ({ params }) => {
  // NOTE: 이메일 중복 체크를 해야하지만, 임의로 result를 faker로 생성합니다.
  const { email } = params;
  return HttpResponse.json({ result: faker.datatype.boolean() });
});

export const createUser = http.post('/api/users', async ({ request }) => {
  // NOTE: 이메일 생성 후, 임의로 result를 faker로 생성합니다.
  return HttpResponse.json({ result: faker.datatype.boolean(), id: faker.number.int() });
});
