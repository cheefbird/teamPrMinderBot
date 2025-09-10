import {
  TriggerContextData,
  TriggerEventTypes,
  TriggerTypes,
} from "deno-slack-api/mod.ts";
import type { Trigger } from "deno-slack-api/types.ts";
import AddPullRequestWorkflow from "../workflows/add_pr_workflow.ts";

const prMessageTrigger: Trigger<typeof AddPullRequestWorkflow.definition> = {
  type: TriggerTypes.Event,
  name: "PR Message Trigger",
  description: "Triggers when a message is posted that includes a PR link",
  workflow: `#/workflows/${AddPullRequestWorkflow.definition.callback_id}`,
  event: {
    event_type: TriggerEventTypes.MessagePosted,
    channel_ids: ["C09EBB55N3F"],
    filter: {
      version: 1,
      root: {
        statement: "{{data.text}} CONTAINS 'https://github.com/LimbleCMMS/'",
      },
    },
  },
  inputs: {
    channel_id: {
      value: TriggerContextData.Event.MessagePosted.channel_id,
    },
    user: {
      value: TriggerContextData.Event.MessagePosted.user_id,
    },
    message_text: {
      value: TriggerContextData.Event.MessagePosted.text,
    },
    message_ts: {
      value: TriggerContextData.Event.MessagePosted.message_ts,
    },
  },
};

export default prMessageTrigger;
