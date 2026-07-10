import type { Metadata } from "next";
import { KeyRound, Plug, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SettingsForm } from "@/components/dashboard/settings-form";
import { NotificationPreferences } from "@/components/dashboard/notification-preferences";

export const metadata: Metadata = { title: "Settings" };

const integrations = [
  { name: "Slack", description: "Route critical alerts to #soc-alerts", connected: true },
  { name: "PagerDuty", description: "Trigger on-call escalation for critical incidents", connected: true },
  { name: "Jira", description: "Sync incidents to your engineering backlog", connected: false },
  { name: "Splunk", description: "Forward normalized events for long-term retention", connected: false },
];

const apiKeys = [
  { name: "Production Ingestion Key", value: "tf_live_••••••••••••3f2a", created: "Mar 2, 2025" },
  { name: "CI/CD Read-only Key", value: "tf_ro_•••••••••••••91bd", created: "Jan 18, 2025" },
];

export default function SettingsPage() {
  return (
    <Tabs defaultValue="profile" className="gap-6">
      <TabsList className="w-full justify-start overflow-x-auto sm:w-fit">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
        <TabsTrigger value="api">API Keys</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information and role</CardDescription>
          </CardHeader>
          <CardContent>
            <SettingsForm />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification preferences</CardTitle>
            <CardDescription>Choose what you want to be notified about</CardDescription>
          </CardHeader>
          <CardContent>
            <NotificationPreferences />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage authentication and session policies</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-success/10 text-success">
                  <ShieldCheck className="size-4.5" />
                </span>
                <div>
                  <p className="text-sm font-medium">Two-factor authentication</p>
                  <p className="text-xs text-muted-foreground">Enforced for all organization members</p>
                </div>
              </div>
              <Badge variant="success">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <KeyRound className="size-4.5" />
                </span>
                <div>
                  <p className="text-sm font-medium">Single sign-on (SAML 2.0)</p>
                  <p className="text-xs text-muted-foreground">Connected via Okta</p>
                </div>
              </div>
              <Badge variant="success">Connected</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Session timeout</p>
                <p className="text-xs text-muted-foreground">Automatically sign out after inactivity</p>
              </div>
              <Badge variant="outline">30 minutes</Badge>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="integrations">
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connect ThreatForge to your existing security stack</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col divide-y">
            {integrations.map((integration) => (
              <div key={integration.name} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Plug className="size-4.5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">{integration.name}</p>
                    <p className="text-xs text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                <Button variant={integration.connected ? "outline" : "secondary"} size="sm">
                  {integration.connected ? "Manage" : "Connect"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="api">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage programmatic access to the ThreatForge API</CardDescription>
            </div>
            <Button size="sm">Generate key</Button>
          </CardHeader>
          <CardContent className="flex flex-col divide-y">
            {apiKeys.map((key) => (
              <div key={key.name} className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium">{key.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">{key.value}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">Created {key.created}</span>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    Revoke
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
