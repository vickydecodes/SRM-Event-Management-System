import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PublicNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-2">
          <CardTitle className="text-4xl font-bold tracking-tight">
            404
          </CardTitle>
          <CardDescription className="text-base">
            Page Not Found
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The page you’re looking for doesn’t exist or may have been moved.
            Please check the URL or return to the dashboard.
          </p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button asChild>
            <a href="/">Go back home</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
