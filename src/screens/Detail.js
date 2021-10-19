import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useParams } from "react-router";
import HomeLayout from "../components/home/HomeLayout";
import { CoffeeShopImg } from "../components/home/CoffeeShop";
import { GridLayout } from "./Home";
import styled from "styled-components";
import DetailHeader from "../components/header/DetailHeader";

const SEE_COFFEE_SHOP = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      user {
        id
        username
        avatarURL
      }
      categories {
        id
        name
      }
      photos {
        id
        url
      }
      name
      latitude
      longitude
    }
  }
`;

const Detail = () => {
  const { id } = useParams();
  const { data } = useQuery(SEE_COFFEE_SHOP, { variables: { id: id * 1 } });
  console.log(data);
  return (
    <HomeLayout>
      <DetailHeader
        coffeeShop={data?.seeCoffeeShop}
        user={data?.seeCoffeeShop?.user}
      />

      <GridLayout>
        {data?.seeCoffeeShop?.photos &&
          data.seeCoffeeShop.photos.map((photo) => (
            <CoffeeShopImg key={photo.id} src={photo.url} width="150" />
          ))}
      </GridLayout>
    </HomeLayout>
  );
};
export default Detail;
