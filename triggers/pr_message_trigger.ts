import { Trigger } from "deno-slack-api/types.ts";
import {
  TriggerContextData,
  TriggerEventTypes,
  TriggerTypes,
} from "deno-slack-api/mod.ts";
import SampleWorkflow from "../workflows/sample_workflow.ts";

const prMessageTrigger: Trigger<typeof SampleWorkflow.definition> = {
  type: TriggerTypes.Event,
  name: "PR Message Trigger",
  description: "Triggers when a message is posted that includes a PR link",
  workflow: `#/workflows/${SampleWorkflow.definition.callback_id}`,
};

export default prMessageTrigger;
