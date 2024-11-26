'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import React from 'react'
import { Box, Anchor, Flex, useMantineColorScheme, rem } from '@mantine/core'
import { useElementSize, useHeadroom } from '@mantine/hooks'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

function ContentToggleButton() {
	const [activeSection, setActiveSection] = useState('home')
	const pathname = usePathname()

	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const pinned = useHeadroom({ fixedAt: 0 })
	const { ref, width } = useElementSize()

	const searchParams = useSearchParams()
	const router = useRouter()

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams)
			params.set(name, value)

			return params.toString()
		},
		[searchParams]
	)

	useEffect(() => {
		const variant = searchParams.get('variant')
		if (variant == 'following') {
			setActiveSection('following')
		} else {
			setActiveSection('home')
		}
	}, [searchParams])

	return (
		<Box ref={ref} sx={{ position: 'relative', height: rem(60), width: '100%', display: 'flex' }}>
			<Box
				p='sm'
				pt='50px'
				sx={{
					flexGrow: 1,
					position: 'fixed',
					top: 0,
					width: width,
					maxWidth: '100%',
					zIndex: 198,
					transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
					transition: 'transform 75ms ease',
					backgroundColor: dark ? 'black' : 'white',
					borderBottom: `1px solid ${dark ? '#232323' : '#dedede'} `,
				}}>
				<Flex justify='flex-start' align='center' gap='xs'>
					<Anchor
						component='button'
						onClick={() => {
							router.push(pathname + '?' + createQueryString('variant', 'home'))
						}}
						color={activeSection == 'home' ? `${dark ? '#f5f5f5' : '#00000'}` : `${dark ? '#737373' : '#c7c7c7'}  `}
						fw={700}
						fz='md'
						sx={{
							'&:hover': {
								textDecoration: 'none',
							},
						}}>
						For you
					</Anchor>
					<Anchor
						component='button'
						onClick={() => {
							router.push(pathname + '?' + createQueryString('variant', 'following'))
						}}
						color={
							activeSection == 'following' ? `${dark ? '#f5f5f5' : '#00000'}` : `${dark ? '#737373' : '#c7c7c7'}  `
						}
						fw={700}
						fz='md'
						sx={{
							'&:hover': {
								textDecoration: 'none',
							},
						}}>
						Following
					</Anchor>
				</Flex>
			</Box>
		</Box>
	)
}

export default ContentToggleButton
