import { Grid } from '@mantine/core'
import UserStats from '../ProfileStats/UserStats/UserStats'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import ProfileDetails from './ProfileDetails/ProfileDetails'
import ProfileDescription from '../ProfileDescription/ProfileDescription'
interface ProfileBannerMobileProps {
	username: string
	image: string
	id: string
	description: string
	name: string
	isCurrentUser: boolean
	followers: string[]
	following: string[]
	descriptionLink: string
}
const ProfileBannerMobile = ({
	username,
	name,
	image,
	id,
	description,
	isCurrentUser,
	followers,
	following,
	descriptionLink,
}: ProfileBannerMobileProps) => {
	return (
		<Grid p='sm'>
			<Grid.Col span={4}>
				<ProfileAvatar id={id} size={70} username={username} image={image} />
			</Grid.Col>

			<ProfileDetails isCurrentUser={isCurrentUser} username={username} id={id} />
			<Grid.Col span={12}>
				<ProfileDescription name={name} description={description} descriptionLink={descriptionLink} />
			</Grid.Col>
			<Grid.Col span={12} mb={5} mt={5}>
				<UserStats followers={followers} following={following} userId={id} />
			</Grid.Col>
		</Grid>
	)
}

export default ProfileBannerMobile
