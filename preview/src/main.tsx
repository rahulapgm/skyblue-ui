import { StrictMode, type ReactNode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  CreditCard,
  FileCode2,
  Inbox,
  Layers3,
  LayoutDashboard,
  MapPin,
  PackageCheck,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Truck,
  UserRound,
  Zap,
} from "lucide-react";

import {
  Badge,
  BlockLoaderOverlay,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  Cluster,
  Container,
  DatePicker,
  FeatureCard,
  FloatingButton,
  Grid,
  HeroBanner,
  IconButton,
  Input,
  Label,
  Loader,
  MessageBox,
  Metric,
  NavigationBar,
  NavigationRail,
  PageLoaderOverlay,
  PhoneNumberInput,
  Progress,
  Radio,
  Result,
  Section,
  Select,
  Skeleton,
  Stack,
  StatCard,
  Steps,
  Table,
  Textarea,
  Timeline,
} from "@rahulapgm/skyblue-ui";
import { Float, Reveal } from "@rahulapgm/skyblue-ui/animation";
import { Autocomplete, type BasicAutocompleteOption } from "@rahulapgm/skyblue-ui/autocomplete";
import { Chip } from "@rahulapgm/skyblue-ui/chip";
import { Drawer } from "@rahulapgm/skyblue-ui/drawer";
import { Dropdown } from "@rahulapgm/skyblue-ui/dropdown";
import { Menu } from "@rahulapgm/skyblue-ui/menu";
import { Modal } from "@rahulapgm/skyblue-ui/modal";
import { NumberInput } from "@rahulapgm/skyblue-ui/number-input";
import { Pagination } from "@rahulapgm/skyblue-ui/pagination";
import { Swatch } from "@rahulapgm/skyblue-ui/swatch";
import { Switch } from "@rahulapgm/skyblue-ui/switch";
import { Tabs } from "@rahulapgm/skyblue-ui/tabs";
import { ToastProvider, useToast } from "@rahulapgm/skyblue-ui/toast";
import { Tooltip } from "@rahulapgm/skyblue-ui/tooltip";

import "./styles.css";

type PropRow = {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
};

type ComponentStory = {
  id: string;
  name: string;
  group: string;
  description: string;
  importPath: string;
  preview: ReactNode;
  code: string;
  props: PropRow[];
};

const commonClassName: PropRow = {
  name: "className",
  type: "string",
  description: "Adds classes to the outer component element.",
};

const nativeInputProps: PropRow = {
  name: "...input props",
  type: "InputHTMLAttributes<HTMLInputElement>",
  description: "Supports standard native input props like value, disabled, required, and onChange.",
};

const formFieldProps: PropRow[] = [
  { name: "label", type: "string", description: "Optional field label rendered above the control." },
  { name: "helperText", type: "string", description: "Small supporting text below the control." },
  { name: "errorText", type: "string", description: "Error text and error border treatment." },
  commonClassName,
];

const autocompleteOptions: BasicAutocompleteOption[] = [
  { label: "Bengaluru", value: "blr", description: "Karnataka" },
  { label: "Chennai", value: "maa", description: "Tamil Nadu" },
  { label: "Hyderabad", value: "hyd", description: "Telangana" },
];

const tableRows = [
  { id: "ord-1082", customer: "Asha", status: "Assigned", amount: "₹1,240" },
  { id: "ord-1083", customer: "Rahul", status: "Delivered", amount: "₹860" },
];

const navItems = [
  { label: "Dashboard", href: "#navigationbar", icon: LayoutDashboard, active: true },
  { label: "Trips", href: "#steps", icon: Truck, badge: "8" },
  { label: "Settings", href: "#menu", icon: Settings2 },
];

function PreviewApp() {
  return (
    <ToastProvider>
      <StorybookLanding />
    </ToastProvider>
  );
}

