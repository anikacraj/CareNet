"use client";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion"
import { Plus, Trash2 } from "lucide-react"; 

interface DoctorProfile {
  name: string;
  email: string;
  phoneNo: string;
  optionalEmail: string;
  registerId: string;
  specialization: string;
  mbbsCollege: string;
  profilePhoto: string;
  ContactNo: string;
  bio: string;
  aboutPicture: string;
  fbLink: string;
  instagram: string;
  Linkedin: string;
  youTubeLink: string;
  degrees: { name: string; college: string; year: string }[];
  education: { year: string; examName: string; institute: string }[];
  work: { role: string; college: string; day: string; time: string; collegePhoneNumber: string }[];
  experience: { role: string; college: string; startingYear: string; endingYear: string }[];
  chamber: { place: string; day: string; time: string; bookContact: string }[];
  gallery: string[];
}

const initialFormState: DoctorProfile = {
  name: "",
  email: "",
  phoneNo: "",
  optionalEmail: "",
  registerId: "",
  specialization: "",
  mbbsCollege: "",
  profilePhoto: "",
  ContactNo: "",
  bio: "",
  aboutPicture: "",
  fbLink: "",
  instagram: "",
  Linkedin: "",
  youTubeLink: "",
  degrees: [],
  education: [],
  work: [],
  experience: [],
  chamber: [],
  gallery: [],
};

