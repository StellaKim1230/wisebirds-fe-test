# 와이즈버즈 프론트엔드 과제

## 사용 기술

- [React.js](https://ko.legacy.reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
  - 사용하기 쉬운 컴포넌트와 스타일을 제공하고, 스타일도 쉽게 수정할 수 있습니다.
  - 기본적으로 접근성을 보장하고, 테마 설정을 지원하는 등 다양한 기능이 미리 구현되어 있습니다.
- [Emotion](https://emotion.sh/docs/introduction)
  - Chakra UI가 Emotion을 기본적으로 사용하기 때문에, `css-in-js` 라이브러리 중 Emotion을 선택했습니다.
- [SWR](https://swr.vercel.app/ko)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/docs/latest/rules/prefer-const)
- [Prettier](https://prettier.io/)
- [valtio](https://github.com/pmndrs/valtio)
  - 코드 작성 방법이 간단하고, `useSnapshot`을 통해 상태에 대한 구독 및 갱신을 쉽게 할 수 있습니다.
  - 내부적으로 proxy를 사용하여 상태의 변경을 감지하고, 이를 통해 필요한 컴포넌트만 렌더링합니다.
- [cors](https://github.com/expressjs/cors#readme)
  - cors를 해결하기 위해 사했습니다.
- [formik](https://formik.org/)
- [yup](https://github.com/jquense/yup)
- [luxon](https://moment.github.io/luxon/#/)

## 실행 방법

```bash
# 원격 저장소의 코드를 받습니다.
$ git clone https://github.com/StellaKim1230/wisebirds-fe-test.git

# 의존성을 설치합니다.
$ pnpm install

# mock 서버를 띄웁니다.
$ pnpm mock

# 로컬 환경에서 실행합니다.
$ pnpm dev
```

### 실행하기 전에 root directory에 .env 파일을 만들어서 아래 코드를 추가합니다.

```
API_URL = 'http://localhost:4000'
NEXT_PUBLIC_API_MOCKING = 'enabled'
```

## 프로젝트 구조

```bash
wisebirds-fe-test
├─ src
│ ├─ app
│ │  └─ 화면에 그려지는 페이지, 컴포넌트 폴더들
│ ├─ components
│ │  └─ 공용 컴포넌트
│ ├─ mocks
│ │  └─ mock 서버와 관련된 파일들
│ ├─ stores
│ │  └─ 상태 저장과 관련된 파일들
│ ├─ types
│ │  └─ 타입 선언과 관련된 파일들
│ ├─ constants.ts
│ │  └─ 상수 관리 파일
│ └─ utils.ts
└─   └─ 공통 유틸리티 함수
```

## 기타

- mock 서버와 faker 라이브러리를 사용하여 데이터를 생성한 후 구현했습니다.
- PATCH 및 POST 메서드로 호출하는 API는 성공적으로 호출되었다는 가정하에, 호출하고 mutate 한 후 화면을 업데이트하는 방식으로 구현했습니다.
