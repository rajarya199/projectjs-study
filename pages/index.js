import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function Home() {
  const [posts ,setPosts]= useState()
  const[id,setId]=useState('')
  const[title,setTitle]=useState('')
  const[author,setAuthor]=useState('')
  const getPosts=async()=>{
    const response=await axios.get("http://localhost:8000/user")
    setPosts(response.data)

  }
  useEffect(()=>{
    getPosts()
  },[])
  console.log(posts)
  const postUsers=async(e)=>{
    e.preventDefault()
    await axios.post("http://localhost:8000/user ",{id,title,author})
    await getPosts()
  }
  return (
    <div className={styles.container}>
        
        <div>
          <form onSubmit={postUsers}>
            <input onChange={(e)=>setId(e.target.value)} value={id} placeholder='id' />
            <input  onChange={(e)=>setTitle(e.target.value)} value={title}  placeholder='title' />
            <input  onChange={(e)=>setAuthor(e.target.value)} value={author} placeholder='author' />
            <input type='submit'/>
          </form>
        </div>
        <div>
          {posts?.map((posts,i)=>{
            return(
              <div key={i}>
                <h1>
                {posts.id}
                
                </h1>
                <h2>{posts.title}</h2>
                <h2>{posts.author}</h2>
                <p> recently updated data</p>
                <hr/>
              </div>
            )
          })}
        </div>
    </div>


  )
}
