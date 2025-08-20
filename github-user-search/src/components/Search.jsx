import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData(searchTerm);
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2>Search GitHub User</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a GitHub user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !searchTerm.trim()}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Loading State */}
      {loading && <p className="loading">Loading...</p>}

      {/* Error State */}
      {error && (
        <div className="error">
          <p>Looks like we can't find the user</p>
          <p className="error-detail">Error: {error}</p>
        </div>
      )}

      {/* Success State */}
      {userData && (
        <div className="user-card">
          <img
            src={userData.avatar_url}
            alt={`${userData.login}'s avatar`}
            className="avatar"
          />
          <div className="user-info">
            <h3>{userData.name || userData.login}</h3>
            <p>{userData.bio || "No bio available"}</p>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-link"
            >
              View GitHub Profile
            </a>
            <div className="stats">
              <span>Followers: {userData.followers}</span>
              <span>Following: {userData.following}</span>
              <span>Repos: {userData.public_repos}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
