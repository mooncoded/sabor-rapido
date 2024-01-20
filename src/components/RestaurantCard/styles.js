import styled from "styled-components";

export const Container = styled.div`
  width: 400px;
  height: fit-content;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  cursor: pointer;
  transition: all 0.2s;

  img {
    width: 100%;
    height: 200px;
    border-radius: 12px;
  }

  h1 {
    font-size: 14pt;
  }

  &:hover {
    transform: scale(1.01);
  }
`;

export const Title = styled.div`
  margin-top: 10px;
  position: relative;
  margin-bottom: 15px;

  /* &::before {
    content: "";
    display: block;
    width: 60%;
    height: 3px;
    border-radius: 30px;
    background-color: var(--accent-color);
    position: absolute;
    bottom: -10px;
  } */
`;

export const Info = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  align-items: center;

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    font-weight: 900;
    color: #c3c3c3;
  }
`;

export const Icon = styled.div`
  width: 30px;
  height: 30px;
  background-color: #ededf2;
  border-radius: 50%;
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;

  svg {

    color: #a8a8a8;
  }
`;