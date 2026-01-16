import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function Settings() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Settings
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage system-wide configurations and preferences.
        </p>
      </div>

      <Separator />

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Basic configuration for the event management system.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="system-name">System Name</Label>
            <Input
              id="system-name"
              placeholder="SRM Event Management System"
            />
          </div>

          <div className="space-y-2">
            <Label>Default Academic Year</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select academic year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-25">2024–2025</SelectItem>
                <SelectItem value="2025-26">2025–2026</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Approval Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Settings</CardTitle>
          <CardDescription>
            Control how event approval workflows behave.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Require Admin Approval</Label>
              <p className="text-sm text-muted-foreground">
                All events must be approved by Super Admin.
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-assign Hall</Label>
              <p className="text-sm text-muted-foreground">
                Automatically assign available halls on approval.
              </p>
            </div>
            <Switch />
          </div>

          <Button>Update Approval Settings</Button>
        </CardContent>
      </Card>

      {/* Access & Security */}
      <Card>
        <CardHeader>
          <CardTitle>Access & Security</CardTitle>
          <CardDescription>
            Configure access limits and security preferences.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Allow HOD Event Creation</Label>
              <p className="text-sm text-muted-foreground">
                Enable HODs to create event requests.
              </p>
            </div>
            <Switch />
          </div>

          <div className="space-y-2">
            <Label>Password Expiry (Days)</Label>
            <Input type="number" placeholder="90" />
          </div>

          <Button>Save Security Settings</Button>
        </CardContent>
      </Card>
    </div>
  )
}
