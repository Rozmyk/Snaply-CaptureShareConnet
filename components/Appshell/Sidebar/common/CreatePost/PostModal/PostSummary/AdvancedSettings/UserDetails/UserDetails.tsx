import { Flex, Avatar, Text, useMantineColorScheme } from '@mantine/core'
interface UserDetailsProps {
	userImage: string | null | undefined
	username: string | undefined
}
const UserDetails = ({ userImage, username }: UserDetailsProps) => {
	const { colorScheme } = useMantineColorScheme()

	return (
		<Flex justify='flex-start' align='center' gap='sm' mb='sm'>
			<Avatar radius='50%' size={28} src={userImage} />
			<Text color={colorScheme === 'dark' ? 'gray.0' : 'gray.9'}>{username}</Text>
		</Flex>
	)
}
export default UserDetails
