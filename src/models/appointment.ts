import { Doctor } from './doctor';
import { Patient } from './patient';
export class Appointment {
  id: number;
  date: Date;
  department: string;
  doctor: Doctor;
  patient: Patient;
  status: number;
}