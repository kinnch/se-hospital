import { Prescription } from './prescription';
import { Doctor } from './doctor';
import { Patient } from './patient';
export class PrescriptionListElement {
  id: number;
  doctor: Doctor;
  patient: Patient;
  prescriptionList: Prescription[];
  status: number;//(0)หมอต้องแก้ Doctor needs to edit (1)หมอจ่ายมา Doctor prescipe, (2)เภสัชจ่ายแล้ว
}