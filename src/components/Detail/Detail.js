import React from 'react';
import { uploadComment, getDataOfPost } from '../../firebase';
import './Detail.css';
import { useState } from 'react';

const Detail = (props) => {
  const [commentInput, setCommentInput] = useState('');

  function handleCommentInputChange(e) {
    setCommentInput(e.target.value);
  }
  function addComment(post) {
    console.log(post);
    uploadComment(commentInput, post, props.currentUser).then(() => {
      getDataOfPost(post.id, post.name).then((res) => {
        props.setDetailPost(res.data());
      });
    });
  }

  function getNames() {
    let names = [];
    props.detailPost.comments.forEach((element) => {
      let name = Object.keys(element)[0];
      names.push(name);
    });
    return names;
  }

  function getComments() {
    let comments = [];
    props.detailPost.comments.forEach((element) => {
      let name = Object.keys(element)[0];
      comments.push(element[name]);
    });
    return comments;
  }

  function handleAddCommentClick() {
    addComment(props.detailPost);
  }

  return (
    <div className="details">
      <span
        onClick={() => {
          props.setDisplayDetail(false);
        }}
        class="material-symbols-outlined"
      >
        arrow_back
      </span>
      <div className="container">
        <p className="username">{props.detailPost.user}</p>
      </div>
      <img src={props.detailPost.url} alt="img of post" />
      <div className="container">
        {props.detailPost.likes.includes(props.currentUser.uid) ? (
          <span
            onClick={(e) => {
              props.addLike(props.detailPost);
            }}
            className="likeBtn active material-symbols-outlined"
          >
            favorite
          </span>
        ) : (
          <span
            onClick={(e) => {
              props.addLike(props.detailPost);
            }}
            className="likeBtn material-symbols-outlined"
          >
            favorite
          </span>
        )}
        <p className="likes">
          {props.detailPost.likes.length === 1
            ? props.detailPost.likes.length + ' like'
            : props.detailPost.likes.length + ' likes'}
        </p>
      </div>
      <div className="commentsContainer">
        {getNames().map((ele, ind) => {
          return (
            <p key={ind}>
              <strong>{ele}</strong>: {getComments()[ind]}
            </p>
          );
        })}
      </div>

      <div className="container">
        <input
          onChange={handleCommentInputChange}
          className="commentInput"
          data-id={props.detailPost.id}
          type="text"
          placeholder="Add comment..."
        />
        <span
          onClick={handleAddCommentClick}
          className="material-symbols-outlined"
        >
          send
        </span>
      </div>
    </div>
  );
};

export default Detail;
