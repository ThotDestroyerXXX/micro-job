import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  job: ["create", "read", "update", "delete", "updateOwn", "deleteOwn"],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  ...adminAc.statements,
  job: ["create", "read", "update", "delete", "updateOwn", "deleteOwn"],
});

export const worker = ac.newRole({
  job: ["read"],
});

export const poster = ac.newRole({
  job: ["create", "read", "updateOwn", "deleteOwn"],
});
