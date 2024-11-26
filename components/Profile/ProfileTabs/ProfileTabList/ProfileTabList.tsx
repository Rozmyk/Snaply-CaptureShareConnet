import { Tabs } from '@mantine/core'
import { IconGridPattern, IconBookmark, IconTag } from '@tabler/icons-react'
interface ProfileTabListProps {
	isCurrentUser: boolean
}
const ProfileTabList = ({ isCurrentUser }: ProfileTabListProps) => {
	return (
		<Tabs.List position='center'>
			<Tabs.Tab icon={<IconGridPattern size='12px' />} value='posts'>
				Posts
			</Tabs.Tab>
			{isCurrentUser && (
				<Tabs.Tab icon={<IconBookmark size='12px' />} value='saved'>
					Saved
				</Tabs.Tab>
			)}
			<Tabs.Tab icon={<IconTag size='12px' />} value='tagged'>
				Tagged
			</Tabs.Tab>
		</Tabs.List>
	)
}

export default ProfileTabList
