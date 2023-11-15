import React, { useState } from "react";
import axios from 'axios';
import "./App.css";

function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isUlshown, setIsUlshown] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  // 포럼 게시물을 나타내는 개체 배열
  const [posts, setPosts] = useState([
    { id: 3, title: "세번째 내용", content: "Lorem ipsum dolor sit amet.", image: null },
    { id: 2, title: "두번째 내용", content: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.", image: null },
    { id: 1, title: "첫번째 내용", content: "Nullam non felis at ipsum euismod pretium.", image: null }
  ]);

  // // 현재 게시물 가져오기
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // const handleClick = (index) => {
  //   setActiveIndex(index);
  //   setIsUlshown(index === activeIndex ? !isUlshown : true);
  // };

  // // 새로운 게시물의 제출을 처리하는 기능
  // function handleSubmit(event) {
  //   event.preventDefault();
  
  //   const form = event.target;
  //   const title = form.elements.title.value;
  //   const content = form.elements.content.value;
  //   const file = form.elements.file.files[0];
  
  //   if (!file) {
  //     return;
  //   }
  
  //   const formData = new FormData();
  //   formData.append('title', title);
  //   formData.append('content', content);
  //   formData.append('file', file);
  
  //   axios.post('/api/posts', formData)
  //     .then(response => {
  //       // 서버에서 새로운 게시물 등록에 성공한 경우 처리
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       // 서버에서 새로운 게시물 등록에 실패한 경우 처리
  //       console.error(error);
  //     });
  // }

  function handleDelete(id) {
    axios.delete(`/api/posts/${id}`)
      .then(response => {
        // 서버에서 게시물 삭제에 성공한 경우 처리
        console.log(response.data);
        setPosts(posts.filter(post => post.id !== id)); // 삭제된 게시물을 제외한 게시물 목록을 설정
      })
      .catch(error => {
        // 서버에서 게시물 삭제에 실패한 경우 처리
        console.error(error);
      });
  }
  
  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   // 이미지 파일을 사용하는 코드 작성
  // };

  // // 페이지 변경 처리 기능
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 현재 게시물 가져오기
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleClick = (index) => {
    setActiveIndex(index);
    setIsUlshown(index === activeIndex ? !isUlshown : true);
  };

  // 새로운 게시물의 제출을 처리하는 기능
  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const content = event.target.content.value;
    const id = posts.length + 1;
    setPosts([{ id, title, content }, ...posts]);
    event.target.title.value = "";
    event.target.content.value = "";
    setShowAddPost(false);
  };

  // 페이지 변경 처리 기능
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <header>
        <div className="header_box">
            <div className="item_box">
                <div className="logo_box">
                </div>
                {/*메뉴*/}
                <div className="item">
                    <a href="">소개</a>
                    <a href="">활동</a>
                    <a href="">회의록</a>
                    <a href="">프로필</a>
                    <a href="">가입신청</a>
                </div>
            </div>
        </div>
      </header>
      <div className="forum">
        <h1>회의록<button className="new-post-btn" onClick={() => setShowAddPost(true)}>
            새 글 작성하기
          </button></h1>
        
        {/* 게시물 목록 렌더링 */}
          {currentPosts.map((post, index) => (
          <div key={post.id} className="post" onClick={() => handleClick(index)}>
            <h2>{post.title}</h2>
            {isUlshown && activeIndex === index && (
              <div>
                <p>{post.content}</p>
                <button onClick={() => handleDelete(post.id)}>X</button>
              </div>
            )}
          </div>
          ))}

          {/* 새 게시물을 제출하는 양식 */}
          {showAddPost && (
            <form onSubmit={handleSubmit}>
              <input type="text" name="title" placeholder="제목" required />
              <textarea name="content" placeholder=" " required />
              {/* <input type="file" name="file" accept="image/*" onChange={handleFileUpload} /> */}
              <button type="submit">작성 완료</button>
              <button type="button" className="Cancellation-btn" onClick={() => setShowAddPost(false)}>취소하기</button>
            </form>
          )}

          {/* 페이지 렌더링 */}
          <div className="pagination">
            {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
              <span
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>
      </div> 
  );
}

export default App;


