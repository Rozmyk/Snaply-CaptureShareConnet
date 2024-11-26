import { BackgroundImage } from '@mantine/core'
import DetailedStoryHeader from '../../../../../../../StoriesContainer/StoriesBody/Slide/SingleStory/CustomStory/DetailedStoryHeader/DetailedStoryHeader'
import { useRouter } from 'next/navigation'
import { UserProps } from '../../../../../../../../../types'
import { Timestamp } from 'firebase-admin/firestore'
interface CustomMobileSlideProps {
	isPaused: boolean
	action: (action: string) => void
	story: {
		duration: number
		url: string
		user: UserProps
		createdAt: Timestamp
		id: string
		content: (props: any) => JSX.Element
	}
}
const CustomMobileSlide = (props: CustomMobileSlideProps) => {
	console.log(props)
	const router = useRouter()
	return (
		<BackgroundImage w={'100%'} h='100%' radius='sm' src={props.story.url}>
			<DetailedStoryHeader
				closeButtonAction={() => {
					router.push('/')
				}}
				width={'100%'}
				{...props}
			/>
		</BackgroundImage>
	)
}

export default CustomMobileSlide
