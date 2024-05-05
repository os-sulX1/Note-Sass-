import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { CreditCard, DoorClosed, Home, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

type UserNavbarProps = {
	name: string;
	email: string;
	image: string;
};

export const navItems = [
	{ id: 1, name: "Home", href: "/dashboard", icon: Home },
	{ id: 2, name: "Settings", href: "/dashboard/settings", icon: Settings },
	{ id: 3, name: "Billing", href: "/dashboard/billing", icon: CreditCard },
];

const UserNavbar = ({ name, email, image }: UserNavbarProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant={"ghost"} className="relative h-10 w-10 rounded-full">
					<Avatar className=" h-10 w-10  rounded-full">
						<AvatarImage src={image} alt="Profile Image" />
						<AvatarFallback>Sultan </AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel>
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{name}</p>
						<p className="text-xs  leading-none  text-muted-foreground">
							{email}{" "}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{navItems.map((navItem) => (
						<DropdownMenuItem asChild key={navItem.id}>
							<Link
								href={navItem.href}
								className="
            w-full flex justify-between items-center"
							>
								{navItem.name}
								<span>
									<navItem.icon className="w-4 h-4" />
								</span>
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />

				<DropdownMenuItem
					className="w-full flex justify-between items-center"
					asChild
				>
					<LogoutLink className="bg-red-500">
						<>
							Logout {""}
							<span>
								<DoorClosed className="w-4 h-4 " />
							</span>
						</>
					</LogoutLink>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserNavbar;
