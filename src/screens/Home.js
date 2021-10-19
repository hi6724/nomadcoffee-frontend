import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../apollo";
import CoffeeShop from "../components/home/CoffeeShop";
import HomeLayout from "../components/home/HomeLayout";
import PageTitle from "../components/PageTitle";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;
export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
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

function Home() {
  const [page, setPage] = useState(1);
  const { data } = useQuery(SEE_COFFEE_SHOPS, { variables: { page } });
  console.log(data);
  return (
    <HomeLayout>
      <PageTitle title="Home" />

      <GridLayout>
        {data &&
          data.seeCoffeeShops.CoffeeShops.map((coffeeShop) => (
            <CoffeeShop coffeeShop={coffeeShop} key={coffeeShop.id} />
          ))}
      </GridLayout>
      <button
        onClick={() => {
          setPage((prev) => {
            console.log("here", prev);
            if (prev > 1) {
              return prev - 1;
            } else {
              return prev;
            }
          });
        }}
      >
        Prev
      </button>
      <button
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
        Next
      </button>
    </HomeLayout>
  );
}
export default Home;
