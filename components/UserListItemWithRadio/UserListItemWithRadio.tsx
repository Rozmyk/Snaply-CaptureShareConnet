import { Flex, Avatar, Text, Radio, useMantineColorScheme } from '@mantine/core'
import { CheckIcon } from '@mantine/core'
import { UserProps } from '../../types'
interface updatedUserProps extends UserProps {
	selected: boolean
}
interface UserListItemWithRadioProps {
	user: updatedUserProps
	onClickAction: () => void
}
const UserListItemWithRadio = ({ user, onClickAction }: UserListItemWithRadioProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Flex onClick={onClickAction} direction='row' p='xs' justify='space-between' align='center'>
			<Flex justify='flex-start' align='center' gap='sm'>
				<Avatar size={44} radius={'50%'} src={user.image}></Avatar>

				<Flex direction='column' justify='center' align='flex-start' gap='0'>
					<Text fz={14} color={dark ? 'white' : 'black'}>
						{user.username}
					</Text>
					<Text fz={14} color={dark ? '#a8a8a8' : '#737373'}>
						{user.name}
					</Text>
				</Flex>
			</Flex>
			<Radio
				icon={CheckIcon}
				checked={user.selected}
				sx={{
					borderRadius: '50%',
					'.mantine-Radio-radio': {
						backgroundColor: user.selected ? '#f9f9f8' : 'none',

						border: dark ? '1.5px solid #f9f9f8' : '1.5px solid #dee0e3',
					},
					'.mantine-Radio-icon	': {
						color: 'black',
					},
				}}
				size='md'
				value='nu'
			/>
		</Flex>
	)
}

export default UserListItemWithRadio
