'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { parseISO, format } from 'date-fns'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { Types } from '@/types'
import { removeVehicle } from '@/app/dashboard/vehicles/actions'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Types.Vehicle>[] = [
  {
    accessorKey: 'make',
    header: 'Make',
  },
  {
    accessorKey: 'model',
    header: 'Model',
  },
  {
    accessorKey: 'vin',
    header: 'VIN',
  },
  {
    accessorKey: 'created',
    header: 'Created',
    cell: ({ row }) => {
      return <div>{format(row.original.created, 'LLLL d, yyyy')}</div>
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const vehicle = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/dashboard/vehicles/${vehicle.id}/update`}>
              <DropdownMenuItem className='cursor-pointer'>
                Update
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='text-red-600 cursor-pointer hover:text-red-950'
              onClick={() => removeVehicle(vehicle.id)}
            >
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
