import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import AWS from 'aws-sdk';
import { nanoid } from 'nanoid';
import { db } from "~/server/db";
import { TRPCError } from "@trpc/server";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      title: z.string().min(1),
      fileType: z.string().nullable(),
    }))
    .mutation(async ({ ctx, input }) => {
      const slug = nanoid();
      let url = null;

      if (input.fileType) {
        const params = {
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: `${slug}.${input.fileType.split('/')[1]}`,
          Expires: 60,
          ContentType: input.fileType,
        };

        try {
          url = await s3.getSignedUrlPromise('putObject', params);
          console.log(`Generated signed URL: ${url}`); // Debug logging
        } catch (error) {
          console.error('Error generating signed URL:', error); // Error logging
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to generate upload URL',
          });
        }
      }

      // Create the post in the database
      const post = await db.post.create({
        data: {
          name: input.name,
          title: input.title,
          slug,
          imageUrl: input.fileType ? `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${slug}.${input.fileType.split('/')[1]}` : null,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });

      return { url, postSlug: post.slug };
    }),
  getAll: protectedProcedure.query(async () => {
    return db.post.findMany();
  }),
  getByUser: protectedProcedure.query(async ({ ctx }) => {
    return db.post.findMany({
      where: {
        createdById: ctx.session.user.id,
      },
    });
  }),
});
