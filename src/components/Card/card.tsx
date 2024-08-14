import { BellIcon, CheckIcon } from "@radix-ui/react-icons"
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

type CustomCardProps = React.ComponentProps<typeof Card> & {
    title?: string;
    description?: string;
    imgsrc?: string;
    imdb?: string;
}
function handleClick(){
   
}

export function CardDemo({ className, title, description, imgsrc, imdb, ...props }: CustomCardProps) {
    return (
        <Card className={cn("w-[320px]", className)} {...props}>
            <CardHeader>
                <CardTitle className="flex justify-center"><img src={imgsrc} className="h-[300px] rounded-xl w-[300px]" alt="Poster" /></CardTitle>
                <CardDescription className="flex gap-4 items-center font-bold text-md">
                    <FaStar className="text-2xl fill-yellow-500 ml-2"/>
                  
                        {imdb}
                  
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {/* <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellIcon />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div> */}
                <div>

                    <div
                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                        <div className="space-y-1">
                            <p className="text-lg font-bold leading-none">
                                {title}
                            </p>
                            {/* <p className="text-sm text-muted-foreground">
                  {description}
                </p> */}
                        </div>
                    </div>

                </div>
            </CardContent>
            <Link href={{ pathname: '/Info', query: {title} }}>
            <CardFooter>
                <Button onClick={handleClick} className="w-full bg-blue-900 rounded-xl p-6 hover:bg-blue-950">
                     See More Info
                </Button>
            </CardFooter>
                </Link>
        </Card>
    )
}
