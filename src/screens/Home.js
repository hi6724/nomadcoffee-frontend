import { useQuery } from "@apollo/client";
import {
  faCaretSquareLeft,
  faCaretSquareRight,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../apollo";
import CoffeeShop from "../components/home/CoffeeShop";
import HomeLayout from "../components/home/HomeLayout";
import PageTitle from "../components/PageTitle";

const SEE_COFFEE_SHOPS = gql`
  query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      totalPages
      CoffeeShops {
        id
        name
        latitude
        longitude
        user {
          name
        }
        photos {
          id
          url
        }
        categories {
          id
          name
        }
      }
    }
  }
`;

export default Home;
const PageBtn = styled.span`
  cursor: pointer;
  position: fixed;
  top: 50vh;
  display: ${(props) => (props.display ? "block" : "none")};
  ${(props) => (props.text == "prev" ? "left:0" : "right:0")}
`;

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;
export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

function Home() {
  const [page, setPage] = useState(1);
  const { data } = useQuery(SEE_COFFEE_SHOPS, { variables: { page } });
  console.log("HERE", page, page !== 1);
  return (
    <HomeLayout>
      <PageTitle title="Home" />

      <GridLayout>
        {data &&
          data.seeCoffeeShops.CoffeeShops.map((coffeeShop) => (
            <CoffeeShop coffeeShop={coffeeShop} key={coffeeShop.id} />
          ))}
      </GridLayout>
      <PageBtn
        display={page !== 1}
        text="prev"
        onClick={() => {
          setPage((prev) => {
            if (prev > 1) {
              return prev - 1;
            } else {
              return prev;
            }
          });
        }}
      >
        <FontAwesomeIcon
          icon={faCaretSquareLeft}
          size="3x"
          color="rgba(0,0,0,0.3)"
        />
      </PageBtn>
      <PageBtn
        display={data && page !== data.seeCoffeeShops.totalPages}
        text="next"
        onClick={() => {
          setPage((prev) => {
            if (prev < data.seeCoffeeShops.totalPages) {
              return prev + 1;
            } else {
              return prev;
            }
          });
        }}
      >
        <FontAwesomeIcon
          icon={faCaretSquareRight}
          size="3x"
          color="rgba(0,0,0,0.3)"
        />
      </PageBtn>
    </HomeLayout>
  );
}
