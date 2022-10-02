import React from 'react';
import { getAllIds, getData } from '../../firebase';
import Post from '../Post/Post';
import { upload, getDataOfPost, updateLike } from '../../firebase';
import { useState, useEffect } from 'react';
import './Main.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Detail from '../Detail/Detail';

const Main = (props) => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [displayDetail, setDisplayDetail] = useState(false);
  const [detailPost, setDetailPost] = useState();

  function handleFilePick(e) {
    setFile(e.target.files[0]);
  }
  function uploadImg(e) {
    if (file)
      upload(file, props.currentUser).then(() => {
        getDataFrom(props.currentUser.uid);
      });
  }

  useEffect(() => {
    uploadImg();
  }, [file]);

  function getDataFrom(id = props.currentUser.uid) {
    getData(id).then((res) => {
      let wholeData = [...data, ...res];
      setData((prev) =>
        [...prev, ...wholeData].filter((value, index, array) => {
          return (
            index ===
            array.findIndex((t) => {
              return t.url === value.url;
            })
          );
        })
      );
    });
  }

  function renderLike(ele) {
    getDataOfPost(ele.id, ele.name).then((res) => {
      console.log(res.data().likes);
      let temp = data.map((element) => {
        if (element.url === ele.url) {
          ele.likes = res.data().likes;
          return ele;
        } else {
          return element;
        }
      });
      setData(temp);
    });
  }

  useEffect(() => {
    getAllData();
  }, []);

  async function getAllData(e) {
    if (!e) {
      getAllIds().then((allIds) => {
        allIds.forEach((id) => {
          getDataFrom(id);
        });
      });
    } else {
      e.preventDefault();
      getAllIds().then((allIds) => {
        allIds.forEach((id) => {
          getDataFrom(id);
        });
      });
    }
  }

  function addLike(ele) {
    updateLike(props.currentUser.uid, ele).then(() => {
      renderLike(ele);
    });
  }

  return (
    <div className="main">
      <Header />
      {displayDetail ? (
        <Detail
          setDisplayDetail={setDisplayDetail}
          setDetailPost={setDetailPost}
          currentUser={props.currentUser}
          addLike={addLike}
          detailPost={detailPost}
        />
      ) : (
        <Post
          setDetailPost={setDetailPost}
          setDisplayDetail={setDisplayDetail}
          getAllData={getAllData}
          addLike={addLike}
          data={data}
          setData={setData}
          currentUser={props.currentUser}
        />
      )}
      <Footer handleFilePick={handleFilePick} uploadImg={uploadImg} />
    </div>
  );
};

export default Main;
