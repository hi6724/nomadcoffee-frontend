import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";
import { logUserOut } from "../../apollo";
import useUser from "../../hooks/useUser";

const HeaderContainer = styled.div`
  background-color: #fff;
  padding: 25px 10px;
  height: 55px;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 90%;
`;
const Avatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const Logo = styled.img`
  width: 150px;
`;
const Add = styled(Link)`
  padding: 13px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: inherit;
  color: black;
  margin-right: 25px;
`;
const Search = styled.input`
  margin-left: 50px;
  width: 450px;
  height: 40px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Header = () => {
  const { data } = useUser();
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <div style={{ display: "flex ", alignItems: "center" }}>
          <Link to="/">
            <Logo src="/img/logo.png" />
          </Link>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Search />
            <FontAwesomeIcon
              icon={faSearch}
              onClick={() => console.log("search")}
              style={{
                position: "absolute",
                right: 15,
                opacity: 0.8,
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex ", alignItems: "center" }}>
          <Add to="/add">
            <FontAwesomeIcon icon={faPlus} size={"lg"} />
          </Add>
          <button onClick={logUserOut}>LOGOUT</button>
          <Avatar src={data?.me?.avatarURL} />
        </div>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
