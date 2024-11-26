import { Text, Flex, TextInput, Badge, ActionIcon, Group, useMantineColorScheme } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import { UserProps } from '../../../../types'
import { Dispatch, SetStateAction } from 'react'
interface UpdatedUsersDataProps extends UserProps {
	selected: boolean
}
interface UserSelectionProps {
	selectedUsers: UpdatedUsersDataProps[] | null
	removeUser: (userId: string) => void
	value: string
	setValue: Dispatch<SetStateAction<string>>
}
const UserSelection = ({ selectedUsers, removeUser, value, setValue }: UserSelectionProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Flex
			p='sm'
			sx={{ borderBottom: `1px solid ${dark ? '#363636' : '#dbdbdb'} ` }}
			justify='flex-start'
			align={selectedUsers && selectedUsers.length > 0 ? 'flex-start' : 'center'}
			gap='sm'>
			<Text fz='md' fw={700}>
				To:
			</Text>
			<Group sx={{ width: '100%' }} spacing='xs'>
				{selectedUsers &&
					selectedUsers.length > 0 &&
					selectedUsers.map(user => (
						<Badge
							key={user.id}
							size='md'
							sx={{
								backgroundColor: '#e0f0fe',
								color: '#0195f7',
								fontWeight: 500,
								textTransform: 'none',
								fontSize: '14px',
							}}
							color='#e1f0ff'
							variant='filled'
							rightSection={
								<ActionIcon
									onClick={() => removeUser(user.id)}
									size='xs'
									color='blue'
									radius='xl'
									variant='transparent'>
									<IconX color='#0195f7' size={14} />
								</ActionIcon>
							}>
							{user.username}
						</Badge>
					))}
				<TextInput
					value={value}
					onChange={event => setValue(event.currentTarget.value)}
					sx={{
						width: '100%',
						input: {
							'&:focus-within': {
								borderColor: 'transparent',
							},
						},
					}}
					placeholder='Search...'
				/>
			</Group>
		</Flex>
	)
}

export default UserSelection
