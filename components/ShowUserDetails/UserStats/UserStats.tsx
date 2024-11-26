import React from 'react'
import { Box, Flex, Text } from '@mantine/core'
interface UserStatsProps {
	postLength: number
	followersLength: number
	followingLength: number
}
const UserStats = ({ postLength, followersLength, followingLength }: UserStatsProps) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center',
			}}
			mt='sm'
			mb='sm'>
			<Flex direction='column' justify='center' align='center'>
				<Text fz='sm' fw={700}>
					{postLength}
				</Text>
				<Text fz='sm'>posts</Text>
			</Flex>
			<Flex direction='column' justify='center' align='center'>
				<Text fz='sm' fw={700}>
					{followersLength}
				</Text>
				<Text fz='sm'>followers</Text>
			</Flex>
			<Flex direction='column' justify='center' align='center'>
				<Text fz='sm' fw={700}>
					{followingLength}
				</Text>
				<Text fz='sm'>following</Text>
			</Flex>
		</Box>
	)
}

export default UserStats
