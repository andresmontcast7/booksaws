import { API, Auth } from "aws-amplify";
import Link from "next/link";
import { postByUserName } from "../src/graphql/queries";
import { useState, useEffect } from "react";
import { AiFillEye , AiFillDelete,AiFillEdit} from "react-icons/ai";
import {deletePost as deletePostMutation}from '../src/graphql/mutations'

export default function MyBook() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    const { username } = await Auth.currentAuthenticatedUser();
    const postData = await API.graphql({
      query: postByUserName,
      variables: { username },
    });
    setPost(postData.data.postByUserName.items);
    console.log(post);
    console.log(username);
  }

  async function deleteItem(id){
    API.graphql({
        query:deletePostMutation,
        variables:{input:{id}},
        authMode:"AMAZON_COGNITO_USER_POOLS"
    })
    fetchPost()
  }

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4 mt-8">
      {post.map((data, index) => (
        
          <div
            key={index}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                className="rounded-t-lg max-h-15"
                src="https://damonza.com/wp-content/uploads/portfolio/fiction/World-Whisperer.jpg"
                alt=""
              ></img>
            </a>
            <div className="p-5">
              <Link
                className="mb-2 text-xl font-bold text-white-900" 
                color="text-white"
                key={index}
                href={`/posts/${data.id}`}
              >
                {data.title}
              </Link>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {data.content}
              </p>

              <div className="flex-row">
                <Link
                  href={`/posts/${data.id}`}
                  className="inline-flex items-center px-3 py-2 text-sm text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <AiFillEye></AiFillEye>
                </Link>
                <button
                  onClick={ ()=> deleteItem(data.id)}
                  className="inline-flex items-center px-3 py-2 text-sm text-center text-white bg-red-700 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-700 dark:hover:bg-red-700 dark:focus:ring-red-700"
                >
                  <AiFillDelete></AiFillDelete>
                </button>
                <Link
                   href={`/edit-folder/${data.id}`}
                  className="inline-flex items-center px-3 py-2 text-sm text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                >
                  <AiFillEdit></AiFillEdit>
                </Link>
              </div>
            </div>
          </div>
       
      ))}
    </div>
  );
}



