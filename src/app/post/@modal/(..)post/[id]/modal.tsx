'use client'

import { ReactNode } from 'react'

interface PostModalProps {
	children: ReactNode
}
const PostModal = ({ children }: PostModalProps) => {
	return <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0 }}>{children}</div>
}

export default PostModal
