import React from "react";
import styled from "styled-components";

const Form = styled.form``;

const Label = styled.label``;

const Input = styled.input``;

const Textarea = styled.textarea``;

const Button = styled.button``;

interface IFormContainerProps
  extends React.FormHTMLAttributes<HTMLFormElement> {}

interface ILabelContainerProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

interface IInputContainerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

interface ITextareaContainerProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

interface IButtonContainerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const FormContainer = ({ ...props }: IFormContainerProps) => {
  return <Form {...props}>{props.children}</Form>;
};

FormContainer.Label = ({ ...props }: ILabelContainerProps) => {
  return <Label {...props}>{props.children}</Label>;
};

FormContainer.Input = ({ ...props }: IInputContainerProps) => {
  return <Input {...props} />;
};

FormContainer.Textarea = ({ ...props }: ITextareaContainerProps) => {
  return <Textarea {...props}>{props.children}</Textarea>;
};

FormContainer.Button = ({ ...props }: IButtonContainerProps) => {
  return <Button {...props}>{props.children}</Button>;
};

export default FormContainer;
