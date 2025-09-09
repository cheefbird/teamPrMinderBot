import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

const PullRequestDatastore = DefineDatastore({
  name: "PullRequests",
  primary_key: "unique_id",
  attributes: {
    // unique_id, repo, pr_number, author, status, url
    unique_id: {
      type: Schema.types.string,
    },
    pr_url: {
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
  },
});

export default PullRequestDatastore;
