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

export default function Departments() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Departments
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Create and manage academic departments and their assigned heads.
        </p>
      </div>

      <Separator />

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Department</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Department</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dept-name">Department Name</Label>
                <Input id="dept-name" placeholder="Computer Science" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dept-code">Department Code</Label>
                <Input id="dept-code" placeholder="CSE" />
              </div>

              <div className="space-y-2">
                <Label>Head of Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select HOD" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hod1">Dr. Kumar</SelectItem>
                    <SelectItem value="hod2">Dr. Anitha</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Save Department</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Department Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Department List
          </CardTitle>
          <CardDescription>
            Overview of all departments available in the system.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>HOD</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Computer Science
                </TableCell>
                <TableCell>CSE</TableCell>
                <TableCell>Dr. Kumar</TableCell>
                <TableCell>
                  <Badge>Active</Badge>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">
                  Electronics & Communication
                </TableCell>
                <TableCell>ECE</TableCell>
                <TableCell>Dr. Anitha</TableCell>
                <TableCell>
                  <Badge>Active</Badge>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">
                  Mechanical Engineering
                </TableCell>
                <TableCell>MECH</TableCell>
                <TableCell>—</TableCell>
                <TableCell>
                  <Badge variant="secondary">Inactive</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
