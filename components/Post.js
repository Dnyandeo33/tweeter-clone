import { deleteDoc, setDoc, doc, onSnapshot, collection } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineShareAlt } from 'react-icons/ai'
import { BsChat } from 'react-icons/bs'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import Moment from 'react-moment'
import { useSession } from 'next-auth/react'
import { AppContext } from '@/contexts/AppContext'


const Post = ({ id, post }) => {

    const [likes, setLikes] = useState([])
    const [liked, setLiked] = useState(false)
    const [comments, setComments] = useState([])

    const router = useRouter()
    const { data: session } = useSession()

    const [appContext, setAppContext] = useContext(AppContext)

    useEffect(() =>
        onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
            setLikes(snapshot.docs)), [db, id]
    )

    useEffect(()=>{
        setLiked(likes.findIndex((like)=> like.id === session?.user?.uid) !== -1)
    })

    const likePost = async () => {
        if (liked) {
            await deleteDoc(doc(db, "posts", id, "likes", session.user.uid))
        } else {
            await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                username: session.user.name
            })
        }
    }

    return (
        <div className=' mt-4 border-t border-gray-500 px-4 pt-6 pb-4 cursor-pointer'
            onClick={() => router.push(`/${id}`)}>
            <div className=' grid grid-cols-[48px, 1fr] gap-4'>
                <div>
                    <img src={post?.userImg} alt="" className=' h-12 w-12 rounded-full object-cover' />
                </div>
                <div>
                    <div className=' block sm:flex gap-1'>
                        <h1 className=' font-medium'>{post?.username}</h1>
                        <div className=' flex'>
                            <p className=' text-gray-500'>@{post?.tag} &nbsp;.&nbsp;</p>
                            <p className=' text-gary-500'>
                                <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                            </p>
                        </div>
                    </div>
                    <p>{post?.text}</p>
                    <img className=' max-h-[450px] object-cover rounded-[240px] mt-2'
                        src={post?.image}
                        alt="" />

                    <div className=' flex justify-between text-[20px] mt-4 w-[80%]'>
                        <div className=' flex gap-1 items-center'>
                            <BsChat className=' hoverEffect w-7 h-7 p-1'
                                onClick={(e) => {
                                    e.stopPropagation()
                                    // openModal()
                                }} />
                            {/* {comments.length > 0 && (<span className=' text-sm'>
                            {comments.length}</span>)} */}
                        </div>
                        {session.user.uid !== post?.id ? (
                            <FaRetweet className=' hoverEffect w-7 h-7 p-1' />
                        ) : (
                            <RiDeleteBin5Fill className=' hoverEffect w-7 h-7 p-1'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteDoc(doc(db, "posts", id));
                                }} />
                        )}
                        <div className=' flex gap-1 items-center'
                            onClick={(e) => {
                                e.stopPropagation()
                                likePost()
                            }}>
                            {liked ? <AiFillHeart className=' hoverEffect w-7 h-7 p-1 text-pink-700' />
                                : <AiFillHeart className=' hoverEffect w-7 
                            h-7 p-1'/>}

                            {likes.length > 0 && (<span className={`${liked &&
                                "text-pink-700"} text-sm`}>{likes.length}</span>)}
                        </div>
                        <AiOutlineShareAlt className=' hoverEffect' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
