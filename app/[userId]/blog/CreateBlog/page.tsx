'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import DoctorBlogCreator from '@/components/ui/DrBlogCreator';
import { X } from 'lucide-react';

export default function Page() {
  const { userId } = useParams();
  const [openAi, setOpenAi] = useState(false);
  const [heading, setHeading] = useState('');
  const [text, setText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const handleCreateBlog = async () => {
    if (!heading || !text) {
      setMessage('Heading and blog text are required.');
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}/Blog/CreateBlog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ heading, text, images }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Blog created successfully!');
        setHeading('');
        setText('');
        setImages([]);
      } else {
        setMessage(data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error('Error creating blog:', err);
      setMessage('Server error');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const readers = fileArray.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error("Failed to read file."));
          }
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then((newImageURLs) => {
        setImages((prev) => [...prev, ...newImageURLs]);
      })
      .catch((err) => {
        console.error("Error reading image files:", err);
      });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl dark:bg-[#1E1F2F] dark:text-white mx-auto px-6 py-10 bg-white shadow-xl rounded-lg border">
      <h1 className="text-3xl  dark:text-white font-extrabold text-gray-800 mb-6 border-b pb-2">📝 Create a Blog</h1>

      {/* Image Preview Section */}
      {images.length > 0 && (
        <div className="mb-6  dark:text-white">
          <label className="block text-gray-700  dark:text-white font-semibold mb-2">Image Preview</label>
          <div className="flex flex-wrap gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative w-32 h-32  dark:text-white rounded-lg shadow border overflow-hidden"
              >
                <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 shadow-md"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Upload Input */}
      <div className="mb-6  dark:text-white">
        <label className="block text-gray-700 font-semibold mb-2  dark:text-white">Upload Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0  dark:text-white file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />
      </div>

      {/* Heading Input */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2  dark:text-white" >Blog Heading</label>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2  dark:text-white focus:ring-blue-400"
          placeholder="Enter your blog title"
        />
      </div>

      {/* Text Area */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2  dark:text-white ">Blog Content</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-3 border rounded-md shadow-sm h-40  dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Write your blog post..."
        />
      </div>

      {/* Submit Button */}
      <div className="mb-6">
        <button
          onClick={handleCreateBlog}
          className="w-full md:w-auto px-6 py-3 bg-green-600 text-white  dark:text-white font-semibold rounded-md hover:bg-green-700 transition"
        >
          ✅ Submit Blog
        </button>
      </div>

      {/* Toggle AI Generator */}
      <div className="mb-6">
        <button
          onClick={() => setOpenAi(prev => !prev)}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold  dark:text-white rounded-md hover:bg-blue-700 transition"
        >
          {openAi ? '❌ Close AI Blog Generator' : '🤖 Use AI for Blog'}
        </button>
      </div>

      {/* Message Display */}
      {message && (
        <p className="text-center text-red-600 font-medium mb-4  dark:text-white">{message}</p>
      )}

      {/* AI Generator Component */}
      {openAi && (
        <div className="mt-8 p-4 bg-gray-50 border rounded-md shadow-inner dark:bg-[#1e1f2f]  dark:text-white">
          <DoctorBlogCreator setHeading={setHeading} setText={setText} />
        </div>
      )}
    </div>
  );
}
