import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { fetchGitHubPR } from "./util/github_utils.ts";

export const FetchPrDetailFunctionDefinition = DefineFunction({
  callback_id: "fetch_pr_details",
  title: "Fetch PR Details",
  description: "Fetch additional details for a given PR",
  source_file: "functions/fetch_pr_details.ts",
  input_parameters: {
    properties: {
      repo_name: {
        type: Schema.types.string,
      },
      pr_number: {
        type: Schema.types.string,
      },
    },
    required: ["repo_name", "pr_number"],
  },
  output_parameters: {
    properties: {
      title: {
        type: Schema.types.string,
      },
      pr_status: {
        type: Schema.types.string,
      },
    },
    required: ["title", "pr_status"],
  },
});

export default SlackFunction(
  FetchPrDetailFunctionDefinition,
  async ({ inputs }) => {
    const { title, state } = await fetchGitHubPR(
      inputs.repo_name,
      inputs.pr_number,
    );

    return {
      outputs: {
        title,
        pr_status: state,
      },
    };
  },
);
