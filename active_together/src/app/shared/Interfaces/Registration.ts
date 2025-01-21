import { Course } from "./Course";

export interface Registration {
    id: string;
    email: string,
    name: string;
    birthdate: string,
    course: Course,
    courseId: number,
    submitDatetime: Date,
  }
