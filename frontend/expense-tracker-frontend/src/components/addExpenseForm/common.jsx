import styled from "styled-components";
import { theme } from "theme";

export const BoxContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: #00000050;
  top: 0;
  left: 0;
`;

export const PopupContainer = styled.div`
  position: relative;
  width: 70%;
  height: 70%;
  background: #fff;
  margin: 0 auto;
  padding: 20px;
  //set max height to be 70vh. vh == %
  max-height: 70vh;
  margin-top: calc(100vh - 85vh - 20px);
  border: 1px solid yellow;
  border-radius: 4px;
`;

export const TextWrapper = styled.h3`
  font-size: 20px;
  font-weight: 500;
`;

export const Input = styled.input`
  height: 50px;
  width: 50%;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  outline: none;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 20px;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(241, 196, 15);
  }

  &:disabled {
    filter: contrast(0.7);
  }
`;

export const CloseIcon = styled.span`
  content: "x";
  cursor: pointer;
  position: fixed;
  right: calc(15% - 30px);
  top: calc(100vh - 85vh - 33px);
  background: #ededed;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  border: 1px solid #999;
  font-size: 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const SubmitButton = styled.button`
  padding: ${({ small }) => (small ? "5px 8px" : "7px 15px")};
  border-radius: 5px;
  color: #22b973;
  font-size: ${({ small }) => (small ? "12px" : "16px")};
  font-weight: bold;
  outline: none;
  border: 2px solid transparent;
  transition: all 220ms ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border: 2px solid ${theme.primary};
  }
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const FieldContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
