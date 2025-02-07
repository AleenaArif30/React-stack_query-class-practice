// import React from 'react'
// import { useMutation, useQuery, useQueryClient  } from '@tanstack/react-query'
// // import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';




// const Post = () => {

//     const { data } = useQuery({
//         queryKey: ['posts'], queryFn: async () => {

//             try {
//                 const resp = await fetch('https://dummyjson.com/posts')
//                     .then(res => res.json())
//                     .then(res => res.posts);
//                 console.log(resp)
//                 return resp
//             } catch (e) {
//                 console.log(e)
//             }

//         }

//     })
//     const queryClient = useQueryClient
//     const deleteMutation = useMutation ({
//         mutationFn:async(postId)=>{

//             const resp = await fetch(`https://dummyjson.com/posts/${postId}`,{
//             method:"DELETE",})

//             return resp.json

//         },
//         onSuccess:(data,postId)=>{
//             queryClient.setQueryData(  ['posts'],(curEle)=>{
//                 return curEle.filter((post)=>post.id !== postId)
//             } )

//             console.log(postId,data)
            

//         }

//     })

//     return (



//         <>
        
//         {data?. map(({id,title,body})=>(

//     <Card>
//               <Card.Header>{id}</Card.Header>

      
//       <Card.Body>
//         <Card.Title>{title}</Card.Title>
//         <Card.Text>
//           {body}
//         </Card.Text>

//         <Button onClick={()=>deleteMutation.mutate(id)}  variant="danger">Delete</Button>


        
        
//       </Card.Body>
//     </Card>
  

//         ))}
        
//         </>
//     )
// }

// export default Post



import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Post = () => {
  // Fetch posts from API
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        const resp = await fetch('https://dummyjson.com/posts');
        const json = await resp.json();
        return json.posts;
      } catch (e) {
        console.log(e);
      }
    },
  });

  // Initialize the queryClient to manage cache
  const queryClient = useQueryClient();

  // Mutation for deleting a post
  const deleteMutation = useMutation({
    mutationFn: async (postId) => {
      const resp = await fetch(`https://dummyjson.com/posts/${postId}`, {
        method: 'DELETE',
      });
      return resp.json();  // Ensure to call .json() on response
    },
    onSuccess: (data, postId) => {
      // Update the cache by removing the deleted post
      queryClient.setQueryData(['posts'], (currentPosts) => {
        return currentPosts.filter((post) => post.id !== postId);
      });
      console.log(postId, data);
    },
  });


  const update = useMutation({
    mutationFn: async (postId,title,body) => {
      const resp = await fetch(`https://dummyjson.com/posts/${postId}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title,body})


      });
      return resp.json();  // Ensure to call .json() on response
    },
    onSuccess: (updatedPost) => {
      // Update the cache by removing the deleted post
      queryClient.setQueryData(['posts'], (currentPosts) => {
        return currentPosts.map((post) => (post.id === updatedPost.id ? updatedPost:post));
      });
      
    },
  });
   
  
  return (
    <>
      {data?.map(({ id, title, body }) => (
        <Card key={id}>
          <Card.Header>{id}</Card.Header>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{body}</Card.Text>
            <Button
              onClick={() => deleteMutation.mutate(id)} // Delete the post by ID
              variant="danger"
            >
              Delete
            </Button>
            <Button
              onClick={() => handleUpdate(id,title,body)} // Delete the post by ID
              variant="success"
            >
              Update
            </Button>


          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default Post;
