import React from 'react'
import { Flex, Text, Avatar } from '@mantine/core'
interface UserProfileProps {
	username: string
	name: string
	image: string
}
const UserProfile = ({ username, name, image }: UserProfileProps) => {
	return (
		<Flex justify='flex-start' align='center' gap='15px'>
			<Avatar size={50} radius='50%' alt={`${username} profile photo`} src={image} />
			<Flex direction='column' gap={0}>
				<Text m={0} p={0} fz='sm' fw={700}>
					{username}
				</Text>
				<Text m={0} p={0} color='dark.2' fz='sm'>
					{name}
				</Text>
			</Flex>
		</Flex>
	)
}

export default UserProfile
