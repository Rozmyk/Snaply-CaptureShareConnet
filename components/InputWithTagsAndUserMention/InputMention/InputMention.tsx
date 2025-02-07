import { MentionsInput, Mention } from 'react-mentions'
import { ScrollArea } from '@mantine/core'
import UserSuggestion from './UserSuggestion/UserSuggestion'
import TagSuggestion from './TagSuggestion/TagSuggestion'
import { Dispatch, SetStateAction } from 'react'
import { DownloadTagProps } from '../../../types'

type updatedUsersProps = {
	id: string
	image: string
	name: string
	display: string
}
interface MentionInputProps {
	inputValue: string
	setMentionedUsers: Dispatch<SetStateAction<string[]>>
	setMentionedTags: Dispatch<SetStateAction<string[]>>
	users: updatedUsersProps[]
	tags: DownloadTagProps[]
	dark: boolean
	handleChange: (
		event: { target: { value: string } },
		newValue: string,
		newPlainTextValue: string,
		mentions: {}
	) => void
	inputWidth: number
	maxHeight?: number
	singleLine: boolean
}

const InputMention = ({
	inputValue,
	setMentionedTags,
	setMentionedUsers,
	users,
	tags,
	dark,
	handleChange,
	inputWidth,
	singleLine,
	maxHeight,
}: MentionInputProps) => {
	const style = {
		width: '100%',
		maxWidth: inputWidth,

		control: {
			fontSize: 14,
			fontWeight: 'normal',
		},
		'&singleLine': {
			highlighter: {},
			input: {
				outline: 'none',
				border: 'none',
				padding: 1,
			},
		},
		'&multiLine': {
			maxHeight: maxHeight,
			input: {
				overflowY: 'auto',
				outline: 'none',
				border: 'none',
				padding: 1,
				maxHeight: maxHeight,
				maxWidth: '100%',
			},
		},
		suggestions: {
			list: {
				backgroundColor: dark ? 'black' : 'white',
				fontSize: 14,
			},
			item: {
				padding: '5px 15px',
				'&focused': {
					backgroundColor: dark ? '#1b1a1b' : 'none',
				},
			},
		},
	}

	function findPostLengthById(id: string | number) {
		const tag = tags.find(tag => tag.id === id)
		return tag ? tag.postLength : null
	}
	function findUserNameById(id: string | number) {
		const user = users.find(user => user.id === id)
		return user ? user.name : null
	}
	function findUserImageById(id: string | number) {
		const user = users.find(user => user.id === id)
		return user ? user.image : null
	}
	return (
		<MentionsInput
			allowSuggestionsAboveCursor={true}
			singleLine={singleLine}
			placeholder='Add a comment...'
			style={style}
			value={inputValue}
			customSuggestionsContainer={children => (
				<ScrollArea.Autosize mah={300} w={250} mx='auto'>
					{children}
				</ScrollArea.Autosize>
			)}
			onChange={handleChange}>
			<Mention
				markup='@[__display__](type:userMention)'
				displayTransform={(id, display) => `@${display}`}
				trigger='@'
				onAdd={(id, display) => {
					setMentionedUsers(prevArray => [...prevArray, `${id}`])
				}}
				data={users}
				renderSuggestion={suggestion => (
					<UserSuggestion
						name={findUserNameById(suggestion.id)}
						image={findUserImageById(suggestion.id)}
						suggestion={suggestion}
						dark={dark}
					/>
				)}
			/>
			<Mention
				displayTransform={(id, display) => `#${display.toLowerCase()}`}
				onAdd={(id, display) => {
					setMentionedTags(prevArray => [...prevArray, `#${display.toLowerCase()}`])
				}}
				renderSuggestion={suggestion => (
					<TagSuggestion suggestion={suggestion} postLength={findPostLengthById(suggestion.id)} dark={dark} />
				)}
				markup='#__display__'
				trigger='#'
				data={tags}
			/>
		</MentionsInput>
	)
}

export default InputMention
