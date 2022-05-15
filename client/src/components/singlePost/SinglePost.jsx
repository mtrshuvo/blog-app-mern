import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";

export default function SinglePost() {
  const location = useLocation();
  const params = useParams();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [User_post, setUser_post] = useState("");
  const [categorie, setCategorie] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [cats, setCats] = useState([]);
  const [com, setCom] = useState("");
  const [postComments, setPostComments] = useState([]);


  useEffect(()=> {
    const getComments = async()=> {
      const res = await axios.get(`/comments/comment/${params.postId}`);
      setPostComments(res.data)
    }
    getComments()
  }, []);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);

      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setUser_post(res.data.user);
      setCategorie(res.data.categorie);
    };
    const getCats = async () => {
      const res = await axios.get("/categories/");
      setCats(res.data);
    };
    getCats();
    getPost();
  }, [path, post]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { user: user._id },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const hnadleComment = async()=> {
    try{
      const res = await axios.post(`/comments/${params.postId}`, {postId: params.postId, userId: user._id, comment:com});
      console.log(res);

    }catch(err){

    }
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        user: user._id,
        title,
        desc,
        categorie,
      });
      setUpdateMode(false);
    } catch (err) {}
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}

            {User_post._id === user?._id && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${User_post.username}`} className="link">
              <b> {User_post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        <h2>All Comments</h2>
        {postComments.length && postComments.map((p)=> {
          return(
            <p><span>{user.username}:</span>{p.comment}</p>
          )
        })}
        {/* {updateMode ? (
          <select
            className="singlePostCategorieInput"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
          >
            {cats.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        ) : (
          <span className="singlePostCategorie">Categorie : {categorie}</span>
        )} */}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
        {user && (
          <div style={{
            "position": "fixed",
            right: 0,
            bottom: "10%",
            "display": "flex",
          }}>
          
          <textarea onChange={(e)=> {
              setCom(e.target.value)
            }} name="comment" cols={"50"} className="comment" placeholder="Write Comment"></textarea>
            <input type="submit" onClick={hnadleComment} name="submit" value="Send" />
          </div>
        )}
      </div>
    </div>
  );
}
