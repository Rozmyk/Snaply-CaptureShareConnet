import { Flex, ActionIcon, Text } from '@mantine/core'
import { useRouter, usePathname } from 'next/navigation'
import { IconChevronLeft } from '@tabler/icons-react'
const ProfileHeader = () => {
	const router = useRouter()
	const pathname = usePathname()
	const getProfileValue = () => {
		const pathParts = pathname.split('/')

		const profileIndex = pathParts.indexOf('profile')

		if (profileIndex !== -1 && profileIndex + 1 < pathParts.length) {
			return pathParts[profileIndex + 1]
		}
		return null
	}

	const profileValue = getProfileValue()

	return (
		<Flex h='100%' justify='space-between' align='center' p='xs'>
			<ActionIcon
				size='lg'
				onClick={() => {
					router.push('/')
				}}>
				<IconChevronLeft size='lg' />
			</ActionIcon>
			<Text fz='lg' fw={600}>
				{profileValue}
			</Text>
			<div></div>
		</Flex>
	)
}

export default ProfileHeader
