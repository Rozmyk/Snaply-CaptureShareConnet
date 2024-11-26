import { useState, useCallback, useEffect } from 'react'
import { Box, Select, useMantineColorScheme } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
const SwitchContent = () => {
	const [value, setValue] = useState<string | null>('home')
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const pathname = usePathname()
	const router = useRouter()
	const data = [
		{ value: 'following', label: 'Following' },
		{ value: 'home', label: 'For You' },
	]
	const searchParams = useSearchParams()

	const createQueryString = useCallback(
		(name: string, value: string) => {
			if (searchParams) {
				const params = new URLSearchParams(Array.from(searchParams.entries()))
				params.set(name, value)

				return params.toString()
			}
		},
		[searchParams]
	)

	useEffect(() => {
		if (value == 'home') {
			router.push(pathname + '?' + createQueryString('variant', 'home'))
		} else {
			router.push(pathname + '?' + createQueryString('variant', 'following'))
		}
	}, [value, router, pathname, createQueryString])
	useEffect(() => {
		const variant = searchParams.get('variant')
		if (variant == 'following') {
			setValue('following')
		} else {
			setValue('home')
		}
	}, [searchParams])
	return (
		<Box w={175}>
			<Select
				rightSection={<IconChevronDown size='1rem' />}
				rightSectionWidth={30}
				width={100}
				onChange={setValue}
				value={value}
				data={data}
				sx={{
					'.mantine-Select-input': {
						backgroundColor: 'transparent',
						border: 'none',
						outline: 'none',
						fontSize: '25px',
						fontWeight: 700,
						color: dark ? 'white' : 'black',
					},
					'.mantine-Select-itemsWrapper': {
						backgroundColor: dark ? 'black' : 'white',
					},
					'.mantine-Select-item': {
						fontSize: '15px',
						fontWeight: 700,
					},
					'.mantine-Select-item[data-selected]': {
						backgroundColor: dark ? 'black' : 'white',
					},
				}}
				styles={{ rightSection: { pointerEvents: 'none' } }}
			/>
		</Box>
	)
}

export default SwitchContent
