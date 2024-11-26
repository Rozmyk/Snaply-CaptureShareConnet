'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { collection, getDocs, query, where, Timestamp, orderBy } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { useSession } from 'next-auth/react'
import { fetchUserData } from '../utils/user/fetchUserData'
import { SingleStoryProps, UpdatedSingleStoryProps } from '../types'
export const StoriesContext = createContext<StoriesContextType>({
	stories: [],
	storiesLoading: true,
	noStories: true,
})
export function useStories() {
	return useContext(StoriesContext)
}
type StoriesProviderProps = {
	children: ReactNode
}
type StoriesContextType = {
	stories: UpdatedSingleStoryProps[] | null
	storiesLoading: boolean
	noStories: boolean
}
export function StoriesProvider({ children }: StoriesProviderProps) {
	const [stories, setStories] = useState<UpdatedSingleStoryProps[] | null>(null)
	const [storiesLoading, setStoriesLoading] = useState<boolean>(true)
	const [noStories, setNoStories] = useState<boolean>(true)
	const session = useSession()
	const userFollow = session?.data?.user?.following

	useEffect(() => {
		const fetchData = async () => {
			const followedStoriesData: UpdatedSingleStoryProps[] = []
			if (session.status === 'authenticated' && userFollow) {
				await Promise.all(
					userFollow.map(async (userId: string) => {
						const storiesRef = collection(db, 'users', userId, 'stories')
						try {
							const twentyFourHoursAgo = Timestamp.fromMillis(Date.now() - 24 * 60 * 60 * 1000)
							const queryStories = query(
								storiesRef,
								where('createdAt', '>=', twentyFourHoursAgo),
								orderBy('createdAt', 'desc')
							)
							const storiesSnap = await getDocs(queryStories)

							const userStories: SingleStoryProps[] = []
							for (const storiesDoc of storiesSnap.docs) {
								const storiesData = storiesDoc.data() as SingleStoryProps
								storiesData.id = storiesDoc.id

								userStories.push(storiesData)
							}
							const userData = await fetchUserData(userId)
							if (userStories.length > 0 && userData) {
								followedStoriesData.push({
									userId: userId,
									user: userData,
									stories: userStories,
								})
							}
						} catch (err) {
							console.log(err)
						} finally {
							setStoriesLoading(false)
						}
					})
				)
			}

			if (followedStoriesData.length > 0) {
				setStories(followedStoriesData)
				setNoStories(false)
			} else {
				setNoStories(true)
			}
		}

		fetchData()
	}, [userFollow])

	const value: StoriesContextType = { stories, storiesLoading, noStories }

	return <StoriesContext.Provider value={value}>{children}</StoriesContext.Provider>
}
