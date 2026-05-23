export interface DocumentMaster {
  id: number; documentCode: string; documentName: string; description?: string;
  documentType: string; tenantId: number; createdAt: string;
}
export interface DocumentVersion {
  id: number; documentId: number; versionNo: number; lifecycleState: string;
  storagePath?: string; fileUrl?: string; fileSizeBytes?: number;
  uploadedBy?: { id: number; username: string };
  approvedBy?: { id: number; username: string };
  createdAt: string; approvedAt?: string; publishedAt?: string; retiredAt?: string;
}
export interface DocumentParsedJson {
  id: number; documentVersionId: number; parsedJson: string; parsedAt: string;
}
export interface ParsedField {
  fieldId: string; fieldName: string; fieldType: string;
  unit?: string; minValue?: number; maxValue?: number;
  required?: boolean; defaultValue?: string; options?: string[];
}
