'use client';

import { useOptimistic, useRef, useState, useTransition, useEffect, FormEvent } from 'react';
import { addMessage, deleteMessage } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, MessageCircle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  _id?: string;
  name: string;
  message: string;
  createdAt: string;
}

interface GuestbookProps {
  initialMessages: Message[];
}

export function Guestbook({ initialMessages }: GuestbookProps) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[], Message>(
    initialMessages,
    (state, newMessage) => [newMessage, ...state],
  );

  const [isPending, startTransition] = useTransition();
  const [messageLength, setMessageLength] = useState(0);
  const [adminKey, setAdminKey] = useState('');
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Only scroll to bottom if user has submitted a message
    if (hasSubmitted) {
      scrollToBottom();
    }
  }, [optimisticMessages, hasSubmitted]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const message = formData.get('message') as string;

    if (!name || !message) {
      return;
    }

    // Clear form immediately
    formRef.current?.reset();
    setMessageLength(0);
    inputRef.current?.focus();
    setHasSubmitted(true);

    startTransition(async () => {
      // Add optimistic message within transition
      addOptimisticMessage({
        name,
        message,
        createdAt: new Date().toISOString(),
      });

      try {
        await addMessage(formData);
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    });
  }

  async function handleDelete(messageId: string) {
    if (!messageId || !adminKey) return;

    const confirmed = window.confirm('Are you sure you want to delete this message?');
    if (!confirmed) return;

    setDeletingId(messageId);
    try {
      await deleteMessage(messageId, adminKey);
    } catch (error) {
      console.error('Failed to delete message:', error);
      alert('Failed to delete message. Check your admin key.');
    } finally {
      setDeletingId(null);
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    if (isToday) {
      return 'Today';
    }

    return date.toLocaleDateString('id-ID', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto h-screen md:h-auto md:max-h-[600px] flex flex-col rounded-lg md:border md:border-border md:overflow-hidden shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Chat Header */}
      <motion.div 
        className="px-4 py-4 md:px-6 md:py-5 border-b border-border bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-md flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div 
          className="flex items-center gap-3"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <motion.div 
            className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-5 h-5 text-accent-foreground" />
          </motion.div>
          <div>
            <h3 className="font-semibold text-foreground">Guestbook</h3>
            <p className="text-xs text-muted-foreground">{optimisticMessages.length} messages</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdminInput(!showAdminInput)}
            className="text-xs"
          >
            {showAdminInput ? 'Hide Admin' : 'Admin Mode'}
          </Button>
        </motion.div>
      </motion.div>

      {/* Admin Key Input */}
      <AnimatePresence>
        {showAdminInput && (
          <motion.div 
            className="px-4 py-3 border-b border-border bg-card/30 backdrop-blur-sm"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Input
              type="password"
              placeholder="Enter admin key..."
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="text-sm h-9"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Container */}
      <motion.div 
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gradient-to-b from-card/30 via-background/50 to-card/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {optimisticMessages.length === 0 ? (
          <motion.div 
            className="h-full flex items-center justify-center text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground/40" />
              </motion.div>
              <div>
                <p className="text-muted-foreground font-medium">No messages yet</p>
                <p className="text-sm text-muted-foreground/60">Be the first to say something nice!</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              {optimisticMessages.map((msg, idx) => {
                const prevMsg = idx > 0 ? optimisticMessages[idx - 1] : null;
                const showDate =
                  !prevMsg ||
                  formatDate(msg.createdAt) !== formatDate(prevMsg.createdAt);

                return (
                  <div key={msg._id || `temp-${idx}`}>
                    {showDate && (
                      <motion.div 
                        className="flex items-center justify-center my-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="text-xs text-muted-foreground/60 bg-card/30 px-3 py-1 rounded-full backdrop-blur-sm">
                          {formatDate(msg.createdAt)}
                        </div>
                      </motion.div>
                    )}
                    <motion.div 
                      className="flex gap-3 group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 text-xs font-semibold text-accent">
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 justify-between">
                          <div className="flex items-baseline gap-2">
                            <span className="font-semibold text-sm text-foreground">{msg.name}</span>
                            <span className="text-xs text-muted-foreground/50">{formatTime(msg.createdAt)}</span>
                          </div>
                          {adminKey && msg._id && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(msg._id!)}
                                disabled={deletingId === msg._id}
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="w-3 h-3 text-destructive" />
                              </Button>
                            </motion.div>
                          )}
                        </div>
                        <motion.div 
                          className="mt-1 p-3 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 text-sm text-foreground/80 leading-relaxed break-words hover:border-border/80 hover:bg-card/90 transition-all duration-200 shadow-sm"
                          whileHover={{ y: -2 }}
                        >
                          {msg.message}
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </>
        )}
      </motion.div>

      {/* Input Form */}
      <motion.div 
        className="px-4 py-4 md:px-6 md:py-5 border-t border-border bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
          <motion.div 
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Input
              ref={inputRef}
              name="name"
              placeholder="Your name"
              maxLength={50}
              required
              disabled={isPending}
              className="flex-1 bg-background border-border h-10 text-sm focus:ring-accent"
            />
          </motion.div>
          <motion.div 
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <div className="flex-1 relative">
              <textarea
                ref={messageRef}
                name="message"
                placeholder="Say something nice... (max 140 characters)"
                maxLength={140}
                rows={2}
                required
                disabled={isPending}
                onChange={(e) => setMessageLength(e.target.value.length)}
                className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
              <div className="absolute bottom-2 right-3 text-xs text-muted-foreground/50">
                {messageLength}/140
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-10 transition-all duration-200"
            >
              <Send className="w-4 h-4 mr-2" />
              {isPending ? 'Sending...' : 'Send'}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}
