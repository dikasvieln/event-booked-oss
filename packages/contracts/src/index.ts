import { z } from "zod";

export const UserRoleSchema = z.enum(["attendee", "organizer", "admin"]);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const TicketSelectionSchema = z.object({
  eventId: z.string().min(1),
  ticketTypeId: z.string().min(1),
  name: z.string().min(1),
  unitPriceCents: z.number().int().nonnegative(),
  quantity: z.number().int().min(1).max(8),
});
export type TicketSelection = z.infer<typeof TicketSelectionSchema>;

export const CheckoutOrderSchema = z
  .object({
    items: z.array(TicketSelectionSchema),
  })
  .superRefine(({ items }, context) => {
    const selectionKeys = new Set<string>();

    items.forEach((item, index) => {
      const key = `${item.eventId}:${item.ticketTypeId}`;
      if (selectionKeys.has(key)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Ticket selections must be unique per event and ticket type.",
          path: ["items", index, "ticketTypeId"],
        });
      }
      selectionKeys.add(key);
    });
  });
export type CheckoutOrder = z.infer<typeof CheckoutOrderSchema>;

export const AuthenticatedUserSchema = z.object({
  id: z.string().min(1),
  roles: z.array(UserRoleSchema),
});
export type AuthenticatedUser = z.infer<typeof AuthenticatedUserSchema>;
