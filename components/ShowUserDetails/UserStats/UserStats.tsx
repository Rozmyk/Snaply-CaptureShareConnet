import React from 'react'
import { Box, Flex, Text, useMantineColorScheme } from '@mantine/core'
interface UserStatsProps {
	postLength: number
	followersLength: number
	followingLength: number
}
const UserStats = ({ postLength, followersLength, followingLength }: UserStatsProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
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
				<Text fz='sm' fw={700} color={dark ? 'white' : 'black'}>
					{postLength}
				</Text>
				<Text fz='sm'>posts</Text>
			</Flex>
			<Flex direction='column' justify='center' align='center'>
				<Text fz='sm' fw={700} color={dark ? 'white' : 'black'}>
					{followersLength}
				</Text>
				<Text fz='sm'>followers</Text>
			</Flex>
			<Flex direction='column' justify='center' align='center'>
				<Text fz='sm' fw={700} color={dark ? 'white' : 'black'}>
					{followingLength}
				</Text>
				<Text fz='sm'>following</Text>
			</Flex>
		</Box>
	)
}

export default UserStats
