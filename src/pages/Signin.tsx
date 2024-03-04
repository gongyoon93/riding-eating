import React, { useEffect, useState } from "react";

import styled from "styled-components";
import useSetUserState from "@/hooks/useSetUserState";
import { useNavigate } from "react-router-dom";
import useLogin from "@/hooks/useLogin";
import FormContainer from "@/components/FormContainer";
import useValidation from "@/hooks/useValidation";
import {
  AuthButton,
  AuthInput,
  AuthTitleLabel,
} from "@/styled/form/FormDefaultStyle";
import { ErrorLabel } from "@/styled/form/FormErrorStyle";

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

  const navigate = useNavigate();

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
        navigate("/");
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [isSuccess, navigate, setUserState]);

  return (
    <Wrapper>
      <FormContainer onSubmit={onSubmit}>
        <AuthTitleLabel htmlFor="email">이메일</AuthTitleLabel>
        <AuthInput
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
        <AuthInput
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
      </FormContainer>
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
