import React from 'react'
import { postQuery } from '@/sanity/lib/queries';
import { client, fetcher } from '@/sanity/lib/client';
import Navbar from '@/components/shared/navbar';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image'
import { PortableText } from "@portabletext/react";
import { Post } from '@/sanity/lib/types/post';
import LatestPostsHorizontal from '@/components/blog/latest-posts-horizontal';
import { Urbanist } from 'next/font/google';
import Footer from '@/components/shared/footer';


interface Props {
    params:{
        slug:string
    };
}

const urbanist = Urbanist({subsets:['latin']})

async function BlogPosts({params}: Props) {
    const {slug} = params;

    const post:Post = await fetcher(postQuery, {slug})
    const builder = imageUrlBuilder(client);
    const formatedDate = post? new Date(post.publishedAt).toLocaleDateString() : new Date().toLocaleDateString();


    
  return (
    <div className={`min-h-screen antialiased`}>
        <Navbar/>
        <div className={`w-full ${urbanist.className}`}>
            <div className='relative flex items-end pb-28 justify-center w-full h-[80vh] mt-20 z-10'>
           
            <div className="bg-primary/80 p-10 border border-border text-primary-foreground bg-blend-lighten backdrop-blur-sm max-w-6xl rounded-md z-10 mx-1.5">
                <h1 className='text-4xl sm:text-5xl md:text-5xl font-semibold '>
                    {post && post.title}
                </h1>
                <p className='text-sm md:text-lg ml-1.5 mt-3'>
                    {
                        formatedDate
                    }
                </p>
            </div>
                <Image
                className="object-center object-cover"
                src={builder.image(post.mainImage).width(1200).height(500).url()}
                alt={post?.mainImage?.alt}
                fill={true}
            />
            </div>
            <div className='w-full relative mb-10'>
                <div className='fixed top-0 pattern-isometric pattern-border pattern-bg-muted pattern-size-10 pattern-opacity-20 w-full h-full '></div>
                </div>
            <article className={`p-5 my-10 px-10 pt-15 mx-auto z-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border prose prose-md md:prose-lg max-w-6xl pb-10 pt-10 bg-card/60 backdrop-blur-md text-foreground relative rounded-xl dark:prose-invert`}>
                {post?.body ? <PortableText value={post.body} /> : null}
            </article>

            <div className='bg-card/50 backdrop-blur-sm relative pb-10 max-w-6xl rounded-md border border-border mx-auto'>
                <LatestPostsHorizontal slug={slug}  />
            </div>
            
        </div>
        <Footer/>
    </div>
  )
}

export default BlogPosts