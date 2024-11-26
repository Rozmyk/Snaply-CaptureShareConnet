import { useState, useEffect } from 'react'
import { Flex, Box, Avatar, Text, useMantineColorScheme, Skeleton } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { UserProps, SingleStoryProps } from '../../../../../types'
import { useSession } from 'next-auth/react'
interface StoryIconProps {
	lastStory: SingleStoryProps
	username: string
	userImage: string
}
const StoryIcon = ({ lastStory, username, userImage }: StoryIconProps) => {
	const [isViewed, setIsViewed] = useState<boolean>(false)
	const [storyLoading, setStoryLoading] = useState<boolean>(true)
	const session = useSession()
	const userId = session?.data?.user?.id

	const { colorScheme } = useMantineColorScheme()
	const router = useRouter()
	useEffect(() => {
		if (userId) {
			if (lastStory.viewedBy.includes(userId)) {
				setIsViewed(true)
			} else {
				setIsViewed(false)
			}
			setStoryLoading(false)
		}
	}, [userId, lastStory.viewedBy])
	return storyLoading ? (
		<Skeleton mt='lg' height={56} circle />
	) : (
		<Flex direction='column' justify='center' align='center' mt='lg'>
			<Box
				sx={{
					position: 'relative',
					display: 'inline-block',
					padding: isViewed ? '1px' : '2.5px',
					borderRadius: '50%',
					background: isViewed
						? colorScheme == 'dark'
							? '#373736'
							: '#dbdbdb'
						: 'linear-gradient(to right, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5)',
				}}>
				<Avatar
					onClick={() => {
						router.push(`/stories?username=${username.toLowerCase()}`)
					}}
					variant='outline'
					radius='50%'
					size='56px'
					sx={{ border: colorScheme == 'dark' ? '2px solid black' : '2px solid white', cursor: 'pointer' }}
					src={userImage}
				/>
			</Box>
			<Text maw='60px' lineClamp={1} color={colorScheme == 'dark' ? '#f5f5f5' : 'black'} mt='5px' size='xs'>
				{username}
			</Text>
		</Flex>
	)
}

export default StoryIcon
