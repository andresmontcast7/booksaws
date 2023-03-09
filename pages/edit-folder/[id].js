import { updatePost as updatePostQuery } from "../../src/graphql/mutations"
import { getPost } from  "../../src/graphql/queries"
import { v4 as uuid } from "uuid"
import { API } from "aws-amplify"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function EditPost(){
    const [post, setPost] = useState("")
    const router =useRouter()
    const {id} = router.query;

    useEffect(() => {
      if(!id) return
      fetchPost();
      async function fetchPost(){
        const postData = await API.graphql({
            query: getPost,
            variables:{id}
        })
        setPost(postData.data.getPost);
      }
    }, [id])

    if(!post)return

    const onChangeInput = (e)=>{
        setPost(()=>({ ...post, [e.target.name]:e.target.value }))
    
    }

    const {title, content} =post;
    async function updatePost(){
      if (!title || !content) return;
      const postUpdate ={
        id,
        content,
        title
      }
      await API.graphql({
        query:updatePostQuery,
        variables: {input:postUpdate},
        authMode:"AMAZON_COGNITO_USER_POOLS"
      })
      router.push("/my-book")
        
    }

    return(
    <>
    <input name="title" value={post.title}  onChange={onChangeInput}></input>
    <SimpleMDE value={post.content}  onChange={(value)=> setPost({...post, content:value})}   /> 
   <button
   onClick={updatePost}
   >
  
    Update Post
   </button>
    
    </>
    
    ) 

  

}


export default EditPost