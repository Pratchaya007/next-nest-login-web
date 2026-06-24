import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Image src={'/bakery_image.png'} alt="break" width={40} height={40}/>
    </div>
  )
}