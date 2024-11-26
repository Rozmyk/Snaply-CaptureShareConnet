import { useRouter } from 'next/navigation'
import { UnstyledButton, Flex, Avatar, Text, useMantineColorScheme } from '@mantine/core'
import { UserProps } from '../../../../types'
import { Dispatch, SetStateAction } from 'react'
interface SingleFilteredUserProps {
	user: UserProps
	checkIfUserExists: (user: UserProps) => void
	setOpened: Dispatch<SetStateAction<boolean>>
}
const SingleFilteredUser = ({ user, checkIfUserExists, setOpened }: SingleFilteredUserProps) => {
	const router = useRouter()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	const handleClick = () => {
		checkIfUserExists(user)
		router.push(`/profile/${user.username}`)
		setOpened(false)
	}

	console.log(user)
	return (
		<UnstyledButton
			onClick={handleClick}
			sx={{
				width: '100%',
				cursor: 'pointer',
				padding: '10px 5px',
				'&:hover': {
					backgroundColor: dark ? '#1b1a1b' : '#f2f2f2',
				},
			}}>
			<Flex justify='flex-start' gap='xs' align='center'>
				<Avatar size={40} radius='50%' src={user.image} />
				<Flex direction='column' justify='center' align='flex-start' gap='none'>
					<Text color={dark ? '#f5f5f5' : 'black'} fz='sm' fw={600}>
						{user.username}
					</Text>
					<Text color={dark ? '#a8a8a8' : '#737373'} fz='sm'>
						{user.name}
					</Text>
				</Flex>
			</Flex>
		</UnstyledButton>
	)
}

export default SingleFilteredUser
