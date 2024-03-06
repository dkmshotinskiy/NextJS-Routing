interface TagDetail {
    name: string,
    description: string
}

const tagDetails: Array<TagDetail> = [
    {
        name: 'h1',
        description: `
            Used to define the most important
            heading within DOM
        `
    },
    {
        name: 'h2',
        description: `
            Used to define secondary heading
            within DOM
        `
    },
    {
        name: 'h3',
        description: `
            Used to define tertiary heading
            within DOM
        `
    },
    {
        name: 'h4',
        description: `
            Used to define quaternary heading
            within DOM
        `
    },
    {
        name: 'h5',
        description: `
            Used to define quinary heading
            within DOM
        `
    },
    {
        name: 'h6',
        description: `
            Used to define the least important
            heading within DOM
        `
    },
    {
        name: 'a',
        description: `
            Used to define a hyperlink within
            DOM, which is used to navigate from
            one page to another.
        `
    },
    {
        name: 'b',
        description: `
            Used to bolden the text within DOM
        `
    },
    {
        name: 'br',
        description: `
            Used to insert a single line break.
            Considered an empty tag which means
            it has no "</br>" end tag.
        `
    }
]

export default tagDetails