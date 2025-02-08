'use client'
import { useHover } from '@mantine/hooks'
import { Tooltip, Flex, Text, NavLink, useMantineColorScheme } from '@mantine/core'
import { IconUserFilled, IconHeartFilled, IconMessageCircle2Filled } from '@tabler/icons-react'
import NavbarItemTablet from '../NavbarItem/NavbarItemTablet'
import NotificationsIcon from './NotificationsIcon/NotificationsIcon'
import { useNotifications } from '../../../../context/NotificationsContext'
import { ReactNode } from 'react'
interface NotificationsButtonProps {
	variant: string
	onClick: () => void
	sidebarStatus: boolean
}
interface newNotificationsProps {
	newComments: number
	newLikes: number
	newFollows: number
}
const NotificationsButton = ({ variant, onClick, sidebarStatus }: NotificationsButtonProps) => {
	const { newComments, newLikes, newFollows } = useNotifications() as newNotificationsProps
	const { colorScheme } = useMantineColorScheme()
	const { hovered, ref } = useHover()
	const TooltipComponent = ({ children }: { children: ReactNode }) => (
		<Tooltip
			opened={sidebarStatus ? false : newComments > 0 || newLikes > 0 || newFollows > 0}
			position='right'
			color='#ee4652'
			offset={10}
			arrowPosition='side'
			withArrow
			transitionProps={{ transition: 'pop', duration: 300 }}
			arrowSize={6}
			label={
				<Flex justify='center' align='center' gap='xs'>
					{newFollows > 0 && (
						<Flex justify='center' align='center' gap='2px'>
							<IconUserFilled size={15} />
							<Text>{newFollows}</Text>
						</Flex>
					)}
					{newLikes > 0 && (
						<Flex justify='center' align='center' gap='2px'>
							<IconHeartFilled size={15} />
							<Text>{newLikes}</Text>
						</Flex>
					)}
					{newComments > 0 && (
						<Flex justify='center' align='center' gap='2px'>
							<IconMessageCircle2Filled size={15} />
							<Text>{newComments}</Text>
						</Flex>
					)}
				</Flex>
			}>
			{children}
		</Tooltip>
	)

	return (
		<>
			{variant === 'tablet' && (
				<TooltipComponent>
					<div>
						<NavbarItemTablet onClick={onClick} label='Notifications' icon={NotificationsIcon} />
					</div>
				</TooltipComponent>
			)}

			{variant === 'desktop' && (
				<div ref={ref} style={{ width: '100%' }}>
					<NavLink
						onClick={onClick}
						sx={{
							borderRadius: '10px',
							transition: '0.2s',
							'&:hover': {
								backgroundColor: colorScheme == 'dark' ? '#1b1a1b' : '#f2f3f3',
							},
						}}
						label={
							<TooltipComponent>
								<Text
									fw={400}
									color={colorScheme == 'dark' ? 'white' : 'black'}
									sx={{ display: 'inline-block' }}
									fz='md'>
									Notifications
								</Text>
							</TooltipComponent>
						}
						color='gray'
						variant='subtle'
						icon={
							<div
								style={{
									transform: hovered ? 'scale(1.1)' : 'scale(1.0)',
									transition: '0.2s',
								}}>
								<NotificationsIcon />
							</div>
						}></NavLink>
				</div>
			)}
		</>
	)
}

export default NotificationsButton
