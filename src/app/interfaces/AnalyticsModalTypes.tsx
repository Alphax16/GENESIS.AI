import { MouseEventHandler } from "react";

interface AnalyticsModalType {
	title: string;
    data: any[];
    handleClose: MouseEventHandler<HTMLButtonElement>;
}

export type { AnalyticsModalType };