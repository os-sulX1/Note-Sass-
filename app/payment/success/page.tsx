import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {Check } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const SuccessRoute = (props: Props) => {
  return (
    <div className='w-full min-h-[80vh] flex items-center justify-center '>
      <Card>
        <div className="p-6">
          <div className=" w-full  flex justify-center">
            <Check className='w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2' />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className='text-lg leading-5 font-medium '>Payment Successful</h3>
            <div className="mt-2">
              <p className='text-sm text-muted-foreground'>will done , you are embark a journey with us</p>
            </div>
            <div className="mt-5 sm:mt-6 w-full">
              <Button className='
              w-full' asChild>
                <Link href={'/'}>
                  Go back to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>

    </div>
  )
}

export default SuccessRoute