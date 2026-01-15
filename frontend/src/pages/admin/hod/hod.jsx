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

export default function HODManagement() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          HOD Management
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Create and manage Heads of Departments and their assignments.
        </p>
      </div>

      <Separator />

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create HOD</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create HOD</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hod-name">Full Name</Label>
                <Input
                  id="hod-name"
                  placeholder="Dr. Kumar"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hod-email">Email</Label>
                <Input
                  id="hod-email"
                  type="email"
                  placeholder="kumar@srm.edu"
                />
              </div>

              <div className="space-y-2">
                <Label>Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cse">
                      Computer Science
                    </SelectItem>
                    <SelectItem value="ece">
                      Electronics & Communication
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">
                      Active
                    </SelectItem>
                    <SelectItem value="inactive">
                      Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Save HOD</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* HOD Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            HOD List
          </CardTitle>
          <CardDescription>
            Overview of all Heads of Departments.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Dr. Kumar
                </TableCell>
                <TableCell>
                  kumar@srm.edu
                </TableCell>
                <TableCell>
                  Computer Science
                </TableCell>
                <TableCell>
                  <Badge>Active</Badge>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">
                  Dr. Anitha
                </TableCell>
                <TableCell>
                  anitha@srm.edu
                </TableCell>
                <TableCell>
                  Electronics & Communication
                </TableCell>
                <TableCell>
                  <Badge>Active</Badge>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">
                  Dr. Suresh
                </TableCell>
                <TableCell>
                  suresh@srm.edu
                </TableCell>
                <TableCell>
                  Mechanical Engineering
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    Inactive
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
