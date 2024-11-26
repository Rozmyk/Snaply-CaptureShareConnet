import { Text, useMantineColorScheme, Skeleton } from '@mantine/core'
import { useState, useEffect } from 'react'
import { fetchUserData } from '../../../utils/user/fetchUserData'
import { UserProps } from '../../../types'
interface HiddenLikesProps {
	isGray: boolean
	likes: string[]
}
const HiddenLikes = ({ isGray, likes }: HiddenLikesProps) => {
	const [lastUserData, setLastUserData] = useState<UserProps | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	useEffect(() => {
		const fetchData = async () => {
			let fetchedData
			if (likes) {
				fetchedData = await fetchUserData(likes[0])
				if (fetchedData) {
					setLastUserData(fetchedData)
					setLoading(false)
				}
			}
		}
		if (likes && likes.length > 0) {
			fetchData()
		}
	}, [likes])
	return likes && likes.length > 0 ? (
		loading ? (
			<Skeleton radius='xl' mb='xs' h={14} w={50}></Skeleton>
		) : (
			lastUserData && (
				<Text mb='xs' color={isGray ? (dark ? '#737373' : '#a8a8a8') : dark ? 'white' : 'black'} fz='sm'>
					Liked by <span style={{ fontWeight: 600 }}>{lastUserData.username}</span> and{' '}
					<span style={{ fontWeight: 600 }}>others</span>
				</Text>
			)
		)
	) : null
}

export default HiddenLikes
