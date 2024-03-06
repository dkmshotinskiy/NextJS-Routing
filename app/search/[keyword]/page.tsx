'use client'

import tagDetails from '@/data/tags'
import { useRouter } from 'next/navigation'
import { KeyboardEvent, useRef, useState } from 'react'

interface Props {
	params: {
		keyword: string
	}
}

export default function Search({ params }: Props) {
	const router = useRouter()
	const keyword = decodeURIComponent(params.keyword)
	const [inputValue, setInputValue] = useState(decodeURIComponent(params.keyword))
	const inputEl = useRef<HTMLInputElement>(null)

	// If enter key was pressed, search the value of the input
	const keyDown = (e: KeyboardEvent): Function | void => {
		if (e.code == 'Enter') return search()
	}

	// Search by navigating to the page with results
	const search = (): void => {
		router.push(`/search/${inputValue}`)
	}

	return (
		<>
			<header>
				<input
					type='text'
					ref={inputEl}
					value={inputValue}
					placeholder='Enter tag name'
					onChange={e => setInputValue(e.target.value)}
					onKeyDown={keyDown}
					autoFocus={true}
				/>
				<button onClick={search}>Search</button>
			</header>
			<main data-search-results>
				<h1>Results</h1>
				<div>
					{
						tagDetails.map((value, index): JSX.Element | undefined => {
							if (
								value.name.toLowerCase().includes(keyword.toLowerCase()) ||
								value.description.toLowerCase().includes(keyword.toLowerCase())
							) {
								return (
									<span data-search-result key={index}>
										<h2>{highlightKeyword(value.name, keyword)}</h2>
										<p>{highlightKeyword(value.description, keyword)}</p>
									</span>
								)
							}
						})
					}
				</div>
			</main>
		</>
	)
}

const highlightKeyword = (str: string, keyword: string): JSX.Element => {
	let lowerStr = str.toLowerCase()
	let lowerKeyword = keyword.toLowerCase()

	// Check whether keyword exists in the string
	if (lowerStr.includes(lowerKeyword)) {
		// Initialize DOM key and response variables
		let key = 0
		const res: Array<JSX.Element> = []

		// Add the first portion of the string to the response before first keyword
		res.push(<span key={key++}>{str.slice(0, lowerStr.indexOf(lowerKeyword))}</span>)

		// Remove everything before the first keyword
		str = str.slice(lowerStr.indexOf(lowerKeyword))
		lowerStr = lowerStr.slice(lowerStr.indexOf(lowerKeyword))

		while (str.length != 0) {
			// Add keyword to the response as it appears in the string
			res.push(
				<span key={key++}>
					<span data-keyword>
						{str.slice(0, keyword.length)}
					</span>
				</span>
			)

			// Remove keyword from string
			str = str.slice(keyword.length)
			lowerStr = lowerStr.slice(lowerKeyword.length)

			// Get the index of next keyword, if it exists
			const nextIndex = lowerStr.indexOf(lowerKeyword)

			if (nextIndex != -1) {
				// Add the text before next keyword to the response before next keyword
				res.push(<span key={key++}>{str.slice(0, nextIndex)}</span>)

				// Remove all text before next keyword
				str = str.slice(nextIndex)
				lowerStr = lowerStr.slice(nextIndex)
			} else {
				// Add the remainder of the text to the response
				res.push(<span key={key++}>{str}</span>)
				str = ''
			}
		}

		// Return the highlighted string
		return <>{res}</>
	}
	
	// Return default, unmarked string
	return <>{str}</>
}