import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (req: Request, res: Response) => {

    try {
        // recupération des données du post
        const body = await req.json();

       console.log(body.image);
        return NextResponse.json(body, { status: 200 });

        

        // requete vers la database avec prisma
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                image: body.image,
            }
        });

        // retour de la requète
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Something went wrong!",
            },
            { status: 500 }
        ); 
    }

}