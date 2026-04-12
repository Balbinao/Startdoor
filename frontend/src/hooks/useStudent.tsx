import { useStore } from '@contexts/store/useStore';
import type { IInputOption } from '@models/input.types';
import type { IStudentRegistration } from '@models/registrationLogin.types';
import type {
  IConditionalScore,
  IStudentUpdatePayload,
} from '@models/studentData.types';
import { studentService } from '../services/studentRegistrationService';

export const useStudent = () => {
  const { studentStore } = useStore();

  const student = studentStore.getStudent;
  const students = studentStore.getStudents;
  const studentsOptions = studentStore.getStudentsOptions;

  const getStudent = async (id: number) => {
    try {
      const response = await studentService.getStudent(id);
      studentStore.setStudent(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getStudents = async () => {
    try {
      // const response = await studentService.getStudents();
      // const formatted: IInputOption[] = [
      //   { label: 'Selecione...', value: '' },
      //   ...response.map(item => ({
      //     label: item.nome,
      //     value: item.id,
      //   })),
      // ];

      // studentStore.setStudents(response);
      // studentStore.setStudentsOptions(formatted);
      // return response;
      return [];
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
    students,
    studentsOptions,
    getStudent,
    getStudents,
    studentRegistration,
    updateStudent,
    updateStudentPassword,
    deleteStudent,
    getConditionalScore,
    updateConditionalScore,
  };
};
