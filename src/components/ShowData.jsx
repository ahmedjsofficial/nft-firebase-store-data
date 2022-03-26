import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';

const ShowData = () => {
  const [selectPosts, setSelectPosts] = useState([]);

  useEffect(() => {
      const createQuery = query(collection(db, "posts"), orderBy("timestamp", "desc"));
      const request = onSnapshot(createQuery, (snapshot) => {
          setSelectPosts(snapshot.docs)
      })
      return request;
  }, [])

  // console.log(selectPosts)

  return (
    <>
      <section className='py-5'>
        <h1 className='text-center my-5 text-danger'>FireStore Data</h1>
        <div className='row gy-3'>
          {
            selectPosts && selectPosts?.map((post, index) => (
              <div className='col-lg-3' key={index}>
                <div className='card' id={post.id}>
                  <img src={post.data().image} className="img-thumbnail" alt="..." />
                  <div className='card-body text-center'>
                    <h5 className='card-title fw-bold'>Name: {post.data().name}</h5>
                    <h5 className='card-title'>Amount: ${post.data().amount}</h5>
                    <p className='card-title'>Description: {post.data().description}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </>
  );
};

export default ShowData