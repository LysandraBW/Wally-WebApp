import { useEffect, useState } from "react";
import { Months, Years } from "./_DEF";
import { z } from "zod";
import { subsetOf } from "@/lib/Zod/InputTest";
import useForm from "@/features/Form/useForm/useForm";
import { Options } from "@/features/Form/DEF";
import getValues from "@/features/Form/helpers/getValues";
import makeForm from "@/features/Form/useForm/makeForm";
import clsx from "clsx";
import CalendarSelect from "./CalendarSelect";
import ArrowLeft from "@/component/Icons/Icons/ArrowLeftIcon";
import ArrowRight from "@/component/Icons/Icons/ArrowRightIcon";
import IconButton from "@/component/Button/IconButton";
import Select from "@/component/Form/Select/Select";
import ChevronUpDownIcon from "@/component/Icons/Icons/ChevronUpDownIcon";

interface CalendarSearchProps {
    year: number;
    monthIndex: number;
    goToNextMonth: () => void;
    goToPrevMonth: () => void;
    onYearChange: (year: number) => void;
    onMonthChange: (monthIndex: number) => void;
}

export default function CalendarSearch(props: CalendarSearchProps) {
    const form = useForm("CalendarSearch");
    const [years] = useState<Options>(Years.map(y => [y.toString(), y.toString()]));
    const [months] = useState<Options>(Months.map((m, i) => [i.toString(), m.toString()]));

    useEffect(() => {
        const load = async () => {
            const test = z.object({
                year: subsetOf(getValues(years)),
                month: subsetOf(getValues(months))
            });
            form.resetForm(makeForm({
                year: [props.year.toString()],
                month: [props.monthIndex.toString()]
            }, test, true));
        }
        load();
    }, []);

    useEffect(() => {
        form.setInputData("year", [props.year.toString()]);
    }, [props.year]);

    useEffect(() => {
        form.setInputData("month", [props.monthIndex.toString()]);
    }, [props.monthIndex]);

    return (
        <div className="flex gap-1 items-center h-[26px]">
            <IconButton
                onClick={props.goToPrevMonth}
            >
                <ArrowLeft
                    className="size-2.5 stroke-[2.25px] stroke-inherit"
                />
            </IconButton>
            <div className="min-w-[5rem]">
                <Select
                    name="year"
                    values={form.getInput("year").data}
                    state={form.getInput("year").state}
                    onChange={(name, value) => {
                        props.onYearChange(parseInt(value[0]));
                    }}
                    smaller={true}
                    ToggleIcon={<ChevronUpDownIcon className="size-2.5 stroke-[1px] stroke-base-500"/>}
                    options={years}
                    disabled={false}
                    toggleLabel="Select Year"
                />
            </div>
            <div className="min-w-[10rem]">
                <Select
                    name="month"
                    values={form.getInput("month").data}
                    state={form.getInput("month").state}
                    onChange={(name, value) => {
                        props.onMonthChange(parseInt(value[0]));
                    }}
                    smaller={true}
                    ToggleIcon={<ChevronUpDownIcon className="size-2.5 stroke-[1px] stroke-base-500"/>}
                    options={months}
                    disabled={false}
                    toggleLabel="Select Month"
                />
            </div>
            <IconButton 
                onClick={props.goToNextMonth}
            >
                <ArrowRight
                    className="size-2.5 stroke-[2.25px] stroke-inherit"
                />
            </IconButton>
        </div>
    )
}