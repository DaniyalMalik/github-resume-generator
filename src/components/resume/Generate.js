import React, { useState } from 'react';
import { Octokit } from 'octokit';
import User from './User';

const octokit = new Octokit({
  auth: '',
});

export default function Generate({ findRepos }) {
  const [textField, setTextField] = useState('');
  const [response, setResponse] = useState({});

  const generate = async () => {
    if (textField) {
      const res = await octokit.request(`GET /users/${textField}`, {});

      if (res.status === 200) {
        setResponse({ message: 'User fetched successfully!', color: 'green' });

        findRepos(res.data);
      } else if (res.status === 404) {
        setResponse({ message: 'User not found!', color: 'red' });
      }
    } else {
      setResponse({ message: 'Username is required!', color: 'red' });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'column',
        width: '80vw',
        position: 'absolute',
        top: '10%',
        margin: '10px',
        padding: '10px',
        borderRadius: '4px',
        boxShadow: '2px 2px 4px 2px black',
      }}>
      <h3>GitHub Username</h3>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <input
          value={textField}
          placeholder='JohnDoe'
          style={{ borderRadius: '4px', height: '25px', width: '50%' }}
          onChange={(e) => setTextField(e.target.value)}
        />
        <button
          onClick={generate}
          style={{
            borderRadius: '20px',
            cursor: 'pointer',
            height: '30px',
            width: '10%',
          }}>
          Generate
        </button>
      </div>
      <p style={{ color: response.color }}>{response.message}</p>
    </div>
  );
}
