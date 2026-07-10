CREATE TYPE "public"."asset_status" AS ENUM('healthy', 'at_risk', 'compromised', 'offline');--> statement-breakpoint
CREATE TYPE "public"."asset_type" AS ENUM('server', 'workstation', 'cloud', 'container', 'network_device', 'mobile');--> statement-breakpoint
CREATE TYPE "public"."incident_status" AS ENUM('open', 'investigating', 'contained', 'resolved');--> statement-breakpoint
CREATE TYPE "public"."severity" AS ENUM('critical', 'high', 'medium', 'low', 'informational');--> statement-breakpoint
CREATE TYPE "public"."threat_status" AS ENUM('active', 'contained', 'mitigated', 'monitoring');--> statement-breakpoint
CREATE TYPE "public"."vuln_status" AS ENUM('open', 'patching', 'patched', 'accepted_risk');--> statement-breakpoint
CREATE TABLE "activity_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor" text NOT NULL,
	"action" text NOT NULL,
	"target" text NOT NULL,
	"severity" "severity" DEFAULT 'informational' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" "asset_type" NOT NULL,
	"ip_address" text NOT NULL,
	"os" text NOT NULL,
	"owner" text NOT NULL,
	"risk_score" integer DEFAULT 0 NOT NULL,
	"status" "asset_status" DEFAULT 'healthy' NOT NULL,
	"agent_installed" boolean DEFAULT true NOT NULL,
	"last_seen" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "incidents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"severity" "severity" NOT NULL,
	"status" "incident_status" DEFAULT 'open' NOT NULL,
	"assignee" text NOT NULL,
	"description" text NOT NULL,
	"mitre_tactic" text NOT NULL,
	"affected_assets" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "threats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"severity" "severity" NOT NULL,
	"status" "threat_status" DEFAULT 'active' NOT NULL,
	"source" text NOT NULL,
	"indicator" text NOT NULL,
	"indicator_type" text NOT NULL,
	"description" text NOT NULL,
	"confidence" integer DEFAULT 50 NOT NULL,
	"affected_assets" integer DEFAULT 0 NOT NULL,
	"first_seen" timestamp with time zone DEFAULT now() NOT NULL,
	"last_seen" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vulnerabilities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cve_id" text NOT NULL,
	"title" text NOT NULL,
	"severity" "severity" NOT NULL,
	"cvss_score" double precision NOT NULL,
	"status" "vuln_status" DEFAULT 'open' NOT NULL,
	"affected_asset" text NOT NULL,
	"package_name" text NOT NULL,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL
);
