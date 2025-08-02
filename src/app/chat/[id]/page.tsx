
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Send, ShieldAlert, Loader, Gift, MoreVertical, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { currentUser, profiles } from '@/lib/data';
import { verifyChatMessage } from '@/ai/flows/verify-chat';
import type { Gift as GiftType } from '@/lib/data';
import { GiftDialog } from '@/components/gift-dialog';
import { useMatchStore } from '@/hooks/use-match-store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'match';
};

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const matchId = parseInt(params.id as string, 10);

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isGiftDialogOpen, setIsGiftDialogOpen] = useState(false);
  const [isUnmatchAlertOpen, setIsUnmatchAlertOpen] = useState(false);
  const { removeMatch } = useMatchStore();

  const match = profiles.find((p) => p.id === matchId);

  if (!match) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <p>Match not found.</p>
        <Link href="/matches">
          <Button variant="link">Back to matches</Button>
        </Link>
      </div>
    );
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      const result = await verifyChatMessage({ message: newMessage });

      if (result.isSafe) {
        setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'user' }]);
        setNewMessage('');
      } else {
        toast({
          variant: 'destructive',
          title: 'Message Blocked',
          description: `Reason: ${result.reason} (Type: ${result.classification})`,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not verify the message. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGiftSend = (gift: GiftType) => {
    toast({
      title: "Gift Sent!",
      description: `You sent a ${gift.name} to ${match.name.split(',')[0]}.`,
    });
    setIsGiftDialogOpen(false);
  };
  
  const handleUnmatch = () => {
    removeMatch(match.id);
    toast({
      title: "Unmatched",
      description: `You have unmatched with ${match.name.split(',')[0]}.`,
    });
    router.push('/matches');
  };


  return (
    <>
    <div className="flex flex-col h-screen bg-secondary/30">
      <header className="flex items-center gap-4 p-3 border-b bg-background shadow-sm">
        <Link href="/matches" passHref>
          <Button variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
        </Link>
        <Avatar>
          <AvatarImage src={match.photos[0]} alt={match.name} />
          <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="font-semibold flex-grow">{match.name.split(',')[0]}</div>
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                 className="text-destructive focus:text-destructive"
                 onClick={() => setIsUnmatchAlertOpen(true)}
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Unmatch</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <Alert variant="default" className="bg-primary/10 border-primary/20">
            <ShieldAlert className="h-4 w-4 text-primary" />
            <AlertTitle>Safety First!</AlertTitle>
            <AlertDescription>
                All messages are scanned by AI to prevent spam and harassment. Exchanging contact info is discouraged until you're comfortable.
            </AlertDescription>
        </Alert>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'match' && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={match.photos[0]} />
                <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-background text-foreground rounded-bl-none'
              }`}
            >
              <p>{message.text}</p>
            </div>
             {message.sender === 'user' && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.photo} />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
         {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
                <p>It's a match! Why not send the first message?</p>
            </div>
         )}
      </main>

      <footer className="p-3 border-t bg-background">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
           <Button type="button" variant="ghost" size="icon" onClick={() => setIsGiftDialogOpen(true)}>
            <Gift className="text-primary" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            autoComplete="off"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !newMessage.trim()}>
            {isLoading ? <Loader className="animate-spin" /> : <Send />}
          </Button>
        </form>
      </footer>
    </div>
    <GiftDialog
        isOpen={isGiftDialogOpen}
        onOpenChange={setIsGiftDialogOpen}
        onGiftSend={handleGiftSend}
        giftType="real"
      />
      <AlertDialog open={isUnmatchAlertOpen} onOpenChange={setIsUnmatchAlertOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <div className="text-lg font-semibold">Are you sure?</div>
                <div className="text-sm text-muted-foreground">
                    This will permanently remove {match.name.split(',')[0]} from your matches and delete your conversation history. This action cannot be undone.
                </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleUnmatch} className="bg-destructive hover:bg-destructive/90">
                    Unmatch
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
