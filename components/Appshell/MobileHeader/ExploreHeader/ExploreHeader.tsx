'use client'
import { TextInput, Button, Flex, ActionIcon, Portal, useMantineColorScheme } from '@mantine/core'
import { IconCircleXFilled, IconSearch } from '@tabler/icons-react'
import { useState } from 'react'
import SearchContent from '../../../SearchContent/SearchContent'
const ExploreHeader = () => {
	const [value, setValue] = useState('')
	const [opened, setOpened] = useState(false)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<>
			<Flex h='100%' p='xs' justify='space-between' align='center'>
				<TextInput
					placeholder='Search'
					onFocus={() => {
						setOpened(true)
					}}
					value={value}
					onChange={e => {
						setValue(e.target.value)
					}}
					style={{ flexGrow: 1 }}
					size='xs'
					sx={{
						'.mantine-TextInput-input': {
							backgroundColor: dark ? '#010001' : '#fefffe',
							border: dark ? '1px solid #949594' : '1px solid #828382 ',
						},
					}}
					icon={<IconSearch size='18px' />}
					rightSection={
						value.trim() !== '' && (
							<ActionIcon
								onClick={() => {
									setValue('')
								}}>
								<IconCircleXFilled size='18px' />
							</ActionIcon>
						)
					}
				/>
				{opened && (
					<Button
						onClick={() => {
							setOpened(false)
						}}
						compact
						variant='subtle'
						color='gray'>
						Cancel
					</Button>
				)}
			</Flex>

			{opened && (
				<Portal>
					<div
						style={{
							paddingTop: '10px',
							zIndex: 1000,
							position: 'absolute',
							bottom: 0,
							left: 0,
							right: 0,
							height: 'calc(100vh - 40px)',
							width: '100%',
							backgroundColor: 'black',
						}}>
						<SearchContent opened={opened} setOpened={setOpened} inputValue={value} setInputValue={setValue} />
					</div>
				</Portal>
			)}
		</>
	)
}

export default ExploreHeader
