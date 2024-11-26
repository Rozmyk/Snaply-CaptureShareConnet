import { Flex, Avatar, Box } from '@mantine/core'
import { useState, useEffect } from 'react'
import { collection, query, onSnapshot, where, Timestamp, getDocs } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { SingleStoryProps } from '../../../../types'
interface ProfileAvatarProps {
	username: string
	image: string
	size: number
	id: string
}
const ProfileAvatar = ({ username, image, size, id }: ProfileAvatarProps) => {
	const [userStory, setUserStory] = useState<SingleStoryProps[] | null>(null)
	useEffect(() => {
		if (!id) return

		const storiesRef = collection(db, 'users', id, 'stories')
		const twentyFourHoursAgo = Timestamp.fromMillis(Date.now() - 24 * 60 * 60 * 1000)
		const queryStories = query(storiesRef, where('createdAt', '>=', twentyFourHoursAgo))

		const unsubscribe = onSnapshot(
			queryStories,
			querySnapshot => {
				const userStories: any[] = []
				querySnapshot.forEach(doc => {
					const storiesData = doc.data()
					storiesData.id = doc.id
					userStories.push(storiesData)
				})
				setUserStory(userStories)
			},
			error => {
				console.log(error)
			}
		)

		return () => unsubscribe()
	}, [id])
	return (
		<Flex justify='center' align='center'>
			<Box
				sx={{
					position: 'relative',
					display: 'inline-block',
					padding: userStory && userStory.length > 0 ? '4px' : 'none',
					borderRadius: '50%',
					background:
						userStory && userStory.length > 0
							? 'linear-gradient(to right, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5)'
							: 'none',
				}}>
				<Avatar radius='50%' size={size} src={image} alt={`${username} profile photo`} />
			</Box>
		</Flex>
	)
}

export default ProfileAvatar
