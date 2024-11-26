import { Center, Skeleton, Group } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
const StoriesLoading = () => {
	const isSmallScreen = useMediaQuery('(max-width: 775px)')

	return (
		<Group>
			<Skeleton height={isSmallScreen ? 55 : 77} circle />
			<Skeleton height={isSmallScreen ? 55 : 77} circle />
			<Skeleton height={isSmallScreen ? 55 : 77} circle />
		</Group>
	)
}

export default StoriesLoading
