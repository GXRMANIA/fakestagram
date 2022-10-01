import React from 'react';
import "./Post.css"
const Post = (props) => {


    function handleDetailClick(ele) {
        console.log(ele)
        props.setDisplayDetail(true)
        props.setDetailPost(ele)
    }   

    
    return (
        <div className='posts'>
            {props.data.map((ele, index) => {
                return <div key={index} className='post'>
                         <div className='userNameContainer'>
                            <p>{ele.user}</p>
                         </div>

                         <img src={ele.url} alt="post content"/>
                         <div className='likeBtnContainer'>
                           {ele.likes.includes(props.currentUser.uid) ? 
                           <span onClick={(e) => {props.addLike(ele)}} className="likeBtn active material-symbols-outlined">
                                favorite
                            </span> 
                            : <span onClick={(e) => {props.addLike(ele)}} className="likeBtn material-symbols-outlined">
                                favorite
                            </span>}
                            
                            <span onClick={() => {handleDetailClick(ele)}} className="material-symbols-outlined">
                            mode_comment
                            </span>
                         </div>
                         <p className='likes'>{ele.likes.length === 1 ? ele.likes.length + " like" : ele.likes.length + " likes"}</p>
                        
                         
                        </div>
            })}
        </div>
    );
}

export default Post;

