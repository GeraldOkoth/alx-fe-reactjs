import React, { useState } from "react";
import { searchUsers, fetchUserData } from "../services/githubService";
import {
  FiSearch,
  FiMapPin,
  FiCode,
  FiUser,
  FiStar,
  FiGitBranch,
} from "react-icons/fi";

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    username: "",
    location: "",
    minRepos: "",
    language: "",
    sort: "joined",
    order: "desc",
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchMode, setSearchMode] = useState("basic"); // "basic" or "advanced"

  const handleInputChange = (field, value) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = async (e, page = 1) => {
    e.preventDefault();

    if (searchMode === "basic" && !searchParams.username.trim()) return;

    setLoading(true);
    setError(null);

    try {
      let result;

      if (searchMode === "basic") {
        // Basic search - single user
        const userData = await fetchUserData(searchParams.username);
        setUsers([userData]);
        setTotalCount(1);
        setHasNextPage(false);
      } else {
        // Advanced search - multiple users
        result = await searchUsers(searchParams, page, 10);
        setUsers(page === 1 ? result.users : [...users, ...result.users]);
        setTotalCount(result.totalCount);
        setHasNextPage(result.hasNextPage);
        setCurrentPage(page);
      }
    } catch (err) {
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    await handleSearch({ preventDefault: () => {} }, currentPage + 1);
  };

  const toggleSearchMode = () => {
    setSearchMode((prev) => (prev === "basic" ? "advanced" : "basic"));
    setUsers([]);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          GitHub User Search
        </h1>
        <p className="text-gray-600">
          Find developers based on various criteria
        </p>
      </div>

      {/* Search Mode Toggle */}
      <div className="flex justify-center mb-6">
        <button
          onClick={toggleSearchMode}
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          {searchMode === "basic"
            ? "Switch to Advanced Search"
            : "Switch to Basic Search"}
        </button>
      </div>

      {/* Search Form */}
      <form onSubmit={(e) => handleSearch(e, 1)} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Username Field (always visible) */}
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              value={searchParams.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Advanced Search Fields */}
          {searchMode === "advanced" && (
            <>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location (e.g., New York)"
                  value={searchParams.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <FiGitBranch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="number"
                  placeholder="Min Repositories"
                  value={searchParams.minRepos}
                  onChange={(e) =>
                    handleInputChange("minRepos", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <FiCode className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Programming Language"
                  value={searchParams.language}
                  onChange={(e) =>
                    handleInputChange("language", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={searchParams.sort}
                  onChange={(e) => handleInputChange("sort", e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="joined">Join Date</option>
                  <option value="repositories">Repositories</option>
                  <option value="followers">Followers</option>
                </select>

                <select
                  value={searchParams.order}
                  onChange={(e) => handleInputChange("order", e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </>
          )}
        </div>

        <button
          type="submit"
          disabled={
            loading || (!searchParams.username && searchMode === "basic")
          }
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <FiSearch />
          {loading ? "Searching..." : "Search Users"}
        </button>
      </form>

      {/* Results Section */}
      <div className="space-y-6">
        {/* Loading State */}
        {loading && users.length === 0 && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching GitHub...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-lg font-semibold mb-2">
              Looks like we cant find the user.
            </div>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Results Count */}
        {users.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700">
              Found {totalCount.toLocaleString()} user
              {totalCount !== 1 ? "s" : ""}
              {searchMode === "advanced" && " matching your criteria"}
            </p>
          </div>
        )}

        {/* Users List */}
        {users.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-16 h-16 rounded-full border-2 border-blue-100"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {user.name || user.login}
                    </h3>
                    <p className="text-gray-600">@{user.login}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {user.bio && (
                    <p className="text-gray-700 text-sm">{user.bio}</p>
                  )}
                  {user.location && (
                    <p className="text-gray-600 text-sm flex items-center gap-1">
                      <FiMapPin className="text-gray-400" />
                      {user.location}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-bold text-gray-800">
                      {user.public_repos}
                    </div>
                    <div className="text-xs text-gray-600">Repos</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-bold text-gray-800">
                      {user.followers}
                    </div>
                    <div className="text-xs text-gray-600">Followers</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-bold text-gray-800">
                      {user.following}
                    </div>
                    <div className="text-xs text-gray-600">Following</div>
                  </div>
                </div>

                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center block"
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasNextPage && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              disabled={loading}
              className="bg-blue-100 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-200 disabled:bg-gray-200 disabled:text-gray-500"
            >
              {loading ? "Loading..." : "Load More Users"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
