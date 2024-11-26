'use client'
import StoriesContainer from '../../../../components/Stories/StoriesContainer/StoriesContainer'
export default function Page({ params }: { params: { storyId: string; username: string } }) {
	return <StoriesContainer username={params.username} />
}
