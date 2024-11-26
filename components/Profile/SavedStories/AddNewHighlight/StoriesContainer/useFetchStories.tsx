import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { SingleStoryProps } from '../../../../../types'
const useFetchStories = (userId: string) => {
	const [stories, setStories] = useState<SingleStoryProps[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [noStoriesToLoad, setNoStoriesToLoad] = useState<boolean>(false)

	useEffect(() => {
		const fetchStories = async () => {
			try {
				const storiesRef = collection(db, 'users', userId, 'stories')
				const q = query(storiesRef, orderBy('createdAt', 'desc'))
				const storiesSnap = await getDocs(q)
				const fetchedStories: SingleStoryProps[] = []

				if (!storiesSnap.empty) {
					storiesSnap.forEach(doc => {
						const data = doc.data() as Omit<SingleStoryProps, 'id'>
						const updateStory: SingleStoryProps = { id: doc.id, ...data }
						fetchedStories.push(updateStory)
					})
				}

				if (fetchedStories.length <= 0) {
					setNoStoriesToLoad(true)
				}

				setStories(fetchedStories)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching stories:', error)
				setLoading(true)
			}
		}

		fetchStories()
	}, [userId])

	return { stories, loading, noStoriesToLoad }
}

export default useFetchStories
