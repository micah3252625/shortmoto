
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const [longUrl, setLongUrl] = useState();
    const navigate = useNavigate();
    const handleShorten = (e) => {
        e.preventDefault();
        if (longUrl) {
            navigate(`/auth?createNew=${longUrl}`)
        }
    }
    return (
        <section className='flex flex-col items-center'>
            <h2 className='my-10 sm:my-16 text-3xl sm:text-5xl lg:text-6xl text-center font-extrabold leading-tight'>
                <span className='tracking-wide'>Fast, Reliable, and Customizable</span>
                <br />
                <span className='font-bold leading-snug'>
                    The Only URL Shortener You&#39;ll Ever Need! 👇🥵
                </span>
            </h2>

            <form onSubmit={handleShorten} className='sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2 mb-5'>
                <Input
                    type='url'
                    value={longUrl}
                    placeholder='Enter your URL here...'
                    onChange={(e) => setLongUrl(e.target.value)}
                    className='h-full flex-1 p-4'
                />
                <Button className="h-full text-xl bg-red-500 text-white hover:bg-red-600" type="submit" variant="destructive">Shorten! 🤏</Button>
            </form>

            <div className='w-full my-8 border-t border-gray-600'></div>

            <Accordion type="multiple" collapsible className='w-full md:px-11'>
                <h3 className='text-2xl sm:text-3xl font-bold my-3 text-center'>
                    Frequently Asked Questions 🤔
                </h3>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern, ensuring accessibility for all users, including those using screen readers.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How reliable is the service?</AccordionTrigger>
                    <AccordionContent>
                        Our system is built on robust infrastructure, guaranteeing 99.9% uptime and ensuring your links are always accessible.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Can I customize my shortened URLs?</AccordionTrigger>
                    <AccordionContent>
                        Absolutely! You can personalize your shortened URLs with custom slugs to make them more memorable and branded.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Is there a limit to URL shortening?</AccordionTrigger>
                    <AccordionContent>
                        There is no limit! You can shorten as many URLs as you need, completely free of charge.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>Do you offer analytics?</AccordionTrigger>
                    <AccordionContent>
                        Yes. Our service includes click analytics, so you can track how your links are performing in real time.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </section>

    )
}

export default LandingPage