import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { ParsePullRequestDefinition } from "../functions/parse_pr.ts";

const AddPullRequestWorkflow = DefineWorkflow({
  callback_id: "add_pr_workflow",
  title: "Add PR to Datastore",
  description:
    "If a message with PR link is detected, process it and add to the datastore.",
  input_parameters: {
    properties: {
      channel_id: {
        type: Schema.slack.types.channel_id,
        description: "Originating Slack Channel ID",
      },
      user: {
        type: Schema.slack.types.user_id,
        description: "Slack User ID of the poster",
      },
      message_text: {
        type: Schema.types.string,
        description: "Text from the original message",
      },
    },
    required: ["channel_id", "user", "message_text"],
  },
});

const parsePullRequest = AddPullRequestWorkflow.addStep(
  ParsePullRequestDefinition,
  {
    message_text: AddPullRequestWorkflow.inputs.message_text,
  },
);

export default AddPullRequestWorkflow;
