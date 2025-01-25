import { useEffect, useState } from "react";
import { Months, Years } from "./_DEF";
import Select from "@/component/Form/Select/Select/Select";
import { z } from "zod";
import makeTestedFormData from "@/features/Form/useForm/makeTestedFormData";
import { subsetOf } from "@/lib/Zod/InputTest";
import useForm from "@/features/Form/useForm/useForm";
import { Options } from "@/features/Form/DEF";
import getValues from "@/features/Form/helpers/getValues";
import makeForm from "@/features/Form/useForm/makeForm";
import ChevronRight from "@/component/Icon/ChevonRight";
import ChevronLeft from "@/component/Icon/ChevronLeft";
import clsx from "clsx";

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
        <div className="flex gap-1 items-center h-min">
            <button 
                onClick={props.goToPrevMonth}
                className={clsx(
                    "p-2 h-full flex items-center justify-center",
                    "bg-gray-100 border border-gray-200 rounded"
                )}
            >
                <ChevronLeft
                    width="10"
                    height="10"
                    fill="#9ca3af"
                    stroke="#9ca3af"
                    strokeWidth="1.75"
                />
            </button>
            <div className="min-w-[5rem]">
                <Select
                    name="year"
                    values={form.getInput("year").data}
                    state={form.getInput("year").state}
                    onChange={(name, value) => {
                        props.onYearChange(parseInt(value[0]));
                    }}
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
                    options={months}
                    disabled={false}
                    toggleLabel="Select Month"
                />
            </div>
            <button 
                onClick={props.goToNextMonth}
                className={clsx(
                    "p-2 w-min flex items-center justify-center",
                    "bg-gray-100 border border-gray-200 rounded"
                )}
            >
                <ChevronRight
                    width="10"
                    height="10"
                    fill="#9ca3af"
                    stroke="#9ca3af"
                    strokeWidth="1.75"
                />
            </button>
        </div>
    )
}