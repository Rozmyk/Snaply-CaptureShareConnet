import { Grid } from '@mantine/core'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import ProfileInfo from '../ProfileInfo/ProfileInfo'
import ProfileStats from '../ProfileStats/ProfileStats'
import ProfileDescription from '../ProfileDescription/ProfileDescription'
interface ProfileBannerDesktopProps {
	username: string
	image: string
	isCurrentUser: boolean
	id: string
	name: string
	description: string
	descriptionLink: string
	followers: string[]
	following: string[]
}
const ProfileBannerDesktop = ({
	username,
	image,
	isCurrentUser,
	id,
	name,
	description,
	descriptionLink,
	followers,
	following,
}: ProfileBannerDesktopProps) => (
	<Grid mt='xl'>
		<Grid.Col span={4}>
			<ProfileAvatar size={150} username={username} image={image} id={id} />
		</Grid.Col>
		<Grid.Col span={8}>
			<ProfileInfo username={username} isCurrentUser={isCurrentUser} id={id} />
			<ProfileStats followers={followers} following={following} userId={id} />
			<ProfileDescription name={name} description={description} descriptionLink={descriptionLink} />
		</Grid.Col>
	</Grid>
)

export default ProfileBannerDesktop
