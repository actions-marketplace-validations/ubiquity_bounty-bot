// https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads

import { Static, Type } from "@sinclair/typebox";
import { LabelSchema } from "./label";
import { TURL } from "./shared";

export enum Action {
  REQUESTED = "requested",
  REVIEW_REQUESTED = "review_requested",
  REVIEW_REQUEST_REMOVED = "review_request_removed",
  COMPLETED = "completed",
  REREQUESTED = "rerequested",

  ASSIGNED = "assigned",
  CLOSED = "closed",
  CREATED = "created",
  DELETED = "deleted",
  MILESTONED = "milestoned",
  DEMILESTONED = "demilestoned",
  EDITED = "edited",
  LABELED = "labeled",
  LOCKED = "locked",
  OPENED = "opened",
  PINNED = "pinned",
  REOPENED = "reopened",
  TRANSFERRED = "transferred",
  UNASSIGNED = "unassigned",
  UNLABELED = "unlabeled",
  UNLOCKED = "unlocked",
  UNPINNED = "unpinned",
}

export enum UserType {
  User = "User",
  Bot = "Bot",
  Organization = "Organization",
}

const UserSchema = Type.Object({
  login: Type.String(),
  id: Type.Number(),
  node_id: Type.String(),
  avatar_url: TURL,
  gravatar_id: Type.String(),
  url: TURL,
  html_url: TURL,
  followers_url: TURL,
  following_url: TURL,
  gists_url: TURL,
  starred_url: TURL,
  subscriptions_url: TURL,
  organizations_url: TURL,
  repos_url: TURL,
  events_url: TURL,
  received_events_url: TURL,
  type: Type.Enum(UserType),
  site_admin: Type.Boolean(),
});

const IssueSchema = Type.Object({
  url: TURL,
  repository_url: TURL,
  labels_url: TURL,
  comments_url: TURL,
  events_url: TURL,
  html_url: TURL,
  id: Type.Number(),
  node_id: Type.String(),
  number: Type.Number(),
  title: Type.String(),
  user: UserSchema,
  labels: Type.Array(LabelSchema),
  state: Type.String(),
  locked: Type.Boolean(),
  assignee: Type.Optional(Type.String()),
  assignees: Type.Array(Type.String()),
  comments: Type.Number(),
  created_at: Type.String({ format: "date-time" }),
  updated_at: Type.String({ format: "date-time" }),
  closed_at: Type.Optional(Type.String({ format: "date-time" })),
  author_association: Type.String(),
  reactions: Type.Object({
    url: TURL,
    total_count: Type.Number(),
    "+1": Type.Number(),
    "-1": Type.Number(),
    laugh: Type.Number(),
    hooray: Type.Number(),
    confused: Type.Number(),
    heart: Type.Number(),
    rocket: Type.Number(),
    eyes: Type.Number(),
  }),
  timeline_url: TURL,
});

const RepositorySchema = Type.Object({
  id: Type.Number(),
  node_id: Type.String(),
  name: Type.String(),
  full_name: Type.String(),
  private: Type.Boolean(),
  owner: UserSchema,
  html_url: TURL,
  description: Type.String(),
  fork: Type.Boolean(),
  url: TURL,
  forks_url: TURL,
  keys_url: TURL,
  collaborators_url: TURL,
  teams_url: TURL,
  hooks_url: TURL,
  issue_events_url: TURL,
  events_url: TURL,
  assignees_url: TURL,
  branches_url: TURL,
  tags_url: TURL,
  blobs_url: TURL,
  git_tags_url: TURL,
  git_refs_url: TURL,
  trees_url: TURL,
  statuses_url: TURL,
  languages_url: TURL,
  stargazers_url: TURL,
  contributors_url: TURL,
  subscribers_url: TURL,
  subscription_url: TURL,
  commits_url: TURL,
  git_commits_url: TURL,
  comments_url: TURL,
  issue_comment_url: TURL,
  contents_url: TURL,
  compare_url: TURL,
  merges_url: TURL,
  archive_url: TURL,
  downloads_url: TURL,
  issues_url: TURL,
  pulls_url: TURL,
  milestones_url: TURL,
  notifications_url: TURL,
  labels_url: TURL,
  releases_url: TURL,
  deployments_url: TURL,
  created_at: Type.String({ format: "date-time" }),
  updated_at: Type.String({ format: "date-time" }),
  pushed_at: Type.String({ format: "date-time" }),
  git_url: TURL,
  ssh_url: Type.String(),
  clone_url: TURL,
  svn_url: TURL,
  size: Type.Number(),
  stargazers_count: Type.Number(),
  watchers_count: Type.Number(),
  language: Type.String(),
  has_issues: Type.Boolean(),
  has_projects: Type.Boolean(),
  has_downloads: Type.Boolean(),
  has_wiki: Type.Boolean(),
  has_pages: Type.Boolean(),
  forks_count: Type.Number(),
  archived: Type.Boolean(),
  disabled: Type.Boolean(),
  open_issues_count: Type.Number(),
  license: Type.Object({
    key: Type.String(),
    name: Type.String(),
    spdx_id: Type.String(),
    url: TURL,
    node_id: Type.String(),
  }),
  allow_forking: Type.Boolean(),
  is_template: Type.Boolean(),
  web_commit_signoff_required: Type.Boolean(),
  topics: Type.Array(Type.Any()),
  visibility: Type.String(),
  forks: Type.Number(),
  open_issues: Type.Number(),
  watchers: Type.Number(),
  default_branch: Type.String(),
});

const OrganizationSchema = Type.Object({
  login: Type.String(),
  id: Type.Number(),
  node_id: Type.String(),
  url: TURL,
  repos_url: TURL,
  events_url: TURL,
  hooks_url: TURL,
  issues_url: TURL,
  members_url: TURL,
  public_members_url: TURL,
  avatar_url: TURL,
  description: Type.String(),
});

const InstallationSchema = Type.Object({
  id: Type.Number(),
  node_id: Type.String(),
});

export const PayloadSchema = Type.Object({
  action: Type.Enum(Action),
  issue: IssueSchema,
  label: LabelSchema,
  sender: UserSchema,
  repository: RepositorySchema,
  organization: OrganizationSchema,
  installation: InstallationSchema,
});

export type Payload = Static<typeof PayloadSchema>;