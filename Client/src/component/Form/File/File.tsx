import { ReadInputProps } from "@/features/Form/DEF";
import { Field } from "../Field";
import { useState } from "react";
import clsx from "clsx";
import CrossIcon from "@/component/Icon/Icons/XMarkIcon";
import { toBytes } from "@/utils/convert";
import ArrowUpTrayIcon from "@/component/Icon/Icons/ArrowUpTrayIcon";
import CloseButton from "@/component/Button/CloseButton";

interface FileProps extends ReadInputProps {
    accept: string;
    multiple: boolean;
    onChange: (name: string, value: FileList | null) => void;
}

export default function File(props: FileProps) {
    const [fileList, setFileList] = useState<FileList|null>();

    const onChange = (event: any) => {
        const {name, files} = event.target;
        props.onChange(name, files);
        setFileList(files);
    }

    return (
        <Field
            label={props.label}
            state={props.state}
            input={
                <div className="flex flex-col gap-1">
                    <label 
                        className={clsx(
                            "inline-block w-full px-4 py-4",
                            "flex flex-col items-center justify-center gap-y-2",
                            "surface clickable border rounded-md",
                            "cursor-pointer group",
                            (props.state && props.state[0] === false) && "!border-red-500"
                        )}
                    >
                        <input
                            type="file"
                            name={props.name}
                            onChange={onChange}
                            accept={props.accept}
                            multiple={props.multiple}
                            className="hidden"
                        />
                        <ArrowUpTrayIcon
                            class="size-5 stroke-inherit"
                        />
                        <p 
                            className="block text-sm tracking-wide text-inherit"
                        >
                            Click to Upload
                        </p>
                    </label>
                    {/* FileList */}
                    {(fileList && Array.from(fileList).length) &&
                        <div className="flex gap-1 p-1 bg-base-100 rounded-md">
                            {fileList && Array.from(fileList).map((file, i) => (
                                <div
                                    key={i}
                                    className={clsx(
                                        "flex items-center justify-between gap-1",
                                        "w-min border rounded-md",
                                        "border border-base-300",
                                        "shadow-sm bg-base-0 dark:bg-base-100"
                                    )}
                                >
                                    {/* File */}
                                    <div className="flex">
                                        <div className="block text-xs text-base-500 tracking-wide p-1 whitespace-nowrap">
                                            {file.name}
                                        </div>
                                        {/* Delete File Button */}
                                        {/* Not Implemented! */}
                                        <div className="border-l border-l-base-300 p-1 flex items-center justify-center">
                                            <CloseButton
                                                size={1}
                                                onClick={() => null}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            }
        />
    )
}