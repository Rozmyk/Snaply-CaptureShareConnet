'use client'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Flex, useMantineColorScheme } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import RecentUsers from './RecentUsers/RecentUsers'
import FilteredUsersList from './FilteredUsersList/FilteredUsersList'
import { getAllUsers } from '../../utils/getAllUsers'
import { UserProps } from '../../types'

interface SearchContentProps {
	opened: boolean
	setOpened: Dispatch<SetStateAction<boolean>>
	inputValue: string
	setInputValue: Dispatch<SetStateAction<string>>
}

const SearchContent = ({ opened, setOpened, inputValue, setInputValue }: SearchContentProps) => {
	const [userData, setUserData] = useState<UserProps[]>([])
	const [recentLoading, setRecentLoading] = useState<boolean>(true)
	const [filteredUsersLoading, setFilteredUsersLoading] = useState<boolean>(true)
	const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([])
	const [scrollAreaHeight, setScrollAreaHeight] = useState<number>(0)
	const { ref: containerRef, height: containerHeight } = useElementSize()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const [recentUsers, setRecentUsers] = useState<UserProps[]>(() => {
		const savedUsers = localStorage.getItem('recentUsers')
		return savedUsers ? (JSON.parse(savedUsers) as UserProps[]) : []
	})

	const deleteUserfromRecentUsers = (user: UserProps) => {
		const updatedRecentUsers = recentUsers.filter(recentUser => recentUser.id !== user.id)
		setRecentUsers(updatedRecentUsers)
	}

	const getUsers = async () => {
		const users = await getAllUsers()
		setUserData(users)
	}

	const checkIfUserExists = (user: UserProps) => {
		const userExists = recentUsers.some(e => e.id === user.id)

		if (userExists) {
			const updatedUsers = recentUsers.map(e => (e.id === user.id ? user : e))
			setRecentUsers(updatedUsers)
		} else {
			setRecentUsers(prevUsers => [...prevUsers, user])
		}
	}

	const chooseComponentToRender = () => {
		if (inputValue.trim() === '') {
			return (
				<RecentUsers
					scrollAreaHeight={scrollAreaHeight}
					setOpened={setOpened}
					recentUsers={recentUsers}
					recentLoading={recentLoading}
					deleteUserfromRecentUsers={deleteUserfromRecentUsers}
				/>
			)
		} else {
			return (
				<FilteredUsersList
					scrollAreaHeight={scrollAreaHeight}
					setOpened={setOpened}
					checkIfUserExists={checkIfUserExists}
					filteredUsers={filteredUsers}
					filteredUsersLoading={filteredUsersLoading}
				/>
			)
		}
	}

	useEffect(() => {
		getUsers()
		setScrollAreaHeight(containerHeight)
	}, [containerHeight])

	useEffect(() => {
		setRecentLoading(false)
	}, [recentUsers])

	useEffect(() => {
		if (opened) {
			setInputValue('')
		}
	}, [opened, setInputValue])

	useEffect(() => {
		setFilteredUsersLoading(true)
		if (userData) {
			const newUserData = userData.filter(user => user.username.toLowerCase().includes(inputValue.toLowerCase()))
			setFilteredUsers(newUserData)
			setFilteredUsersLoading(false)
		}
	}, [inputValue, userData, setInputValue])

	useEffect(() => {
		localStorage.setItem('recentUsers', JSON.stringify(recentUsers))
	}, [recentUsers])

	return (
		<Flex h='100%' direction='column' ref={containerRef} style={{ backgroundColor: dark ? 'black' : 'white' }}>
			{chooseComponentToRender()}
		</Flex>
	)
}

export default SearchContent
