import { z } from "zod";
import slugify from "slugify";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ title: z.string().min(1), name: z.string().min(1), imageUrl: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const slug = slugify(input.title, { lower: true }) + '-' + Date.now();
      const post = await ctx.db.post.create({
        data: {
          title: input.title,
          name: input.name,
          slug,
          imageUrl: input.imageUrl,
          createdById: ctx.session.user.id,
        },
      });
      return post;
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { slug: input.slug },
      });
      return post;
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany();
  }),
});
