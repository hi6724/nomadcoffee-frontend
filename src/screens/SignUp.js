import { useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $name: String!
    $email: String!
    $location: String
    $username: String!
    $password: String!
  ) {
    createAccount(
      name: $name
      email: $email
      location: $location
      username: $username
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SingUp() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });
  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
    if (ok) {
      history.push(routes.home, {
        message: "Account created. Please log in.",
        username,
        password,
      });
    }
  };
  const onSubmit = (data) => {
    if (loading) {
      return;
    }
    createAccount({ variables: { ...data } });
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  return (
    <AuthLayout>
      <PageTitle title="Sign Up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="text" placeholder="Name" {...register("name")} />

          <Input
            onFocus={() => clearErrors("result")}
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          <Input
            type="text"
            placeholder="Username"
            onFocus={() => clearErrors("result")}
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
            })}
          />
          <Input type="text" placeholder="Location" {...register("location")} />
          <Input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 5,
                message: "Password should be longer than 5 chars.",
              },
            })}
          />
          <FormError message={formState.errors?.result?.message} />
          <Button type="submit" value="Sign up" disabled={!formState.isValid} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}
export default SingUp;
