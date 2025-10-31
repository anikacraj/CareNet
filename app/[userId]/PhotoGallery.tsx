'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useParams } from 'next/navigation'

export default function PhotoGallery() {
  const params = useParams()
  const userId = params?.userId as string
  
  const [images, setImages] = useState<string[]>([])
  const [showAll, setShowAll] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGalleryImages = async () => {
      if (!userId) return
      
      try {
        setLoading(true)
        const response = await fetch(`/api/users/${userId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch gallery images')
        }
        
        const data = await response.json()
        
        // The gallery field is an array of image URLs
        if (data.gallery && Array.isArray(data.gallery)) {
          setImages(data.gallery)
        } else {
          setImages([])
        }
      } catch (err) {
        console.error('Error fetching gallery:', err)
        setError('Failed to load gallery images')
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryImages()
  }, [userId])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const initialCount = isMobile ? 6 : 12
  const displayedImages = showAll ? images : images.slice(0, initialCount)

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-10">📸 Doctor's Gallery</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-10">📸 Doctor's Gallery</h1>
        <div className="text-center text-red-500 py-12">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-10">📸 Doctor's Gallery</h1>
        <div className="text-center text-gray-500 py-12">
          <p>No images in the gallery yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-10">📸 Doctor's Gallery</h1>

      {/* Image Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 border-2 p-4 border-white rounded-2xl"
      >
        {displayedImages.map((imageUrl, index) => (
          <motion.div
            key={`${imageUrl}-${index}`}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative group overflow-hidden rounded-xl shadow-md bg-white hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-44 sm:h-52 w-full">
              <Image
                src={imageUrl}
                alt={`Gallery image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-image.jpg';
                }}
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                Photo {index + 1}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Buttons */}
      <div className="flex justify-center mt-10">
        {!showAll && images.length > initialCount && (
          <button
            onClick={() => setShowAll(true)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition"
          >
            View All Photos ({images.length})
          </button>
        )}
        {showAll && (
          <button
            onClick={() => setShowAll(false)}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full shadow hover:bg-gray-400 transition"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  )
}