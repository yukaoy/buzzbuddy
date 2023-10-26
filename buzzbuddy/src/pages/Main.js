import React, { useState, useEffect } from "react";
import SearchBar from "../components/main/SearchBar";
import Article from "../components/main/Article";
import ArticleInput from "../components/main/ArticleInput";
import FollowingSidebar from "../components/main/FollowingSidebar";
import MiniProfile from "../components/main/MiniProfile";
import "../components/main/Main.css";

const Main = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newArticle, setNewArticle] = useState("");
  const [user, setUser] = useState(null);
  const [followingUsers, setFollowingUsers] = useState([]);
  const userName = localStorage.getItem("loggedInUser") || "";

  useEffect(() => {
    async function fetchUser() {
      const userResponse = await fetch(
        "https://jsonplaceholder.typicode.com/users?username=" + userName
      );
      const user = (await userResponse.json())[0];
      setUser(user);
    }
    fetchUser();
  }, [userName]);

  useEffect(() => {
    async function fetchArticles() {
      const allArticles = [];

      // logged in user's articles
      const loggedinUserResponse = await fetch(
        "https://jsonplaceholder.typicode.com/posts?username=" + userName
      );
      const loggedinUserArticles = await loggedinUserResponse.json();
      loggedinUserArticles.forEach((article) => {
        allArticles.push({
          ...article,
          date: getRandomDate(),
          username: userName,
        });
      });

      // follow users' articles
      for (const followingUser of followingUsers) {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?username=" +
            followingUser.username
        );
        const userArticles = await response.json();
        userArticles.forEach((article) => {
          allArticles.push({
            ...article,
            date: getRandomDate(),
            username: followingUser.username,
          });
        });
      }

      const sortedArticles = allArticles.sort((a, b) => b.date - a.date);

      sortedArticles
        .slice(0, 3)
        .forEach((article) => (article.hasImage = true));

      setArticles(sortedArticles);
    }

    fetchArticles();
  }, [followingUsers, userName]);

  function getRandomDate() {
    const randomTimestamp = Math.random() * new Date().getTime();
    return new Date(randomTimestamp);
  }

  return (
    <div className="container">
      <div className="sidebar">
        <MiniProfile user={user} />
        <FollowingSidebar
          user={user}
          followingUsers={followingUsers}
          setFollowingUsers={setFollowingUsers}
        />
      </div>
      <div className="content">
        <h1>BuzzBuddy</h1>
        <ArticleInput
          newArticle={newArticle}
          setNewArticle={setNewArticle}
          setArticles={setArticles}
        />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="articles">
          {articles
            .filter(
              (article) =>
                article.title.includes(searchTerm) ||
                article.body.includes(searchTerm) ||
                article.username
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase())
            )
            .map((article, index) => (
              <Article
                key={index}
                article={article}
                index={index}
                user={article.username}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
