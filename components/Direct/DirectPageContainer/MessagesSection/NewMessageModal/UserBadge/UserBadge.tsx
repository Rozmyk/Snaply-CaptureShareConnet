import { Badge, ActionIcon, rem } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
interface UserBadgeProps {
	userId: string
	username: string
	removeUser: (userId: string) => void
}
const UserBadge = ({ userId, username, removeUser }: UserBadgeProps) => {
	return (
		<div key={userId}>
			<Badge
				rightSection={
					<ActionIcon
						onClick={() => {
							removeUser(userId)
						}}
						size='xs'
						color='blue'
						radius='xl'
						variant='transparent'>
						<IconX color='#289df1' size={rem(20)} />
					</ActionIcon>
				}
				size='lg'
				sx={{
					backgroundColor: '#e1f0ff',
					color: '#289df1',
					fontWeight: 500,
					textTransform: 'none',
				}}
				variant='filled'>
				{username}
			</Badge>
		</div>
	)
}

export default UserBadge
