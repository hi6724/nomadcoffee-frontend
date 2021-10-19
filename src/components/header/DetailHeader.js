import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const SDetailHeader = styled.div`
  display: flex;
  align-items: center;
  height: 50px;

  gap: 15px;
  margin-bottom: 5px;
`;
const Title = styled.div`
  display: flex;
  align-items: baseline;
  h1 {
    text-transform: uppercase;
    font-size: min(30px, 5vw);
    font-weight: 600;
  }
  span {
    font-weight: 600;
    font-size: 8px;
    padding: 0px 5px;
    opacity: 0.8;
  }
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const DetailHeader = (data) => {
  return (
    <SDetailHeader>
      <Link to="#">
        <Avatar
          src={data?.user?.avatarURL ? data.user.avatarURL : "/img/profile.png"}
          width="50px"
        />
      </Link>
      <div>
        <Title>
          <h1>{data?.coffeeShop?.name}</h1>
          <span>by {data?.user?.username}</span>
        </Title>

        {data?.coffeeShop?.categories &&
          data.coffeeShop.categories.map((category) => (
            <span key={category.id}>#{category.name} </span>
          ))}
      </div>
    </SDetailHeader>
  );
};
export default DetailHeader;
