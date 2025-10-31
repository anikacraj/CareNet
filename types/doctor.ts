// types/doctor.ts

export interface Degree {
    name?: string;
    college?: string;
    year?: string;
  }
  
  export interface Education {
    year?: string;
    examName?: string;
    institute?: string;
  }
  export interface Work {
    college?: string;
    day?: string;
    time?: string;
  }
  
  export interface Experience {
    college?: string;
    startingYear?: string;
    endingYear?: string;
  }
  
  export interface Chamber {
    place?: string;
    day?: string;
    time?: string;
  }
  
  export interface DoctorProfile {
    email: string;
    name: string;
    phoneNo: string;
    password?: string; // optional if not updating password
    optionalEmail?: string;
    registerId?: string;
    specialization?: string;


    ContactNo:string;
    bio:string;
    aboutPicture:string;
    fbLink:string;
    instagram:string;
    Linkedin:string;
    youTubeLink:string;

    
    mbbsCollege?: string;
    degree?: Degree[];
    work?: Work[];
    experience?: Experience[];
    chamber?: Chamber[];
    profilePhoto?: string;
    gallery?: string[];
  }
  