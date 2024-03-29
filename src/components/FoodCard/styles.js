import styled from "styled-components";

export const Container = styled.div`
  width: 220px;
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
    width: 180px;
    height: 180px;
    border-radius: 12px;
  }

  h1 {
    font-size: 12pt;
  }

  .food-title {
    margin-top: 8px;
  }

  sub {
    margin-top: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    transform: scale(1.01);
  }

  @media (max-width: 1250px) {
    max-width: 220px;
    padding: 10px;

    .infoWrapper {
      max-width: 100%;
    }

    img {
      width: 200px;
      height: 200px;
    }
  }

  @media (max-width: 525px) {
    max-width: 100%;
    width: 100%;
    flex-direction: row;

    .infoWrapper {
      width: 100%;
      margin-left: 20px;
    }

    img {
      width: 80px;
      height: 80px;
      min-width: 80px;
    }
  }

  @media (max-width: 350px) {
    flex-direction: column;
    align-items: center;
    padding: 20px 20px;

    .infoWrapper {
      margin: 0 auto;
    }
  }
`;

export const Title = styled.div`
  margin-top: 10px;
  display: flex;
  position: relative;
  justify-content: space-between;

  &::before {
    content: "";
    display: block;
    width: 30%;
    height: 3px;
    border-radius: 30px;
    background-color: var(--accent-color);
    position: absolute;
    bottom: -8px;
  }
`;

export const Info = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
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
`;
