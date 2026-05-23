export interface InstrumentMaster {
  id: number; instrumentCode: string; instrumentName: string; model?: string;
  serialNumber?: string; manufacturer?: string; calibrationFrequency?: string;
  status: string; locationId?: number; barcodeValue?: string; tenantId: number;
}
export interface InstrumentCalibration {
  id: number; instrumentId: number; calibrationDate: string; nextDueDate: string;
  performedBy: { id: number; username: string }; status: string; result?: string;
}
export interface InstrumentReservation {
  id: number; instrumentId: number; userId: number; startTime: string;
  endTime: string; purpose?: string; status: string; createdAt: string;
}
