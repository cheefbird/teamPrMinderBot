import { DefineWorkflow } from "deno-slack-sdk/mod.ts";

const AddPrWorkflow = DefineWorkflow({
  callback_id: "add_pr_workflow",
  title: "Add PR to Datastore",
  description:
    "If a message with PR link is detected, process it and add to the datastore.",
});
