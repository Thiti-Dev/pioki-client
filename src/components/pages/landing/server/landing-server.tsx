import { dancingScript } from "@/utils/font"
import LandingClient from "../client/landing-client"
export default function LandingServer(){
    return (
        <>
            <div
                id="main-header-container"
                className="mx-auto h-[400px] w-screen overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat shadow-lg flex justify-center items-center"
                style={{backgroundImage: `url('/assets/landing-background-detailed.jpg')`,backgroundPositionY:-400}}>

                <div id="main-header-parallax" className="hidden">
                    <span className={`
                        ${dancingScript.className} 
                        text-center text-white shadow-lg outline rounded-md p-5 text-[1rem] sm:text-[1.6rem] md:text-[2rem] lg:text-[3rem] font-extrabold
                    `}>You simply just have to pass it along or keep it alone</span>
                </div>
            </div>

            <LandingClient/>
        </>
    )
}