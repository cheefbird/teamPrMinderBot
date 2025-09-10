import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const ParsePullRequestDefinition = DefineFunction({
  callback_id: "parse_pr_function",
  title: "PR URL Parser",
  description: "Extracts PR URL and parses into objects for storing",
  source_file: "functions/parse_pr.ts",
  input_parameters: {
    properties: {
      message_text: {
        type: Schema.types.string,
      },
    },
    required: ["message_text"],
  },
  output_parameters: {
    properties: {
      repo_name: {
        type: Schema.types.string,
        description: "Name of the repo, from the parser",
      },
      pr_number: {
        type: Schema.types.string,
        description: "Number of the PR, from the parser",
      },
      pr_url: {
        type: Schema.types.string,
        description: "The web url for the pull request",
      },
    },
    required: ["repo_name", "pr_number", "pr_url"],
  },
});

export default SlackFunction(
  ParsePullRequestDefinition,
  ({ inputs }) => {
    const urlMatch = inputs.message_text.match(
      /https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/,
    );
    if (!urlMatch) {
      throw new Error("Invalid GitHub PR URL format");
    }

    const [, owner, repo, pr_number] = urlMatch;
    const repo_name = `${owner}/${repo}`;
    const pr_url = `https://github.com/${repo_name}/pulls/${pr_number}`;

    return {
      outputs: {
        repo_name,
        pr_number,
        pr_url,
      },
    };
  },
);
