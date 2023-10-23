import {z} from 'zod'


const typeZod = z.object({
  file:z.string()
});
export type FileType = z.infer<typeof typeZod> ;


