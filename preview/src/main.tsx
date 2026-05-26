import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ArrowRight, Bell, CheckCircle2, CreditCard, MapPin, PackageCheck, ShieldCheck } from "lucide-react";

import {
  Badge,
  Button,
  Card,
  Cluster,
  Container,
  Grid,
  Input,
  MessageBox,
  Metric,
  Progress,
  Section,
  Stack,
} from "@rahulapgm/skyblue-ui";
import { Tabs } from "@rahulapgm/skyblue-ui/tabs";
import { ToastProvider, useToast } from "@rahulapgm/skyblue-ui/toast";

import "./styles.css";

function PreviewApp() {
  return (
    <ToastProvider>
      <SkybluePreview />
    </ToastProvider>
  );
}

function SkybluePreview() {
  const toast = useToast();

  return (
    <main>
      <Section className="hero">
        <Container>
          <Stack gap="xl">
            <Cluster justify="between" align="center" className="topbar">
              <Badge tone="success">Skyblue UI</Badge>
              <Cluster gap="sm">
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={() =>
                    toast.showToast({
                      title: "Preview ready",
                      description: "GitHub Pages can serve this UI catalog.",
                      tone: "info",
                    })
                  }
                >
                  <Bell className="icon" />
                  Toast
                </Button>
                <Button
                  size="sm"
                  onClick={() =>
                    toast.showToast({
                      title: "Looks good",
                      description: "Components are rendering from the package source.",
                      tone: "success",
                    })
                  }
                >
                  Publish-ready
                  <ArrowRight className="icon" />
                </Button>
              </Cluster>
            </Cluster>

            <div className="hero-copy">
              <h1>Reusable UI for crisp operational web apps.</h1>
              <p>
                A focused React component package with GetOttam's visual language, package builds, npm publishing,
                and a GitHub Pages preview.
              </p>
            </div>
          </Stack>
        </Container>
      </Section>

      <Section>
        <Container>
          <Grid cols={1} md={3} gap="md">
            <Metric label="Package" value="@rahulapgm/skyblue-ui" icon={<PackageCheck />} />
            <Metric label="Release" value="0.1.0" change="public npm scope" icon={<CreditCard />} />
            <Metric label="Preview" value="GitHub Pages" change="Vite static build" icon={<MapPin />} />
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container>
          <Grid cols={1} lg={2} gap="lg">
            <Card>
              <Stack>
                <Cluster justify="between">
                  <div>
                    <Badge tone="brand">Form</Badge>
                    <h2>Booking Details</h2>
                  </div>
                  <ShieldCheck className="panel-icon" />
                </Cluster>
                <Input label="Pickup address" placeholder="MG Road, Bengaluru" />
                <Input label="Drop address" placeholder="Indiranagar, Bengaluru" />
                <Progress value={68} label="Completion" />
                <Button fullWidth>Continue</Button>
              </Stack>
            </Card>

            <Card tone="muted">
              <Stack>
                <MessageBox
                  tone="success"
                  title="Driver assigned"
                  description="The package UI is rendering interactive status, layout, and feedback components."
                  actions={<Button size="sm">View trip</Button>}
                />
                <Tabs
                  items={[
                    {
                      value: "active",
                      label: "Active",
                      content: <PreviewStatus label="In transit" value="Driver is 12 minutes away" />,
                    },
                    {
                      value: "complete",
                      label: "Complete",
                      content: <PreviewStatus label="Delivered" value="Payment collected and synced" />,
                    },
                  ]}
                />
              </Stack>
            </Card>
          </Grid>
        </Container>
      </Section>
    </main>
  );
}

function PreviewStatus({ label, value }: { label: string; value: string }) {
  return (
    <Cluster className="status-row" justify="between">
      <Cluster>
        <CheckCircle2 className="success-icon" />
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
