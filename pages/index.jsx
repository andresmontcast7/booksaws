import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import {listPosts} from '../src/graphql/queries'; // el query que queremos obtener
import { API } from 'aws-amplify';
import { useEffect, useState } from 'react';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [posts, setPosts] = useState([]);

 useEffect(() => {
  
  fetchPosts()
  
 }, [])
 

  async function fetchPosts() {
    const postData = await API.graphql({
      query:listPosts
    })
    setPosts(postData.data.listPosts.items)
    
    
  }
  return (
    <>
    
    

{
    posts.map((post, index) =>(
      <p className='text-sky-400' key={index}>{post.title}</p>
    ) )
    
    }
    </>
  )
}
