import { create } from "zustand";
import { AuthenticatedUserSchema, type UserRole } from "@eventhub/contracts";

type UserRoleState = {
  userId: string | null;
  roles: UserRole[];
  setUserRoles: (userId: string, roles: UserRole[]) => void;
  clearUserRoles: () => void;
  hasRole: (role: UserRole) => boolean;
};

export const useUserRoleStore = create<UserRoleState>()((set, get) => ({
  userId: null,
  roles: [],
  setUserRoles: (userId, roles) => {
    const user = AuthenticatedUserSchema.parse({
      id: userId,
      roles: [...new Set(roles)],
    });
    set({ userId: user.id, roles: user.roles });
  },
  clearUserRoles: () => set({ userId: null, roles: [] }),
  hasRole: (role) => get().roles.includes(role),
}));
