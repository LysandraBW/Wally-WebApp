import { ReadInputProps } from "@/features/Form/DEF";
import { Field } from "../Field";
import { useState } from "react";
import clsx from "clsx";
import CrossIcon from "@/component/Icons/Icons/XMarkIcon";
import { toBytes } from "@/utils/convert";
import ArrowUpTrayIcon from "@/component/Icons/Icons/ArrowUpTrayIcon";
import CloseButton from "@/component/Button/CloseButton";
import XMarkIcon from "@/component/Icons/Icons/XMarkIcon";

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
                <div className="flex flex-col gap-0">
                    <label 
                        className={clsx(
                            "inline-block w-full px-4 py-4",
                            "flex flex-col items-center justify-center gap-y-2",
                            "surface surface-hover surface-border rounded-t-md",
                            "cursor-pointer group"
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
                        <span className="text-base-500 text-sm tracking-wide text-inherit">
                            Click to Upload
                        </span>
                    </label>
                    {/* FileList */}
                    {(fileList && Array.from(fileList).length) &&
                        <div className="flex gap-1 p-1 bg-base-100 dark:bg-base-0 border border-t-0 border-base-300 rounded-b-md">
                            {fileList && Array.from(fileList).map((file, i) => (
                                <div
                                    key={i}
                                    className={clsx(
                                        "flex items-center justify-between gap-1",
                                        "w-min border rounded-[5px]",
                                        "border border-base-300",
                                        "shadow-sm bg-base-0"
                                    )}
                                >
                                    {/* File */}
                                    <div className="flex">
                                        <div className="text-xs text-base-500 tracking-wide p-1 whitespace-nowrap">
                                            {file.name}
                                        </div>
                                        {/* Delete File Button */}
                                        {/* Not Implemented! */}
                                        <div 
                                            className={clsx(
                                                "p-1",
                                                "flex items-center justify-center",
                                                "border-l border-l-base-300 rounded-r-[5px]",
                                                "surface-hover group cursor-pointer"
                                            )}
                                        >
                                            <XMarkIcon
                                                class="size-2 stroke-base-500 group-hover:stroke-base-700 stroke-[3px]"
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