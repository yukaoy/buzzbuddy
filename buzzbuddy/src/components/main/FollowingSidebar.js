import React, { useState, useEffect } from "react";

function FollowingSidebar({ user, followingUsers, setFollowingUsers }) {
  const [userNameToAdd, setUserNameToAdd] = useState("");

  useEffect(() => {
    let followingIDs = [];
    if (user) {
      const userId = user.id;
      if (userId === 10) {
        followingIDs = [1, 2, 3];
      } else {
        followingIDs = [userId + 1, userId + 2, userId + 3];
      }
      Promise.all(
        followingIDs.map((id) =>
          fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        )
      )
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((users) => {
          setFollowingUsers(users);
        });
    }
  }, [user, setFollowingUsers]);

  const addUserByName = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users?username=" + userNameToAdd
    );
    const foundUser = (await response.json())[0];

    if (foundUser) {
      if (followingUsers.some((user) => user.id === foundUser.id)) {
        document.querySelector(".add-user-error").style.display = "inline";
      } else {
        document.querySelector(".add-user-error").style.display = "none";
        setFollowingUsers((prev) => [...prev, foundUser]);
      }
    }
    setUserNameToAdd("");
  };

  const unfollowUser = (userId) => {
    setFollowingUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  return (
    <div className="following">
      {followingUsers.map((user) => (
        <div key={user.id}>
          <img
            src={`https://picsum.photos/150/150?random=${user.id}`}
            alt="User profile"
          />
          <p className="user-name">{user.username}</p>
          <p>{user?.company?.catchPhrase || ""}</p>
          <button onClick={() => unfollowUser(user.id)}>Unfollow</button>
        </div>
      ))}
      <p className="add-user-error" style={{display: "none", color: "white"}}>You are already following this user.</p>
      <input
        className="add-user"
        type="text"
        placeholder="Add user by name"
        value={userNameToAdd}
        onChange={(e) => setUserNameToAdd(e.target.value)}
      />
      <button onClick={addUserByName}>Add</button>
    </div>
  );
}

export default FollowingSidebar;
