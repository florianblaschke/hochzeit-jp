import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session) {
		redirect(307, "/login");
	}
};
