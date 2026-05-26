import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';

const Security = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Security & Governance</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Security controls are driven by live backend data. This view shows placeholders until the API is connected.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Authorized IP Whitelist</CardTitle>
            <CardDescription>Managed by backend configuration.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-dashed border-border p-4 text-xs text-muted-foreground">
              No IP addresses are stored in the frontend. Connect to <code>/api/security/whitelist</code> to populate this panel.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Multi-Factor Compliance</CardTitle>
            <CardDescription>Policy state is read from the server.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-dashed border-border p-4 text-xs text-muted-foreground">
              Compliance settings come from server-side policy. No hardcoded toggles here.
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Session Registry</CardTitle>
          <CardDescription>Live sessions are served from the auth service.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
            The UI no longer contains example sessions. Connect to <code>/api/auth/sessions</code> for real data.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Security;
