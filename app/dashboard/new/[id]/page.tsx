import { SubmitButton } from '@/app/components/SubmitButton'
import prisma from '@/app/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { revalidatePath , unstable_noStore as noStore} from "next/cache";
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const getData = async(userId : string , noteId : string) =>{
  noStore()
  const data = await prisma.note.findUnique({
    where:{
      id: noteId,
      userId:userId,
    },
    select:{
      title:true,
      description:true,
      id:true,
    }
  })
  return data
}

const DynamicRoute = async ({params}: {params :{id:string}}) => {
  const {getUser} = getKindeServerSession()
  const user =  await getUser()
  const data =await getData(user?.id as string ,params.id)


    const postData = async(formData :FormData) =>{
      'use server'
      if(!user){
        throw new Error('You are not Allowed')
      }
      const title = formData.get('title') as string
      const  description =formData.get('description') as string

      await prisma.note.update({
        where:{
          id:data?.id,
          userId:user?.id
        },
        data:{
          description:description,
          title:title,
        }
      })
      revalidatePath('/dashboard')
      return redirect('/dashboard')
    }
   

  return (
    <Card>
    <form action={postData} >
      <CardHeader>
        <CardTitle>Edit NOTE</CardTitle>
        <CardDescription>
          Right here you can now edit your new notes
        </CardDescription>
        </CardHeader>
      <CardContent className=" flex flex-col gap-y-5">
        <div className="gap-y-2 flex flex-col">
          <Label>Title</Label>
          <Input
            required
            type="text"
            name="title"
            placeholder="Title for you note"
            defaultValue={data?.title}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Description</Label>
          <Textarea
            name="description"
            placeholder="Describe your note as you want"
            required
            defaultValue={data?.description}
          />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button asChild variant={"destructive"} type='submit'>
          <Link href={"/dashboard"}>Cancel</Link>
        </Button>
        <SubmitButton />
      </CardFooter>
    </form>
  </Card>
  )
}

export default DynamicRoute