import { useEffect, useState } from "react";

interface NavigationProps {
    pageIndex: number;
    pageLength: number;
    pageSize: number;
    count: number;
    goForward: () => any;
    goBackward: () => any;
}

export default function Navigation(props: NavigationProps) {
    const [left, setLeft] = useState<number>();
    const [right, setRight] = useState<number>();

    useEffect(() => {
        setLeft(((props.pageIndex - 1) * props.pageSize) + 1);
        setRight((props.pageIndex - 1) * props.pageSize + props.pageLength);
    }, [props.pageIndex, props.pageLength, props.pageSize]);

    return (
        <div>
            {!props.count &&
                <span>0 Results</span>
            }
            {!!props.count &&
                <div>
                    <div>{left} - {right} of {props.count} Results</div>
                    <div>
                        {left !== 1 &&
                            <span onClick={() => props.goBackward()}>Back</span>
                        }
                        {right !== props.count &&
                            <span onClick={() => props.goForward()}>Next</span>
                        }
                    </div>
                </div>
            }
        </div>
    )
}