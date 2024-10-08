import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (req: Request) => {

    try {
        // recupération des données du post
        const body = await req.json();
        const { title, content, image } = body;
        let imageBuffer = null;
        if (image) {
            imageBuffer = Buffer.from(body.image, "base64");  
        }
        // requete vers la database  
        const post = await prisma.post.create({
            data: {
                title: title,
                content: content,
                image: imageBuffer,
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

export const GET = async () => {
    try {
        // Récupérer tous les posts
        const posts = await prisma.post.findMany();

        // Convertir l'image (Bytes) en base64 pour chaque post
        const postsWithImages = posts.map((post) => ({
            ...post,
            image: post.image ? post.image.toString("base64") : null, // Convertir Buffer en base64
        }));

        // Retourner les posts au format JSON avec les images en base64
        return NextResponse.json(postsWithImages, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong!" },
            { status: 500 }
        );
    }
};
