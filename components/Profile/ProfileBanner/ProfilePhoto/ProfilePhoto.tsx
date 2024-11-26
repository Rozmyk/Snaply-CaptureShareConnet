'use client'
import { Avatar, Box, useMantineColorScheme } from '@mantine/core'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { collection, query, getDocs, where, Timestamp, DocumentData } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { SingleStoryProps } from '../../../../types'

interface ProfilePhotoProps {
	image: string
	username: string
}
const ProfilePhoto = ({ image, username }: ProfilePhotoProps) => {
	const { colorScheme } = useMantineColorScheme()
	const session = useSession()
	const userId = session?.data?.user?.id
	const [userStory, setUserStory] = useState<SingleStoryProps[] | null>(null)
	const dark = colorScheme === 'dark'

	useEffect(() => {
		const fetchStory = async () => {
			try {
				if (userId) {
					const storiesRef = collection(db, 'users', userId, 'stories')

					const twentyFourHoursAgo = Timestamp.fromMillis(Date.now() - 24 * 60 * 60 * 1000)
					const queryStories = query(storiesRef, where('createdAt', '>=', twentyFourHoursAgo))

					const storiesSnap = await getDocs(queryStories)
					const userStories: SingleStoryProps[] = storiesSnap.docs.map(storiesDoc => {
						const storiesData = storiesDoc.data() as DocumentData

						const story: SingleStoryProps = {
							...storiesData,
							id: storiesDoc.id,
							addedBy: storiesData.addedBy || '',
							createdAt: storiesData.createdAt || new Timestamp(0, 0),
							image: storiesData.image || '',
							viewedBy: storiesData.viewedBy || [],
						}

						return story
					})

					setUserStory(userStories)
				}
			} catch (err) {
				console.log(err)
			}
		}
		fetchStory()
	}, [userId])
	return (
		<>
			<Box
				sx={{
					position: 'relative',
					display: 'inline-block',
					padding: '4px',
					borderRadius: '50%',
					background:
						userStory && userStory.length > 0
							? 'linear-gradient(to right, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5)'
							: '',
				}}>
				<Box sx={{ backgroundColor: dark ? 'black' : 'white', margin: 0, padding: 4, borderRadius: '50%' }}>
					<Avatar radius='50%' size={150} src={image} alt={`${username} profile photo`} />
				</Box>
			</Box>
		</>
	)
}

export default ProfilePhoto
