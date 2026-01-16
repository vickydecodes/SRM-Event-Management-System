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
import { Separator } from "@/components/ui/separator"

export default function ApprovalRequests() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Approval Requests
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Review and manage event approval requests submitted by departments.
        </p>
      </div>

      <Separator />

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pending Requests</CardTitle>
          <CardDescription>
            Approve or reject event requests awaiting administrative action.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Tech Symposium 2026
                </TableCell>
                <TableCell>Dr. Kumar</TableCell>
                <TableCell>CSE</TableCell>
                <TableCell>15 Mar 2026</TableCell>
                <TableCell>
                  <Badge variant="secondary">Pending</Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm">Approve</Button>
                  <Button size="sm" variant="outline">
                    Reject
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">
                  Cultural Fest
                </TableCell>
                <TableCell>Prof. Anitha</TableCell>
                <TableCell>EEE</TableCell>
                <TableCell>20 Mar 2026</TableCell>
                <TableCell>
                  <Badge variant="secondary">Pending</Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm">Approve</Button>
                  <Button size="sm" variant="outline">
                    Reject
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">
                  Workshop on AI
                </TableCell>
                <TableCell>Dr. Suresh</TableCell>
                <TableCell>IT</TableCell>
                <TableCell>25 Mar 2026</TableCell>
                <TableCell>
                  <Badge variant="secondary">Pending</Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
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
    </div>
  )
}
