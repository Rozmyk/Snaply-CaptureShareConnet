import { Box, Flex, Text, Anchor, useMantineColorScheme } from '@mantine/core'
import { IconCamera } from '@tabler/icons-react'
interface EmptyPostsProps {
	isCurrentUser: boolean
}
const EmptyPosts = ({ isCurrentUser }: EmptyPostsProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return isCurrentUser ? (
		<Flex direction='column' justify='center' align='center' mt='50px' gap='sm'>
			<Flex
				justify='center'
				align='center'
				sx={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid #272726' }}>
				<IconCamera stroke={1} size={40} color='#272726' />
			</Flex>
			<Text fz={30} fw={800} color={dark ? 'white' : 'black'}>
				Share Photos
			</Text>
			<Text fz={14}>When you share photos, they will appear on your profile.</Text>
		</Flex>
	) : (
		<Box p='50px' mt='md' sx={{ width: '100%' }}>
			<Flex justify='center' align='center' direction='column'>
				<Flex
					justify='center'
					align='center'
					sx={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid #272726' }}>
					<IconCamera stroke={1} size={40} color='#272726' />
				</Flex>
				<Text fz={30} fw={800} color={dark ? 'white' : 'black'}>
					No posts yet.
				</Text>
			</Flex>
		</Box>
	)
}

export default EmptyPosts
