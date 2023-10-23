import React, { useState, useEffect } from 'react';
import styles from '../main.module.css';

const updatestate = ({ handleuptrend }) => {
  const [post, setPost] = useState({
    title: '',
    image: null,
    body: '',
    time: null, // 或其他非空值
    isTextOnly: true // 默认为 true
  });

  useEffect(() => {
    if (post.time !== null) {
      handleuptrend(post);
    }
  }, [post.time]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost(prevPost => ({
      ...prevPost,
      [name]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setPost(prevPost => ({
      ...prevPost,
      image: URL.createObjectURL(file),
      isTextOnly: false // 选择了图片后，将 isTextOnly 设置为 false
    }));
  };

  const clearmsg = () => {
    setPost({
      title: '',
      image: null,
      body: '',
      isTextOnly: true // 清空表单后，将 isTextOnly 设置为 true
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const timestamp = Date.now();
    setPost(prevPost => ({
      ...prevPost,
      time: timestamp
    }));
  };

  return (
    <div className={styles.sidebar}>
      <form onSubmit={handleSubmit} className={styles['create-post']}>
        <div className={styles['profile-photo']}>
          <img src="/image/tx1.jpg" alt="Profile Photo" />
        </div>
        <input
          id="create-post"
          type="text"
          className={styles.createinput}
          placeholder="What's title?"
          name="title"
          value={post.title}
          onChange={handleInputChange}
        />
        <input
          id="create-post"
          type="text"
          className={styles.createinput}
          placeholder="What's body?"
          name="body"
          value={post.body}
          onChange={handleInputChange}
        />
        <label htmlFor="file" className={styles.inputimglabel}>Upload IMG</label>
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          onChange={handleImageUpload}
          className={styles.inputimg}
        />
        <input
          type="button"
          value="Clean"
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={clearmsg}
        />
        <input
          type="submit"
          value="Post"
          className={`${styles.btn} ${styles.btnPrimary}`}
        />
        <label htmlFor="isTextOnly" className={styles.textOnlyLabel}>
          <input
            type="checkbox"
            id="isTextOnly"
            name="isTextOnly"
            checked={post.isTextOnly}
            onChange={() => setPost(prevPost => ({ ...prevPost, isTextOnly: !prevPost.isTextOnly }))}
          />
          Pure Text Dynamic
        </label>
      </form>
    </div>
  );
};

export default updatestate;
