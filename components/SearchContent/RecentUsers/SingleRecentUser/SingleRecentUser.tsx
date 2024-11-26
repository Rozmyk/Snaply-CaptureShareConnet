import { useRouter } from 'next/navigation'
import { UnstyledButton, Grid, Avatar, Flex, Text, Tooltip, ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import { UserProps } from '../../../../types'
import { Dispatch, SetStateAction } from 'react'
interface SingleRecentUserProps {
	recentUser: UserProps
	deleteUserfromRecentUsers: (user: UserProps) => void
	setOpened: Dispatch<SetStateAction<boolean>>
}
const SingleRecentUser = ({ recentUser, deleteUserfromRecentUsers, setOpened }: SingleRecentUserProps) => {
	const router = useRouter()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const handleClick = () => {
		router.push(`/profile/${recentUser.username}`)
		setOpened(false)
	}
	return (
		<UnstyledButton
			sx={{
				width: '100%',
				padding: '7px 10px',
				'&:hover': {
					backgroundColor: dark ? '#1b1a1b' : '#f2f2f2',
				},
			}}
			onClick={handleClick}>
			<Grid>
				<Grid.Col span={2}>
					<Avatar size={40} radius='50%' src={recentUser.image} />
				</Grid.Col>
				<Grid.Col span={8}>
					<Flex direction='column' justify='center' align='flex-start' gap='none'>
						<Text color={dark ? '#f5f5f5' : 'black'} fz='sm' fw={600}>
							{recentUser.username}
						</Text>
						<Text color={dark ? '#a8a8a8' : '#737373'} fz='sm'>
							{recentUser.name}
						</Text>
					</Flex>
				</Grid.Col>

				<Grid.Col span={2}>
					<Flex justify='center' align='center' w='100%' h='100%'>
						<Tooltip label='Delete' position='right'>
							<ActionIcon
								sx={{ cursor: 'pointer' }}
								color='dark'
								size='xs'
								onClick={e => {
									e.stopPropagation()
									deleteUserfromRecentUsers(recentUser)
								}}>
								<IconX style={{ color: dark ? 'white' : 'black' }} />
							</ActionIcon>
						</Tooltip>
					</Flex>
				</Grid.Col>
			</Grid>
		</UnstyledButton>
	)
}

export default SingleRecentUser
