export interface Sample {
  id: number; sampleNumber: string; product: string; batch: string;
  sampleType: string; status: string; receivedDate: string;
  assignedTo?: { id: number; username: string }; tenantId: number;
}
export interface SampleTest {
  id: number; sampleId: number; testName: string; method?: string;
  status: string; assignedTo?: { id: number; username: string };
}
export interface TestResult {
  id: number; sampleTestId: number; parameterName: string;
  resultValue: string; unit?: string; minLimit?: number; maxLimit?: number;
  isOos: boolean; recordedBy: { id: number; username: string }; recordedAt: string;
}
