'use client'
import { useRef, useEffect, Dispatch, SetStateAction } from 'react'
import { Box } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { FixedCropper, ImageRestriction, FixedCropperRef } from 'react-advanced-cropper'
import { useElementSize } from '@mantine/hooks'
import 'react-advanced-cropper/dist/style.css'
import ModalHeader from '../../../../../commonComponents/CreatePostModal/ModalHeader/ModalHeader'

interface CropImageProps {
	imageUrl: string
	nextStep: () => void
	prevStep: () => void
	setCroppedFileData: Dispatch<SetStateAction<any | null>>
	setCroppedImageUrl: Dispatch<SetStateAction<string>>
}

const CropImage = ({ imageUrl, nextStep, prevStep, setCroppedFileData, setCroppedImageUrl }: CropImageProps) => {
	const cropperRef = useRef<FixedCropperRef>(null)
	const { ref, width, height } = useElementSize()
	const isSmallScreen = useMediaQuery('(max-width: 720px)')

	const setUpImageUrl = () => {
		if (cropperRef.current) {
			const canvas = cropperRef.current.getCanvas()
			if (canvas) {
				const canvasDataUrl = canvas.toDataURL()
				setCroppedImageUrl(canvasDataUrl)

				setCroppedFileData(cropperRef.current?.getCanvas())
			}
		}
	}

	return (
		<>
			<ModalHeader
				centerText='Crop'
				buttonText='Next'
				onButtonClick={() => {
					setUpImageUrl()
					nextStep()
				}}
				onActionIconClick={prevStep}
			/>
			<Box
				ref={ref}
				sx={{
					width: isSmallScreen ? '100%' : '82vh',
					height: isSmallScreen ? '100%' : '75vh',
					maxWidth: isSmallScreen ? '100%' : '855px',
					maxHeight: isSmallScreen ? '100%' : '750px',
					overflow: 'hidden',
				}}>
				<FixedCropper
					ref={cropperRef}
					style={{
						width: isSmallScreen ? '100%' : '82vh',
						height: isSmallScreen ? '100%' : '75vh',
						maxWidth: '855px',
						maxHeight: '750px',
					}}
					className={'cropper-scroll-example'}
					stencilSize={{
						width: width,
						height: height,
					}}
					stencilProps={{
						handlers: false,
						lines: false,
						movable: false,
						resizable: false,
						grid: true,
						aspectRatio: 1 / 1,
						imageRestriction: 'fillArea',
					}}
					transformImage={{
						adjustStencil: false,
					}}
					imageRestriction={ImageRestriction.stencil}
					src={imageUrl}
				/>
			</Box>
		</>
	)
}

export default CropImage
