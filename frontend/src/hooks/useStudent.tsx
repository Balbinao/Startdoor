import { useStore } from '@contexts/store/useStore';
import type { IStudentRegistration } from '@models/registrationLogin.types';
import type {
  IConditionalScore,
  IStudentUpdatePayload,
} from '@models/studentData.types';
import { studentService } from '../services/studentRegistrationService';

export const useStudent = () => {
  const { studentStore } = useStore();

  const student = studentStore.getStudent;
  const studentsOptions = studentStore.getStudentsOptions;
  const conditinalScore = studentStore.getConditionalScore;

  const getStudent = async (id: number, shouldStore: boolean = true) => {
    try {
      const response = await studentService.getStudent(id);
      if (shouldStore) {
        studentStore.setStudent(response);
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const studentRegistration = async (
    studentRegistrationData: IStudentRegistration,
  ) => {
    try {
      const response = await studentService.studentRegistration(
        studentRegistrationData,
      );

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateStudent = async (id: number, student: IStudentUpdatePayload) => {
    try {
      const response = await studentService.updateStudent(id, student);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateStudentPassword = async (id: number, novaSenha: string) => {
    try {
      const response = await studentService.updateStudentPassword(
        id,
        novaSenha,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      const response = await studentService.deleteStudent(id);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateStudentProfilePicture = async (
    id: number,
    formData: FormData,
  ) => {
    try {
      const response = await studentService.updateStudentProfilePicture(
        id,
        formData,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteStudentProfilePicture = async (id: number) => {
    try {
      const response = await studentService.deleteStudentProfilePicture(id);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getConditionalScore = async (idStudent: number) => {
    try {
      const response = await studentService.getConditionalScore(idStudent);
      studentStore.setConditionalScore(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateConditionalScore = async (
    id: number,
    conditionalScore: IConditionalScore,
  ) => {
    try {
      const response = await studentService.updateConditionalScore(
        id,
        conditionalScore,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    student,
    studentsOptions,
    conditinalScore,
    getStudent,
    studentRegistration,
    updateStudent,
    updateStudentPassword,
    deleteStudent,
    updateStudentProfilePicture,
    deleteStudentProfilePicture,
    getConditionalScore,
    updateConditionalScore,
  };
};