export default function DoctorProfileEditor() {
  const { userId } = useParams();
  const [user, setUser] = useState<DoctorProfile | null>(null);
  const [formData, setFormData] = useState<DoctorProfile>(initialFormState);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const cleanedData = Object.entries(data).reduce((acc: any, [key, value]) => {
          acc[key] = value !== undefined ? value : initialFormState[key as keyof DoctorProfile];
          return acc;
        }, {});
        setUser(cleanedData);
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, [userId]);

  useEffect(() => {
    if (user) {
      setFormData({
        ...initialFormState,
        ...user,
        degrees: user.degrees?.length ? user.degrees : [],
        education: user.education?.length ? user.education : [],
        work: user.work?.length ? user.work : [],
        experience: user.experience?.length ? user.experience : [],
        chamber: user.chamber?.length ? user.chamber : [],
        gallery: user.gallery?.length ? user.gallery : [],
      });
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDegreeChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const updated = [...prev.degrees];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, degrees: updated };
    });
  };

  const addDegree = () => setFormData(prev => ({
    ...prev,
    degrees: [...prev.degrees, { name: "", college: "", year: "" }]
  }));

  const removeDegree = (index: number) => setFormData(prev => ({
    ...prev,
    degrees: prev.degrees.filter((_, i) => i !== index)
  }));

  const handleEducationChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const updated = [...prev.education];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, education: updated };
    });
  };

  const addEducation = () => setFormData(prev => ({
    ...prev,
    education: [...prev.education, { year: "", examName: "", institute: "" }]
  }));

  const removeEducation = (index: number) => setFormData(prev => ({
    ...prev,
    education: prev.education.filter((_, i) => i !== index)
  }));

  const handleWorkChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const updated = [...prev.work];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, work: updated };
    });
  };

  const addWork = () => setFormData(prev => ({
    ...prev,
    work: [...prev.work, { role: "", college: "", day: "", time: "", collegePhoneNumber: "" }]
  }));

  const removeWork = (index: number) => setFormData(prev => ({
    ...prev,
    work: prev.work.filter((_, i) => i !== index)
  }));

  const handleExperienceChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const updated = [...prev.experience];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experience: updated };
    });
  };

  const addExperience = () => setFormData(prev => ({
    ...prev,
    experience: [...prev.experience, { role: "", college: "", startingYear: "", endingYear: "" }]
  }));

  const removeExperience = (index: number) => setFormData(prev => ({
    ...prev,
    experience: prev.experience.filter((_, i) => i !== index)
  }));

  const handleChamberChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const updated = [...prev.chamber];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, chamber: updated };
    });
  };

  const addChamber = () => setFormData(prev => ({
    ...prev,
    chamber: [...prev.chamber, { place: "", day: "", time: "", bookContact: "" }]
  }));

  const removeChamber = (index: number) => setFormData(prev => ({
    ...prev,
    chamber: prev.chamber.filter((_, i) => i !== index)
  }));

  const handleProfilePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, profilePhoto: event.target.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAboutPictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, aboutPicture: event.target.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };


  const handleBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, bio: e.target.value }));
  };

  const handleContactNoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, ContactNo: e.target.value }));
  };

  const handleSocialMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGalleryUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);
            if (newImages.length === files.length) {
              setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...newImages] }));
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeGalleryImage = (index: number) => setFormData(prev => ({
    ...prev,
    gallery: prev.gallery.filter((_, i) => i !== index)
  }));


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.details?.join("\n") ||
          "Failed to update profile"
        );
      }

      alert("Profile updated successfully!");
      console.log("Updated data:", data);

    } catch (error) {
      console.error("Update error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred"
      );
    }
  };
  const workRef = useRef(null);
  const educationRef = useRef(null);
  const degreeRef = useRef(null);
  const galleryRef = useRef(null);
  const experienceRef = useRef(null);
  const chamberRef = useRef(null);
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
<div className="sm:flex justify-center sm:gap-4 mb-3">
  <div className="w-full sm:w-1/3 lg:w-1/4">
    <div className="w-full bg-gray-100  dark:bg-gray-900 rounded-lg p-4 sticky top-[200px] h-fit shadow">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul className="space-y-4 ">
        {/* List items */}
        <li className="cursor-pointer flex justify-between items-center hover:bg-blue-100 dark:hover:bg-blue-900 p-2 rounded" onClick={() => scrollToSection(galleryRef)}>
          <span className="font-semibold">Gallery</span>
          <span className="w-6 h-6 text-sm flex items-center justify-center bg-blue-500 text-white rounded-full">
            {(formData.gallery || []).length}
          </span>
        </li>
        <li className="cursor-pointer flex justify-between items-center hover:bg-blue-100  dark:hover:bg-blue-900 p-2 rounded" onClick={() => scrollToSection(chamberRef)}>
            <span className="font-semibold">Chamber</span>
            <span className="w-6 h-6 text-sm flex items-center justify-center bg-green-500 text-white rounded-full">
              {(formData.chamber || []).length}
            </span>
          </li>
          <li className="cursor-pointer flex justify-between items-center hover:bg-blue-100  dark:hover:bg-blue-900 p-2 rounded" onClick={() => scrollToSection(experienceRef)}>
            <span className="font-semibold">Experience</span>
            <span className="w-6 h-6 text-sm flex items-center justify-center bg-purple-500 text-white rounded-full">
              {(formData.experience || []).length}
            </span>
          </li>
          <li className="cursor-pointer flex justify-between items-center hover:bg-blue-100  dark:hover:bg-blue-900 p-2 rounded" onClick={() => scrollToSection(workRef)}>
            <span className="font-semibold">Work</span>
            <span className="w-6 h-6 text-sm flex items-center justify-center bg-blue-500 text-white rounded-full">
              {(formData.work || []).length}
            </span>
          </li>
          <li className="cursor-pointer flex justify-between items-center hover:bg-blue-100  dark:hover:bg-blue-900 p-2 rounded" onClick={() => scrollToSection(educationRef)}>
            <span className="font-semibold">Education</span>
            <span className="w-6 h-6 text-sm flex items-center justify-center bg-green-500 text-white rounded-full">
              {(formData.education || []).length}
            </span>
          </li>
          <li className="cursor-pointer flex justify-between items-center hover:bg-blue-100  dark:hover:bg-blue-900 p-2 rounded" onClick={() => scrollToSection(degreeRef)}>
            <span className="font-semibold">Degrees</span>
            <span className="w-6 h-6 text-sm flex items-center justify-center bg-purple-500 text-white rounded-full">
              {(formData.degrees || []).length}
            </span>
          </li>
      </ul>
    </div>
  </div>


  <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-center mb-6">Doctor Profile Editor</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="bg-white p-6 rounded-2xl shadow-lg ring-1 ring-zinc-200 dark:bg-gray-900"
