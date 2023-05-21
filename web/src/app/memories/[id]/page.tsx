import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import Image from 'next/image'
import { Calendar, ChevronLeft, User } from 'lucide-react'
import Link from 'next/link'

dayjs.locale(ptBr)

interface Memory {
  id: string
  userId: string
  coverUrl: string
  content: string
  isPublic: boolean
  createdAt: string
  user: {
    name: string
  }
}

interface ViewMemoryProps {
  params: {
    id: string
  }
}

export default async function ViewMemory({ params }: ViewMemoryProps) {
  const { id } = params

  const token = cookies().get('token')?.value
  const memoryResponse = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: Memory = memoryResponse.data

  console.log(memory)

  return (
    <div className="flex flex-col gap-10 p-8">
      <div className="space-y-4">
        <Link
          href="/"
          className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar à timeline
        </Link>

        <div className="flex items-center gap-4">
          <p className="flex items-center gap-1 text-sm text-gray-200">
            <User className="h-4 w-4" />
            {memory.user.name}
          </p>

          <time className="flex items-center gap-1 text-sm text-gray-200">
            <Calendar className="h-4 w-4" />
            {dayjs(memory.createdAt).format('D[ de ]MMMM[ de ]YYYY')}
          </time>
        </div>

        <Image
          src={memory.coverUrl}
          width={592}
          height={280}
          className="aspect-video w-full rounded-lg object-cover"
          alt=""
        />

        <p className="leading-rel text-lg text-gray-100">{memory.content}</p>
      </div>
    </div>
  )
}
