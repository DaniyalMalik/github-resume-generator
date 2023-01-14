import React, { useState } from 'react';
import { Octokit } from 'octokit';
import User from './User';
import Generate from './Generate';

const octokit = new Octokit({
  auth: '',
});

export default function Index() {
  const [languages, setLanguages] = useState({});
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState({});

  const findRepos = async (user) => {
    setUser({
      url: user.html_url,
      userName: user.login,
      image: user.avatar_url,
      bio: user.bio,
      createdAt: user.created_at,
      followers: user.followers,
      publicRepos: user.public_repos,
    });

    const res = await octokit.request(`GET ${user.repos_url}`, {});
    let languagePercentage = {};

    setRepos(res.data);

    for (let i = 0; i < res.data.length; i++) {
      languagePercentage = await findLanguages(
        res.data[i].languages_url,
        languagePercentage,
      );
    }

    setLanguages(languagePercentage);
  };

  const findLanguages = async (url, languagePercentage) => {
    const res = await octokit.request(`GET ${url}`, {});
    let newLanguages = {},
      total = 0;

    for (const key in res.data) {
      total += res.data[key];
    }

    for (const key in res.data) {
      newLanguages[key] = +((res.data[key] / total) * 100).toFixed(1);
    }

    let mergedLanguages = { ...languagePercentage };

    for (const key in newLanguages) {
      mergedLanguages[key] = languagePercentage[key]
        ? (
            (languagePercentage[key] * 10 + newLanguages[key] * 10) /
            10 /
            2
          ).toFixed(2)
        : newLanguages[key].toFixed(2);
    }

    return Object.entries(mergedLanguages).length === 0
      ? newLanguages
      : mergedLanguages;
  };

  return (
    <div
      style={{
        backgroundColor: 'lightgray',
        minWidth: '90vw',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <h1 style={{ margin: '0px', position: 'absolute', top: 0 }}>
        My GitHub Resume
      </h1>
      <Generate findRepos={findRepos} />
      {Object.keys(user).length > 0 && (
        <User user={user} repos={repos} languages={languages} />
      )}
    </div>
  );
}
