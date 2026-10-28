import exersise2 from "./exersise2";

function PostList() {
  return (
    <div>
      {exersise2.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <small>{post.date}</small>
        </div>
      ))}
    </div>
  );
}

export default PostList;