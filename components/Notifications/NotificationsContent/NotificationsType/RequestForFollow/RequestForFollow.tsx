import { Flex, Avatar, Text, Button } from '@mantine/core'
import { UserProps } from '../../../../../types'
const RequestForFollow = ({ user }: { user: UserProps }) => {
	return (
		<Flex justify='space-between' align='center' gap='xs' pb='sm'>
			<Avatar radius={'50%'} src={user.image}></Avatar>
			<Text fw={400} size='xs'>
				<span style={{ fontWeight: '700' }}>{`${user.username} `}</span>
				requested to follow you.
				<span style={{ color: '#A8A8A8' }}> 3h</span>
			</Text>
			<Flex gap='sm'>
				<Button color='#0095f6' size='xs'>
					Confirm
				</Button>
				<Button size='xs' color='gray'>
					Delete
				</Button>
			</Flex>
		</Flex>
	)
}

export default RequestForFollow
