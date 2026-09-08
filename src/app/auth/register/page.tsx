import { redirect } from "next/navigation";

export default function LegacyAuthRegisterPage() {
	redirect("/mp/register");
}