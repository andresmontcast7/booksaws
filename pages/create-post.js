import {withAuthenticator} from '@aws-amplify/ui-react'; //The withAuthenticator is a higher-order component (HoC) that wraps Authenticator. You'll also notice the user and signOut are provided to the wrapped component
import { useState, useRef, React } from 'react';
import {API, Auth} from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import {createPost} from '../src/graphql/mutations'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
ssr:false,});
import "easymde/dist/easymde.min.css";
import { Storage } from 'aws-amplify';
import { v4 as uuid } from 'uuid';



export const CreatePost = () => {
    const initialState= {title:"", content:""}
    const [post, setPost] = useState(initialState);
    const {title, content} = post;
    const [file, setFile] = useState()
    const router =useRouter();

    const fileFieldInput =useRef(null)

    
    async function uploadFile(){
      fileFieldInput.current.click()
    }

    function handleChange(e){
      const fileUploaded =  e.target.files[0];
      if (!fileUploaded) return
      setFile(fileUploaded)

      console.log("este es tu archivo " , file)
    }

    const onChange = (e)=>{
      console.log(e)
       setPost(()=>({
        
         ...post,
         [e.target.name]: e.target.value
        
       }))
    }

    const createNewPost = async ()=>{
   /*  */
      /* Checking if the title or content is empty. */
      if(!title || !content);
      const id = uuidv4();
      const { username } = await Auth.currentAuthenticatedUser()         
      /* Assigning the value of the username variable to the username property of the post object. */
      post.username = username
      post.id = id ;

      if(file){
        const filename = `${file.name}_${uuid()}`
        post.CoverImg = filename;
        console.log("esre es el cover"+ post.CoverImg)
        Storage.configure({
          region:"us-east-1",
          bucket: "pocbucket234204-dev"
          
        })
        await Storage.put(filename,file)
      }

      await API.graphql({
        query:createPost,
        variables:{input:post},
        authMode:"AMAZON_COGNITO_USER_POOLS"
      })
     
  /* Redirecting the user to the post page. */
  
      router.push(`/posts/${id}`)
    }


 

  return (
    <>
    <div>Add Book</div>
    <input onChange={onChange} name="title" placeholder='Title' value={post.title}></input>
    {
      file && (

        <img src={URL.createObjectURL(file)} className='my-4 w-4rem' alt="book"/>

       
      )
    }
    <SimpleMDE  onChange={(value)=> setPost({...post, content:value})}   /> 
   <input
   type="file"
   ref={fileFieldInput}
   onChange={handleChange}
   >

   </input>
   <button   onClick={uploadFile}  className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700">
  uplead image

</button>
   
    <button  onClick={createNewPost}  className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700">
  Add Book
</button>

    </>
  
  )
}


export default withAuthenticator(CreatePost);