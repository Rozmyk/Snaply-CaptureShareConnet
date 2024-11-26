import { Stack, Flex } from '@mantine/core'
import HomeButton from '../../HomeButton/HomeButton'
import SearchButton from '../../common/SearchButton/SearchButton'
import ExploreButton from '../../common/ExploreButton/ExploreButton'
import MessageButton from '../../common/MessageButton/MessageButton'
import NotificationsButton from '../../NotificationsButton/NotificationsButton'
import CreatePost from '../../common/CreatePost/CreatePost'
import ProfileButton from '../../ProfileButton/ProfileButton'
import MenuButton from '../../NavbarItem/MenuButton/MenuButton'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
interface SidebarButtonsProps {
	variant: string
	isWindowOpen: boolean
	setIsWindowOpen: Dispatch<SetStateAction<boolean>>
	setExpanderActiveContent: Dispatch<SetStateAction<string>>
}
const SidebarButtons = ({ variant, isWindowOpen, setIsWindowOpen, setExpanderActiveContent }: SidebarButtonsProps) => {
	const router = useRouter()
	return (
		<Flex h='100%' w='100%' direction='column' justify='space-between' align='center'>
			<Stack spacing='sm' w='100%'>
				<HomeButton variant={variant} />
				<SearchButton
					variant={variant}
					onClick={() => {
						setIsWindowOpen(false)
						setExpanderActiveContent('search')
						setIsWindowOpen(true)
					}}
				/>
				<ExploreButton variant={variant} />
				<MessageButton
					variant={variant}
					onClick={() => {
						router.push('/direct')
					}}
				/>
				<NotificationsButton
					variant={variant}
					sidebarStatus={isWindowOpen}
					onClick={() => {
						setIsWindowOpen(false)
						setExpanderActiveContent('notifications')
						setIsWindowOpen(true)
					}}
				/>
				<CreatePost variant={variant} />
				<ProfileButton variant={variant} />
			</Stack>
			<Stack w={'100%'}>
				<MenuButton variant={variant} />
			</Stack>
		</Flex>
	)
}

export default SidebarButtons
