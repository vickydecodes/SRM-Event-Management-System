import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      

      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b px-6">
          <h1 className="text-lg font-semibold">
            Admin Dashboard
          </h1>
          <div className="text-sm text-muted-foreground">
            Super Admin
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 space-y-8 p-6">
          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-5">
            {[
              ["Departments", "12"],
              ["HODs", "18"],
              ["Students", "2,340"],
              ["Halls", "24"],
              ["Pending Requests", "6"],
            ].map(([label, value], index) => (
              <Card key={index}>
                <CardHeader>
                  <CardDescription>{label}</CardDescription>
                  <CardTitle className="text-2xl">{value}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Separator />

          {/* Department Management */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Department Management
              </h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Create Department</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Department</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Department Name</Label>
                      <Input />
                    </div>
                    <div>
                      <Label>Code</Label>
                      <Input />
                    </div>
                    <div>
                      <Label>HOD</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select HOD" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">HOD 1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">Save</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>HOD</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Computer Science</TableCell>
                      <TableCell>CSE</TableCell>
                      <TableCell>Dr. Kumar</TableCell>
                      <TableCell>
                        <Badge>Active</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>

          {/* Approval Requests */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">
              Approval Requests
            </h2>
            <Card>
              <CardContent className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Requested By</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Tech Symposium</TableCell>
                      <TableCell>CSE HOD</TableCell>
                      <TableCell>CSE</TableCell>
                      <TableCell>12 Mar 2026</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Pending</Badge>
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button size="sm">Approve</Button>
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  )
}
