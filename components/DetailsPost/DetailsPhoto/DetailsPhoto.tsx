import { Image, Skeleton } from '@mantine/core'
interface DetailsPhotoProps {
	src: string
	loading: boolean
}
const DetailsPhoto = ({ src, loading }: DetailsPhotoProps) => {
	return loading ? <Skeleton h={600} w='100%' /> : <Image alt='Post photo' w='auto' height={600} src={src} />
}

export default DetailsPhoto
