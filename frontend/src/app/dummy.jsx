import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";

import { Calendar } from "@/components/ui/calendar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Checkbox } from "@/components/ui/checkbox";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import { Label } from "@/components/ui/label";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Progress } from "@/components/ui/progress";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar2";

import { Skeleton } from "@/components/ui/skeleton";

import { Switch } from "@/components/ui/switch";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Textarea } from "@/components/ui/textarea";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Toaster, toast } from "sonner";

import {
  ArrowRight,
  ArrowUpDown,
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  Home,
  LogOut,
  MoreHorizontal,
  Search,
  Settings,
  Sparkles,
  Users,
  Info,
} from "lucide-react";

import "./App.css";

// Zod schema
const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  role: z.string({ required_error: "Please select a role" }),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

// Dummy data
const events = [
  { id: "1", name: "Tech Fest 2025", status: "approved", participants: 450 },
  { id: "2", name: "Cultural Night", status: "pending", participants: 200 },
  { id: "3", name: "Workshop Series", status: "rejected", participants: 80 },
];

function App() {
  const [date, setDate] = React.useState(new Date());
  const [progress, setProgress] = React.useState(30);
  const [isDark, setIsDark] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", role: "", otp: "" },
  });

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(80), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TooltipProvider>
      <Toaster />

      <div className="min-h-screen bg-background text-foreground">
        {/* Menubar */}
        <Menubar className="fixed top-0 left-0 right-0 z-50 border-b">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Event</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Exit</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Dark Mode
                <Switch checked={isDark} onCheckedChange={setIsDark} className="ml-auto" />
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <div className="flex pt-12">
          {/* Sidebar */}
          <Sidebar>
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Home /> Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton><CalendarDays /> Events</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton><Users /> Participants</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        User
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="top">
                      <DropdownMenuItem><Settings /> Settings</DropdownMenuItem>
                      <DropdownMenuItem><LogOut /> Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>

          {/* Main Content */}
          <main className="flex-1 p-8 overflow-auto">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Components Showcase</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6" />
                  Shadcn/UI Components Demo
                </CardTitle>
                <CardDescription>All major components in one page</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="forms">Forms</TabsTrigger>
                    <TabsTrigger value="data">Data</TabsTrigger>
                    <TabsTrigger value="modals">Modals & Feedback</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader><CardTitle>Calendar</CardTitle></CardHeader>
                        <CardContent>
                          <Calendar mode="single" selected={date} onSelect={setDate} />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader><CardTitle>Progress & Switch</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <Label>Progress</Label>
                            <Progress value={progress} className="mt-2" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="mode" />
                            <Label htmlFor="mode">Toggle Feature</Label>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Accordion Example</AccordionTrigger>
                        <AccordionContent>Content inside accordion</AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </TabsContent>

                  <TabsContent value="forms" className="space-y-6">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="organizer">Organizer</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="participant">Participant</SelectItem>
                      </SelectContent>
                    </Select>

                    <RadioGroup defaultValue="participant">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="organizer" id="org" />
                        <Label htmlFor="org">Organizer</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="participant" id="part" />
                        <Label htmlFor="part">Participant</Label>
                      </div>
                    </RadioGroup>

                    <div>
                      <Label>OTP Input</Label>
                      <InputOTP maxLength={6}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <Textarea placeholder="Write notes here..." />
                  </TabsContent>

                  <TabsContent value="data">
                    <ScrollArea className="h-96 w-full rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Event</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Participants</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {events.map((event) => (
                            <TableRow key={event.id}>
                              <TableCell>{event.name}</TableCell>
                              <TableCell>
                                <Badge variant={event.status === "approved" ? "default" : event.status === "pending" ? "secondary" : "destructive"}>
                                  {event.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{event.participants}</TableCell>
                              <TableCell>
                                <ContextMenu>
                                  <ContextMenuTrigger>•••</ContextMenuTrigger>
                                  <ContextMenuContent>
                                    <ContextMenuItem>View</ContextMenuItem>
                                    <ContextMenuItem>Edit</ContextMenuItem>
                                  </ContextMenuContent>
                                </ContextMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="modals" className="space-y-6">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Info</AlertTitle>
                      <AlertDescription>This is an alert component example.</AlertDescription>
                    </Alert>

                    <div className="flex flex-wrap gap-4">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Alert Dialog</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm?</AlertDialogTitle>
                            <AlertDialogDescription>Action cannot be undone.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => toast("Confirmed!")}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">Popover</Button>
                        </PopoverTrigger>
                        <PopoverContent>Popover content</PopoverContent>
                      </Popover>

                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button>Open Drawer</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Drawer</DrawerTitle>
                          </DrawerHeader>
                        </DrawerContent>
                      </Drawer>

                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="secondary">Sheet</Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Sheet Example</SheetTitle>
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-8">
                  <ResizablePanelGroup direction="horizontal" className="h-48 border rounded-lg">
                    <ResizablePanel defaultSize={50}>
                      <div className="flex h-full items-center justify-center">Panel 1</div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={50}>
                      <div className="flex h-full items-center justify-center">Panel 2</div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Skeleton className="h-12 w-48" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default App;