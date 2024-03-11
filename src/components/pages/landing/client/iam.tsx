import { signOut } from "next-auth/react"

type Props = {
    name: string
    imageURL: string
    className?: string
}

export default function IAM({imageURL,name,className}: Props){
    return <div
    className={`max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900 ${className}`}>
    <div className="rounded-t-lg h-40 overflow-hidden">
        <img className="object-cover object-top w-full" src='https://user-images.githubusercontent.com/115187902/230700872-d5f44b85-56c7-4e27-80a4-6e2db901e60c.gif' alt='Mountain'/>
    </div>
    <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img className="object-cover object-center h-32" src={imageURL} alt='avatar'/>
    </div>
    <div className="text-center mt-2">
        <h2 className="font-semibold">{name}</h2>
        <p className="text-gray-500">PIOKI's member</p>
    </div>
    <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
        <li className="flex flex-col items-center justify-around">
            <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <div>2k</div>
        </li>
        <li className="flex flex-col items-center justify-between">
            <svg className="w-5 fill-current text-blue-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4c0 1.1.9 2 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.8-3.1a5.5 5.5 0 0 0-2.8-6.3c.6-.4 1.3-.6 2-.6a3.5 3.5 0 0 1 .8 6.9Zm2.2 7.1h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1l-.5.8c1.9 1 3.1 3 3.1 5.2ZM4 7.5a3.5 3.5 0 0 1 5.5-2.9A5.5 5.5 0 0 0 6.7 11 3.5 3.5 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4c0 1.1.9 2 2 2h.5a6 6 0 0 1 3-5.2l-.4-.8Z" clip-rule="evenodd"/>
            </svg>
  
            <div>10k</div>
        </li>
        <li className="flex flex-col items-center justify-around">
            <svg className="w-5 fill-current text-blue-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M12.3 3.3a1 1 0 0 1 1.4 0L16.4 6h-2.8l-1.3-1.3a1 1 0 0 1 0-1.4Zm.1 2.7L9.7 3.3a1 1 0 0 0-1.4 0L5.6 6h6.8ZM4.6 7A2 2 0 0 0 3 9v10c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.5-2h-13Z" clip-rule="evenodd"/>
            </svg>
  
            <div>28k</div>
        </li>
    </ul>
    <div className="p-4 border-t mx-8 mt-2">
        <button onClick={() => signOut({callbackUrl:"/#auth",redirect:false})} className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Logout</button>
    </div>
</div>
}