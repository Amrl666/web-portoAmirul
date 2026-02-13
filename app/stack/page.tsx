"use client";
import Navbar from "@/components/shared/navbar";
import React, { useState } from "react";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client, fetcher } from "@/sanity/lib/client";
import { Technology } from "@/sanity/lib/types/technology";
import { getAllTechnologies } from "@/sanity/lib/queries";
import Footer from "@/components/shared/footer";

const builder = imageUrlBuilder(client);
const FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Y2EzYWYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+Tm8gaW1hZ2U8L3RleHQ+PC9zdmc+";

function Stack() {
  const [selected, setSelected] = useState<Technology | null>(null);
  const { data: technologies } = useSWR<Technology[]>(
    getAllTechnologies,
    fetcher
  );
  return (
    <div className="w-full min-h-screen h-full pb-5 px-4 sm:px-6">
      <Navbar />
      <div className="w-full h-full pt-28">
        {technologies && (
          <div className="max-w-6xl border border-border rounded-xl mx-auto backdrop-blur-md bg-card/50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-4 sm:gap-5 p-4 sm:p-5">
            {technologies.map((t) => (
              <Card
                key={t._id}
                className="backdrop-blur-md bg-card h-auto min-h-[120px] md:min-h-[150px] cursor-pointer"
                onClick={() => setSelected(t)}
              >
                <CardContent className="grid grid-rows-1 grid-cols-[auto_1fr] h-full p-4 sm:p-5 gap-4">
                  <div className="w-16 sm:w-20 md:w-24 flex items-center justify-center border-r pr-3 sm:pr-4 border-border">
                    <Image
                      className="object-contain max-w-[50px]"
                      src={
                        t.image
                          ? builder
                            .image(t.image)
                            .width(150)
                            .format("png")
                            .url()
                          : FALLBACK_IMAGE
                      }
                      alt={t?.image?.alt || `${t.title} logo`}
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-foreground font-semibold text-base sm:text-lg">
                      {t.title}
                    </CardTitle>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelected(null)}
          />
          <div className="relative max-w-lg w-full bg-card border border-border rounded-xl shadow-2xl p-6">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              ×
            </button>
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 flex items-center justify-center border border-border rounded-lg bg-background">
                <Image
                  className="object-contain"
                  src={
                    selected.image
                      ? builder.image(selected.image).width(150).format("png").url()
                      : FALLBACK_IMAGE
                  }
                  alt={selected?.image?.alt || `${selected.title} logo`}
                  width={96}
                  height={96}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{selected.title}</h3>
              </div>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              {selected.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stack;
