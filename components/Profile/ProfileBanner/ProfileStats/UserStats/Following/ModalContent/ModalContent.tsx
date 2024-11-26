'use client'
import { useState, useEffect } from 'react'
import { Box, TextInput, ScrollArea, Center, Loader, Stack, Text } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { fetchUserData } from '../../../../../../../utils/user/fetchUserData'
import UserCard from '../../../../../../UserCard/UserCard'
import { UserProps } from '../../../../../../../types'
interface ModalContentProps {
	followingData: string[]
}
const ModalContent = ({ followingData }: ModalContentProps) => {
	const [inputValue, setInputValue] = useState<string>('')
	const [updatedFollowers, setUpdatedFollowers] = useState<UserProps[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchFollowingData = async () => {
			const promises = followingData.map(async follower => {
				const followerData = await fetchUserData(follower)
				return followerData
			})
			const updatedArray = await Promise.all(promises)

			const filteredArray = updatedArray.filter((followerData): followerData is UserProps => followerData !== undefined)

			setUpdatedFollowers(filteredArray)
			setLoading(false)
		}

		fetchFollowingData()
	}, [followingData])

	return (
		<Box sx={{ paddingTop: '15px', paddingBottom: '15px' }}>
			<TextInput
				radius='md'
				mb='lg'
				value={inputValue}
				onChange={e => {
					setInputValue(e.target.value)
				}}
				icon={<IconSearch size='1rem' />}
				placeholder='Search'
			/>
			<ScrollArea h={325} offsetScrollbars>
				{loading ? (
					<Center>
						<Loader fz='sm' color='gray'></Loader>
					</Center>
				) : inputValue.trim() !== '' ? (
					<Stack spacing={0} align='center'>
						{updatedFollowers
							.filter(follower => follower.username.includes(inputValue.trim()))
							.map(filteredFollower => {
								return <UserCard key={filteredFollower.id} {...filteredFollower}></UserCard>
							})}
						{updatedFollowers.filter(follower => follower.username.includes(inputValue.trim())).length === 0 && (
							<Text m='xl' c='dimmed'>
								No results found
							</Text>
						)}
					</Stack>
				) : (
					<Stack>
						{updatedFollowers.map(follower => {
							return <UserCard key={follower.id} {...follower}></UserCard>
						})}
					</Stack>
				)}
			</ScrollArea>
		</Box>
	)
}

export default ModalContent
