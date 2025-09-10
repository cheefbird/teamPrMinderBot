import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import {
  PullRequestDatastore,
  PullRequestDatastoreSchema,
} from "../datastores/pr_datastore.ts";

export const SavePullRequestFunctionDefinition = DefineFunction({
  callback_id: "save_pr",
  title: "Save Pull Request",
  description: "Saves PR info to the Datastore",
  source_file: "functions/save_pr.ts",
  input_parameters: {
    properties: PullRequestDatastoreSchema,
    required: [
      "pr_url",
      "title",
      "author",
      "repo_name",
      "pr_number",
      "status",
      "message_ts",
    ],
  },
  output_parameters: {
    properties: {
      result: {
        type: Schema.types.string,
        description: "Result message to return after saving a PR.",
      },
    },
    required: ["result"],
  },
});

export default SlackFunction(
  SavePullRequestFunctionDefinition,
  async ({ inputs, client }) => {
    const uuid: string = inputs.id ?? crypto.randomUUID();

    const putResponse = await client.apps.datastore.put<
      typeof PullRequestDatastore.definition
    >({
      datastore: PullRequestDatastore.name,
      item: {
        id: uuid,
        ...inputs,
      },
    });

    if (!putResponse.ok) {
      return {
        outputs: {
          result: `Error:    ${putResponse.error}`,
        },
      };
    }

    return {
      outputs: {
        result: `OK:    ${putResponse.item.id}`,
      },
    };
  },
);
