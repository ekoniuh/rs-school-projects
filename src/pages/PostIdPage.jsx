import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  const [fetchComments, isComLoading] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ maxWidth: '90%' }}>
      {error ? (
        <h3 style={{ textAlign: 'center' }}>
          Произошла ошибка: <span style={{ color: 'red', fontSize: '18px' }}>{error}</span>
        </h3>
      ) : (
        <h2>Вы открыли страницу поста c ID = {params.id}</h2>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ fontSize: '16px', fontWeight: 700 }}>
          <span style={{ backgroundColor: '#dedede' }}>
            {post.id}. {post.title}
          </span>
        </div>
      )}
      <h4 style={{ marginTop: '20px' }}>Комментарии</h4>
      {isComLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comm) => (
            <div key={comm.id} style={{ marginTop: 15, backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <h5 style={{ color: '#e35b5b', fontStyle: 'italic', fontFamily: 'cursive' }}>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
