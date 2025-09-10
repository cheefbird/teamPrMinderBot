import "jsr:@std/dotenv/load";

export interface GitHubPR {
  title: string;
  state: string; // 'open', 'closed', 'merged', 'draft'
}

export async function fetchGitHubPR(
  repoName: string,
  prNumber: string,
): Promise<GitHubPR> {
  const apiUrl = `https://api.github.com/repos/${repoName}/pulls/${prNumber}`;

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `token ${Deno.env.get("GITHUB_TOKEN") ?? ""}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "teamPrMinderBot",
    },
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  return {
    title: data.title,
    state: data.state,
  };
}
