import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import type PullRequestDatastore from "../datastores/pr_datastore.ts";

export const ParsePullRequest = DefineFunction({
  callback_id: "parse_pr_function",
  title: "PR URL Parser",
  description: "Extracts PR URL and parses into objects for storing",
  source_file: "functions/parse_pr.ts",
  input_parameters: {
    properties: {},
  },
});
