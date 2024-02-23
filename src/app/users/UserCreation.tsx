import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { MutableRefObject, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import type { FieldInputProps, FormikProps } from 'formik';
import * as Yup from 'yup';

interface Props {
  initialRef: MutableRefObject<null>;
  onClose: () => void;
}

const UserCreation = ({ initialRef, onClose }: Props) => {
  const userSchema = Yup.object().shape({
    email: Yup.string()
      .required('아이디(이메일)을 입력하세요.')
      .min(9, '올바른 이메일 주소를 입력하세요.')
      .max(50, '올바른 이메일 주소를 입력하세요.')
      .email('올바른 이메일 주소를 입력하세요.'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,15}$/,
        '8~15자 영문, 숫자, 특수문자를 사용하세요.',
      )
      .min(8, '8~15자 영문, 숫자, 특수문자를 사용하세요.')
      .max(15, '8~15자 영문, 숫자, 특수문자를 사용하세요.')
      .required('비밀번호를 입력하세요.'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password')], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호를 입력하세요.'),
    name: Yup.string()
      .matches(/^[가-힣a-zA-Z]*$/, '이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가)')
      .min(1, '이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가)')
      .max(16, '이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가)')
      .required('이름을 입력하세요.'),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          passwordConfirm: '',
          name: '',
        }}
        validationSchema={userSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="email">
              {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<{ email: string }> }) => (
                <FormControl isRequired isInvalid={form.errors.email && form.touched.email ? true : false}>
                  <FormLabel>아이디</FormLabel>
                  <Input ref={initialRef} {...field} name="email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<{ password: string }> }) => (
                <FormControl mt={4} isRequired isInvalid={form.errors.password && form.touched.password ? true : false}>
                  <FormLabel>비밀번호</FormLabel>
                  <InputGroup size="md">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      name="password"
                      placeholder="영문, 숫자, 특수문자 조합 8-15자"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="passwordConfirm">
              {({
                field,
                form,
              }: {
                field: FieldInputProps<string>;
                form: FormikProps<{ passwordConfirm: string }>;
              }) => (
                <FormControl
                  mt={4}
                  isRequired
                  isInvalid={form.errors.passwordConfirm && form.touched.passwordConfirm ? true : false}
                >
                  <FormLabel>비밀번호</FormLabel>
                  <InputGroup size="md">
                    <Input type={showPasswordConfirm ? 'text' : 'password'} {...field} name="passwordConfirm" />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>
                        {showPasswordConfirm ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <FormErrorMessage>{form.errors.passwordConfirm}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="name">
              {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<{ name: string }> }) => (
                <FormControl mt={4} isRequired isInvalid={form.errors.name && form.touched.name ? true : false}>
                  <FormLabel>이름</FormLabel>
                  <Input {...field} name="name" />
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
                생성
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UserCreation;