import { workBench } from "@/utils/font"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function AppLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    const session = await getServerSession(authOptions)
    const {user:{id}} = session!
    return (
      <section>
        <div className={`px-4 mx-auto max-w-7xl sm:px-6 h-[10vh] ${workBench.className}`}>
            <div className="relative pt-6 pb-16 sm:pb-24">
                <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
                    <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                        <div className="flex items-center justify-between w-full md:w-auto">
                            <a><span className="sr-only">PIOKI</span>
                                <img className="w-auto h-8 sm:h-10" src="https://www.svgrepo.com/show/448244/pack.svg" loading="lazy" width="202" height="40"/>
                            </a>
                            {/* <div className="flex items-center -mr-2 md:hidden">
                                <button className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-50 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-50"  type="button" aria-expanded="false">
                                    <span className="sr-only">Open main menu</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </button>
                            </div> */}
                        </div>
                    </div>
                    <div className="hidden md:flex md:space-x-10 list-none">
                        <li>
                            <Link href={`/profile/${id}`}>
                                <div className="select-none cursor-pointer text-base font-normal text-gray-500 list-none hover:text-gray-900"
                                   >My Profile</div>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/vault`}>
                                    <div className="select-none cursor-pointer text-base font-normal text-gray-500 list-none hover:text-gray-900"
                                    >My Vault</div>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/feed`}>
                                <div className="select-none cursor-pointer text-base font-normal text-gray-500 list-none hover:text-gray-900"
                                   >Feed</div>
                            </Link>
                        </li>
                    </div>
                    <div className="_hidden_ md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                        <div className="inline-flex rounded-full shadow gap-2">
                            <Link href={`/profile/${id}`} className="sm:hidden">
                                <div
                                    className="inline-flex items-center px-4 py-2 text-base text-gray-900 bg-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50 ">
                                    {"<👤/>"}
                                </div>
                            </Link>

                            <Link href="/vault" className="sm:hidden">
                                <div
                                    className="inline-flex items-center px-4 py-2 text-base text-gray-900 bg-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50 ">
                                    {"<👜/>"}
                                </div>
                            </Link>

                            <Link href="/">
                                <div
                                    className="inline-flex items-center px-4 py-2 text-base text-gray-900 bg-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50 ">
                                    {"<🏠/>"}
                                </div>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </div>


        {children}
      </section>
    )
  }