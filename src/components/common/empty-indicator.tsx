import Image from "next/image";

type Props = {
    message?: string
}

export default function EmptyIndicator(props: Props){
    return <div className="h-full w-full flex items-center justify-center gap-4">
        <Image alt="empty" src="https://www.svgrepo.com/show/489659/empty-box.svg" width={70} height={70}/>
        <p>{props.message ?? "No items are found . . ."}</p>
    </div>
}