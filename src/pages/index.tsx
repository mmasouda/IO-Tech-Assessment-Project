import { useEffect, useState, FormEvent, MouseEventHandler } from 'react';
import localFont from 'next/font/local';
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, addItem, setError } from '../redux/slice';
import { axiosReq } from '../../axios';
import { Card, Modal, Alert } from "../components";
import { UnknownAction } from '@reduxjs/toolkit';

const myFont = localFont({ src: '../font/Neutra Text Light.otf' });

const Index = () => {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState({
    title: '',
    body: '',
    userId: 1,
  });
  const posts = useSelector((state: RootState) => state.store.posts);
  const error = useSelector((state: RootState) => state.store.error);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts() as unknown as UnknownAction);
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => dispatch(setError(false)), 3000);
    }
  }, [error]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const res = await axiosReq.post(`/posts`, payload);
      if (res.status === 201) {
        dispatch(addItem(res.data));
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(true));
      setOpen(false);
    }
  };

  return (
    <>
      {error && <Alert />}
      <div
        className={`${myFont.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      >
        <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>IO Tech Assessment Project</h1>
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <button onClick={() => setOpen(true)} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
            Add new item
          </button>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
              {posts.map((item, index) => <Card key={index} item={item} />)}
            </div>
          </div>
        </main>
      </div>
      {open &&
        <Modal onClose={() => setOpen(false)}>
          <form className="w-[336px] p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input onChange={(e) => setPayload({ ...payload, title: e.target.value })} type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
              </div>
              <div className="col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea onChange={(e) => setPayload({ ...payload, body: e.target.value })} id="description" rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>
              </div>
            </div>
            <button onClick={handleSubmit as unknown as MouseEventHandler} type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
              Add new item
            </button>
          </form>
        </Modal>
      }
    </>
  );
}

export default Index;
