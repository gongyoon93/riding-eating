import React, { useEffect, useState } from "react";

import styled from "styled-components";
import useSetUserState from "@/hooks/useSetUserState";
import FormContainer from "@/components/FormContainer";
import useValidation from "@/hooks/useValidation";
import {
  AuthButton,
  AuthInput,
  AuthTitleLabel,
} from "@/styled/form/FormDefaultStyle";
import { ErrorLabel } from "@/styled/form/FormErrorStyle";
import fashong from "@/assets/images/fashong.png";
import useUsers from "@/hooks/useUsers";

export default function SignIn() {
  const {
    email,
    password,
    isEmail,
    isPassword,
    onEmailChange,
    onPasswordChange,
  } = useValidation();
  const [isDisabled] = useState(false);

  const { setUserState } = useSetUserState();

  const { useLogin } = useUsers();

  const { isSuccess, mutate: loginMutate } = useLogin();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { email, password };
    loginMutate(formData);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSuccess) {
      timer = setTimeout(() => {
        setUserState((pre) => ({ ...pre, isLogin: true }));
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [isSuccess]);

  return (
    <Wrapper>
      <Icon />
      <Container onSubmit={onSubmit}>
        <AuthTitleLabel htmlFor="email">이메일</AuthTitleLabel>
        <Input
          isEmail={isEmail}
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={onEmailChange}
          placeholder="이메일을 입력해주세요."
        />
        <ErrorLabel isError={isEmail} role={"alert"}>
          이메일의 형식이 아닙니다.
        </ErrorLabel>
        <AuthTitleLabel htmlFor="password">비밀번호</AuthTitleLabel>
        <Input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="비밀번호를 입력해주세요."
        />
        <ErrorLabel isError={isPassword}>
          비밀번호는 8자 이상 입력해야합니다.
        </ErrorLabel>
        <AuthButton disabled={isDisabled}>로그인</AuthButton>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  margin: 0 auto;
  form {
    ${({ theme }) => theme.mixin.form()};
    width: 80%;
  }
`;

const Icon = styled.div`
  width: 80%;
  height: 150px;
  margin-bottom: 30px;
  background: url(${fashong}) center/140px 140px no-repeat;
  @media screen and (max-width: 768px) {
    height: 100px;
    margin-bottom: 30px;
    background: url(${fashong}) center/100px 100px no-repeat;
  }
`;

const Container = styled(({ ...parentProps }) => (
  <FormContainer {...parentProps}></FormContainer>
))`
  padding: 40px 30px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.color.second};
`;

const Input = styled(({ ...parentProps }) => (
  <AuthInput {...parentProps}></AuthInput>
))`
  width: 100%;
  margin-top: 1rem;
`;
