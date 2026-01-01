"use client";
import Confirm from "@/component/Alert/Confirm";
import Message from "@/component/Alert/Message";
import CallToActionButton from "@/component/Button/CallToActionButton";
import CloseButton from "@/component/Button/CloseButton";
import IconButton from "@/component/Button/IconButton";
import PrimaryButton from "@/component/Button/PrimaryButton";
import SecondaryButton from "@/component/Button/SecondaryButton";
import Copy from "@/component/Copy/Copy";
import Checkbox from "@/component/Form/Checkbox/Checkbox";
import File from "@/component/Form/File/File";
import Radio from "@/component/Form/Radio/Radio";
import Segment from "@/component/Form/Segment/Segment";
import Search from "@/component/Form/Select/Search";
import Select from "@/component/Form/Select/Select";
import PhoneNumber from "@/component/Form/Text/PhoneNumber/PhoneNumber";
import Text from "@/component/Form/Text/Text";
import TextArea from "@/component/Form/Text/TextArea";
import ArrowLongLeftIcon from "@/component/Icons/Icons/ArrowLongLeftIcon";
import Logo from "@/component/NavBar/Logo";
import { ArrowLeft } from "lucide-react";

function Elements() {
    return (
        <div className="flex flex-col gap-8 p-4 w-full h-full relative">
            <div>
                <p className="text-base-900">Call to Action Button</p>
                <CallToActionButton
                    label="Label"
                    onClick={() => console.log("Clicked!")}
                />
            </div>
            <div>
                <p className="text-base-900">Primary Button</p>
                <PrimaryButton
                    onClick={() => console.log("Clicked!")}
                >
                    Hello
                </PrimaryButton>
            </div>
            <div>
                <p className="text-base-900">Secondary Button</p>
                <div className="flex gap-2">
                    <SecondaryButton onClick={() => console.log("Clicked!")}>
                        Hello
                    </SecondaryButton>
                    <SecondaryButton onClick={() => console.log("Clicked!")}>
                        Hello
                    </SecondaryButton>
                </div>
            </div>
            <div>
                <p className="text-base-900">Icon Button</p>
                <IconButton
                    onClick={() => console.log("Clicked!")}
                >
                    Hello
                </IconButton>
            </div>
            <div>
                <p className="text-base-900">Close Button</p>
                <div className="flex gap-2 items-center">
                    <CloseButton
                        size={16}
                        onClick={() => console.log("Clicked!")}
                    />
                    <CloseButton
                        size={14}
                        onClick={() => console.log("Clicked!")}
                    />
                    <CloseButton
                        size={12}
                        onClick={() => console.log("Clicked!")}
                    />
                    <CloseButton
                        size={10}
                        onClick={() => console.log("Clicked!")}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-base-900">Alert Confirm</p>
                <Confirm
                    head="Head"
                    body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    yLabel="Yes"
                    nLabel="No"
                    onY={() => console.log("Y")}
                    onN={() => console.log("N")}
                    onClose={() => console.log("Close")}
                />
                <Confirm
                    head="Head"
                    body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    yLabel="Yes"
                    nLabel="No"
                    onY={() => console.log("Y")}
                    onN={() => console.log("N")}
                    onClose={() => console.log("Close")}
                    irreversible={true}
                />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-base-900">Alert Message</p>
                <Message
                    head="Message Head"
                    body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    type="Default"
                    onClose={() => console.log("Close")}
                />
                <Message
                    head="Message Head"
                    body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    type="Success"
                    onClose={() => console.log("Close")}
                />
                <Message
                    head="Message Head"
                    body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    type="Error"
                    onClose={() => console.log("Close")}
                />
                <Message
                    head="Message Head"
                    type="Error"
                    onClose={() => console.log("Close")}
                />
            </div>
            <div>
                <p className="text-base-900">Copy</p>
                <Copy
                    label="Name"
                    value="Name"
                />
            </div>
            <div>
                <p className="text-base-900">Checkbox</p>
                <Checkbox
                    name="checked"
                    checked={true}
                    value="1"
                    label="Blueberries"
                    onChange={() => console.log("Changed")}
                />
                <Checkbox
                    name="notChecked"
                    checked={false}
                    value="0"
                    label="Raspberries"
                    onChange={() => console.log("Changed")}
                />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-base-900">File</p>
                <File
                    label="Select File"
                    name="file"
                    accept=""
                    multiple={true}
                    onChange={() => null}
                />
                <File
                    label="Select File"
                    name="file"
                    accept=""
                    multiple={true}
                    onChange={() => null}
                    state={[false, "You must select a file."]}
                />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-base-900">Radio</p>
                <Radio
                    name="radio"
                    label="Select Color"
                    options={[["Red", "Red"], ["Blue", "Blue"], ["Yellow", "Yellow"]]}
                    values={["Red", "Blue"]}
                    onChange={() => null}
                />
                <Radio
                    name="radio"
                    label="Select Color"
                    options={[["Red", "Red"], ["Blue", "Blue"], ["Yellow", "Yellow"]]}
                    values={[]}
                    onChange={() => null}
                    state={[false, "You must select a color."]}
                />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-base-900">Segment</p>
                <Segment
                    name="segment1"
                    label="Select Color"
                    options={[["Red", "Red", <div className="w-1 h-1 bg-red-500 rounded-full"></div>], ["Blue", "Blue", <div className="w-1 h-1 bg-blue-500 rounded-full"></div>], ["Yellow", "Yellow", <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>], ["Green", "Green", <div className="w-1 h-1 bg-green-500 rounded-full"></div>]]}
                    values={["Red", "Blue"]}
                    onChange={() => null}
                />
                <Segment
                    name="segment2"
                    label="Select Color"
                    options={[["Red", "Red"], ["Blue", "Blue"], ["Yellow", "Yellow"], ["Green", "Green"]]}
                    values={["Red", "Blue"]}
                    onChange={() => null}
                />
                <Segment
                    name="segment2"
                    label="Select Color"
                    options={[["Red", "Red"], ["Blue", "Blue"], ["Yellow", "Yellow"], ["Green", "Green"]]}
                    values={[]}
                    onChange={() => null}
                    state={[false, "You must select a color."]}
                />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-base-900">Select</p>
                <Select
                    name="select"
                    options={[["Red", "Red"], ["Blue", "Blue"], ["Yellow", "Yellow"], ["Green", "Green"]]}
                    values={["Red", "Blue"]}
                    onChange={() => null}
                    disabled={false}
                    toggleLabel="Select Color"
                />
                <Select
                    name="select"
                    options={[["Red", "Red"], ["Blue", "Blue"], ["Yellow", "Yellow"], ["Green", "Green"]]}
                    values={[]}
                    onChange={() => null}
                    disabled={false}
                    toggleLabel="Select Color"
                    state={[false, "You must select a color."]}
                />
                <Select
                    name="select"
                    ListHeader={() => (
                        <div 
                            className="border-b border-b-base-300"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="border-b border-b-base-300 px-1 py-1">
                                <IconButton
                                    size={12}
                                    onClick={() => 1}
                                >
                                    <ArrowLongLeftIcon
                                        style={{
                                            width: "inherit",
                                            height: "inherit",
                                            strokeWidth: "2px"
                                        }}
                                    />
                                </IconButton>
                            </div>
                            <input type="text" className="w-full text-sm px-2 py-2 bg-base-0 text-base-500 placeholder:text-base-500 tracking-wide outline-none" placeholder="Search Colors"/>
                        </div>
                    )}
                    options={[["Red", "Red"], ["Blue", "Blue"], ["Yellow", "Yellow"], ["Green", "Green"]]}
                    values={["Red", "Blue"]}
                    onChange={() => null}
                    disabled={false}
                    toggleLabel="Select Color"
                />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-base-900">Search</p>
                <Search
                    name="select"
                    options={[["Red", "Red"], ["Blue", "Blue"], ["Yellow", "Yellow"], ["Green", "Green"]]}
                    values={["Red", "Blue"]}
                    onChange={() => null}
                    disabled={false}
                    toggleLabel="Select Color"
                />
                <Search
                    name="select"
                    options={[["Red", "Red"], ["Blue", "Blue"], ["Yellow", "Yellow"], ["Green", "Green"]]}
                    values={[]}
                    onChange={() => null}
                    disabled={false}
                    toggleLabel="Select Color"
                    state={[false, "You must select a color."]}
                />
                <Search
                    name="select"
                    options={[["Red", "Red"], ["Blue", "Blue"], ["Yellow", "Yellow"], ["Green", "Green"]]}
                    values={["Red", "Blue"]}
                    onChange={() => null}
                    disabled={false}
                    toggleLabel="Select Color"
                    ListHeader={({children}) => (
                        <div onClick={(event) => event.stopPropagation()}>
                            <div className="border-b border-b-base-300 px-1 py-1">
                                <IconButton
                                    size={12}
                                    onClick={() => 1}
                                >
                                    <ArrowLongLeftIcon
                                        className="w-inherit h-inherit stroke-[2px]"
                                    />
                                </IconButton>
                            </div>
                            {children}
                        </div>
                    )}
                />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-base-900">Text</p>
                <Text
                    label="Enter Full Name"
                    name="text1"
                    value="John Smith"
                    onChange={(name, value) => 1}
                />
                <Text
                    label="Enter Full Name"
                    name="text2"
                    value=""
                    onChange={(name, value) => 1}
                    state={[false, "You must enter your full name."]}
                />
                <TextArea
                    label="Enter Lorem Ipsum"
                    name="textArea1"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    onChange={(name, value) => 1}
                />
                <TextArea
                    label="Enter Lorem Ipsum"
                    name="textArea2"
                    value=""
                    onChange={(name, value) => 1}
                    state={[false, "You must enter a paragraph of Lorem Ipsum."]}
                />
                <PhoneNumber
                    label="Enter Phone Number"
                    name="textArea1"
                    value="123-456-7890"
                    onChange={(name, value) => 1}
                />
                <PhoneNumber
                    label="Enter Phone Number"
                    name="textArea2"
                    value=""
                    onChange={(name, value) => 1}
                    state={[false, "You must enter a phone number."]}
                />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-base-900">Text</p>
                <Logo/>
                <Logo
                    size={2}
                />
                <Logo
                    size={1}
                />
            </div>
        </div>
    )
}

export default function Page() {
    return (
        <section className="grid grid-cols-2 relative">
            <div className="relative">
                <Elements/>
            </div>
            <div className="relative dark bg-base-0">
                <Elements/>
            </div>
        </section>
    )
}