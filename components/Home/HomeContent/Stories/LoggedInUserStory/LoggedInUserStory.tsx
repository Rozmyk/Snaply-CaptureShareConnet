'use client'
import { useState, useEffect } from 'react'
import { Flex, Box, Avatar, Text, useMantineColorScheme, FileButton } from '@mantine/core'
import { useSession } from 'next-auth/react'
import { collection, query, onSnapshot, where, Timestamp, getDocs } from 'firebase/firestore'
import { IconPlus } from '@tabler/icons-react'
import { db } from '@/app/firebase'
import { SingleStoryProps } from '../../../../../types'

interface LoggedInUserStoryProps {
	setFile: (file: File | null) => void
}

const LoggedInUserStory = ({ setFile }: LoggedInUserStoryProps) => {
	const [userStory, setUserStory] = useState<SingleStoryProps[] | null>(null)
	const { colorScheme } = useMantineColorScheme()
	const session = useSession()
	const userImage = session?.data?.user?.image
	const userId = session?.data?.user?.id

	useEffect(() => {
		if (!userId) return

		const storiesRef = collection(db, 'users', userId, 'stories')
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
	}, [userId])

	useEffect(() => {
		const fetchStory = async () => {
			if (!userId) return

			try {
				const storiesRef = collection(db, 'users', userId, 'stories')
				const twentyFourHoursAgo = Timestamp.fromMillis(Date.now() - 24 * 60 * 60 * 1000)
				const queryStories = query(storiesRef, where('createdAt', '>=', twentyFourHoursAgo))

				const storiesSnap = await getDocs(queryStories)
				const userStories: any[] = []

				storiesSnap.forEach(doc => {
					const storiesData = doc.data()
					storiesData.id = doc.id
					userStories.push(storiesData)
				})

				setUserStory(userStories)
			} catch (err) {
				console.log(err)
			}
		}
		fetchStory()
	}, [userId])

	return (
		<Flex direction='column' justify='center' align='center' mt='lg'>
			<Box
				sx={{
					position: 'relative',
					display: 'inline-block',
					padding: userStory && userStory.length > 0 ? '2.5px' : 'none',
					borderRadius: '50%',
					background:
						userStory && userStory.length > 0
							? 'linear-gradient(to right, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5)'
							: 'none',
				}}>
				<div
					style={{
						position: 'relative',
					}}>
					<div
						style={{
							position: 'absolute',
							bottom: -5,
							right: -5,
							zIndex: 1000,
							borderRadius: '50%',
							overflow: 'hidden',
						}}>
						<FileButton onChange={setFile} accept='image/png,image/jpeg'>
							{props => (
								<div
									{...props}
									style={{
										padding: 0,
										margin: 0,
										cursor: 'pointer',
										width: '20px',
										height: '20px',

										backgroundColor: '#0095f6',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<div
										style={{ width: 12, height: 12, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
										<IconPlus size='12px' color='white' />
									</div>
								</div>
							)}
						</FileButton>
					</div>
					<Avatar variant='outline' radius='50%' size='56px' src={userImage} />
				</div>
			</Box>
			<Text mt='5px' maw='60px' lineClamp={1} color={colorScheme == 'dark' ? '#f5f5f5' : 'black'} size='xs'>
				Your story
			</Text>
		</Flex>
	)
}

export default LoggedInUserStory
