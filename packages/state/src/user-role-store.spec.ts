import { beforeEach, describe, expect, it } from "vitest";
import { useUserRoleStore } from "./user-role-store";

describe("user role store", () => {
  beforeEach(() => {
    useUserRoleStore.getState().clearUserRoles();
  });

  it("stores unique roles for a user and answers role checks", () => {
    const { setUserRoles } = useUserRoleStore.getState();
    setUserRoles("user-1", ["organizer", "organizer", "attendee"]);

    expect(useUserRoleStore.getState()).toMatchObject({
      userId: "user-1",
      roles: ["organizer", "attendee"],
    });
    expect(useUserRoleStore.getState().hasRole("organizer")).toBe(true);
    expect(useUserRoleStore.getState().hasRole("admin")).toBe(false);
  });

  it("clears user roles on sign out", () => {
    useUserRoleStore.getState().setUserRoles("user-1", ["admin"]);
    useUserRoleStore.getState().clearUserRoles();

    expect(useUserRoleStore.getState()).toMatchObject({
      userId: null,
      roles: [],
    });
  });

  it("rejects unknown roles", () => {
    const setUserRoles = useUserRoleStore.getState().setUserRoles;
    expect(() => {
      // @ts-expect-error The schema must reject values outside UserRole at runtime.
      setUserRoles("user-1", ["superuser"]);
    }).toThrow();
  });
});
