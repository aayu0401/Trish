
import Link from "next/link";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, CreditCard, PlusCircle, ShoppingBag, Heart } from "lucide-react";

export default function WalletPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-headline text-primary">My Wallet</h1>
          <p className="text-muted-foreground">Manage your balance and top up to send gifts.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-6 w-6 text-primary" />
                Current Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-primary">150 <span className="text-2xl text-muted-foreground">coins</span></p>
              <p className="text-sm text-muted-foreground mt-2">Use coins to send virtual gifts and stand out.</p>
            </CardContent>
             <CardFooter className="flex flex-col sm:flex-row gap-4">
                 <Link href="/gifts" passHref className="w-full">
                    <Button variant="outline" className="w-full">
                        <ShoppingBag className="mr-2 h-4 w-4"/>
                        Browse Gift Store
                    </Button>
                </Link>
                 <Link href="/likes" passHref className="w-full">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                      <Heart className="mr-2 h-4 w-4"/>
                      See Who Likes You
                  </Button>
                </Link>
            </CardFooter>
          </Card>

          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-primary" />
                Top Up Balance
              </CardTitle>
              <CardDescription>Add funds securely to purchase more coins.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="**** **** **** 1234" />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM / YY" />
                  </div>
                  <div className="w-1/2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="***" />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <Label>Amount:</Label>
                    <span className="font-bold text-xl text-primary">$10.00 (100 coins)</span>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary hover:bg-primary/90">
                <PlusCircle className="mr-2 h-4 w-4"/>
                Add 100 coins
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
