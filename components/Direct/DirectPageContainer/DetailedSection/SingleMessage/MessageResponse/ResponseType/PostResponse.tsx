import { Image, Box, useMantineColorScheme, Text } from '@mantine/core'
interface PostResponseProps {
	src: string | null
}
const PostResponse = ({ src }: PostResponseProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return src ? (
		<Image src={src} width={100} radius='lg' height={115} alt=''></Image>
	) : (
		<Box p='sm' sx={{ backgroundColor: dark ? '#272726' : '#eeefee', borderRadius: '20px' }}>
			<Text fw={600} fz='sm'>
				Message not available
			</Text>
		</Box>
	)
}

export default PostResponse
