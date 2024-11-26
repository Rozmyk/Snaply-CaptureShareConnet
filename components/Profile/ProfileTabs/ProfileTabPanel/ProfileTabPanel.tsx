import { Tabs, Center } from '@mantine/core'
import UserPosts from '../UserPosts/UserPosts'
import SavedPost from '../SavedPost/SavedPost'
import TaggedPosts from '../TaggedPosts/TaggedPosts'
interface ProfileTabPanel {
	userId: string
	savedPostIds: string[]
	isCurrentUser: boolean
}
const ProfileTabPanel = ({ userId, savedPostIds, isCurrentUser }: ProfileTabPanel) => {
	return (
		<>
			<Tabs.Panel value='posts' pt='xs'>
				<UserPosts userId={userId} isCurrentUser={isCurrentUser} />
			</Tabs.Panel>
			{isCurrentUser && (
				<Tabs.Panel value='saved' pt='xs'>
					<SavedPost savedPostIds={savedPostIds} />
				</Tabs.Panel>
			)}
			<Tabs.Panel value='tagged' pt='xs'>
				<Center>
					<TaggedPosts userId={userId} />
				</Center>
			</Tabs.Panel>
		</>
	)
}

export default ProfileTabPanel
