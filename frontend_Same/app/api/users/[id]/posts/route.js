import Prompt from "../../../../../models/prompt";
import { connectToDB } from "../../../../../utils/database";

export const GET = async (request,{params}) => {
    
    try {
        await connectToDB()

        const prompts = await Prompt.find({
            creater:params.id
        }).populate('creater')
        // console.log(prompts);
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.error({error});
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 