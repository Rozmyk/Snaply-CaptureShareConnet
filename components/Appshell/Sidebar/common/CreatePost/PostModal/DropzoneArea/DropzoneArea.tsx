import { Dispatch, SetStateAction, useRef } from 'react'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@mantine/hooks'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import { IconPhotoHeart } from '@tabler/icons-react'
import { Flex, Text, useMantineColorScheme, Box } from '@mantine/core'
import ModalHeader from '../../../../../commonComponents/CreatePostModal/ModalHeader/ModalHeader'
import CustomButton from '../../../../../../CustomButton/CustomButton'

interface DropzoneAreaProps {
	setImageUrl: Dispatch<SetStateAction<string>>
	setFileData: Dispatch<SetStateAction<File | null>>
	nextStep: () => void
	hideModal: () => void
}

const DropzoneArea = ({ setImageUrl, setFileData, nextStep, hideModal }: DropzoneAreaProps) => {
	const openRef = useRef<() => void>(null)
	const isSmallScreen = useMediaQuery('(max-width: 720px)')

	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const dropzoneVariants = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
	}

	return (
		<Box
			sx={{
				width: isSmallScreen ? '100vw' : '82vh',
				height: isSmallScreen ? '100vh' : '82vh',
				maxWidth: isSmallScreen ? '100%' : '855px',
				maxHeight: isSmallScreen ? '100%' : '750px',
				overflow: 'hidden',
			}}>
			<ModalHeader centerText='Create new post' closeButton={isSmallScreen} closeButtonAction={hideModal} />

			<motion.div
				initial='initial'
				animate='animate'
				style={{ width: '100%', height: '100%' }}
				variants={dropzoneVariants}
				transition={{ duration: 0.3 }}>
				<Dropzone
					accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.svg, MIME_TYPES.gif]}
					onDrop={files => {
						setImageUrl(URL.createObjectURL(files[0]))
						setFileData(files[0])
						nextStep()
					}}
					onReject={files => console.log('rejected files', files)}
					openRef={openRef}
					sx={theme => ({
						display: 'flex',
						width: '100%',
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
						border: 0,
						backgroundColor: 'transparent',
						'&:hover': {
							backgroundColor: 'transparent',
						},

						'&[data-accept]': {
							color: theme.white,
							backgroundColor: theme.colors.blue[6],
						},

						'&[data-reject]': {
							color: theme.white,
							backgroundColor: theme.colors.red[6],
						},
					})}>
					<Flex justify='center' align='center' direction='column' gap='sm'>
						<IconPhotoHeart color={dark ? '#f5f5f5' : 'black'} size='5rem' stroke={0.75} />
						<Text color={dark ? '#f5f5f5' : 'black'} fw={400} fz='20px'>
							Drag photos and videos here
						</Text>
						<CustomButton
							onClick={() => {
								if (openRef.current) openRef.current()
							}}>
							Select from computer
						</CustomButton>
					</Flex>
				</Dropzone>
			</motion.div>
		</Box>
	)
}

export default DropzoneArea
