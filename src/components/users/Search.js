import React, { useState, useContext } from "react";
import GitHubContext from "../../context/github/gitHubContext"
import AlertContext from "../../context/alert/alertContext"


const Search = () =>  {
  const gitHubContext = useContext(GitHubContext);
  const { setAlert } = useContext(AlertContext)

  const [text, setText] = useState("");


  const onSubmit = (event) => {
    event.preventDefault();
    if(text === ""){
      setAlert("You have to type something", "danger")
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



export default Search;