>
  <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-6">🩺 Basic Information</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    <div>
      <label className="block text-lg text-blue-600 dark:text-blue-400 font-medium mb-1">Name</label>
      <div className="text-xl font-semibold text-zinc-900 dark:text-white">DR. {user?.name}</div>
    </div>

    <div>
      <label className="block text-lg text-zinc-700 dark:text-zinc-300 font-medium mb-1">Email</label>
      <div className="text-md italic text-zinc-600 dark:text-zinc-400">{user?.email}</div>
    </div>

    <div>
      <label className="block text-lg text-zinc-700 dark:text-zinc-300 font-medium mb-1">RegisterId</label>
      <div className="text-md italic text-zinc-600 dark:text-zinc-400">{user?.phoneNo}</div>
    </div>
    {/* Dynamic Input Fields */}
    {[
      { label: "Contact Email*", name: "optionalEmail", type: "email" },
      { label: "Contact Number*", name: "ContactNo", type: "text", handler: handleContactNoChange },
      { label: "Optional Phone Number", name: "registerId", type: "text", required: false },
      { label: "Specialization*", name: "specialization", type: "text", required: true },
      { label: "MBBS College*", name: "mbbsCollege", type: "text", required: true },
    ].map((field) => (
      <div key={field.name}>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">{field.label}</label>
        <input
          type={field.type}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={field.handler || handleChange}
          required={field.required}
          className="w-full p-3 border rounded-xl dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>
    ))}

    {/* Bio */}
    <div className="col-span-full">
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Bio</label>
      <textarea
        name="bio"
        value={formData.bio || ""}
        onChange={handleBioChange}
        className="w-full p-3 border rounded-xl dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition h-32 resize-none"
        maxLength={500}
      />
    </div>

    {/* Profile Photo */}
    <div>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Profile Photo</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleProfilePhotoChange}
        className="w-full p-3 rounded-xl border dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
      />
      {formData.profilePhoto && (
        <img src={formData.profilePhoto} alt="Profile" className="mt-3 w-32 h-32 object-cover rounded-lg border" />
      )}
    </div>

    {/* About Picture */}
    <div>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">About Page Photo</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleAboutPictureChange}
        className="w-full p-3 rounded-xl border dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
      />
      {formData.aboutPicture && (
        <img src={formData.aboutPicture} alt="About" className="mt-3 w-32 h-32 object-cover rounded-lg border" />
      )}
    </div>
  </div>
</motion.div>

        {/* Keep all other sections (Degrees, Education, Work, etc.) with the same pattern of || "" for values */}

        {/* Degrees Section */}
   
      <motion.div
  ref={degreeRef}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-700 mb-6"
>
  <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">🎓 Degrees</h2>

  <div className="flex items-end">
        <button
          type="button"
          onClick={() => removeDegree(index)}
          className="p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
    type="button"
    onClick={addDegree}
    className=" ml-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2"
  >
    <Plus className="w-5 h-5" />
  </button>
      </div>

  {(formData.degrees || []).map((degree, index) => (
    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      {["Degree Name", "College", "Year"].map((label, i) => {
        const field = ["name", "college", "year"][i];
        return (
          <div key={label}>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">{label}</label>
            <input
              type="text"
              value={degree[field] || ""}
              onChange={(e) => handleDegreeChange(index, field, e.target.value)}
              className="w-full p-3 border rounded-xl dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        );
      })}
      <div className="flex items-end">
        <button
          type="button"
          onClick={() => removeDegree(index)}
          className="p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
    type="button"
    onClick={addDegree}
    className=" ml-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2"
  >
    <Plus className="w-5 h-5" />
  </button>
      </div>
    </div>
  ))}


</motion.div>

{/* Education Section */}
<motion.div
  ref={educationRef}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.1 }}
  className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-700"
