import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function Halls() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Halls & Venues
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage event halls, venues, and their availability.
        </p>
      </div>

      <Separator />

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Hall</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Hall</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hall-name">Hall Name</Label>
                <Input id="hall-name" placeholder="Main Auditorium" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hall-capacity">Capacity</Label>
                <Input
                  id="hall-capacity"
                  type="number"
                  placeholder="500"
                />
              </div>

              <div className="space-y-2">
                <Label>Availability Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">
                      Available
                    </SelectItem>
                    <SelectItem value="unavailable">
                      Unavailable
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Save Hall</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Halls Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Hall List
          </CardTitle>
          <CardDescription>
            Overview of all halls and venues available for events.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hall Name</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Main Auditorium
                </TableCell>
                <TableCell>500</TableCell>
                <TableCell>
                  <Badge>Available</Badge>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">
                  Seminar Hall A
                </TableCell>
                <TableCell>150</TableCell>
                <TableCell>
                  <Badge>Available</Badge>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">
                  Conference Room 2
                </TableCell>
                <TableCell>50</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    Unavailable
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
