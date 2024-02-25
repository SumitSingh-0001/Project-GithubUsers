import React, { useEffect, useState } from "react";
import "./Users.css";

const Users = () => {
  const [usernames, setUsernames] = useState([]);

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // for get all username from api
  useEffect(() => {
    (async () => {
      try {
        const data = await fetch("https://api.github.com/users");
        const response = await data.json();
        const user = response.map((res) => {
          return res.login;
        });
        setUsernames(user);
        console.log(user);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    })();
  }, []);

  //use each username in api

  useEffect(() => {
    const fetchData = async () => {
      const allData = usernames.map(async (username) => {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        setLoading(false);
        return response.json();
      });

      Promise.all(allData)
        .then((data) => setUsers(data))
        .catch((err) => setError(err.message));
    };

    if (usernames.length > 0) {
      fetchData();
    }
  }, [usernames]);

  console.log(users);

  if (error) {
    return <h1 className="error">Something when wrong!</h1>;
  }

  if (loading) {
    return <h1 className="loading">Loading....</h1>;
  }

  return (
    <>
      <div className="body">
        <div className="main">
          <h1 className="heading">Github Users List</h1>
          <div className="main-box">
            {users.map((user) => {
              const { id, avatar_url, login, name, followers, public_repos } =
                user;
              return (
                <div key={id}>
                  <div className="info">
                    <div className="imagebox">
                      <img
                        className="image"
                        src={avatar_url}
                        alt="profile-image"
                      />
                    </div>
                    <div className="details">
                      <div className="namebox">
                        <h3 className="name">Name: {name}</h3>
                      </div>

                      <div className="usernamebox">
                        <h3 className="username">Username: {"@" + login}</h3>
                      </div>

                      <div className="followersbox">
                        <h3 className="followers">Followers: {followers}</h3>
                      </div>

                      <div className="repositoriesbox">
                        <h3 className="repositories">
                          Repositories: {public_repos}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
