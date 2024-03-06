'use client'

import { useRouter } from 'next/navigation'
import { KeyboardEvent, useRef } from 'react'

export default function Home() {
	const router = useRouter()
	const inputEl = useRef<HTMLInputElement>(null)

	// If enter key was pressed, search the value of the input
	const keyDown = (e: KeyboardEvent): Function | void => {
		if (e.code == 'Enter') return search()
	}

	// Search by navigating to the page with results
	const search = (): void => {
		const inputValue = inputEl.current?.value ?? ''
		router.push(`/search/${inputValue}`)
	}

	return (
		<main>
			<input
				type='text'
				ref={inputEl}
				onKeyDown={keyDown}
				placeholder='Enter tag name'
				autoFocus={true}
			/>
			<button onClick={search}>Search</button>
		</main>
	)
}