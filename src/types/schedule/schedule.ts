import { Assignment } from "../assignment/assignment";

export interface Schedule {
  id: number;
  nama_matakuliah: string;
  start_time: Date;
  end_time: Date;
  date: Date;
  sks: number;
  dosen_pengampu: string;
  kelas: string;
  ruang_kelas: string;
}

export interface ScheduleDetail {
  id: number;
  nama_matakuliah: string;
  start: Date;
  end: Date;
  sks: number;
  dosen_pengampu: string;
  kelas: string;
  ruang_kelas: string;
  tasks: Assignment[];
}
