import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import GitHubContext from "../../context/github/gitHubContext"

const Search = ({ setAlert }) =>  {
  const gitHubContext = useContext(GitHubContext);
  const [text, setText] = useState('');


  const onSubmit = (event) => {
    event.preventDefault();
    if(text === ""){
      setAlert("you have to type something", "danger")
    }else{
      gitHubContext.searchUsers(text);
      setText("");
    }
  };

  const onChange = (event) =>
    setText(event.target.value);

    return (
      <div>
        <form onSubmit={onSubmit} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search users .."
            value={text}
            onChange={onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {gitHubContext.users.length > 0 && (
          <button
            className="btn btn-light btn-block"
            onClick={gitHubContext.clearUsers}
          >
            Clear
          </button>
        )}
      </div>
    );
}

Search.propTypes = {
  // searchUsers: PropTypes.func.isRequired,
  // clearUsers: PropTypes.func.isRequired,
  // showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,

  
};

export default Search;
