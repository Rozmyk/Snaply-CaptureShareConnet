import { Flex, Text, Anchor } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
interface UserMenuProps {
	username: string
	dark: boolean
	open: () => void
}
const UserMenu = ({ username, dark, open }: UserMenuProps) => (
	<Anchor onClick={open} underline={false} component='button' sx={{ color: 'white' }}>
		<Flex justify='center' align='center' gap='5px'>
			<Text fz='xl' fw={700} color={dark ? '#f5f5f5' : 'black'}>
				{username}
			</Text>
			<IconChevronDown stroke={1.5} color={dark ? '#f5f5f5' : 'black'} size={'20px'} />
		</Flex>
	</Anchor>
)

export default UserMenu
