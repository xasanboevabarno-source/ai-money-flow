import { z } from 'zod';
const positive=z.coerce.number().finite().positive();
export const transactionSchema=z.object({title:z.string().trim().min(1).max(120),amount:positive,type:z.enum(['income','expense']),category:z.string().min(1),date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),description:z.string().max(500).default('')});
export const goalSchema=z.object({name:z.string().trim().min(1).max(120),target:positive,date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),icon:z.string().max(10).default('✨'),color:z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#DCEBDD')});
export const budgetSchema=z.object({category:z.string().min(1),month:z.string().regex(/^\d{4}-\d{2}$/),amount:positive});
export const contributionSchema=z.object({goalId:z.coerce.number().int().positive(),amount:positive,date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/)});
