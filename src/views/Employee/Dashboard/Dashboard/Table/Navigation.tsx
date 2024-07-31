import { useEffect, useState } from "react";

interface NavigationProps {
    currentPageIndex: number;
    currentPageLength: number;
    pageSize: number;
    allCount: number;
    goForward: () => any;
    goBackward: () => any;
}

export default function Navigation(props: NavigationProps) {
    const [left, setLeft] = useState<number>();
    const [right, setRight] = useState<number>();

    useEffect(() => {
        setLeft(((props.currentPageIndex - 1) * props.pageSize) + 1);
        setRight((props.currentPageIndex - 1) * props.pageSize + props.currentPageLength);
    }, [props.currentPageIndex, props.currentPageLength, props.pageSize]);

    return (
        <div>
            {!props.allCount &&
                <span>0 Results</span>
            }
            {!!props.allCount &&
                <div>
                    <div>{left} - {right} of {props.allCount} Results</div>
                    <div>
                        {left !== 1 &&
                            <span onClick={() => props.goBackward()}>Back</span>
                        }
                        {right !== props.allCount &&
                            <span onClick={() => props.goForward()}>Next</span>
                        }
                    </div>
                </div>
            }
        </div>
    )
}