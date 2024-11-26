'use client'

import NavbarItemDesktop from '../../NavbarItem/NavbarItemDesktop'
import PostModal from './PostModal/PostModal'
import { IconSquareRoundedPlus } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import NavbarItemTablet from '../../NavbarItem/NavbarItemTablet'
const CreatePost = ({ variant }: { variant: string }) => {
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<>
			<PostModal opened={opened} close={close} />
			{variant === 'tablet' && <NavbarItemTablet onClick={open} label='Create' icon={IconSquareRoundedPlus} />}
			{variant === 'desktop' && <NavbarItemDesktop onClick={open} label='Create' icon={IconSquareRoundedPlus} />}
		</>
	)
}

export default CreatePost
