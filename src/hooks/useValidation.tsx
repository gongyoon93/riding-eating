import React, { useState } from "react";

const useValidation = () => {
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState<boolean | null>(null);
  const [password2, setPassword2] = useState("");
  const [isPassword2, setIsPassword2] = useState<boolean | null>(null);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value === "") {
      setIsEmail(null);
      return;
    }

    //match 함수의 정규식에 해당되지 않을 경우 null을 반환
    const check = value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (check === null) {
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value === "") {
      setIsPassword(null);
      return;
    }

    const check = value.length >= 8;

    if (check) {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
  };

  const onPassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword2(value);

    if (value === "") {
      setIsPassword2(null);
      return;
    }

    const check = value === password;

    if (check) {
      setIsPassword2(true);
    } else {
      setIsPassword2(false);
    }
  };

  return {
    email,
    isEmail,
    password,
    isPassword,
    password2,
    isPassword2,
    onEmailChange,
    onPasswordChange,
    onPassword2Change,
  };
};

export default useValidation;
