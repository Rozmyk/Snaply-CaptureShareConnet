'use client'
import { MentionsInput, Mention } from 'react-mentions'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { ScrollArea, Flex, Text, useMantineColorScheme } from '@mantine/core'
import { UpdatedTagProps } from '../../../../types'
import Image from 'next/image'
interface customUserProps {
	id: string
	image: string
	name: string
	display: string
}
interface InputMentionProps {
	value: string
	setMentionedTags: Dispatch<SetStateAction<string[] | null>>
	setMentionedUsers: Dispatch<SetStateAction<string[] | null>>
	users: customUserProps[] | null
	tags: UpdatedTagProps[] | null
	handleChange: (event: any, newValue: string, newPlainTextValue: string) => void
	mentionedTags: string[] | null
	maxWidth: number
	singleLine: boolean
}
interface userSuggestionProps {
	image: string
	display: string
	name: string
}
interface tagSuggestionProps {
	display: string
	postLength: number
	image: string
}

const InputMention = ({
	value,
	setMentionedTags,
	setMentionedUsers,
	users,
	tags,
	handleChange,
	mentionedTags,
	maxWidth,
	singleLine,
}: InputMentionProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	useEffect(() => {
		const regex = /#[^\s#]*/g
		const foundHashtags = value.match(regex)
		const checkIfAlreadyExists = (hashtag: string) => {
			if (mentionedTags && mentionedTags.includes(`#${hashtag}`)) {
				return true
			}

			return false
		}
		if (foundHashtags) {
			foundHashtags.forEach(foundHashtag => {
				if (checkIfAlreadyExists(foundHashtag)) {
					setMentionedTags(prevArray => (prevArray ? [...prevArray, foundHashtag] : [foundHashtag]))
				}
			})
		}
	}, [value, mentionedTags, setMentionedTags])

	useEffect(() => {
		if (value == '') {
			setMentionedTags(null)
			setMentionedUsers(null)
		}
	}, [value, setMentionedUsers, setMentionedTags])

	const style = {
		width: '100%',
		maxWidth: maxWidth,

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
			input: {
				outline: 'none',
				border: 'none',
				padding: 1,
				maxHeight: '100px',
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
	const renderUserSuggestion = (suggestion: userSuggestionProps) => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-start' }}>
			<Image
				src={suggestion.image}
				alt={suggestion.display}
				style={{
					width: '30px',
					height: '30px',
					borderRadius: '50%',
				}}
			/>
			<Flex direction='column'>
				<Text color={dark ? 'white' : 'black'} fz='sm' fw={700}>
					{suggestion.display}
				</Text>
				<Text fz='xs' color={dark ? '#737373' : '#a8a8a8'}>
					{suggestion.name}
				</Text>
			</Flex>
		</div>
	)
	const renderTagsSuggestion = (suggestion: tagSuggestionProps) => (
		<Flex direction='column' sx={{ wordWrap: 'break-word', maxWidth: 300 }}>
			<Text color={dark ? 'white' : 'black'} fw={700}>
				#{suggestion.display}
			</Text>
			<Text fz='xs' color={dark ? '#737373' : '#a8a8a8'}>
				{`Posts: ${suggestion.postLength}`}{' '}
			</Text>
		</Flex>
	)

	return (
		<MentionsInput
			singleLine={singleLine}
			placeholder='Add a comment...'
			allowSuggestionsAboveCursor={true}
			forceSuggestionsAboveCursor={true}
			style={style}
			value={value}
			customSuggestionsContainer={children => (
				<ScrollArea.Autosize mah={300} w={250} mx='auto'>
					{children}
				</ScrollArea.Autosize>
			)}
			onChange={handleChange}>
			<Mention
				markup='@[__display__](type:userMention)'
				displayTransform={(id: string, display) => `@${display}`}
				trigger='@'
				onAdd={id => {
					setMentionedUsers(prevArray => (prevArray ? [...prevArray, id as string] : [id as string]))
				}}
				data={users}
				renderSuggestion={renderUserSuggestion}
			/>
			<Mention
				displayTransform={(id, display) => `#${display}`}
				onAdd={(id, display) => {
					const itemToAdd = '#' + display
					setMentionedTags(prevArray => (prevArray ? [...prevArray, itemToAdd] : [itemToAdd]))
				}}
				renderSuggestion={renderTagsSuggestion}
				markup='#__display__'
				trigger='#'
				data={tags}
			/>
		</MentionsInput>
	)
}

export default InputMention
