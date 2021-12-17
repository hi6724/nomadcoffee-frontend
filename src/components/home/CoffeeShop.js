import { useReactiveVar } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 25px 0px;
`;

const Info = styled.div`
  display: none;
  position: absolute;
  width: min(24vw, 330px);
  height: min(24vw, 330px);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  cursor: pointer;
  :hover {
    display: block;
  }
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;
const Category = styled.div``;
const ImgWrapper = styled(Link)`
  :hover ~ div {
    display: flex;
  }
`;
export const CoffeeShopImg = styled.img`
  width: min(24vw, 330px);
  height: min(24vw, 330px);
`;
const Wrapper = styled(Link)`
  display: flex;
  width: min(24vw, 330px);
  height: min(24vw, 330px);
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
`;

function CoffeeShop({ coffeeShop }) {
  const link = `/shop/${coffeeShop.id}`;

  return (
    <Container>
      <ImgWrapper to={link}>
        <CoffeeShopImg
          src={
            coffeeShop.photos.length < 1
              ? "/img/noImage.png"
              : coffeeShop.photos[0]?.url
          }
        />
      </ImgWrapper>
      <Info to={link}>
        <Wrapper to={link}>
          <Title> {coffeeShop.name}</Title>
          <Category>
            {coffeeShop.categories.map((category) => (
              <span key={`${category.id}/${coffeeShop.name}`}>
                # {category.name}{" "}
              </span>
            ))}
          </Category>
        </Wrapper>
      </Info>
    </Container>
  );
}

export default CoffeeShop;
