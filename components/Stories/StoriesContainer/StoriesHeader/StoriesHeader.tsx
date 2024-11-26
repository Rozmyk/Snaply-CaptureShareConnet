import React from 'react'
import { Flex, CloseButton, Box } from '@mantine/core'
import Image from 'next/image'
import snaplyLogo from '../../../../public/logoWhite.svg'

interface StoriesHeaderProps {
	onClose: () => void
}

const StoriesHeader = ({ onClose }: StoriesHeaderProps) => {
	return (
		<Box
			sx={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				width: '100%',
			}}>
			<Flex justify='space-between' align='center' p='sm'>
				<Image alt='Snaply logo' width={85} src={snaplyLogo}></Image>
				<CloseButton variant='transparent' sx={{ color: 'white' }} size='lg' onClick={onClose} />
			</Flex>
		</Box>
	)
}

export default StoriesHeader
