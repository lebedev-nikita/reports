import './index.scss';
import React, { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setPosts } from "../../redux";
import getPosts from "../../services/getPosts";


export default class Main extends React.Component {

  setCookie = () => {
    const key = document.querySelector('#key').value;
    const value = document.querySelector('#value').value;
    document.cookie = `${key}=${value}`;
    alert(`Cookie set: ` + document.cookie);
  };

  inviteMe = () => {
    fetch('/invite')
  }

  render = () => (
    <div style={{ textAlign: 'center' }}>
      <h1>Cookie:</h1>
      <form>
        <label>key:   <input type="text" id="key"/></label> <br/>
        <label>value: <input type="text" id="value"/></label> <br/>
      </form>
      <button onClick={this.setCookie}>Set Cookie</button> <br/>
      <button onClick={this.inviteMe}>Invite me!</button> <br/>
      {/* <a href="/start">start</a> <br/> */} {/* Ждем hadoop */}
      <a href="/reports">reports</a> <br/> {/* сделал, но не понял, зачем это нужно */}
      <a href="/progress?execution_id=173">execution_id</a> <br/>
      {/* <a href="/download">download</a> <br/> */} {/* Сделал, но скачивать пока неоткуда */}
      <a href="/history">history</a> <br/>
      <a href="/invite">invite</a> <br/>

    </div>
  );
}

// export default connect(
//   state => ({ posts: state.posts }),
//   { setPosts }
// )(function ({ posts, setPosts }) {
//   const [sql, setSql] = useState('');
//   async function execute() {
//     setPosts(await getPosts(sql));
//   }
//   return (
//     <div style={{ textAlign: 'center' }}>
//       <textarea value={sql} onChange={e => setSql(e.target.value)} style={{ width: '100%', height: '50px' }} placeholder="SQL запрос" />
//       <br />
//       <button onClick={execute}>Выполнить</button>
//       <br />
//       {
//         posts.map(post => (
//           <div key={post.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', background: "#fff" }}>
//             {JSON.stringify(post)}
//           </div>
//         ))
//       }
//     </div>
//   );
// });
