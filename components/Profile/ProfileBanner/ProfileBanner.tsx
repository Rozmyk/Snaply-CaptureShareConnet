'use client'
import { useMediaQuery } from '@mantine/hooks'
import ProfileBannerMobile from './ProfileBannerMobile/ProfileBannerMobile'
import ProfileBannerDesktop from './ProfileBannerDesktop/ProfileBannerDesktop'
interface ProfileBannerProps {
	image: string
	username: string
	description: string
	name: string
	id: string
	isCurrentUser: boolean
	descriptionLink: string
	followers: string[]
	following: string[]
}
const ProfileBanner = ({
	image,
	username,
	description,
	name,
	id,
	isCurrentUser,
	descriptionLink,
	followers,
	following,
}: ProfileBannerProps) => {
	const isSmallScreen = useMediaQuery('(max-width: 775px)')

	return isSmallScreen ? (
		<ProfileBannerMobile
			username={username}
			image={image}
			isCurrentUser={isCurrentUser}
			id={id}
			name={name}
			description={description}
			descriptionLink={descriptionLink}
			followers={followers}
			following={following}
		/>
	) : (
		<ProfileBannerDesktop
			username={username}
			image={image}
			isCurrentUser={isCurrentUser}
			id={id}
			name={name}
			description={description}
			descriptionLink={descriptionLink}
			followers={followers}
			following={following}
		/>
	)
}

export default ProfileBanner
