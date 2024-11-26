import { Flex, ActionIcon, rem } from '@mantine/core'
import Image from 'next/image'
import LogoWhite from '../../../../../public/logoWhite.svg'
import LogoBlack from '../../../../../public/logoBlack.svg'
import LogoIcon from '../../../../../public/logoIcon.svg'
import LogoIconBlack from '../../../../../public/logoIconBlack.svg'
import { useRouter } from 'next/navigation'
interface SidebarHeaderProps {
	narrowView: boolean
	dark: boolean
}
function SidebarHeader({ narrowView, dark }: SidebarHeaderProps) {
	const router = useRouter()
	return (
		<Flex justify='flex-start' align='center' mb='xl' mt='xl' w='100%'>
			{narrowView ? (
				<ActionIcon
					onClick={() => {
						router.push('/')
					}}
					style={{ width: rem(48), height: rem(48), borderRadius: '8px' }}>
					<Image alt='Snaply Logo' width={25} src={dark ? LogoIcon : LogoIconBlack}></Image>
				</ActionIcon>
			) : (
				<div
					style={{ cursor: 'pointer' }}
					onClick={() => {
						router.push('/')
					}}>
					<Image style={{ padding: '8px 12px', width: 105 }} alt='Snaply logo' src={dark ? LogoWhite : LogoBlack} />
				</div>
			)}
		</Flex>
	)
}

export default SidebarHeader
