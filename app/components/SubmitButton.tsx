"use client";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button disabled className="w-fit">
					<Loader2 className="mr-2 w-4 h-4 animate-spin" />
					Please wait
				</Button>
			) : (
				<Button type="submit" className="w-fit">
					Save Naw
				</Button>
			)}
		</>
	);
};

export const StripeSubscriptionCreationButton = () => {
	const { pending } = useFormStatus();

	return (
		<>
			{pending ? (
				<Button disabled className="w-full">
					<Loader2 className="mr-2 w-4 h-4 animate-spin" />
					Please wait
				</Button>
			) : (
				<Button className="w-full" type="submit">
					Create Subscription
				</Button>
			)}
		</>
	);
};

export const StripePortal = () => {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button disabled className="w-fit">
					<Loader2 className="mr-2 w-4 h-4 animate-spin" />
					Please wait
				</Button>
			) : (
				<Button className="w-fit" type="submit">View payment details</Button>
			)}
		</>
	);
};



export const TrashDelete = () =>{
	const { pending } = useFormStatus();
	return (
		<>
		{pending ? (
			<Button variant={'destructive'} className="w-fit"  size={'icon'} type="submit" disabled>
				<Loader2 className=" w-4 h-4 animate-spin" />
				Please wait
			</Button>
		) : (
			<Button className="w-full" type="submit" variant={'destructive'} size={'icon'}>
				<Trash className="h-4 w-9" />
			</Button>
		)}
	</>
	)
}