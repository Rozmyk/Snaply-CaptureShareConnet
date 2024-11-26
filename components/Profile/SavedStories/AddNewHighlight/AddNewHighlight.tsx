'use client'
import { Flex, Box, Text, useMantineColorScheme } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons-react'
import ModalContent from './ModalContent/ModalContent'
const AddNewHighlight = () => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const isSmallScreen = useMediaQuery('(max-width: 775px)')

	const [opened, { open, close }] = useDisclosure(false)

	return (
		<>
			<ModalContent opened={opened} close={close} />
			<Flex onClick={open} direction='column' justify='center' align='center' sx={{ cursor: 'pointer' }}>
				<Box sx={{ padding: '2px', borderRadius: '50%', border: `1.5px solid ${dark ? '#232323' : '#dedede'} ` }}>
					<Box
						h={isSmallScreen ? 55 : 77}
						w={isSmallScreen ? 55 : 77}
						sx={{ backgroundColor: dark ? '#121212' : '#fafafa', borderRadius: '50%' }}>
						<Flex w='100%' h='100%' justify='center ' align='center'>
							<IconPlus color={dark ? '#737373' : '#c7c7c7'} stroke={1} size={isSmallScreen ? 35 : 50} />
						</Flex>
					</Box>
				</Box>
				<Text fz={12} fw={600}>
					New
				</Text>
			</Flex>
		</>
	)
}

export default AddNewHighlight
