import SearchContent from '../../../../../SearchContent/SearchContent'
import SearchPanel from '../../../../../SearchContent/SearchPanel/SearchPanel'
import { Dispatch, SetStateAction, useState } from 'react'
const SearchContentContainer = ({
	opened,
	setOpened,
}: {
	opened: boolean
	setOpened: Dispatch<SetStateAction<boolean>>
}) => {
	const [inputValue, setInputValue] = useState('')
	return (
		<>
			<SearchPanel value={inputValue} setValue={setInputValue} />
			<SearchContent opened={opened} setOpened={setOpened} inputValue={inputValue} setInputValue={setInputValue} />
		</>
	)
}

export default SearchContentContainer
