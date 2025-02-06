import React from 'react'
import { useQuery  } from '@tanstack/react-query'
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const Post = () => {

    const { data } = useQuery({
        queryKey: ['posts'], queryFn: async () => {

            try {
                const resp = fetch('https://dummyjson.com/posts')
                    .then(res => res.json())
                    .then(res => res.posts);
                console.log(resp)
                return resp
            } catch (e) {
                console.log(e)
            }

        }

    })

    return (



        <>
        
        {data?. map(({id,title,body})=>(

    <Card>
              <Card.Header>{id}</Card.Header>

      
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {body}
        </Card.Text>
        
      </Card.Body>
    </Card>
  

        ))}
        
        </>
    )
}

export default Post