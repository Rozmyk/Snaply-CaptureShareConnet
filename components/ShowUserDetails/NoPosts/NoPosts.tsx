import { Flex, Text, useMantineColorScheme } from '@mantine/core'
import { IconCamera } from '@tabler/icons-react'
interface NoPostsProps {
	username: string
}
const NoPosts = ({ username }: NoPostsProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Flex
			direction='column'
			justify='center'
			align='center'
			w='100%'
			pt='sm'
			pb='sm'
			sx={{
				borderTop: `2px solid ${dark ? '#272726' : '#ecedec'}`,
				borderBottom: `2px solid ${dark ? '#272726' : '#ecedec'}`,
			}}>
			<Flex
				justify='center'
				align='center'
				sx={{
					position: 'relative',
					display: 'inline-block',
					background: 'linear-gradient(to bottom, #e126be, #fcb740)',
					padding: '2px',
					borderRadius: '50%',
				}}>
				<Flex
					justify='center'
					align='center'
					sx={{ backgroundColor: dark ? 'black' : 'white', width: 50, height: 50, borderRadius: '50%' }}>
					<IconCamera size={25} style={{ color: '#e126be' }} />
				</Flex>
			</Flex>
			<Text fw={700} align='center'>
				No posts yet
			</Text>
			<Text align='center' color='#808080'>
				When {username} shares photo, you&apos;ll se them here.
			</Text>
		</Flex>
	)
}

export default NoPosts
