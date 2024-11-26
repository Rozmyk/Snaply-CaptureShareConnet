import { Avatar } from '@mantine/core'
interface UserAvatarProps {
	src: string
	alt: string
	size: number | string
}
const UserAvatar = ({ src, alt, size }: UserAvatarProps) => {
	return <Avatar radius='50%' size={size} src={src} alt={alt}></Avatar>
}

export default UserAvatar
