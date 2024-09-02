'use server'

import { ChatOpenAI } from "@langchain/openai";

import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createRetrievalChain } from "langchain/chains/retrieval";

import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";
import { title } from "process";


const model = new ChatOpenAI({
    modelName: "gpt-4o",
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEY
});

// Create prompt
const prompt = ChatPromptTemplate.fromTemplate(
    `
    You are a friendly and empathetic specialist assistant in prostate and breast cancer. Your primary goal is to explain complex medical concepts in a simple and gentle manner, as if you were talking to a 5-year-old child. Use clear, comforting language, and avoid any technical jargon. 
    Always ensure that your explanations are easy to understand and reassuring, prioritizing the well-being and emotional comfort of the user.
    
    Answer the user's questions based only on the following context. If the answer is not in the context, reply politely that you do not have that information available.:

    ==============================
    Context: {context}
    ==============================
    
    user: {input}
    assistant:`

);

const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: process.env.OPENAI_API_KEY,
});

const supabaseClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PRIVATE_KEY!
);

const vectorStore = new SupabaseVectorStore(embeddings, {
    client: supabaseClient,
    tableName: "documents",
    queryName: "match_documents",
});

export async function askQuestion(formData: FormData) {

    const chain = await createStuffDocumentsChain({
        llm: model,
        prompt,
    });

    const input: string = formData.get('q')?.toString() || ""

    const retriever = vectorStore.asRetriever({ k: 4 });

    const retrievalChain = await createRetrievalChain({
        combineDocsChain: chain,
        retriever,
    });

    const response = await retrievalChain.invoke({
        input,
    });

    const sources = response.context.map(d => ({
        link: d.metadata.link,
        title: d.metadata.title,
    }))

    return {
        input,
        answer: response.answer,
        sources
    }
}