function StorybookLanding() {
  const toast = useToast();
  const [autocompleteValue, setAutocompleteValue] = useState("Ben");
  const [dropdownValue, setDropdownValue] = useState("standard");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [numberValue, setNumberValue] = useState(2);
  const [page, setPage] = useState(3);
  const [switchChecked, setSwitchChecked] = useState(true);

  const stories = useMemo<ComponentStory[]>(
    () => [
      story("badge", "Badge", "Display", "Compact status pill for metadata and state.", "@rahulapgm/skyblue-ui", <Cluster><Badge tone="brand">New</Badge><Badge tone="success">Live</Badge><Badge tone="warning">Review</Badge></Cluster>, `<Badge tone="success">Live</Badge>`, [
        { name: "tone", type: "\"brand\" | \"neutral\" | \"success\" | \"warning\" | \"error\" | \"info\"", defaultValue: "\"neutral\"", description: "Visual intent." },
        { name: "size", type: "\"sm\" | \"md\"", defaultValue: "\"md\"", description: "Pill density." },
        commonClassName,
      ]),
      story("button", "Button", "Actions", "Primary, secondary, tertiary, destructive, and link buttons.", "@rahulapgm/skyblue-ui", <Cluster><Button>Continue</Button><Button variant="secondary">Assign</Button><Button variant="tertiary">Cancel</Button><Button variant="destructive">Delete</Button></Cluster>, `<Button variant="primary" size="md" onClick={handleSave}>Continue</Button>`, [
        { name: "variant", type: "\"primary\" | \"secondary\" | \"tertiary\" | \"destructive\"", defaultValue: "\"primary\"", description: "Button color and emphasis." },
        { name: "size", type: "\"sm\" | \"md\" | \"lg\"", defaultValue: "\"md\"", description: "Control height and padding." },
        { name: "href", type: "string", description: "Renders as a Next link when provided." },
        { name: "fullWidth", type: "boolean", defaultValue: "false", description: "Stretches the button to parent width." },
      ]),
      story("card", "Card", "Layout", "Surface container with GetOttam tones and spacing.", "@rahulapgm/skyblue-ui", <Grid cols={1} md={2}><Card><Stack gap="sm"><Badge tone="info">Surface</Badge><p className="type-body">Default card for panels.</p></Stack></Card><Card tone="muted"><Stack gap="sm"><Badge>Muted</Badge><p className="type-body">Lower emphasis grouping.</p></Stack></Card></Grid>, `<Card tone="surface" padding="md">Content</Card>`, [
        { name: "tone", type: "\"surface\" | \"glass\" | \"muted\" | \"dark\"", defaultValue: "\"surface\"", description: "Background and border treatment." },
        { name: "padding", type: "\"sm\" | \"md\" | \"lg\" | \"xl\"", defaultValue: "\"md\"", description: "Internal spacing." },
        commonClassName,
      ]),
      story("checkbox", "Checkbox", "Forms", "Labeled checkbox with optional supporting copy.", "@rahulapgm/skyblue-ui", <Checkbox label="Send driver updates" description="Notify the customer when the trip changes." defaultChecked />, `<Checkbox label="Send driver updates" defaultChecked />`, [
        { name: "label", type: "string", description: "Visible checkbox label." },
        { name: "description", type: "string", description: "Optional helper copy." },
        nativeInputProps,
      ]),
      story("chip", "Chip", "Display", "Clickable or static filter chip with remove affordance.", "@rahulapgm/skyblue-ui/chip", <Cluster><Chip variant="brand" leadingIcon={<Sparkles className="h-4 w-4" />}>Priority</Chip><Chip variant="neutral" onRemove={() => undefined}>Koramangala</Chip><Chip variant="success" onClick={() => toast.showToast({ title: "Chip clicked", tone: "info" })}>Clickable</Chip></Cluster>, `<Chip variant="brand" onRemove={handleRemove}>Priority</Chip>`, [
        { name: "variant", type: "\"brand\" | \"neutral\" | \"success\" | \"warning\" | \"error\" | \"info\"", defaultValue: "\"neutral\"", description: "Chip intent." },
        { name: "size", type: "\"sm\" | \"md\" | \"lg\"", defaultValue: "\"md\"", description: "Chip height." },
        { name: "onRemove", type: "() => void", description: "Shows the remove button." },
      ]),
      story("cluster", "Cluster", "Layout", "Horizontal wrapping layout primitive.", "@rahulapgm/skyblue-ui", <Cluster gap="sm"><Badge>Active</Badge><Button size="sm">Save</Button><Button size="sm" variant="tertiary">Skip</Button></Cluster>, `<Cluster gap="sm" justify="between" align="center">...</Cluster>`, [
        { name: "gap", type: "\"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\"", defaultValue: "\"md\"", description: "Space between wrapped children." },
        { name: "align", type: "\"start\" | \"center\" | \"end\" | \"stretch\"", defaultValue: "\"center\"", description: "Cross-axis alignment." },
        { name: "justify", type: "\"start\" | \"center\" | \"end\" | \"between\"", defaultValue: "\"start\"", description: "Main-axis alignment." },
      ]),
      story("container", "Container", "Layout", "Page width wrapper with responsive gutters.", "@rahulapgm/skyblue-ui", <Container size="sm" className="rounded-xl border border-(--line-soft) bg-(--color-surface-muted) py-4 text-center"><span className="type-body">Contained content</span></Container>, `<Container size="7xl">Page content</Container>`, [
        { name: "size", type: "\"sm\" | \"md\" | \"lg\" | \"xl\" | \"2xl\" | \"3xl\" | \"7xl\" | \"full\"", defaultValue: "\"7xl\"", description: "Maximum width." },
        { name: "centered", type: "boolean", defaultValue: "true", description: "Applies horizontal auto margins." },
      ]),
      story("datepicker", "DatePicker", "Forms", "Native date input styled like the text fields.", "@rahulapgm/skyblue-ui", <DatePicker label="Pickup date" defaultValue="2026-05-26" helperText="Uses the browser date picker." />, `<DatePicker label="Pickup date" defaultValue="2026-05-26" />`, [...formFieldProps, nativeInputProps]),
      story("featurecard", "FeatureCard", "Display", "Icon-led feature summary for product surfaces.", "@rahulapgm/skyblue-ui", <FeatureCard eyebrow="Automation" title="Instant assignment" description="Match trips to available teams using the same visual language as GetOttam." icon={<Zap className="h-5 w-5" />} />, `<FeatureCard title="Instant assignment" description="..." icon={<Zap />} />`, [
        { name: "title", type: "string", description: "Feature heading." },
        { name: "description", type: "string", description: "Feature copy." },
        { name: "icon", type: "ReactNode", description: "Optional icon block." },
        { name: "eyebrow", type: "string", description: "Optional label above the title." },
      ]),
      story("floatingbutton", "FloatingButton", "Actions", "Fixed action button for high-priority workflows.", "@rahulapgm/skyblue-ui", <FloatingButton label="Create trip" icon={<Plus className="h-4 w-4" />} className="!static" onClick={() => toast.showToast({ title: "Floating action", tone: "success" })} />, `<FloatingButton label="Create trip" icon={<Plus />} position="bottom-right" />`, [
        { name: "label", type: "string", description: "Visible button text." },
        { name: "position", type: "\"bottom-right\" | \"bottom-left\" | \"top-right\" | \"top-left\"", defaultValue: "\"bottom-right\"", description: "Fixed viewport position." },
        { name: "href / onClick", type: "string / () => void", description: "Navigation or click action." },
      ]),
      story("grid", "Grid", "Layout", "Responsive CSS grid wrapper.", "@rahulapgm/skyblue-ui", <Grid cols={1} md={3} gap="sm">{["One", "Two", "Three"].map((item) => <Card key={item} padding="sm" tone="muted"><p className="type-body">{item}</p></Card>)}</Grid>, `<Grid cols={1} md={3} gap="md">...</Grid>`, [
        { name: "cols / sm / md / lg / xl", type: "1 | 2 | 3 | 4 | 5 | 6 | 12", defaultValue: "1", description: "Columns per breakpoint." },
        { name: "gap", type: "\"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\"", defaultValue: "\"md\"", description: "Grid gap token." },
      ]),
      story("herobanner", "HeroBanner", "Display", "Large introductory banner with actions, highlights, and media.", "@rahulapgm/skyblue-ui", <HeroBanner eyebrow="Skyblue UI" title="Build operational screens faster" description="A packaged component set with GetOttam theme tokens." actions={[{ label: "Start", onClick: () => undefined }, { label: "Docs", variant: "tertiary", href: "#button" }]} media={<Card tone="dark"><Metric label="Components" value="39" tone="brand" icon={<Layers3 />} /></Card>} />, `<HeroBanner title="Build faster" description="..." actions={[{ label: "Start" }]} />`, [
        { name: "title", type: "string", description: "Hero title." },
        { name: "description", type: "string", description: "Supporting hero copy." },
        { name: "actions", type: "HeroBannerAction[]", description: "CTA buttons." },
        { name: "media", type: "ReactNode", description: "Right-side visual content." },
      ]),
      story("iconbutton", "IconButton", "Actions", "Circular icon-only button with accessible label.", "@rahulapgm/skyblue-ui", <Cluster><IconButton ariaLabel="Search" icon={<Search className="h-4 w-4" />} /><IconButton ariaLabel="Alerts" variant="ghost" icon={<Bell className="h-4 w-4" />} /></Cluster>, `<IconButton ariaLabel="Search" icon={<Search />} />`, [
        { name: "icon", type: "ReactNode", description: "Rendered icon." },
        { name: "ariaLabel", type: "string", description: "Accessible label." },
        { name: "variant", type: "ButtonVariant | \"ghost\"", defaultValue: "\"tertiary\"", description: "Visual style." },
      ]),
      story("input", "Input", "Forms", "Text field with label, slots, helper, and error text.", "@rahulapgm/skyblue-ui", <Input label="Customer" placeholder="Enter customer name" helperText="Used for standard text values." leadingSlot={<UserRound className="h-4 w-4 text-(--ink-subtle)" />} />, `<Input label="Customer" placeholder="Enter customer name" />`, [
        ...formFieldProps,
        { name: "leadingSlot / trailingSlot", type: "ReactNode", description: "Inline adornments." },
        nativeInputProps,
      ]),
      story("label", "Label", "Forms", "Reusable form label with required indicator.", "@rahulapgm/skyblue-ui", <Label requiredMark>Pickup location</Label>, `<Label requiredMark>Pickup location</Label>`, [
        { name: "requiredMark", type: "boolean", defaultValue: "false", description: "Shows the required asterisk." },
        commonClassName,
      ]),
      story("loader", "Loader", "Feedback", "Inline loading spinner with optional label.", "@rahulapgm/skyblue-ui", <Cluster><Loader /><Loader size="sm" label={null} /><Loader tone="neutral" label="Syncing" /></Cluster>, `<Loader label="Syncing" size="md" tone="brand" />`, [
        { name: "label", type: "string | null", defaultValue: "\"Loading\"", description: "Screen-reader and visual loading text." },
        { name: "size", type: "\"sm\" | \"md\" | \"lg\"", defaultValue: "\"md\"", description: "Spinner size." },
        { name: "tone", type: "\"brand\" | \"neutral\" | \"inverse\"", defaultValue: "\"brand\"", description: "Spinner color." },
      ]),
      story("blockloaderoverlay", "BlockLoaderOverlay", "Feedback", "Loading overlay scoped to a relative block.", "@rahulapgm/skyblue-ui", <div className="skyblue-doc-overlay-box"><Card><p className="type-body">Trip details</p><p className="type-caption text-(--ink-subtle)">The overlay keeps the panel visible.</p></Card><BlockLoaderOverlay label="Saving" description="Updating the current trip." /></div>, `<div className="relative"><BlockLoaderOverlay label="Saving" /></div>`, [
        { name: "label", type: "string", defaultValue: "\"Loading\"", description: "Overlay title." },
        { name: "description", type: "string", description: "Optional supporting message." },
        commonClassName,
      ]),
      story("pageloaderoverlay", "PageLoaderOverlay", "Feedback", "Full-page loading overlay. Preview is constrained for documentation.", "@rahulapgm/skyblue-ui", <div className="skyblue-doc-overlay-box"><Card><p className="type-body">Page content</p></Card><PageLoaderOverlay label="Loading page" description="Preview constrained with className." className="!absolute !inset-0 !z-10" /></div>, `<PageLoaderOverlay label="Loading page" description="Preparing workspace" />`, [
        { name: "label", type: "string", defaultValue: "\"Loading\"", description: "Overlay title." },
        { name: "description", type: "string", description: "Optional supporting message." },
        commonClassName,
      ]),
      story("messagebox", "MessageBox", "Feedback", "Alert panel with tone icon and optional actions.", "@rahulapgm/skyblue-ui", <MessageBox tone="success" title="Driver assigned" description="The booking moved to active trips." actions={<Button size="sm">View trip</Button>} />, `<MessageBox tone="success" title="Driver assigned" description="..." />`, [
        { name: "tone", type: "\"info\" | \"success\" | \"warning\" | \"error\"", defaultValue: "\"info\"", description: "Alert intent." },
        { name: "title", type: "string", description: "Main alert text." },
        { name: "actions", type: "ReactNode", description: "Optional action area." },
      ]),
      story("metric", "Metric", "Data", "Small KPI block with optional icon and change text.", "@rahulapgm/skyblue-ui", <Grid cols={1} md={2}><Metric label="Revenue" value="₹42k" change="+18% this week" tone="success" icon={<CreditCard />} /><Metric label="Trips" value="128" tone="brand" icon={<Truck />} /></Grid>, `<Metric label="Revenue" value="₹42k" change="+18%" tone="success" />`, [
        { name: "label", type: "string", description: "KPI label." },
        { name: "value", type: "ReactNode", description: "Large metric value." },
        { name: "tone", type: "\"default\" | \"brand\" | \"success\" | \"warning\"", defaultValue: "\"default\"", description: "Value color." },
      ]),
      story("navigationbar", "NavigationBar", "Navigation", "Horizontal navigation surface with brand and actions.", "@rahulapgm/skyblue-ui", <NavigationBar brand={<Badge tone="brand">Skyblue</Badge>} items={navItems} actions={<Button size="sm">New</Button>} />, `<NavigationBar brand={<Logo />} items={items} actions={<Button>New</Button>} />`, [
        { name: "items", type: "NavigationItem[]", description: "Links with optional icon, active state, badge, and click handler." },
        { name: "brand", type: "ReactNode", description: "Left-side brand content." },
        { name: "actions", type: "ReactNode", description: "Right-side controls." },
      ]),
      story("navigationrail", "NavigationRail", "Navigation", "Vertical side navigation for app shells.", "@rahulapgm/skyblue-ui", <NavigationRail items={navItems} footer={<Button size="sm" fullWidth variant="tertiary">Support</Button>} />, `<NavigationRail items={items} footer={<UserMenu />} />`, [
        { name: "items", type: "NavigationItem[]", description: "Vertical navigation entries." },
        { name: "footer", type: "ReactNode", description: "Optional bottom area." },
        commonClassName,
      ]),
      story("breadcrumbs", "Breadcrumbs", "Navigation", "Simple breadcrumb trail with links until the final item.", "@rahulapgm/skyblue-ui", <Breadcrumbs items={[{ label: "Home", href: "#" }, { label: "Trips", href: "#" }, { label: "TRP-1024" }]} />, `<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Trips" }]} />`, [
        { name: "items", type: "{ label: string; href?: string }[]", description: "Breadcrumb entries. Final item renders as text." },
        commonClassName,
      ]),
      story("phonenumberinput", "PhoneNumberInput", "Forms", "India phone input with +91 prefix and digit normalization.", "@rahulapgm/skyblue-ui", <PhoneNumberInput label="Phone number" defaultValue="9876543210" helperText="Only the ten-digit national number is stored." />, `<PhoneNumberInput label="Phone number" onValueChange={setPhone} />`, [
        ...formFieldProps,
        { name: "value / defaultValue", type: "string", description: "Ten-digit national phone number." },
        { name: "onValueChange", type: "(value: string) => void", description: "Receives normalized digits." },
      ]),
      story("progress", "Progress", "Feedback", "Linear progress indicator with optional label.", "@rahulapgm/skyblue-ui", <Progress value={68} label="Profile completion" />, `<Progress value={68} label="Profile completion" />`, [
        { name: "value", type: "number", description: "Current progress percentage." },
        { name: "max", type: "number", defaultValue: "100", description: "Maximum value." },
        { name: "label", type: "string", description: "Optional visible label." },
      ]),
      story("radio", "Radio", "Forms", "Labeled radio item with optional supporting copy.", "@rahulapgm/skyblue-ui", <Stack gap="sm"><Radio name="speed" label="Standard" description="Best for regular orders." defaultChecked /><Radio name="speed" label="Express" description="Prioritize this order." /></Stack>, `<Radio name="speed" label="Standard" defaultChecked />`, [
        { name: "label", type: "string", description: "Visible radio label." },
        { name: "description", type: "string", description: "Optional helper copy." },
        nativeInputProps,
      ]),
      story("result", "Result", "Feedback", "Empty, success, info, warning, or error result state.", "@rahulapgm/skyblue-ui", <Result status="empty" title="No trips yet" description="Create a trip to see it in this workspace." actions={<Button size="sm">Create trip</Button>} />, `<Result status="empty" title="No trips yet" actions={<Button>Create</Button>} />`, [
        { name: "status", type: "\"success\" | \"info\" | \"warning\" | \"error\" | \"empty\"", defaultValue: "\"info\"", description: "Default icon and tone." },
        { name: "title", type: "string", description: "State heading." },
        { name: "actions", type: "ReactNode", description: "Optional action area." },
      ]),
      story("section", "Section", "Layout", "Semantic section wrapper with spacing tokens.", "@rahulapgm/skyblue-ui", <Section spacing="sm" className="rounded-xl border border-(--line-soft) bg-(--color-surface-muted)"><p className="type-body">Section with small vertical spacing.</p></Section>, `<Section as="main" spacing="lg">...</Section>`, [
        { name: "as", type: "\"section\" | \"div\" | \"main\"", defaultValue: "\"section\"", description: "Rendered element." },
        { name: "spacing", type: "\"sm\" | \"md\" | \"lg\" | \"xl\"", defaultValue: "\"lg\"", description: "Vertical spacing token." },
        { name: "contained", type: "boolean", defaultValue: "false", description: "Adds page gutters." },
      ]),
      story("select", "Select", "Forms", "Native select styled like input fields.", "@rahulapgm/skyblue-ui", <Select label="Vehicle" defaultValue="bike" options={[{ label: "Bike", value: "bike" }, { label: "Auto", value: "auto" }, { label: "Van", value: "van" }]} leadingSlot={<Truck className="h-4 w-4 text-(--ink-subtle)" />} />, `<Select label="Vehicle" options={[{ label: "Bike", value: "bike" }]} />`, [
        ...formFieldProps,
        { name: "options", type: "{ label: string; value: string; disabled?: boolean }[]", description: "Native select options." },
        { name: "placeholder", type: "string", description: "Optional empty option." },
      ]),
      story("skeleton", "Skeleton", "Feedback", "Animated placeholder block.", "@rahulapgm/skyblue-ui", <Stack><Skeleton className="h-6 w-48" /><Skeleton className="h-20 w-full" rounded="lg" /></Stack>, `<Skeleton className="h-6 w-48" rounded="md" />`, [
        { name: "rounded", type: "\"sm\" | \"md\" | \"lg\" | \"full\"", defaultValue: "\"md\"", description: "Corner radius." },
        commonClassName,
      ]),
      story("stack", "Stack", "Layout", "Vertical layout primitive.", "@rahulapgm/skyblue-ui", <Stack gap="sm"><Badge>Step 1</Badge><Card padding="sm"><p className="type-body">Stacked content</p></Card><Button size="sm">Continue</Button></Stack>, `<Stack gap="md" align="stretch">...</Stack>`, [
        { name: "gap", type: "\"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\"", defaultValue: "\"md\"", description: "Vertical gap token." },
        { name: "align", type: "\"start\" | \"center\" | \"end\" | \"stretch\"", defaultValue: "\"stretch\"", description: "Cross-axis alignment." },
      ]),
      story("statcard", "StatCard", "Data", "Carded metric for dashboard grids.", "@rahulapgm/skyblue-ui", <Grid cols={1} md={2}><StatCard label="Assigned" value="82" change="+12 today" tone="success" icon={<CheckCircle2 />} /><StatCard label="Pending" value="14" change="needs review" tone="warning" icon={<Inbox />} /></Grid>, `<StatCard label="Assigned" value="82" change="+12 today" tone="success" />`, [
        { name: "label", type: "string", description: "Metric label." },
        { name: "value", type: "ReactNode", description: "Large metric value." },
        { name: "size", type: "\"sm\" | \"md\"", defaultValue: "\"md\"", description: "Card height and value scale." },
      ]),
      story("steps", "Steps", "Display", "Responsive process tracker.", "@rahulapgm/skyblue-ui", <Steps current={2} items={[{ title: "Booked", description: "Customer confirmed" }, { title: "Assigned", description: "Team accepted" }, { title: "Delivered", description: "Proof uploaded" }]} />, `<Steps current={2} items={[{ title: "Booked" }, { title: "Assigned" }]} />`, [
        { name: "items", type: "{ title: string; description?: string }[]", description: "Step content." },
        { name: "current", type: "number", description: "One-based active step." },
        commonClassName,
      ]),
      story("table", "Table", "Data", "Typed table with custom cell rendering and empty state.", "@rahulapgm/skyblue-ui", <Table rows={tableRows} rowKey={(row) => row.id} columns={[{ key: "customer", header: "Customer", render: (row) => row.customer }, { key: "status", header: "Status", render: (row) => <Badge tone={row.status === "Delivered" ? "success" : "brand"}>{row.status}</Badge> }, { key: "amount", header: "Amount", align: "right", render: (row) => row.amount }]} />, `<Table rows={rows} columns={columns} rowKey={(row) => row.id} />`, [
        { name: "columns", type: "TableColumn<T>[]", description: "Column definitions with render callbacks." },
        { name: "rows", type: "T[]", description: "Table data." },
        { name: "rowKey", type: "(row: T, rowIndex: number) => string", description: "Stable row key." },
      ]),
      story("textarea", "Textarea", "Forms", "Multi-line text input with helper and error states.", "@rahulapgm/skyblue-ui", <Textarea label="Delivery note" defaultValue="Call before arriving." helperText="Visible to the assigned team." />, `<Textarea label="Delivery note" rows={5} />`, [...formFieldProps, { name: "rows", type: "number", defaultValue: "5", description: "Visible line count." }]),
      story("timeline", "Timeline", "Display", "Vertical event list with status dots.", "@rahulapgm/skyblue-ui", <Timeline items={[{ title: "Created", description: "Order created by support.", status: "completed", meta: <Badge size="sm">10:12</Badge> }, { title: "Assigned", description: "Driver accepted.", status: "current", meta: <Badge size="sm" tone="brand">Now</Badge> }, { title: "Delivered", status: "upcoming" }]} />, `<Timeline items={[{ title: "Created", status: "completed" }]} />`, [
        { name: "items", type: "TimelineItem[]", description: "Timeline entries with title, description, meta, and status." },
        commonClassName,
      ]),
      story("animation", "Reveal / Float", "Motion", "Framer Motion helpers for reveal and ambient movement.", "@rahulapgm/skyblue-ui/animation", <Cluster><Reveal from="up"><Card padding="sm"><p className="type-body">Reveal on view</p></Card></Reveal><Float y={[0, 8, 0]} duration={2}><Badge tone="brand">Floating</Badge></Float></Cluster>, `<Reveal from="up"><Card>Content</Card></Reveal>\n<Float y={[0, 8, 0]}>...</Float>`, [
        { name: "from", type: "\"up\" | \"down\" | \"left\" | \"right\"", defaultValue: "\"up\"", description: "Reveal direction." },
        { name: "delay / duration", type: "number", defaultValue: "0 / 0.6", description: "Motion timing." },
        { name: "x / y / scale", type: "number[]", description: "Float animation keyframes." },
      ]),
      story("autocomplete", "Autocomplete", "Forms", "Searchable combobox with typed option rendering.", "@rahulapgm/skyblue-ui/autocomplete", <Autocomplete label="City" value={autocompleteValue} options={autocompleteOptions.filter((option) => option.label.toLowerCase().includes(autocompleteValue.toLowerCase()))} onValueChange={setAutocompleteValue} onSelect={(option) => setAutocompleteValue(option.label)} getOptionKey={(option) => option.value} getOptionLabel={(option) => option.label} getOptionDescription={(option) => option.description} minimumQueryLength={1} />, `<Autocomplete value={query} options={options} onValueChange={setQuery} onSelect={setSelected} getOptionKey={(o) => o.value} getOptionLabel={(o) => o.label} />`, [
        { name: "value", type: "string", description: "Input value." },
        { name: "options", type: "TOption[]", description: "Options to display." },
        { name: "onSelect", type: "(option: TOption) => void | Promise<void>", description: "Called when an option is selected." },
        { name: "renderOption", type: "(option, state) => ReactNode", description: "Optional custom option UI." },
      ]),
      story("drawer", "Drawer", "Overlays", "Sliding side panel with escape and backdrop close.", "@rahulapgm/skyblue-ui/drawer", <><Button onClick={() => setDrawerOpen(true)} variant="tertiary">Open drawer</Button><Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Trip filters" description="Refine the active queue."><Stack><Checkbox label="Only priority trips" defaultChecked /><Button onClick={() => setDrawerOpen(false)}>Apply</Button></Stack></Drawer></>, `<Drawer open={open} onClose={() => setOpen(false)} title="Trip filters">...</Drawer>`, [
        { name: "open", type: "boolean", description: "Controls visibility." },
        { name: "onClose", type: "() => void", description: "Called from backdrop, close button, and Escape." },
        { name: "side", type: "\"left\" | \"right\"", defaultValue: "\"right\"", description: "Slide-in direction." },
      ]),
      story("dropdown", "Dropdown", "Forms", "Custom select menu with keyboard navigation.", "@rahulapgm/skyblue-ui/dropdown", <Dropdown label="Service level" value={dropdownValue} onValueChange={setDropdownValue} options={[{ label: "Standard", value: "standard", description: "Best availability" }, { label: "Express", value: "express", description: "Fastest assignment" }, { label: "Scheduled", value: "scheduled", disabled: true }]} />, `<Dropdown label="Service level" value={value} onValueChange={setValue} options={options} />`, [
        { name: "options", type: "DropdownOption[]", description: "Menu options with optional descriptions and disabled state." },
        { name: "value / defaultValue", type: "string", description: "Controlled or uncontrolled selected value." },
        { name: "onValueChange", type: "(value: string) => void", description: "Selection callback." },
      ]),
      story("menu", "Menu", "Actions", "Button-triggered action menu.", "@rahulapgm/skyblue-ui/menu", <Menu label="Actions" items={[{ label: "Assign driver", description: "Move to active queue", onSelect: () => toast.showToast({ title: "Assigned", tone: "success" }) }, { label: "Archive", tone: "destructive" }]} />, `<Menu label="Actions" items={[{ label: "Assign driver", onSelect: handleAssign }]} />`, [
        { name: "label", type: "string", description: "Trigger label." },
        { name: "items", type: "MenuItem[]", description: "Menu actions." },
        { name: "variant / size", type: "ButtonVariant / ButtonSize", defaultValue: "\"tertiary\" / \"sm\"", description: "Trigger button styling." },
      ]),
      story("modal", "Modal", "Overlays", "Centered dialog rendered in a portal.", "@rahulapgm/skyblue-ui/modal", <><Button onClick={() => setModalOpen(true)} variant="tertiary">Open modal</Button><Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Confirm assignment" description="This will notify the selected team." footer={<><Button variant="tertiary" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={() => setModalOpen(false)}>Confirm</Button></>}><MessageBox title="Ready to assign" description="All required trip details are complete." /></Modal></>, `<Modal open={open} onClose={() => setOpen(false)} title="Confirm">...</Modal>`, [
        { name: "open", type: "boolean", description: "Controls visibility." },
        { name: "onClose", type: "() => void", description: "Called from backdrop, close button, and Escape." },
        { name: "footer", type: "ReactNode", description: "Optional footer action area." },
      ]),
      story("numberinput", "NumberInput", "Forms", "Stepper input with min, max, and controlled value support.", "@rahulapgm/skyblue-ui/number-input", <NumberInput label="Packages" value={numberValue} onValueChange={setNumberValue} min={1} max={8} helperText="Use +/- controls or type a value." />, `<NumberInput label="Packages" value={count} onValueChange={setCount} min={1} />`, [
        { name: "value / defaultValue", type: "number", description: "Controlled or uncontrolled number." },
        { name: "min / max / step", type: "number", defaultValue: "undefined / undefined / 1", description: "Value constraints." },
        { name: "onValueChange", type: "(value: number) => void", description: "Called with clamped value." },
      ]),
      story("pagination", "Pagination", "Navigation", "Page selector with ellipsis and sibling range.", "@rahulapgm/skyblue-ui/pagination", <Pagination pageCount={12} currentPage={page} onPageChange={setPage} />, `<Pagination pageCount={12} currentPage={page} onPageChange={setPage} />`, [
        { name: "pageCount", type: "number", description: "Total page count." },
        { name: "currentPage", type: "number", defaultValue: "1", description: "Current active page." },
        { name: "siblingCount", type: "number", defaultValue: "1", description: "Pages shown around current page." },
      ]),
      story("swatch", "Swatch", "Display", "Color swatch with copy-to-clipboard behavior.", "@rahulapgm/skyblue-ui/swatch", <Grid cols={1} md={2}><Swatch name="Primary" value="#009CDF" description="Brand action color" /><Swatch name="Success" value="#16a34a" shape="circle" /></Grid>, `<Swatch name="Primary" value="#009CDF" description="Brand action color" />`, [
        { name: "name", type: "string", description: "Color label." },
        { name: "value", type: "string", description: "CSS color value copied on click." },
        { name: "shape / size", type: "\"square\" | \"circle\" / \"sm\" | \"md\" | \"lg\"", defaultValue: "\"square\" / \"md\"", description: "Preview shape and scale." },
      ]),
      story("switch", "Switch", "Forms", "Binary toggle with label and description.", "@rahulapgm/skyblue-ui/switch", <Switch label="Auto assign trips" description="Send new trips to the nearest available team." checked={switchChecked} onChange={(event) => setSwitchChecked(event.target.checked)} />, `<Switch label="Auto assign trips" checked={enabled} onChange={handleChange} />`, [
        { name: "label", type: "string", description: "Visible switch label." },
        { name: "description", type: "string", description: "Optional helper copy." },
        nativeInputProps,
      ]),
      story("tabs", "Tabs", "Navigation", "Accessible tablist with controlled or uncontrolled state.", "@rahulapgm/skyblue-ui/tabs", <Tabs items={[{ label: "Active", value: "active", badge: "8", content: <PreviewStatus label="Active trips" value="8 on route" /> }, { label: "Done", value: "done", content: <PreviewStatus label="Completed" value="24 today" /> }]} />, `<Tabs items={[{ label: "Active", value: "active", content: <Panel /> }]} />`, [
        { name: "items", type: "TabItem[]", description: "Tabs with label, value, content, and optional badge." },
        { name: "value / defaultValue", type: "string", description: "Controlled or uncontrolled active tab." },
        { name: "onValueChange", type: "(value: string) => void", description: "Active tab callback." },
      ]),
      story("toast", "ToastProvider / useToast", "Feedback", "Toast system with provider, hook, and viewport.", "@rahulapgm/skyblue-ui/toast", <Button onClick={() => toast.showToast({ title: "Preview ready", description: "ToastProvider is mounted around this catalog.", tone: "success" })}>Show toast</Button>, `<ToastProvider><App /></ToastProvider>\nconst toast = useToast();\ntoast.showToast({ title: "Saved", tone: "success" });`, [
        { name: "ToastProvider", type: "({ children }) => JSX.Element", description: "Mounts context and viewport." },
        { name: "showToast", type: "({ title, description?, tone }) => void", description: "Creates a dismissible toast." },
        { name: "tone", type: "\"success\" | \"info\" | \"warning\" | \"error\"", description: "Toast intent." },
      ]),
      story("tooltip", "Tooltip", "Feedback", "Hover and focus tooltip wrapper.", "@rahulapgm/skyblue-ui/tooltip", <Tooltip content="Search active trips"><IconButton ariaLabel="Search active trips" icon={<Search className="h-4 w-4" />} /></Tooltip>, `<Tooltip content="Search active trips"><IconButton ... /></Tooltip>`, [
        { name: "content", type: "ReactNode", description: "Tooltip body." },
        { name: "side", type: "\"top\" | \"right\" | \"bottom\" | \"left\"", defaultValue: "\"top\"", description: "Tooltip placement." },
        { name: "children", type: "ReactNode", description: "Wrapped trigger." },
      ]),
    ],
    [autocompleteValue, drawerOpen, dropdownValue, modalOpen, numberValue, page, switchChecked, toast],
  );

  const groups = Array.from(new Set(stories.map((item) => item.group)));

  return (
    <div className="skyblue-docs-shell">
      <aside className="skyblue-docs-sidebar">
        <a href="#top" className="skyblue-docs-brand">
          <span className="skyblue-docs-brand-mark">
            <PackageCheck className="h-5 w-5" />
          </span>
          <span>
            <span className="type-title block">Skyblue UI</span>
            <span className="type-caption text-(--ink-subtle)">@rahulapgm/skyblue-ui</span>
          </span>
        </a>
        <nav className="skyblue-docs-nav" aria-label="Component catalog">
          {groups.map((group) => (
            <div key={group} className="skyblue-docs-nav-group">
              <p className="type-overline text-(--ink-subtle)">{group}</p>
              {stories
                .filter((item) => item.group === group)
                .map((item) => (
                  <a key={item.id} href={`#${item.id}`}>
                    {item.name}
                  </a>
                ))}
            </div>
          ))}
        </nav>
      </aside>

      <main id="top" className="skyblue-docs-main">
        <section className="skyblue-docs-hero">
          <div>
            <Badge tone="brand">Local component catalog</Badge>
            <h1>Storybook-style preview for Skyblue UI.</h1>
            <p>
              Every exported component renders from the local package source with GetOttam theme tokens, Host
              Grotesk typography, usage snippets, and prop notes.
            </p>
          </div>
          <Cluster gap="sm">
            <Button href="https://github.com/rahulapgm/skyblue-ui" variant="tertiary">
              GitHub
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button onClick={() => toast.showToast({ title: "Catalog is live", description: "Components are rendering locally.", tone: "success" })}>
              Test toast
              <Bell className="h-4 w-4" />
            </Button>
          </Cluster>
        </section>

        <Grid cols={1} md={2} gap="md" className="skyblue-docs-metrics">
          <Metric label="Package" value="@rahulapgm/skyblue-ui" icon={<PackageCheck />} />
          <Metric label="Components" value={stories.length} tone="brand" icon={<Layers3 />} />
=        </Grid>

        <div className="skyblue-docs-list">
          {stories.map((item) => (
            <article key={item.id} id={item.id} className="skyblue-docs-story">
              <header>
                <div>
                  <Badge tone="neutral" size="sm">{item.group}</Badge>
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                </div>
                <code>{item.importPath}</code>
              </header>

              <div className="skyblue-docs-story-grid">
                <div className="skyblue-docs-preview">
                  <div className="skyblue-docs-preview-label">
                    <Sparkles className="h-4 w-4" />
                    Preview
                  </div>
                  <div className="skyblue-docs-preview-surface">{item.preview}</div>
                </div>

                <div className="skyblue-docs-code">
                  <div className="skyblue-docs-preview-label">
                    <FileCode2 className="h-4 w-4" />
                    Usage
                  </div>
                  <pre><code>{item.code}</code></pre>
                </div>
              </div>

              <div className="skyblue-docs-props">
                <table>
                  <thead>
                    <tr>
                      <th>Prop</th>
                      <th>Type</th>
                      <th>Default</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.props.map((prop) => (
                      <tr key={`${item.id}-${prop.name}`}>
                        <td><code>{prop.name}</code></td>
                        <td><code>{prop.type}</code></td>
                        <td>{prop.defaultValue ? <code>{prop.defaultValue}</code> : <span>-</span>}</td>
                        <td>{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

function story(
  id: string,
  name: string,
  group: string,
  description: string,
  importPath: string,
  preview: ReactNode,
  code: string,
  props: PropRow[],
): ComponentStory {
  return { id, name, group, description, importPath, preview, code, props };
}

function PreviewStatus({ label, value }: { label: string; value: string }) {
  return (
    <Cluster className="skyblue-preview-status-row" justify="between">
      <Cluster>
        <CheckCircle2 className="skyblue-preview-success-icon" />
        <span>{label}</span>
      </Cluster>
      <span>{value}</span>
    </Cluster>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PreviewApp />
  </StrictMode>,
);
