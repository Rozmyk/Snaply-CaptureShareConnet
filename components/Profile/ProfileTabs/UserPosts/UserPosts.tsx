'use client'
import { useEffect, useState, useRef } from 'react'
import { Grid, Container } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import { query, collection, getDocs, limit, orderBy, where, startAfter } from 'firebase/firestore'
import PostsContent from './PostsContent/PostsContent'
import { db } from '@/app/firebase'
import { PostProps } from '../../../../types'
import { Timestamp } from 'firebase-admin/firestore'

interface UserPostsProps {
	userId: string
	isCurrentUser: boolean
}

interface UpdatedPostProps extends PostProps {
	commentsCount: number
	id: string
}

const UserPosts = ({ userId, isCurrentUser }: UserPostsProps) => {
	const [posts, setPosts] = useState<UpdatedPostProps[] | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [nextPostLoading, setNextPostLoading] = useState<boolean>(false)
	const [noMorePosts, setNoMorePosts] = useState<boolean>(false)
	const [lastKey, setLastKey] = useState<Timestamp | null>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const { ref, width } = useElementSize()

	let singlePostWidth = width / 3 - 5

	useEffect(() => {
		const fetchPostsAndComments = async () => {
			try {
				const postsQuerySnapshot = await getDocs(
					query(collection(db, 'posts'), where('addedBy', '==', userId), limit(9), orderBy('createdAt', 'desc'))
				)

				let itemsArr: UpdatedPostProps[] = []
				let temporaryLastKey = null

				for (const doc of postsQuerySnapshot.docs) {
					const postData = doc.data() as PostProps
					const post: UpdatedPostProps = { ...postData, id: doc.id, commentsCount: 0 }

					const commentsQuerySnapshot = await getDocs(collection(db, 'posts', doc.id, 'comments'))
					if (!commentsQuerySnapshot.empty) {
						post.commentsCount = commentsQuerySnapshot.size
					}

					temporaryLastKey = post.createdAt

					itemsArr.push(post)
				}

				setLastKey(temporaryLastKey)
				setPosts(itemsArr)
				setLoading(false)
			} catch (err) {
				console.log(err)
			}
		}

		fetchPostsAndComments()
	}, [userId])

	useEffect(() => {
		const getNextPosts = async () => {
			try {
				if (!lastKey) {
					setNoMorePosts(true)
					return
				}

				const postsRef = collection(db, 'posts')
				const sortedQuery = query(
					postsRef,
					where('addedBy', '==', userId),
					orderBy('createdAt', 'desc'),
					limit(5),
					startAfter(lastKey)
				)

				const data = await getDocs(sortedQuery)

				let postsArray: UpdatedPostProps[] = []
				let newLastKey = null

				for (const doc of data.docs) {
					const postData = doc.data() as PostProps
					const post: UpdatedPostProps = { ...postData, id: doc.id, commentsCount: 0 }

					const commentsRef = collection(doc.ref, 'comments')
					const commentsSnapshot = await getDocs(commentsRef)

					post.commentsCount = commentsSnapshot.size

					postsArray.push(post)

					newLastKey = post.createdAt
				}

				setLastKey(newLastKey)
				setPosts(prevState => (prevState ? prevState.concat(postsArray) : postsArray))

				setNextPostLoading(false)
			} catch (error) {
				console.error(error)
			}
		}
		const handleScroll = async () => {
			if (
				window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight &&
				!nextPostLoading
			) {
				setNextPostLoading(true)
				await getNextPosts()
			}
		}
		window.addEventListener('scroll', handleScroll)

		return () => window.removeEventListener('scroll', handleScroll)
	}, [lastKey, userId, nextPostLoading])

	return (
		<Container size='md' ref={ref}>
			<Grid
				ref={containerRef}
				justify={posts && posts.length == 0 ? 'center' : 'flex-start'}
				align='center'
				gutter='5px'>
				<PostsContent
					loading={loading}
					posts={posts}
					singlePostWidth={singlePostWidth}
					nextPostLoading={nextPostLoading}
					isCurrentUser={isCurrentUser}
					noMorePosts={noMorePosts}
				/>
			</Grid>
		</Container>
	)
}

export default UserPosts
