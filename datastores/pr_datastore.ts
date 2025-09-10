import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

export const PullRequestDatastoreSchema = {
  id: {
    type: Schema.types.string,
  },
  pr_url: {
    type: Schema.types.string,
  },
  title: {
    type: Schema.types.string,
  },
  author: {
    type: Schema.slack.types.user_id,
  },
  repo_name: {
    type: Schema.types.string,
  },
  pr_number: {
    type: Schema.types.string,
  },
  status: { // open, merged, closed, draft
    type: Schema.types.string,
  },
  message_ts: {
    type: Schema.slack.types.message_ts,
  },
};

export const PullRequestDatastore = DefineDatastore({
  name: "PullRequests",
  primary_key: "id",
  attributes: PullRequestDatastoreSchema,
});
