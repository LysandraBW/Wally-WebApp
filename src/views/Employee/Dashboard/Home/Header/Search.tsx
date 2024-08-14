interface SearchProps {
    onChange: (value: string) => void;
    onSearch: () => any;
}

export default function Search(props: SearchProps) {
    return (
        <div>
            <input onChange={(event) => props.onChange(event.target.value)}/>
            <button onClick={async () => await props.onSearch()}>Search</button>
        </div>
    )
}