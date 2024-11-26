import TagsContainer from '../../../../../components/ExplorePage/Tags/TagsContainer/TagsContainer'
export default function Page({ params }: { params: { tag: string } }) {
	return <TagsContainer tag={params.tag} />
}
