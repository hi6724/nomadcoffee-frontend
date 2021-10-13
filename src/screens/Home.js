import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../apollo";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

function Home() {
  return (
    <div>
      <Title>Home</Title>
      <button onClick={() => logUserOut()}>Log out now!</button>
    </div>
  );
}
export default Home;
