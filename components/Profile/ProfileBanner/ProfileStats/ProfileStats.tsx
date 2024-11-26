import UserStats from './UserStats/UserStats'
interface ProfileStatsProps {
	followers: string[]
	following: string[]
	userId: string
}
const ProfileStats = ({ followers, following, userId }: ProfileStatsProps) => (
	<UserStats followers={followers} following={following} userId={userId} />
)

export default ProfileStats
