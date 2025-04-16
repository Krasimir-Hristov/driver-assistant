import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Welcome to Driver Assistant</CardTitle>
          <CardDescription>Your Next.js app with Shadcn UI is ready!</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Get Started</Button>
        </CardContent>
      </Card>
    </main>
  )
}
