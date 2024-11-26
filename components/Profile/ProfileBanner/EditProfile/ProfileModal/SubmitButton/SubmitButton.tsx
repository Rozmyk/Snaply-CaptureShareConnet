import { Button, Loader } from '@mantine/core'
interface SubmitButtonProps {
	loading: boolean
	setUpChanges: () => void
}
const SubmitButton = ({ loading, setUpChanges }: SubmitButtonProps) => {
	return <Button onClick={setUpChanges}>{loading ? <Loader size='xs' color='white' /> : 'Submit'}</Button>
}

export default SubmitButton
