import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";

const CREATE_COFFEE_SHOP = gql`
  mutation createCoffeeShop(
    $photos: [Upload]
    $name: String!
    $categories: [String]
    $latitude: String!
    $longitude: String!
  ) {
    createCoffeeShop(
      photos: $photos
      name: $name
      categories: $categories
      latitude: $latitude
      longitude: $longitude
    ) {
      ok
      error
    }
  }
`;

const Add = () => {
  const history = useHistory();
  const onCompleted = (data) => {
    history.push("/");
    console.log(data);
    console.log(error);
  };
  const [createCoffeeShop, { error }] = useMutation(CREATE_COFFEE_SHOP, {
    onCompleted,
  });
  const { register, handleSubmit, getValues } = useForm();
  const onSubmit = (data) => {
    const { name, latitude, longitude, photos } = getValues();
    console.log(Object.values(photos));

    createCoffeeShop({
      variables: {
        name,
        latitude,
        longitude,
        photos: photos.length > 0 ? photos : null,
      },
    });
  };

  return (
    <AuthLayout>
      <FormBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="photos"
            type="file"
            multiple
            accept="image/*"
            {...register("photos")}
          />
          <Input placeholder="name" type="text" {...register("name")} />
          <Input
            placeholder="categories"
            type="text"
            {...register("categories")}
          />

          <Input
            placeholder="latitude"
            type="number"
            {...register("latitude")}
          />
          <Input
            placeholder="longitude"
            type="number"
            {...register("longitude")}
          />

          <Button type="submit" value="Submit" />
        </form>
      </FormBox>
    </AuthLayout>
  );
};
export default Add;
