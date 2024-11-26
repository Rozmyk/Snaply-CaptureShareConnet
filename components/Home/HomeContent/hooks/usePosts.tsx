import { useState, useEffect } from 'react'
import { PostProps } from '../../../../types'
import postService from '../../../../utils/postService'
import { Timestamp } from 'firebase-admin/firestore'

export const usePosts = () => {
	const [posts, setPosts] = useState<PostProps[]>([])
	const [loading, setLoading] = useState(true)
	const [loader, setLoader] = useState(false)
	const [lastKey, setLastKey] = useState<Timestamp | null>(null)

	const getFirstPosts = async () => {
		try {
			const fetchedPosts = await postService.postsFirstBatch()
			if (fetchedPosts) {
				setPosts(fetchedPosts.posts)
				setLastKey(fetchedPosts.lastKey)
				setLoading(false)
			}
		} catch (error) {
			console.error('Error fetching posts:', error)
		}
	}

	const getNextPosts = async () => {
		try {
			if (!lastKey) {
				console.log('No more posts to load')
				return
			}
			setLoader(true)

			let fetchedPosts: { posts: PostProps[]; lastKey: Timestamp | null; hasMore: boolean } = {
				posts: [],
				lastKey: null,
				hasMore: false,
			}

			fetchedPosts = (await postService.postsNextBatch(lastKey)) ?? {
				posts: [],
				lastKey: null,
				hasMore: false,
			}

			if (fetchedPosts && fetchedPosts.posts && fetchedPosts.lastKey) {
				setPosts(prevState => (prevState ?? []).concat(fetchedPosts.posts))
				setLastKey(fetchedPosts.lastKey)
			}
			setLoader(false)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getFirstPosts()
	}, [])

	return { posts, loading, loader, getNextPosts, setPosts }
}
