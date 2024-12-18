import {Link, useNavigate} from 'react-router-dom'
import {useTheme} from "../context/ThemeProvider";
import {ThemeToggle} from './ThemeToggle'
import {Button} from './ui/button';
import {LinkIcon, LogIn, LogOut} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {UrlState} from "@/context.jsx";
import useFetch from "@/hooks/useFetch.js";
import {BarLoader} from "react-spinners";
import {logout} from "@/db/apiAuth.js";


const Header = () => {
    const {theme} = useTheme();
    const navigate = useNavigate();
    const {user, fetchUser} = UrlState();
    const {loading, fn: fnLogout} = useFetch(logout);
    return (
        <>
            {loading && <BarLoader className='mb-4' width={'100%'} color='#36d7b7'/>}
            <header
                className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
                <nav className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link to={"/"}>
                        <h1
                            className={`items-center 
                                    ${theme === "dark" ? "text-white" : "text-black"
                            } tracking-[.40em] font-bold text-xl`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <LinkIcon/>
                                <p className="text-lg tracking-wider font-semibold">ShortMoTo</p>
                            </div>
                        </h1>
                    </Link>
                    <div className="flex items-center gap-5">
                        <ThemeToggle/>
                        <div className="w-px h-6 bg-gray-300"></div>
                        {!user ?
                            <Button onClick={() => {
                                navigate("/auth")
                            }}>
                                <LogIn/> Login
                            </Button>
                            : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                                        <Avatar>
                                            <AvatarImage src={user?.user_metadata?.profile_pic}/>
                                            <AvatarFallback>PA</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>
                                            {user?.user_metadata?.name}
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem>
                                            <Link to="/dashboard" className="flex">
                                                <LinkIcon className="mr-2 h-4 w-4"/>
                                                My Links
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => {
                                                fnLogout().then(() => {
                                                    fetchUser();
                                                    navigate("/auth");
                                                });
                                            }}
                                            className="text-red-400"
                                        >
                                            <LogOut className="mr-2 h-4 w-4"/>
                                            <span>Logout</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )
                        }
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header