'use client'
import styled from "styled-components"
import { Button } from "../Button"
import { PaperPlaneRight } from "../Icons"
import { Input } from "../Input"
import { askQuestion } from "@/app/actions/chat"
import { useState } from "react"
import ChatBubble from "../ChatBubble"
import SourceList from "../SourceList"
import { Loader } from "../Loader"

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`

interface ISource {
    title: string
    link: string
}

export const Form = () => {

    
    const [aiResponse, setAiResponse] = useState("")
    const [sources, setSources] = useState<ISource[]>([])

    async function formSubmit(formData: FormData) {

        setAiResponse("")
        setSources([])
        const response = await askQuestion(formData)
        
        setAiResponse(response.answer)
        setSources(response.sources)

    }
    return (
        <>

            <form action={formSubmit}>

                <StyledContainer>
                    <Input placeholder="Ask anything" name="q"/>

                    <Button>
                        <PaperPlaneRight />
                    </Button>
                </StyledContainer>
                <hr />  
                <Loader />
            </form>



            <ChatBubble message={aiResponse} />

            <SourceList sources={sources} />

        </>
    )
}