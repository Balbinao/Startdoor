import { useStore } from '@contexts/store/useStore';
import type { IStudentRegistration } from '@models/registrationLogin.types';
import type { IUpdateStudentPassword } from '@models/studentData.types';
import type { StudentProfileUpdateData } from '@schemas/studentProfileUpdateSchema';
import { studentRegistrationService } from '../services/studentRegistrationService';

export const useStudentRegistrations = () => {
  const { studentRegistrationStore } = useStore();

  const student = studentRegistrationStore.getStudent;

  const getStudent = async (id: number) => {
    try {
      const response = await studentRegistrationService.getStudent(id);
      studentRegistrationStore.setStudent(response);
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
      const response = await studentRegistrationService.studentRegistration(
        studentRegistrationData,
      );

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateStudent = async (
    id: number,
    student: StudentProfileUpdateData,
  ) => {
    try {
      const response = await studentRegistrationService.updateStudent(
        id,
        student,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateStudentPassword = async (
    id: number,
    passwordData: IUpdateStudentPassword,
  ) => {
    try {
      const response = await studentRegistrationService.updateStudentPassword(
        id,
        passwordData,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      const response = await studentRegistrationService.deleteStudent(id);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    student,
    getStudent,
    studentRegistration,
    updateStudent,
    updateStudentPassword,
    deleteStudent,
  };
};
