import styled from "styled-components";
import { isLoggedInVar } from "../apollo";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

function Home() {
  return (
    <div>
      <Title>Home</Title>
      <button onClick={() => isLoggedInVar(false)}>Log out now!</button>
    </div>
  );
}
export default Home;
