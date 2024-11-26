import React from 'react'
import { Text, Box, Flex } from '@mantine/core'
import UserAvatar from '../../../UserAvatar/UserAvatar'
import Link from 'next/link'

interface UserInfoProps {
	username: string
	image: string
	dark: boolean
}

const UserInfo = ({ username, image, dark }: UserInfoProps) => (
	<Flex justify='flex-start' align='center' gap='5px'>
		<Box mr='sm' p={0}>
			<UserAvatar src={image} size='32px' alt='user' />
		</Box>
		<Text color={dark ? 'gray.0' : '#262626'} fz='14px' fw={600} component={Link} href={`/profile/${username}`}>
			{username}
		</Text>
	</Flex>
)

export default UserInfo
