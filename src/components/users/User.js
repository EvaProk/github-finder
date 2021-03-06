import React, { Fragment, useEffect , useContext} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";
import Repos from "../repos/Repos"
import Spinner from "../layout/Spinner.js";
import GitHubContext from "../../context/github/gitHubContext"


function User({ }) {
  const { loading, user, getUser, repos, getUserRepos  } = useContext(GitHubContext);


  const params = useParams()

  useEffect(() => {
    getUser(params.login)
    getUserRepos(params.login)
    //eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    company,
    followers,
    following,
    public_repos,
    piublic_gists,
    hireable,
  } = user;
  
  if (loading) return <Spinner />;

  return <Fragment>
    <Link to="/" className="btn btn-light">Back to search</Link>
    Hirable:{" "}
    {hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" />}
    <div className="card grid-2">
      <div className="all-center">
        <img src={avatar_url} className="round-img" alt="" style={{ width: "150px" }} />
        <hi>{name || login}</hi>
        <p>{location}</p>
      </div>
      <div>
        {bio && <Fragment>
          <h3>Bio</h3>
          <p>{bio}</p>
        </Fragment>}
        <a href={html_url} className="btn btn-dark my-1">Visit GitHub profile</a>
        <ul>
          <li>
            {login && <Fragment>
              <strong>Username: </strong>
              {login}
            </Fragment>}
          </li>
          <li>
            {company && <Fragment>
              <strong>Company: </strong>
              {company}
            </Fragment>}
          </li>
          <li>
            {blog && <Fragment>
              <strong>Website: </strong>
              {blog}
            </Fragment>}
          </li>
        </ul>
      </div>
    </div>
    <div className=" card text-center">
      <div className="badge badge-primary"> Followers: {followers}</div>
      <div className="badge badge-success"> Following: {following}</div>
      {public_repos && <Fragment>
        <div className="badge badge-light"> Public Repos: {public_repos}</div>
      </Fragment>}
      {piublic_gists && <Fragment>
        <div className="badge badge-dark"> Public Gists: {piublic_gists}</div>
      </Fragment>}
    </div>
    <Repos repos={repos} />
  </Fragment>
}

export default User;