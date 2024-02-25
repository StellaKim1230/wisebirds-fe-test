import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Pagination = ({
  total,
  size,
  page,
  setPage,
}: {
  total: number;
  size: number;
  page: number;
  setPage: (page: number) => void;
}) => {
  const numPages = Math.ceil(total / size);

  return (
    <Nav>
      <Button size="sm" onClick={() => setPage(page - 1)} isDisabled={page === 1}>
        &lt;
      </Button>
      {Array(numPages)
        .fill(0)
        .map((_, i) => (
          <Button
            size="sm"
            key={i + 1}
            isActive={page === i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? 'page' : undefined}
          >
            {i + 1}
          </Button>
        ))}
      <Button size="sm" onClick={() => setPage(page + 1)} isDisabled={page === numPages}>
        &gt;
      </Button>
    </Nav>
  );
};

export default Pagination;
