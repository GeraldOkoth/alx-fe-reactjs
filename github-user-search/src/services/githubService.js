import axios from "axios";

const BASE_URL = "https://api.github.com";

// Advanced search with multiple parameters
export const searchUsers = async (searchParams, page = 1, perPage = 10) => {
  try {
    let query = "";

    if (searchParams.username) {
      query += `${searchParams.username} in:login`;
    }
    if (searchParams.location) {
      query += ` location:${searchParams.location}`;
    }
    if (searchParams.minRepos) {
      query += ` repos:>=${searchParams.minRepos}`;
    }
    if (searchParams.language) {
      query += ` language:${searchParams.language}`;
    }

    const response = await axios.get("https://api.github.com/search/users?q", {
      params: {
        q: query.trim(),
        page: page,
        per_page: perPage,
        sort: searchParams.sort || "joined",
        order: searchParams.order || "desc",
      },
    });

    // Fetch detailed info for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        const userDetails = await axios.get(user.url);
        return {
          ...user,
          ...userDetails.data,
          name: userDetails.data.name || user.login,
        };
      })
    );

    return {
      users: usersWithDetails,
      totalCount: response.data.total_count,
      hasNextPage: response.headers.link?.includes('rel="next"'),
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("No users found matching your criteria");
    }
    if (error.response?.status === 403) {
      throw new Error("API rate limit exceeded. Please try again later.");
    }
    throw new Error("Failed to search users");
  }
};

// Single user fetch (for backward compatibility)
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("User not found");
    }
    throw new Error("Failed to fetch user data");
  }
};
