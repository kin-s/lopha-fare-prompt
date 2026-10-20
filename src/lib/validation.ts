import { z } from 'zod';
const kenyanPhoneRegex = /^(?:0[17]\d{8}|254[17]\d{8})$/;
export const fareRequestSchema = z.object({
  vehicleId: z.string().min(1, 'Vehicle is required.'),
  phoneNumber: z.string().regex(kenyanPhoneRegex, 'Enter a valid Kenyan number (07/01 or 2547/2541).'),
  amount: z.number({ message: 'Enter a fare amount.' }).min(10, 'Minimum fare is KSh 10.').max(10000, 'Maximum fare is KSh 10,000.'),
});
export type FareRequestFormValues = z.infer<typeof fareRequestSchema>;