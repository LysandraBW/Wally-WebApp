import { ReadInputProps } from "@/features/Form/DEF";
import { Field } from "../Field";
import { useState } from "react";
import bytesForHuman from "@/utils/bytesForHumans";
import UploadIcon from "@/component/Icon/Upload";
import clsx from "clsx";
import CrossIcon from "@/component/Icon/Cross";

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
                            "border-gray-300 rounded",
                            "border-[1.0px] border-dashed",
                            "bg-white w-full p-4 text-center",
                            "flex justify-center",
                            "inline-block cursor-pointer",
                            "hover:border-blue-600 hover:bg-blue-50",
                            "hover:!text-blue-600"
                        )}>
                        <input
                            type="file"
                            name={props.name}
                            onChange={onChange}
                            accept={props.accept}
                            multiple={props.multiple}
                            className="hidden"
                        />
                        <div 
                            className={clsx(
                                "flex flex-col",
                                "items-center gap-3"
                            )}>
                            <span 
                                className={clsx(
                                    "block text-02",
                                    "font-medium",
                                    "text-inherit"
                                )}
                            >
                                Click to Upload
                            </span>
                        </div>
                    </label>
                    {/* FileList */}
                    {fileList && Array.from(fileList).map((file, i) => (
                        <div
                            key={i}
                            className={clsx(
                                "flex items-center justify-between",
                                "w-full p-2 border rounded"
                            )}
                        >
                            {/* File */}
                            <div className="flex flex-col ">
                                <span className="block">
                                    {file.name}
                                </span>
                                <span className="block">
                                    {bytesForHuman(file.size)}
                                </span>
                            </div>
                            {/* Delete File Button */}
                            <button 
                                // There's no functionality
                                // for this right now. 
                                onClick={() => null}
                                className={clsx(
                                    "icon !rounded-full",
                                    "!p-0.5 bg-gray-100",
                                    "fill-white stroke-white"
                                )}
                            >
                                <CrossIcon
                                    width={"10"}
                                    height={"10"}
                                    fill="inherit"
                                    stroke="inherit"
                                    strokeWidth="1"
                                    cursor="pointer"
                                />
                            </button>
                        </div>
                    ))}
                </div>
            }
        />
    )
}