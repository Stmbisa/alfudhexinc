
"use client"
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Error = ({ statusCode, message }) => {
  // CLIENT SIDE NAVIGATION
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const q = searchParams.get("q");

  console.log(q);

  const handleClickBack = () => {
    console.log("clicked Back");
    router.back();
  };

  const handleClickForward = () => {
    console.log("clicked Forward");
    router.forward();
  };

  return (
    <div>
      <p>Error: {statusCode}</p>
      <p>{message}</p>
      <Link href="/" prefetch={false}>Go homepage</Link>
      <button onClick={handleClickBack}>Go back</button>
      <button onClick={handleClickForward}>Or go forward</button> if applicable
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const message = err ? err.message : 'An unexpected error occurred';
  return { statusCode, message };
};

export default Error;







// "use client"
// import Link from "next/link"
// import { usePathname, useRouter, useSearchParams } from "next/navigation"

// const Error = () => {

//   // CLIENT SIDE NAVIGATION
//   const router = useRouter()
//   const pathname = usePathname()
//   const searchParams = useSearchParams()

//   const q = searchParams.get("q")

//   console.log(q)

//   const handleClickBack = ()=>{
//     console.log("clicked Back")
//     router.back()
//   }

//   const handleClickForward = ()=>{
//     console.log("clicked")
//     router.forward()
//   }

//   return (
//     <div>
//       <p>Error </p>
//       <Link href="/" prefetch={false}>Go homepage</Link>
//       <button onClick={handleClickBack}>Go back</button>
//       <button onClick={handleClickForward}>Or go forward</button> if applicable
//     </div>
//   )
// }

// export default Error