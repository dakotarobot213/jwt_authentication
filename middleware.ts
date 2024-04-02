import { NextRequest } from "next/server";
import { updateSession } from "./app/lib";

export async function middleware(request: NextRequest) {
	console.log("middleware");
	return await updateSession(request);
}
// This function is run ever on every request verified with the console.log
// This allows for continous session updates on very request
// This can be used for authentication and so on...
