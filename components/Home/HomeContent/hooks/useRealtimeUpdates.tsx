import { useEffect, useState } from 'react'
import { collection, query, onSnapshot, where } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { getPostData } from '../../../../utils/getPostData'
import { PostProps } from '../../../../types'

export const useRealtimeUpdates = (setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>) => {
	const [hasNewPosts, setHasNewPosts] = useState(false)
	const [newPosts, setNewPosts] = useState<PostProps[]>([])

	useEffect(() => {
		const unsubscribe = onSnapshot(query(collection(db, 'posts'), where('createdAt', '>', new Date())), snapshot => {
			snapshot.docChanges().forEach(change => {
				if (change.type === 'added') {
					const data = change.doc.data() as PostProps
					const postToAdd: PostProps = {
						...data,
						id: change.doc.id,
					}

					setHasNewPosts(true)
					setNewPosts(prevPosts => [postToAdd, ...prevPosts])
				}
			})
		})

		return () => unsubscribe()
	}, [])

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, 'posts'), async snapshot => {
			snapshot.docChanges().forEach(async change => {
				if (change.type === 'modified') {
					try {
						const updatedPost = await getPostData(change.doc.id)
						if (updatedPost) {
							setPosts(prevPosts =>
								(prevPosts ?? []).map(post => {
									if (post.id === change.doc.id) {
										return updatedPost
									}
									return post
								})
							)
						}
					} catch (error) {
						console.error('Error updating post: ', error)
					}
				}
				if (change.type === 'removed') {
					try {
						const postToDelete = change.doc.id
						setPosts(current => (current ?? []).filter(post => post.id !== postToDelete))
					} catch (error) {
						console.error('Error updating comment: ', error)
					}
				}
			})
		})

		return () => unsubscribe()
	}, [setPosts])

	return { hasNewPosts, newPosts, setHasNewPosts, setNewPosts }
}
