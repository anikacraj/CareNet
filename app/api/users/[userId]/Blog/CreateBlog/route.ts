import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { dbConnect } from '@/config/dbConnect';
import userModel from '@/models/user.model';

// Connect to DB
await dbConnect();

// POST: Create a new blog for a user
export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Invalid User ID' }, { status: 400 });
    }

    const body = await req.json();
    const { heading, text, images } = body;

    if (!heading || !text) {
      return NextResponse.json({ error: 'Heading and Text are required.' }, { status: 400 });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const newBlog = {
      heading,
      text,
      images: images || [],
      like: 0,
      dislike: 0,
      createdAt: new Date(),
    };

    user.blogs.push(newBlog);
    await user.save();

    return NextResponse.json({ message: 'Blog created successfully.', blog: newBlog }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

// GET: Fetch all blogs from all users
export async function GET() {
  try {
    const users = await userModel.find({}, { blogs: 1, _id: 0, name: 1 });

    // Flatten blogs and include user name (optional)
    const allBlogs = users.flatMap((user: any) =>
      user.blogs.map((blog: any) => ({
        ...blog.toObject(),
        author: user.name,
      }))
    );

    // Sort blogs by newest first
    allBlogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(allBlogs, { status: 200 });

  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
