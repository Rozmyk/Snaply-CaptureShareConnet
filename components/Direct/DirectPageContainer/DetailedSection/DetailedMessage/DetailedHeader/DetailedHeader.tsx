import { Flex, useMantineColorScheme } from '@mantine/core'
import { UserProps } from '../../../../../../types'
import { useMediaQuery } from '@mantine/hooks'
import DetailedHeaderMobile from './DetailedHeaderMobile/DetailedHeaderMobile'
import DetailedHeaderDesktop from './DetailedHeaderDesktop/DetailedHeaderDesktop'
interface DetailedHeaderProps {
	activeUser: UserProps | null
}
const DetailedHeader = ({ activeUser }: DetailedHeaderProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const isSmallScreen = useMediaQuery('(max-width: 720px)')

	return (
		<Flex justify='space-between' p='md' sx={{ borderBottom: `1px solid ${dark ? '#232323' : '#dadbda'}` }}>
			{isSmallScreen
				? activeUser && <DetailedHeaderMobile dark={dark} activeUser={activeUser} />
				: activeUser && <DetailedHeaderDesktop dark={dark} activeUser={activeUser} />}
		</Flex>
	)
}

export default DetailedHeader
