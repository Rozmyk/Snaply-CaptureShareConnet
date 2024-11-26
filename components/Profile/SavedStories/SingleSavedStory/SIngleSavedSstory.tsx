import { Image, Text, Flex, Box, useMantineColorScheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'
interface SingleSavedStoryProps {
	storyName: string
	storyImage: string
	highlightId: string
}
const SingleSavedStory = ({ storyName, storyImage, highlightId }: SingleSavedStoryProps) => {
	const isSmallScreen = useMediaQuery('(max-width: 775px)')
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Link
			href={`/stories/highlights/?id=${highlightId}`}
			style={{ textDecoration: 'none', color: dark ? '#f5f5f5' : 'black' }}>
			<Flex direction='column' justify='center' align='center' sx={{ cursor: 'pointer' }}>
				<Box sx={{ padding: '2px', borderRadius: '50%', border: `1.5px solid ${dark ? '#232323' : '#dedede'} ` }}>
					<Image
						height={isSmallScreen ? 55 : 77}
						width={isSmallScreen ? 55 : 77}
						radius={'50%'}
						alt='saved story'
						src={storyImage}></Image>
				</Box>
				<Box w={isSmallScreen ? 55 : 77}>
					<Text align='center' truncate fz={12} fw={600}>
						{storyName}
					</Text>
				</Box>
			</Flex>
		</Link>
	)
}

export default SingleSavedStory
