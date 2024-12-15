import { Button } from "@/components/ui/button"
import i18n from '@/i18n'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from 'react'


export const InvestmentFooter = () => {
    const [language, setLanguage] = useState("日本語")
    return (
        <div className="grid place-items-end h-full from-primary-300 to-primary-100 w-full bg-gradient-to-tr">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">{language}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <button onClick={() => { i18n.changeLanguage('ja'); setLanguage("日本語") }}>
                                日本語
                            </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <button onClick={() => { i18n.changeLanguage('zh'); setLanguage("中文") }}>
                                中文
                            </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <button onClick={() => { i18n.changeLanguage('en'); setLanguage("English") }}>
                                English
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}