import { MutableRefObject } from 'react';
import { Divider, FormControl, FormErrorMessage, FormLabel, Input, Text, Flex, Button } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import type { FieldInputProps, FormikProps } from 'formik';
import * as Yup from 'yup';
import { User } from '../../types/user';

interface Props {
  initialRef: MutableRefObject<null>;
  user: User;
  onClose: () => void;
  onEdit: (name: string) => Promise<void>;
}

const UserEdit = ({ initialRef, user, onClose, onEdit }: Props) => {
  const userSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[가-힣a-zA-Z]*$/, '이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가)')
      .min(1, '이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가)')
      .max(16, '이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가)')
      .required('이름을 입력하세요.'),
  });

  return (
    <Formik
      initialValues={{
        name: user.name,
      }}
      validationSchema={userSchema}
      onSubmit={async (values) => {
        await onEdit(values.name);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormControl isRequired>
            <FormLabel>아이디</FormLabel>
            <Text>{user.email}</Text>
          </FormControl>

          <Field name="name">
            {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<{ name: string }> }) => (
              <FormControl mt={4} isRequired isInvalid={form.errors.name && form.touched.name ? true : false}>
                <FormLabel>이름</FormLabel>
                <Input {...field} ref={initialRef} name="name" value={form.values.name} />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Divider marginTop="24px" marginBottom="24px" />
          <Flex justifyContent="flex-end">
            <Button mr={3} onClick={onClose}>
              취소
            </Button>
            <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
              저장
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default UserEdit;
