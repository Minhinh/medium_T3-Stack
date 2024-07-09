import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from '~/server/s3';
import { authOptions } from '~/server/auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session) {
    return NextResponse.json({ error: 'You need to be signed in' }, { status: 401 });
  }

  const { name, title, fileType }: { name: string; title: string; fileType: string } = await req.json();

  if (!name || !title || !fileType) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const key = `${slug}.${fileType.split('/')[1]}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
    ContentType: fileType,
  });

  try {
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return NextResponse.json({ url, key });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate upload URL' }, { status: 500 });
  }
}
