import { Flex, Avatar, Text, Radio, CheckIcon, useMantineColorScheme } from '@mantine/core'
import { UserProps } from '../../../../../types'
interface updatedUsersDataProps extends UserProps {
	selected: boolean
}
interface ShareUserProps {
	user: updatedUsersDataProps
	addUser: (userId: string) => void
	removeUser: (userId: string) => void
}
const SharedUser = ({ user, addUser, removeUser }: ShareUserProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Flex
			sx={{ cursor: 'pointer' }}
			onClick={() => {
				{
					user.selected ? removeUser(user.id) : addUser(user.id)
				}
			}}
			direction='row'
			p='xs'
			justify='space-between'
			align='center'>
			<Flex justify='flex-start' align='center' gap='sm'>
				<Avatar size={44} radius={'50%'} src={user.image}></Avatar>

				<Flex direction='column' justify='center' align='flex-start' gap='0'>
					<Text align='left' fz='sm'>
						{user.username}
					</Text>
					<Text align='left' fz='sm' color={dark ? '#a8a8a8' : '#737373'}>
						{user.name}
					</Text>
				</Flex>
			</Flex>
			<Radio
				icon={CheckIcon}
				checked={user.selected}
				sx={{
					borderRadius: '50%',
					'.mantine-Radio-radio	': {
						backgroundColor: user.selected ? (dark ? '#f9f9f8' : 'black') : 'none',

						border: `1.5px solid ${dark ? '#f9f9f8' : '#dbdee5'}`,
					},
					'.mantine-Radio-icon	': {
						color: dark ? 'black' : 'white',
					},
				}}
				size='md'
				value='nu'
			/>
		</Flex>
	)
}

export default SharedUser
