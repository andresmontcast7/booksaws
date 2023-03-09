
import React from 'react'
import  { useRouter } from 'next/router'
import { API } from 'aws-amplify';
import {listPosts, getPost} from '../../src/graphql/queries'
import { Storage } from 'aws-amplify';
import { useState, useEffect } from 'react';

//src="https://photomemoirs.co/images/600x900/pm_5_turquoise_ink_book_covers.jpg"
export default function Post({post})  {
    const router =useRouter();
    const [image, setImage] = useState(null);
   
    useEffect(() => {
     updateCoverimage()
    }, []);

    async function updateCoverimage (){
      
     
        Storage.configure({
          region:"us-east-1",
          bucket: "pocbucket234204-dev"
        })
         const imageKey = await Storage.get(post.CoverImg);
         console.log(image)
         setImage(imageKey)
    
    }

    
    if (router.isFallback) {
        return <div>Loding....</div>
    }
  return (
    <div className="w-full max-w-sm lg:max-w-full lg:flex">
  <div className="flex-none h-48 overflow-hidden text-center bg-cover rounded-t lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l"  style={{backgroundImage: image}} title="Woman holding a mug">
  </div>
  <div className="flex flex-col justify-between p-4 leading-normal bg-white border-b border-l border-r border-gray-400 rounded-b lg:border-l-0 lg:border-t lg:border-gray-400 lg:rounded-b-none lg:rounded-r">
    <div className="mb-8">
      <p className="flex items-center text-sm text-gray-600">
        <svg className="w-3 h-3 mr-2 text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
        </svg>
        {post.username}
      </p>
      {
        image && (
          <img src={image}></img>
        )
      }
      <div className="mb-2 text-xl font-bold text-gray-900">{post.title}</div>
      <p className="text-base text-gray-700">{post.content}</p>
    </div>
    <div className="flex items-center">
      {/* <img className="w-10 h-10 mr-4 rounded-full" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"></img> */}
      <div className="text-sm">
        <p className="leading-none text-gray-900">{post.username}</p>
        <p className="text-gray-600">{post.updatedAt}</p>
      </div>
    </div>
  </div>
</div>
  )
}

export async function getStaticPaths() {
    const postData = await API.graphql({
        query:listPosts
    })
    const paths = postData.data.listPosts.items
    .map((post) =>({
        params:{id:post.id}
    }
    ));
    return{
        paths,
        fallback:true
    }
}
    
   

export async function getStaticProps ({params}){
    const {id} = params
    console.log(id)
    const postData =  await API.graphql({
        query:getPost,
        variables:{id}
    })
    return{
        props:{
            post:postData.data.getPost
        } 
    }
}

