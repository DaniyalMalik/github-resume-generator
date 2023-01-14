import React from 'react';

export default function User({ user, repos, languages }) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '60vw',
        margin: '10px',
        marginTop: '200px',
        padding: '10px',
        borderRadius: '4px',
        boxShadow: '2px 2px 4px 2px black',
      }}>
      <div style={{ margin: '10px', padding: '10px' }}>
        <h1>{user.userName}</h1>
        <a href={user.userName}>{user.url}</a>
        <h6>{user.bio ? user.bio : 'No Bio'}</h6>
        <p>
          On GitHub since {new Date(user.createdAt).getFullYear()},{' '}
          {user.userName} is a developer with {user.publicRepos} public
          repositories and {user.followers} followers.
        </p>
      </div>
      <div style={{ margin: '10px', padding: '10px' }}>
        <h2>Languages</h2>
        <ul>
          {Object.keys(languages).map((language, key) => (
            <li key={key}>
              {language} - {languages[language]}%
            </li>
          ))}
        </ul>
      </div>
      <div style={{ margin: '10px', padding: '10px' }}>
        <h2>Popular Repositories</h2>
        {repos.map((repo) => (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <h3>{repo.name}</h3>
              <span style={{ float: 'right' }}>
                {new Date(repo.created_at).toDateString()} -{' '}
                {new Date(repo.updated_at).toDateString()}
              </span>
            </div>
            <p>
              {repo.description}
              <br />
              <b>Language: </b>
              {repo.language}
              <br />
              <br /> This repository has {repo.stargazers_count} stars and{' '}
              {repo.forks_count} forks. If you would like more information about
              this repository and my contributed code, please visit{' '}
              <a href={repo.url}>{repo.url}</a> on GitHub.
            </p>
            <hr />
          </>
        ))}
      </div>
    </div>
  );
}
