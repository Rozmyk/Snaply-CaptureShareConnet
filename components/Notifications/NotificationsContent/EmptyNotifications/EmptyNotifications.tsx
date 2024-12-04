import { Flex, Text, useMantineColorScheme } from '@mantine/core'
import SuggestedForYou from './SuggestedForYou/SuggestedForYou'
import { IconHeart } from '@tabler/icons-react'
import { useElementSize } from '@mantine/hooks'
const EmptyNotifications = () => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const { ref: headerRef, height: headerHeight } = useElementSize()
	const { ref: containerRef, height: containerHeight } = useElementSize()
	return (
		<div ref={containerRef} style={{ height: '100%', maxHeight: '100vh' }}>
			<div ref={headerRef}>
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
			</div>

			<SuggestedForYou maxHeight={containerHeight - headerHeight - 10} />
		</div>
	)
}

export default EmptyNotifications
