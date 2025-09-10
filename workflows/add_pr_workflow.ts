import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { ParsePullRequestDefinition } from "../functions/parse_pr.ts";
import { FetchPrDetailFunctionDefinition } from "../functions/fetch_pr_details.ts";
import { SavePullRequestFunctionDefinition } from "../functions/save_pr.ts";

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
      message_ts: {
        type: Schema.slack.types.message_ts,
        description:
          "Special timestamp that references the originating message",
      },
    },
    required: ["channel_id", "user", "message_text", "message_ts"],
  },
});

const parsePullRequest = AddPullRequestWorkflow.addStep(
  ParsePullRequestDefinition,
  {
    message_text: AddPullRequestWorkflow.inputs.message_text,
  },
);

const pullRequestDetails = AddPullRequestWorkflow.addStep(
  FetchPrDetailFunctionDefinition,
  {
    repo_name: parsePullRequest.outputs.repo_name,
    pr_number: parsePullRequest.outputs.pr_number,
  },
);

AddPullRequestWorkflow.addStep(SavePullRequestFunctionDefinition, {
  pr_url: parsePullRequest.outputs.pr_url,
  title: pullRequestDetails.outputs.title,
  author: AddPullRequestWorkflow.inputs.user,
  repo_name: parsePullRequest.outputs.repo_name,
  pr_number: parsePullRequest.outputs.pr_number,
  status: pullRequestDetails.outputs.pr_status,
  message_ts: AddPullRequestWorkflow.inputs.message_ts,
});

export default AddPullRequestWorkflow;
