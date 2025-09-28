// ui/notify.ts
import { toast } from 'sonner';

export const notify = {
  success: (title: string, desc?: string) =>
    toast.success(title, { description: desc }),
  error: (title: string, desc?: string) =>
    toast.error(title, { description: desc, duration: 3200 }),
  info: (title: string, desc?: string) =>
    toast.message(title, { description: desc }),
};
