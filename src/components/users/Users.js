import React, {useContext} from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner.js";
import PropTypes from 'prop-types'
import GitHubContext from "../../context/github/gitHubContext"



const Users = () => {
  const { loading, users } = useContext(GitHubContext);

  const userCards = users.map((user) => <UserItem key={user.id} user={user} />);
  const userStyle = {
    display: "grid ",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "1rem",
  };
  if (loading) {
    return <Spinner />
  } else {
    return <div style={userStyle}>{userCards}</div>;
  }
};

export default Users;
