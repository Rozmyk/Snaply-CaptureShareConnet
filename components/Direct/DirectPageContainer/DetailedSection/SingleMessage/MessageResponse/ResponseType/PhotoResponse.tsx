import { Image, Box, useMantineColorScheme, Text } from '@mantine/core'
interface PhotoResponseProps {
	src: string | null
}
const PhotoResponse = ({ src }: PhotoResponseProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return src ? (
		<Image src={src} width={100} height={175} radius='lg' alt=''></Image>
	) : (
		<Box p='sm' sx={{ backgroundColor: dark ? '#272726' : '#eeefee', borderRadius: '20px' }}>
			<Text fw={600} fz='sm'>
				Message not available
			</Text>
		</Box>
	)
}

export default PhotoResponse
