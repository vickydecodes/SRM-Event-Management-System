import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            SRM Event Management System
          </CardTitle>
          <CardDescription>
            Sign in to manage and participate in events
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email / Register Number</Label>
            <Input
              id="email"
              type="text"
              placeholder="Enter your email or register number"
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label
                htmlFor="remember"
                className="text-sm font-normal text-muted-foreground"
              >
                Remember me
              </Label>
            </div>

            <a
              href="#"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot password?
            </a>
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="pt-4">
          <Button className="w-full">
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
