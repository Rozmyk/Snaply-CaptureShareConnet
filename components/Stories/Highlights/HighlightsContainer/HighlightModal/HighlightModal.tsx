import { Modal, Portal, Flex } from '@mantine/core'
import { useRouter } from 'next/navigation'
import HighlightHeader from './HighlightHeader/HighlightHeader'
import HighlightBody from './HighlightBody/HighlightBody'
import HighlightLoading from './HighlightLoading/HighlightLoading'
import ErrorPage from '../../../../ErrorPage/ErrorPage'
import './Carousel.css'
import { SingleSavedStoryProps } from '../../../../../types'
import { useMediaQuery } from '@mantine/hooks'
interface HighlightModalProps {
	highlightLoading: boolean
	allHighlightsData: SingleSavedStoryProps[] | null
	scales: number[]
	highlightDisplayCount: number
	failedHighlightId: boolean
}

const HighlightModal = ({
	highlightLoading,
	allHighlightsData,
	scales,
	highlightDisplayCount,
	failedHighlightId,
}: HighlightModalProps) => {
	const router = useRouter()
	const isSmallScreen = useMediaQuery('(max-width: 720px)')

	return failedHighlightId ? (
		<ErrorPage />
	) : isSmallScreen ? (
		<Portal>
			<div
				style={{
					height: '100vh',
					width: '100vw',
					position: 'absolute',
					padding: 0,
					margin: 0,
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'black',
					zIndex: 1000,
					overflow: 'hidden',
				}}>
				<Flex justify='center' align='center' h='100%' p={0} m={0}>
					{highlightLoading ? (
						<HighlightLoading />
					) : (
						allHighlightsData && (
							<HighlightBody
								allHighlightsData={allHighlightsData}
								scales={scales}
								highlightDisplayCount={highlightDisplayCount}
							/>
						)
					)}
				</Flex>
			</div>
		</Portal>
	) : (
		<Modal.Root
			fullScreen
			opened={true}
			onClose={() => {
				router.push(`/`)
			}}>
			<Modal.Overlay />
			<Modal.Content sx={{ backgroundColor: '#1b1a1b' }}>
				<HighlightHeader
					onClose={() => {
						router.push(`/`)
					}}
				/>

				<Modal.Body
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%',
					}}>
					{highlightLoading ? (
						<HighlightLoading />
					) : (
						allHighlightsData && (
							<HighlightBody
								allHighlightsData={allHighlightsData}
								scales={scales}
								highlightDisplayCount={highlightDisplayCount}
							/>
						)
					)}
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	)
}

export default HighlightModal
