/// <reference types="react" />
interface CreateTimeHandler {
    onChange(value: string): void;
    nextRef?: React.RefObject<HTMLInputElement>;
    min: number;
    max: number;
    maxValue: number;
}
export declare function createTimeHandler({ onChange, nextRef, min, max, maxValue }: CreateTimeHandler): (value: string, triggerShift: boolean, forceTriggerShift?: boolean) => void;
export {};
//# sourceMappingURL=create-time-handler.d.ts.map