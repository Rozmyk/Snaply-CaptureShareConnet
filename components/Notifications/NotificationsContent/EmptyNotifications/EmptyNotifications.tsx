import { Flex, Text, useMantineColorScheme } from '@mantine/core'
import SuggestedForYou from './SuggestedForYou/SuggestedForYou'
import { IconHeart } from '@tabler/icons-react'
const EmptyNotifications = () => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<>
			<Flex justify='center' align='center' direction='column' p='sm'>
				<Flex
					justify='center'
					align='center'
					sx={{ borderRadius: '50%', width: 60, height: 60, border: `2px solid ${dark ? 'white' : 'black'} ` }}>
					<IconHeart color={dark ? 'white' : 'black'} stroke={1.25} size={40} />
				</Flex>
				<Text fz={14} mb='sm' mt='md' align='center' color={dark ? 'white' : 'black'}>
					Activity On Your Posts
				</Text>
				<Text fz={14} align='center'>
					When someone likes or comments on one of your posts, you&apos;ll see it here.
				</Text>
			</Flex>
			<SuggestedForYou />
		</>
	)
}

export default EmptyNotifications
