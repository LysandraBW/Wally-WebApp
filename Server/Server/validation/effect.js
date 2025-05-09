import { z } from "zod";
import validator from "validator";

export const isName = z.string().refine(s => !s.match(/[0-9]/) && s.length <= 50 && s.length > 0);
export const isEmail = z.string().email().max(320);
export const isPhone = z.string().refine(s => !!s.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/));
export const isVIN = z.string().refine(s => !!s.match(/^[A-HJ-NPR-Z0-9]{17}$/));
export const isIntArray = z.array(z.number());
export const hasLength = z.string().min(1);
export const isInteger = z.string().refine(s => validator.isInt(s)).or(z.number());
export const isIntegerOptional = z.string().refine(s => validator.isInt(s)).or(z.number()).or(z.literal(null)).nullish();
export const isUniqueIdentifier = z.string().refine(s => !!s.match(/^[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}$/));
export const isString = z.string();
export const isBit = z.string().refine(s => !!s.match(/0|1/));
export const isBitOptional = z.string().transform(Number).or(z.literal(null)).nullish();
export const isDate = z.string().refine(s => !!s.match(/((202[0-9])|(19[7-9][0-9]))-((0[1-9])|(1[0-2]))-(([0-2][0-9])|(3[0-1]))T(([0-1][0-9])|(2[0-4])):[0-5][0-9](Z?)/));
export const isMoney = z.string().refine(s => validator.isInt(s) || validator.isFloat(s));
export const isCommaJoinedIntArray = z.string();
export const isCommaJoinedUUIDArray = z.string().refine(s => !!s.match(/^([A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12})$|(([A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12},)+[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12})/));