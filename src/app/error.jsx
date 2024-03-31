"use client"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const Error = () => {

  // CLIENT SIDE NAVIGATION
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const q = searchParams.get("q")

  console.log(q)

  const handleClickBack = ()=>{
    console.log("clicked Back")
    router.forward()
  }

  const handleClickForward = ()=>{
    console.log("clicked")
    router.forward()
  }

  return (
    <div>
      <p>Error </p>
      <Link href="/" prefetch={false}>Go homepage</Link>
      <button onClick={handleClickBack}>Go back</button>
      <button onClick={handleClickForward}>Or go forward</button> if applicable
    </div>
  )
}

export default Error