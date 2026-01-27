import { Metadata } from 'next';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import { Guestbook } from '@/components/Guestbook';
import { client } from '@/sanity/lib/client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Amirul | Guestbook',
  description: 'Sign my guestbook and leave a message!',
};

interface Message {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
}

async function getMessages(): Promise<Message[]> {
  try {
    const messages = await client.fetch(
      `*[_type == "chat"] | order(createdAt desc)[0...50] {
        _id,
        name,
        message,
        createdAt
      }`,
    );
    return messages || [];
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return [];
  }
}

export default async function GuestbookPage() {
  const messages = await getMessages();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-8 md:pt-28 md:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Guestbook
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join the conversation! Leave a message and say hello. I&apos;d love to hear from you.
            </p>
          </div>

          {/* Chat Room */}
          <Guestbook initialMessages={messages} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
