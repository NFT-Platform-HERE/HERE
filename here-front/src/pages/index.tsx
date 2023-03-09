import CommonBtn from '@/components/CommonBtn'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <CommonBtn width={50} height={50} />
  )
}
