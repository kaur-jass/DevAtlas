const axios = require("axios");

const getGitHubProfile = async (username) => {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`
    );

    return {
      username: data.login,

      name: data.name,

      avatar: data.avatar_url,

      profileUrl: data.html_url,

      bio: data.bio,

      company: data.company,

      location: data.location,

      blog: data.blog,

      twitter: data.twitter_username,

      publicRepos: data.public_repos,

      publicGists: data.public_gists,

      followers: data.followers,

      following: data.following,

      createdAt: data.created_at,
    };
  } catch (error) {
    throw new Error("GitHub profile not found.");
  }
};

module.exports = {
  getGitHubProfile,
};