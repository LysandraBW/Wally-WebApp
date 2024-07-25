interface NavigationProps {
    currentPageIndex: number;
    currentPageLength: number;
    pageSize: number;
    allCount: number;
    goForward: () => any;
    goBackward: () => any;
}

export default function Navigation(props: NavigationProps) {
    return (
        <div>
            <div>{((props.currentPageIndex - 1) * props.pageSize) + 1} - {(props.currentPageIndex - 1) * props.pageSize + props.currentPageLength} of {props.allCount} Results</div>
            <div>
                <span onClick={() => props.goBackward()}>Back</span>
                <span onClick={() => props.goForward()}>Next</span>
            </div>
        </div>
    )
}