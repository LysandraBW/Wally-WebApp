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
import ArrowLeft from "@/component/Icon/Icons/ArrowLeft";
import ArrowRight from "@/component/Icon/Icons/ArrowRight";

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
            <button 
                onClick={props.goToPrevMonth}
                className={clsx(
                    "h-full aspect-square flex items-center justify-center",
                    "bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-50 shadow-sm stroke-gray-400 hover:stroke-black"
                )}
            >
                <ArrowLeft/>
            </button>
            <div className="min-w-[5rem]">
                <CalendarSelect
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
                <CalendarSelect
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
                    "h-full aspect-square bg-white flex items-center justify-center",
                    "border border-gray-300 rounded cursor-pointer hover:bg-gray-50 shadow-sm stroke-gray-400 hover:stroke-black"
                )}
            >
                <ArrowRight/>
            </button>
        </div>
    )
}