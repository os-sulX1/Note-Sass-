import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./Themtoggle";
import { Button } from "@/components/ui/button";
import {
	RegisterLink,
	LoginLink,
	LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNavbar from "./UserNavbar";
getKindeServerSession;

type Props = {};

const Navbar = async (props: Props) => {
	const { isAuthenticated ,getUser  } = getKindeServerSession();
	const user =await getUser()

	
	return (
		<nav className="border-b bg-background h-[10vh] flex items-center]">
			<div className="container flex items-center justify-between">
				<Link href={"/"}>
					<h1 className="text-3xl font-bold">Marshal <span className="text-primary">Sass</span></h1>
				</Link>
				<div className="flex items-center gap-x-5">
					<ThemeToggle />
					{(await isAuthenticated()) ? (
						<>
						<UserNavbar name={user?.given_name as string} email={user?.email as string} image={user?.picture as string} />
						</>
					) : (
						<div className="flex items-center gap-x-5">
							<LoginLink>
								<Button >Sing In </Button>
							</LoginLink>
							<RegisterLink>
								<Button variant={"secondary"}>Sing Up </Button>
							</RegisterLink>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
