import { faker } from '@faker-js/faker';
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
  // TODO: 다시 계산.
  const page = pageParams ? parseInt(pageParams, 10) : defaultPage;

  const responseUsers: ResponseUsers = {
    content: users.slice(page - 1, defaultSize),
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