>
  <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">🏫 Education</h2>

  <div className="flex items-end mb-3">
        <button
          type="button"
          onClick={() => removeEducation(index)}
          className=" p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
    type="button"
    onClick={addEducation}
    className=" ml-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2"
  >
    <Plus className="w-5 h-5" /> 
  </button>
      </div>

  {(formData.education || []).map((edu, index) => (
    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      {["Year", "Exam Name", "Institute"].map((label, i) => {
        const field = ["year", "examName", "institute"][i];
        return (
          <div key={label}>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">{label}</label>
            <input
              type="text"
              value={edu[field] || ""}
              onChange={(e) => handleEducationChange(index, field, e.target.value)}
              className="w-full p-3 border rounded-xl dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        );
      })}
      <div className="flex items-end">
        <button
          type="button"
          onClick={() => removeEducation(index)}
          className=" p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
    type="button"
    onClick={addEducation}
    className=" ml-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2"
  >
    <Plus className="w-5 h-5" /> 
  </button>
      </div>
    </div>
  ))}

 
</motion.div>

<motion.div
  ref={workRef}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-700 mb-6"
>
  <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">💼 Work Information</h2>

  <div className="flex mb-4 ">
        <button
          type="button"
          onClick={() => removeWork(index)}
          className=" p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
    type="button"
    onClick={addWork}
    className="ml-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2"
  >
    <Plus className="w-5 h-5" /> 
  </button>
      </div>

  {(formData.work || []).map((work, index) => (
    <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
      {[
        { label: "Role", key: "role" },
        { label: "Institution", key: "college" },
        { label: "Days", key: "day" },
        { label: "Time", key: "time" },
        { label: "Contact Number", key: "collegePhoneNumber" },
      ].map(({ label, key }) => (
        <div key={key}>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">{label}</label>
          <input
            type="text"
            value={work[key] || ""}
            onChange={(e) => handleWorkChange(index, key, e.target.value)}
            className="w-full p-3 border rounded-xl dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      ))}
      <div className="flex ">
        <button
          type="button"
          onClick={() => removeWork(index)}
          className=" p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
    type="button"
    onClick={addWork}
    className="ml-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2"
  >
    <Plus className="w-5 h-5" /> 
  </button>
      </div>
    </div>
  ))}


</motion.div>

{/* Experience Section */}
<motion.div
  ref={experienceRef}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.1 }}
  className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-700"
>
  <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">🧪 Experience</h2>


  <div className="flex items-end mb-3">
        <button
          type="button"
          onClick={() => removeExperience(index)}
          className=" p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
    type="button"
    onClick={addExperience}
    className="ml-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2"
  >
    <Plus className="w-5 h-5" />
  </button>
      </div>

  {(formData.experience || []).map((exp, index) => (
    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      {[
        { label: "Role", key: "role" },
        { label: "Institution", key: "college" },
        { label: "Start Year", key: "startingYear" },
        { label: "End Year", key: "endingYear" },
      ].map(({ label, key }) => (
        <div key={key}>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">{label}</label>
          <input
            type="text"
            value={exp[key] || ""}
            onChange={(e) => handleExperienceChange(index, key, e.target.value)}
            className="w-full p-3 border rounded-xl dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      ))}
      <div className="flex items-end">
        <button
          type="button"
          onClick={() => removeExperience(index)}
          className=" p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
    type="button"
    onClick={addExperience}
    className="ml-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2"
  >
    <Plus className="w-5 h-5" />
  </button>
      </div>
    </div>
  ))}

  
</motion.div>
          

<motion.div
  ref={chamberRef}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.2 }}
  className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-700 mb-6"
>
  <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">🏥 Chamber</h2>

  <div className="flex items-end">
        <button
          type="button"
          onClick={() => removeChamber(index)}
          className="p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
    type="button"
    onClick={addChamber}
    className="ml-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2"
  >
    <Plus className="w-5 h-5" /> 
  </button>
      </div>

  {(formData.chamber || []).map((chamber, index) => (
    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      {[
        { label: "Place", key: "place" },
        { label: "Days", key: "day" },
        { label: "Time", key: "time" },
        { label: "Contact", key: "bookContact" },
      ].map(({ label, key }) => (
        <div key={key}>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">{label}</label>
          <input
            type="text"
            value={chamber[key as keyof typeof chamber] || ""}
            onChange={(e) => handleChamberChange(index, key as keyof typeof chamber, e.target.value)}
            className="w-full p-3 border rounded-xl dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      ))}
      <div className="flex items-end">
        <button
          type="button"
          onClick={() => removeChamber(index)}
          className="p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
    type="button"
    onClick={addChamber}
    className="ml-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2"
  >
    <Plus className="w-5 h-5" /> 
  </button>
      </div>
    </div>
  ))}

 
</motion.div>

        {/* Gallery Section */}
        <motion.div
  ref={galleryRef}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.3 }}
  className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-700"
>
  <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">🖼️ Gallery</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
    {(formData.gallery || []).map((image, index) => (
      <div key={index} className="relative rounded-2xl overflow-hidden shadow-md">
        <img
          src={image}
          alt={`Gallery ${index + 1}`}
          className="w-full h-48 object-cover rounded-xl border dark:border-zinc-700"
        />
        <button
          type="button"
          onClick={() => removeGalleryImage(index)}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          ×
        </button>
      </div>
    ))}
  </div>

  <div>
    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Add Images</label>
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={handleGalleryUpload}
      className="w-full p-3 border rounded-xl dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
</motion.div>

{/* Add this section inside your Basic Information div */}
<div className="bg-gray-50 p-4 rounded-lg shadow-md">
      {/* Toggle Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold flex items-center">
          Social Media Links
        </h2>
        <span className="transition-transform duration-300">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </span>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Social Input Component */}
          {[
            {
              name: "Facebook",
              nameAttr: "fbLink",
              iconColor: "text-blue-600",
              placeholder: "https://facebook.com/yourprofile",
              svgPath:
                "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99..." // trimmed
            },
            {
              name: "Instagram",
              nameAttr: "instagram",
              iconColor: "text-pink-500",
              placeholder: "https://instagram.com/yourprofile",
              svgPath:
                "M12 2.163c3.204 0 3.584.012 4.85.07..." // trimmed
            },
            {
              name: "LinkedIn",
              nameAttr: "Linkedin",
              iconColor: "text-blue-500",
              placeholder: "https://linkedin.com/in/yourprofile",
              svgPath:
                "M19 0h-14c-2.761 0-5 2.239-5 5v14c0..." // trimmed
            },
            {
              name: "YouTube",
              nameAttr: "youTubeLink",
              iconColor: "text-red-600",
              placeholder: "https://youtube.com/yourchannel",
              svgPath:
                "M19.615 3.184c-3.604-.246-11.631..." // trimmed
            }
          ].map(({ name, nameAttr, iconColor, placeholder, svgPath }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">
                <div className="flex items-center">
                  <svg
                    className={`w-5 h-5 mr-2 ${iconColor}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={svgPath} />
                  </svg>
                  {name} Profile URL
                </div>
              </label>
              <input
                type="url"
                name={nameAttr}
                value={formData[nameAttr] || ""}
                onChange={handleSocialMediaChange}
                placeholder={placeholder}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
        </div>
      )}
    </div>
        <div className="text-center">
          <button type="submit" className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600">
            Save Profile
          </button>
        </div>
      </form>
    </div>
 </div>
  );
}