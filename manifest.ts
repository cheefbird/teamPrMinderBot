import { Manifest } from "deno-slack-sdk/mod.ts";
import { PullRequestDatastore } from "./datastores/pr_datastore.ts";
import SampleObjectDatastore from "./datastores/sample_datastore.ts";
import AddPullRequestWorkflow from "./workflows/add_pr_workflow.ts";
import SampleWorkflow from "./workflows/sample_workflow.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "teamPrMinderBot",
  description: "An app that helps keep PR's moving in your team channel.",
  icon: "assets/app-icon.png",
  workflows: [SampleWorkflow, AddPullRequestWorkflow],
  outgoingDomains: [],
  datastores: [SampleObjectDatastore, PullRequestDatastore],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "datastore:read",
    "datastore:write",
    "channels:history",
    "groups:history",
    "im:read",
    "mpim:read",
  ],
});
