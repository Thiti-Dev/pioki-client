'use client'

import { workBench } from "@/utils/font"

export default function Developers(){
    return <div className={`${workBench.className} w-full max-w-md p-4 rounded-lg shadow sm:p-8 bg-gray-800 border-gray-700`}>
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-white">Developer&apos;s contribution</h5>
        {/* <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
        </a> */}
   </div>
   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-700">
            <li className="py-3 sm:py-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://avatars.githubusercontent.com/u/36455825?v=4" alt="Neil image"/>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium truncate text-white">
                            Thiti-Dev
                        </p>
                        <p className="text-sm truncate text-gray-400">
                            thiti.mwk.dev@gmail.com
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-white">
                        ~INF
                    </div>
                </div>
            </li>
            {/* <li className="py-3 sm:py-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://avatars.githubusercontent.com/u/54204982?v=4" alt="Neil image"/>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Papichaya-Dev
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            papi.chaya.dev@gmail.com
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        ~1
                    </div>
                </div>
            </li> */}
        </ul>
   </div>
</div>
}