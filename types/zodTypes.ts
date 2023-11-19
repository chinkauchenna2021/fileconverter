import {z} from 'zod'


const typeZod = z.object({
  file:z.string().optional(),
  fileFormat:z.string(),
  fileType:z.string().min(3).optional()
});
export type FileType = z.infer<typeof typeZod> ;


