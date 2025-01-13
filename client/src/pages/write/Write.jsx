import './Write.css';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Write = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const { user } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!title || !desc) {
      return toast.error('Title and Description are required fields!');
    }

    let selectedCategory = null;
    if (category) {
      selectedCategory = category;
    } else if (customCategory) {
      selectedCategory = customCategory;
    }

    const newPost = {
      title,
      desc,
      username: user.username,
    };

    if (selectedCategory) {
      newPost.categories = selectedCategory;
    }

    if (file) {
      const data = new FormData();
      data.append("file", file); // The actual file to be uploaded
      // data.append("upload_preset", "your_upload_preset"); // Cloudinary upload preset

      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload`, data);
        const imageUrl = response.data.url; // Get the uploaded image URL from Cloudinary

        newPost.photo = imageUrl; // Save the URL directly in the `photo` field

        toast.success("Image uploaded successfully!");
      } catch (err) {
        toast.error("Image upload failed!");
        console.log(err);
      }
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/posts`, newPost);
      toast.success('Post created successfully!');
      setIsLoading(false);
      window.location.replace('/post/' + res.data._id);
    } catch (err) {
      toast.error('Failed to create post!');
      console.log(err);
    }
  };

  return (
    <div className="write">
      <ToastContainer />

      {file && <img src={URL.createObjectURL(file)} alt="" className="writeImg" />}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={e => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e => setDesc(e.target.value)}
          />
        </div>

        <div className="writeFormGroup">
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Travel">Travel</option>
          </select>
        </div>

        <div className="customCategory">
          <input
            type="text"
            placeholder="Or add a custom category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
          />
        </div>

        <button className="writeSubmit" type="submit">
          {isLoading ? 'Publishing..' : 'Publish'}
        </button>
      </form>
    </div>
  );
};

export default Write;
