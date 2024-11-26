import { Text, Flex, useMantineColorScheme } from '@mantine/core'
import { IconFileAlert } from '@tabler/icons-react'
import CustomButton from '../../../../CustomButton/CustomButton'
import { useRouter } from 'next/navigation'
const NoPost = () => {
	const router = useRouter()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Flex direction='column' justify='center' align='center'>
			<IconFileAlert size={70} stroke={1} />
			<Text fz={20} fw={500}>
				Something went wrong
			</Text>
			<Text mb='xl' sx={{ color: dark ? '#a8a8a8' : '#737373' }} fz={14}>
				There&apos;s an issue and the page could not be loaded.
			</Text>
			<CustomButton
				onClick={() => {
					router.push('/')
				}}>
				Home page
			</CustomButton>
		</Flex>
	)
}

export default NoPost
