export interface IAppointment {
    userId: string;
    patientName: string;
    gender: string;
    mobileNo: number;
    studentId: string;
    date: string;
    time: string;
    slot: number;
    status?: number;
    issues?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  