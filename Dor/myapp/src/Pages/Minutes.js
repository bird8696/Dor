import React, { useState } from "react";

function Minutes() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isUlshown, setIsUlshown] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  // 포럼 게시물을 나타내는 개체 배열
  const [posts, setPosts] = useState([
    { id: 3, title: "세번째 내용", content: "Lorem ipsum dolor sit amet." },
    { id: 2, title: "두번째 내용", content: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." },
    { id: 1, title: "첫번째 내용", content: "Nullam non felis at ipsum euismod pretium." }
  ]);

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
            {isUlshown && activeIndex === index && <p>{post.content}</p>}
          </div>
        ))}

        {/* 새 게시물을 제출하는 양식 */}
        {showAddPost && (
          <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="제목" required />
            <textarea name="content" placeholder=" " required />
            <button type="submit">작성 완료</button>
          </form>
        )}
        {/* 페이지 렌더링 */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
          <span key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
          {index + 1}
          </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Minutes;
