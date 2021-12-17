import { gql, useQuery } from "@apollo/client";
import {
  faCaretSquareLeft,
  faCaretSquareRight,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CoffeeShop from "../components/home/CoffeeShop";
import HomeLayout from "../components/home/HomeLayout";
import PageTitle from "../components/PageTitle";

const SEE_PROFILE = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      bio
      username
      avatarURL
      isMe
      coffeeShops {
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

export default function Profile() {
  const { username } = useParams();
  const { data } = useQuery(SEE_PROFILE, { variables: { username: username } });
  console.log(data);
  return (
    <HomeLayout>
      <PageTitle title="Home" />

      <GridLayout>
        {data &&
          data?.seeProfile?.coffeeShops.map((coffeeShop) => (
            <CoffeeShop coffeeShop={coffeeShop} key={coffeeShop.id} />
          ))}
      </GridLayout>
    </HomeLayout>
  );
}

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
