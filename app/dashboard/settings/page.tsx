//02:04:00
import { SubmitButton } from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath , unstable_noStore as noStore} from "next/cache";
import React from "react";

type Props = {};




async function getData(userId : string) {
	noStore()
  const data = await prisma.user.findUnique({
    where:{
      id:userId
    },
    select:{
      name:true,
      email:true,
      colorScheme:true,
    }
  }) 
  
  return data
}

const page = async (props: Props) => {
  const {getUser} = await getKindeServerSession()
  const user =await getUser() 
  const data =await getData(user?.id  as string)

  async function postData(formData : FormData) {
    'use server'

    const name = formData.get('name') as string
    const colorSachem = formData.get('color') as string

    await prisma.user.update({
      where: {
        id: user?.id  ,
      },
      data: {
        name: name ??  '',
        colorScheme: colorSachem ?? '' ,
      }
    })
		revalidatePath('/' , 'layout')
  
    
  
  
  }

	return (
		<div className="grid items-start gap-8 ">
			<div className="flex items-center justify-center justify-between px-2 ">
				<div className="grid gap-1 ">
					<h1 className="text-3xl md:text-4xl ">Setting</h1>
					<h1 className="text-lg text-muted-foreground">
						Your Profile Settings
					</h1>
				</div>
			</div>
			<Card>
				<form action={postData}>
					<CardHeader>
						<CardTitle>Geneal Data</CardTitle>
						<CardDescription>
							please provide general information about yourself ,please do not
							forget to save
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<div className="space-y-1">
								<Label>Your Name</Label>
								<Input
									name="name"
									type="text"
									id="name"
									placeholder="Yor Name"
                  defaultValue={data?.name ?? undefined}
								/>
							</div>

							<div className="space-y-1">
								<Label>Your Email</Label>
								<Input
									name="email"
									type="email"
									id="email"
									placeholder="Yor Email"
									disabled
                  defaultValue={data?.email ?? undefined}
								/>
							</div>

							<div className="space-y-1">
								<Label> Color Schema </Label>
								<Select name="color" defaultValue={data?.colorScheme ?? undefined}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a color" />
									</SelectTrigger>
									<SelectContent>
                    <SelectGroup>
                      <SelectLabel>Color</SelectLabel>
                      <SelectItem value="theme-green">Green</SelectItem>
                      <SelectItem value="theme-blue">Blue</SelectItem>
                      <SelectItem value="theme-violet">Violet</SelectItem>
                      <SelectItem value="theme-yellow">Yellow</SelectItem>
                      <SelectItem value="theme-orange">Orange</SelectItem>
                      <SelectItem value="theme-red">Red</SelectItem>
                      <SelectItem value="theme-rose">Rose</SelectItem>
                    </SelectGroup>
                  </SelectContent>
								</Select>
							</div>
						</div>
					</CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
				</form>
			</Card>
		</div>
	);
};

export default page;
