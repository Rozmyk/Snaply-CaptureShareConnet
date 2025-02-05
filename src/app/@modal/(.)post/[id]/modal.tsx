'use client'

import { ReactNode } from 'react'
const PostModal = ({ children }: { children: ReactNode }) => {
	return <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0 }}>{children}</div>
}

export default PostModal
