import "./write.css";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "./../../context/Context";

function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [cats, setCats] = useState([]);
  const [categorie, setCategorie] = useState("");
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories/");
      setCats(res.data);
    };
    getCats();
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      user,
      title,
      categorie,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="write">
      {file && (
        <img
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt="WriteImg"
        />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus "></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus={true}
          />
        </div>

        <div className="writeFormGroup">
          <select
            className="writeInput"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
          >
            {cats.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story...."
            onChange={(e) => setDesc(e.target.value)}
            type="text"
            className="writeInput writeText"
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default Write;
